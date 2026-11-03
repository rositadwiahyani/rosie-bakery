import { useState } from 'react'
import { X } from 'lucide-react'
import { CATEGORIES, EMOJI_OPTIONS } from '../data/seed'

const EMPTY = { name: '', category: CATEGORIES[0], price: '', stock: '', emoji: '🥐', description: '' }

// Modal form untuk Create & Update. Jika `initial` ada -> mode edit.
export default function ProductForm({ initial, onSubmit, onClose }) {
    const [form, setForm] = useState(initial ? { ...initial } : EMPTY)
    const [errors, setErrors] = useState({})
    const isEdit = Boolean(initial)

    const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

    const validate = () => {
        const err = {}
        if (!form.name.trim()) err.name = 'Nama roti wajib diisi'
        if (form.price === '' || Number(form.price) <= 0) err.price = 'Harga harus lebih dari 0'
        if (form.stock === '' || Number(form.stock) < 0) err.stock = 'Stok tidak boleh negatif'
        setErrors(err)
        return Object.keys(err).length === 0
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!validate()) return
        onSubmit({
            name: form.name.trim(),
            category: form.category,
            price: Number(form.price),
            stock: Number(form.stock),
            emoji: form.emoji,
            description: form.description.trim(),
        })
    }

    const field = 'w-full rounded-xl border border-orange-200 bg-cream px-3 py-2.5 outline-none focus:border-crust focus:ring-2 focus:ring-crust/20'

    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-cocoa/50 p-0 sm:items-center sm:p-4" onClick={onClose}>
            <form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()} className="rise max-h-[92vh] w-full max-w-lg space-y-4 overflow-y-auto rounded-t-3xl bg-white p-6 shadow-xl sm:rounded-3xl">
                <div className="flex items-center justify-between">
                    <h2 className="font-display text-2xl font-extrabold text-crust">{isEdit ? 'Edit Roti' : 'Tambah Roti Baru'}</h2>
                    <button type="button" onClick={onClose} aria-label="Tutup" className="rounded-full p-2 hover:bg-orange-100"><X size={20} /></button>
                </div>

                <div>
                    <span className="mb-1.5 block text-sm font-bold">Ikon</span>
                    <div className="flex flex-wrap gap-2">
                        {EMOJI_OPTIONS.map((em) => (
                            <button type="button" key={em} onClick={() => setForm((f) => ({ ...f, emoji: em }))} className={`h-11 w-11 rounded-xl text-2xl ${form.emoji === em ? 'bg-crust/15 ring-2 ring-crust' : 'bg-orange-50'}`}>
                                {em}
                            </button>
                        ))}
                    </div>
                </div>

                <label className="block">
                    <span className="mb-1.5 block text-sm font-bold">Nama Roti</span>
                    <input className={field} value={form.name} onChange={set('name')} placeholder="mis. Croissant Almond" />
                    {errors.name && <span className="text-sm text-rose-600">{errors.name}</span>}
                </label>

                <label className="block">
                    <span className="mb-1.5 block text-sm font-bold">Kategori</span>
                    <select className={field} value={form.category} onChange={set('category')}>
                        {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                    </select>
                </label>

                <div className="grid grid-cols-2 gap-3">
                    <label className="block">
                        <span className="mb-1.5 block text-sm font-bold">Harga (Rp)</span>
                        <input type="number" inputMode="numeric" className={field} value={form.price} onChange={set('price')} placeholder="18000" />
                        {errors.price && <span className="text-sm text-rose-600">{errors.price}</span>}
                    </label>
                    <label className="block">
                        <span className="mb-1.5 block text-sm font-bold">Stok</span>
                        <input type="number" inputMode="numeric" className={field} value={form.stock} onChange={set('stock')} placeholder="20" />
                        {errors.stock && <span className="text-sm text-rose-600">{errors.stock}</span>}
                    </label>
                </div>

                <label className="block">
                    <span className="mb-1.5 block text-sm font-bold">Deskripsi</span>
                    <textarea rows={3} className={field} value={form.description} onChange={set('description')} placeholder="Ceritakan keunikan roti ini..." />
                </label>

                <div className="flex gap-3 pt-1">
                    <button type="button" onClick={onClose} className="flex-1 rounded-xl bg-orange-100 py-3 font-bold text-crust-dark">Batal</button>
                    <button type="submit" className="flex-1 rounded-xl bg-crust py-3 font-bold text-white hover:bg-crust-dark">{isEdit ? 'Simpan Perubahan' : 'Tambah'}</button>
                </div>
            </form>
        </div>
    )
}