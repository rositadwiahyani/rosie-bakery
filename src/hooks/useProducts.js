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
                const data = await productService.getProducts()
                if (!cancelled && Array.isArray(data) && data.length > 0) {
                    setProducts(data)
                    saveLocal(data)
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
        try {
            const created = await productService.createProduct(data)
            if (created) {
                setProducts((prev) => [created, ...prev])
                return
            }
        } catch (err) {
            console.warn('Gagal simpan ke Supabase, simpan offline:', err.message)
        }

        // Fallback offline: simpan ke state + localStorage saja
        const optimistic = { ...data, id: crypto.randomUUID(), favorite: false }
        setProducts((prev) => [optimistic, ...prev])
    }, [])

    // ---- UPDATE ----
    const updateProduct = useCallback(async (id, data) => {
        // Optimistic update dulu di UI
        setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...data } : p)))

        try {
            await productService.updateProduct(id, data)
        } catch (err) {
            console.warn('Gagal update ke Supabase, perubahan tersimpan offline:', err.message)
        }
    }, [])

    // ---- DELETE ----
    const deleteProduct = useCallback(async (id) => {
        // Optimistic delete dulu di UI
        setProducts((prev) => prev.filter((p) => p.id !== id))

        try {
            await productService.deleteProduct(id)
        } catch (err) {
            console.warn('Gagal hapus di Supabase, dihapus dari offline:', err.message)
        }
    }, [])

    // ---- TOGGLE FAVORITE (Dimodifikasi untuk Sync Offline) ----
    const toggleFavorite = useCallback(async (id) => {
        const currentItem = products.find((p) => p.id === id)
        if (!currentItem) return

        const nextStatus = !currentItem.favorite

        // 1. Optimistic update di UI & localStorage
        setProducts((prev) =>
            prev.map((p) => (p.id === id ? { ...p, favorite: nextStatus } : p)),
        )

        // 2. Jika koneksi terputus (Offline), masukkan ke antrean
        if (!navigator.onLine) {
            const pendingFavorites = JSON.parse(localStorage.getItem('pendingFavorites') || '[]')

            if (pendingFavorites.includes(id)) {
                // Jika sudah ada, hapus (berarti user batal favorit saat offline)
                const newQueue = pendingFavorites.filter(favId => favId !== id)
                localStorage.setItem('pendingFavorites', JSON.stringify(newQueue))
            } else {
                // Jika belum ada, masukkan ke antrean
                pendingFavorites.push(id)
                localStorage.setItem('pendingFavorites', JSON.stringify(pendingFavorites))
            }
            return // Berhenti di sini, tidak perlu panggil API
        }

        // 3. Jika koneksi lancar, tembak ke Supabase
        try {
            await productService.toggleFavorite(id, nextStatus)
        } catch (err) {
            console.warn('Gagal toggle favorit di Supabase:', err.message)
            // Rollback dihapus agar ketika error jaringan, UI tetap terasa responsif
        }
    }, [products])

    // ---- RESET: refetch dari Supabase atau kembali ke seed ----
    const resetProducts = useCallback(async () => {
        try {
            const data = await productService.getProducts()
            if (Array.isArray(data) && data.length > 0) {
                setProducts(data)
                saveLocal(data)
                return
            }
        } catch {
            // fallback
        }
        setProducts(seedProducts)
        saveLocal(seedProducts)
    }, [])

    return { products, loading, error, addProduct, updateProduct, deleteProduct, toggleFavorite, resetProducts, seedData: resetProducts }
}