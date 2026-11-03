import { useState, useEffect, useCallback } from 'react'
import { seedProducts } from '../data/seed'

const STORAGE_KEY = 'rosie-bakery:products'

function load() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (raw) return JSON.parse(raw)
    } catch (err) {
        console.warn('Gagal membaca localStorage', err)
    }
    return seedProducts
}

// Custom hook CRUD produk. Data disimpan di localStorage sehingga tetap ada
// setelah refresh dan saat offline.
export function useProducts() {
    const [products, setProducts] = useState(load)

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(products))
        } catch (err) {
            console.warn('Gagal menyimpan ke localStorage', err)
        }
    }, [products])

    // CREATE
    const addProduct = useCallback((data) => {
        const item = { ...data, id: crypto.randomUUID(), favorite: false }
        setProducts((prev) => [item, ...prev])
    }, [])

    // UPDATE
    const updateProduct = useCallback((id, data) => {
        setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...data } : p)))
    }, [])

    // DELETE
    const deleteProduct = useCallback((id) => {
        setProducts((prev) => prev.filter((p) => p.id !== id))
    }, [])

    const toggleFavorite = useCallback((id) => {
        setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, favorite: !p.favorite } : p)))
    }, [])

    const resetProducts = useCallback(() => setProducts(seedProducts), [])

    return { products, addProduct, updateProduct, deleteProduct, toggleFavorite, resetProducts }
}