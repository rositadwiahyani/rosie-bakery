import { useState, useEffect, useCallback } from 'react'
import { seedProducts } from '../data/seed'
import productService from '../services/productService'

const STORAGE_KEY = 'rosie-bakery:products'

// ---------------------------------------------------------------------------
// Baca / tulis localStorage sebagai cache offline
// ---------------------------------------------------------------------------
function loadLocal() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (raw) return JSON.parse(raw)
    } catch (err) {
        console.warn('Gagal membaca localStorage', err)
    }
    return seedProducts
}

function saveLocal(products) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(products))
    } catch (err) {
        console.warn('Gagal menyimpan ke localStorage', err)
    }
}

// ---------------------------------------------------------------------------
// Custom hook CRUD produk.
//
// Strategi: Online-first, localStorage fallback.
// - Saat ONLINE  → CRUD langsung ke Supabase, lalu cache ke localStorage
// - Saat OFFLINE → CRUD ke localStorage agar app tetap berfungsi
// ---------------------------------------------------------------------------
export function useProducts() {
    const [products, setProducts] = useState(loadLocal)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // ---- Fetch awal dari Supabase, fallback ke localStorage ----
    useEffect(() => {
        let cancelled = false

        async function fetchFromSupabase() {
            try {
                setLoading(true)
                setError(null)
                const response = await productService.getProducts()
                if (!cancelled && response.success) {
                    setProducts(response.data)
                    saveLocal(response.data)
                }
            } catch (err) {
                console.warn('Supabase tidak tersedia, menggunakan data offline:', err.message)
                if (!cancelled) {
                    setProducts(loadLocal())
                    setError('Mode offline — data ditampilkan dari cache lokal.')
                }
            } finally {
                if (!cancelled) setLoading(false)
            }
        }

        fetchFromSupabase()
        return () => { cancelled = true }
    }, [])

    // ---- Simpan ke localStorage setiap kali products berubah ----
    useEffect(() => {
        saveLocal(products)
    }, [products])

    // ---- CREATE ----
    const addProduct = useCallback(async (data) => {
        const optimistic = { ...data, id: crypto.randomUUID(), favorite: false }

        try {
            const response = await productService.createProduct(data)
            if (response.success && response.data) {
                setProducts((prev) => [response.data, ...prev])
                return
            }
        } catch (err) {
            console.warn('Gagal simpan ke Supabase, simpan offline:', err.message)
        }

        // Fallback: simpan ke state + localStorage saja
        setProducts((prev) => [optimistic, ...prev])
    }, [])

    // ---- UPDATE ----
    const updateProduct = useCallback(async (id, data) => {
        // Optimistic update dulu
        setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...data } : p)))

        try {
            await productService.updateProduct(id, data)
        } catch (err) {
            console.warn('Gagal update ke Supabase, perubahan tersimpan offline:', err.message)
        }
    }, [])

    // ---- DELETE ----
    const deleteProduct = useCallback(async (id) => {
        // Optimistic delete dulu
        setProducts((prev) => prev.filter((p) => p.id !== id))

        try {
            await productService.deleteProduct(id)
        } catch (err) {
            console.warn('Gagal hapus di Supabase, dihapus dari offline:', err.message)
        }
    }, [])

    // ---- TOGGLE FAVORITE ----
    const toggleFavorite = useCallback(async (id) => {
        let currentFav = false
        setProducts((prev) =>
            prev.map((p) => {
                if (p.id === id) {
                    currentFav = p.favorite
                    return { ...p, favorite: !p.favorite }
                }
                return p
            }),
        )

        try {
            await productService.toggleFavorite(id, currentFav)
        } catch (err) {
            console.warn('Gagal toggle favorit di Supabase:', err.message)
        }
    }, [])

    // ---- RESET: refetch dari Supabase atau kembali ke seed ----
    const resetProducts = useCallback(async () => {
        try {
            const response = await productService.getProducts()
            if (response.success) {
                setProducts(response.data)
                saveLocal(response.data)
                return
            }
        } catch {
            // fallback
        }
        setProducts(seedProducts)
        saveLocal(seedProducts)
    }, [])

    return { products, loading, error, addProduct, updateProduct, deleteProduct, toggleFavorite, resetProducts }
}
