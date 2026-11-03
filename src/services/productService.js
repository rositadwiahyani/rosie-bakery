import { apiClient } from '../config/api'

// ---------------------------------------------------------------------------
// ProductService — CRUD operations ke Supabase (tabel: products)
//
// Menggunakan PostgREST API dari Supabase.
// Tabel products: id, name, category, price, stock, emoji, description,
//                 favorite, created_at, updated_at
// ---------------------------------------------------------------------------

class ProductService {
  /**
   * Ambil semua produk, diurutkan dari terbaru.
   */
  async getProducts() {
    const data = await apiClient.get('/rest/v1/products?select=*&order=created_at.desc')
    return {
      success: true,
      data: Array.isArray(data) ? data : [],
    }
  }

  /**
   * Ambil satu produk berdasarkan ID.
   */
  async getProductById(id) {
    const data = await apiClient.get(`/rest/v1/products?id=eq.${id}&select=*`)
    if (Array.isArray(data) && data.length > 0) {
      return { success: true, data: data[0] }
    }
    throw new Error('Produk tidak ditemukan.')
  }

  /**
   * Buat produk baru.
   */
  async createProduct(product) {
    const payload = {
      name: product.name,
      category: product.category,
      price: Number(product.price),
      stock: Number(product.stock),
      emoji: product.emoji || '🥐',
      description: product.description || '',
      favorite: product.favorite || false,
    }

    const res = await apiClient.post('/rest/v1/products', payload, {
      headers: { Prefer: 'return=representation' },
    })

    const created = Array.isArray(res) ? res[0] : res
    return { success: true, data: created }
  }

  /**
   * Update produk yang sudah ada.
   */
  async updateProduct(id, data) {
    const payload = { updated_at: new Date().toISOString() }

    if (data.name !== undefined) payload.name = data.name
    if (data.category !== undefined) payload.category = data.category
    if (data.price !== undefined) payload.price = Number(data.price)
    if (data.stock !== undefined) payload.stock = Number(data.stock)
    if (data.emoji !== undefined) payload.emoji = data.emoji
    if (data.description !== undefined) payload.description = data.description
    if (data.favorite !== undefined) payload.favorite = data.favorite

    const res = await apiClient.patch(`/rest/v1/products?id=eq.${id}`, payload, {
      headers: { Prefer: 'return=representation' },
    })

    const updated = Array.isArray(res) ? res[0] : res
    return { success: true, data: updated }
  }

  /**
   * Hapus produk.
   */
  async deleteProduct(id) {
    await apiClient.delete(`/rest/v1/products?id=eq.${id}`)
    return { success: true }
  }

  /**
   * Toggle status favorit produk.
   */
  async toggleFavorite(id, currentStatus) {
    return this.updateProduct(id, { favorite: !currentStatus })
  }
}

export default new ProductService()

