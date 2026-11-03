import { useState, useMemo } from 'react'
import { Plus, Search, PackageOpen } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import ProductForm from '../components/ProductForm'
import ConfirmModal from '../components/ConfirmModal'
import { CATEGORIES } from '../data/seed'

// Halaman CRUD: Create (Tambah), Read (daftar + cari + filter), Update (Edit), Delete (Hapus)
export default function Menu({ products, addProduct, updateProduct, deleteProduct, toggleFavorite }) {
    const [query, setQuery] = useState('')
    const [category, setCategory] = useState('Semua')
    const [formOpen, setFormOpen] = useState(false)
    const [editing, setEditing] = useState(null)
    const [deleting, setDeleting] = useState(null)
    const [toast, setToast] = useState('')

    const showToast = (msg) => {
        setToast(msg)
        setTimeout(() => setToast(''), 2200)
    }

    const filtered = useMemo(
        () =>
            products.filter(
                (p) =>
                    (category === 'Semua' || p.category === category) &&
                    p.name.toLowerCase().includes(query.toLowerCase()),
            ),
        [products, query, category],
    )

    const openCreate = () => { setEditing(null); setFormOpen(true) }
    const openEdit = (p) => { setEditing(p); setFormOpen(true) }

    const handleSubmit = (data) => {
        if (editing) {
            updateProduct(editing.id, data)
            showToast('Roti berhasil diperbarui ✨')
        } else {
            addProduct(data)
            showToast('Roti baru ditambahkan 🥐')
        }
        setFormOpen(false)
        setEditing(null)
    }

    const confirmDelete = () => {
        deleteProduct(deleting.id)
        setDeleting(null)
        showToast('Roti dihapus dari menu')
    }

    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between gap-3">
                <div>
                    <h1 className="font-display text-3xl font-extrabold">Menu Roti</h1>
                    <p className="text-sm text-cocoa/60">{products.length} produk tersedia</p>
                </div>
                <button onClick={openCreate} className="flex items-center gap-2 rounded-full bg-crust px-5 py-3 font-bold text-white shadow-lg hover:bg-crust-dark">
                    <Plus size={18} /> <span className="hidden sm:inline">Tambah</span> Roti
                </button>
            </div>

            <div className="relative">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-cocoa/40" />
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Cari roti favoritmu..."
                    className="w-full rounded-full border border-orange-200 bg-white py-3 pl-11 pr-4 outline-none focus:border-crust focus:ring-2 focus:ring-crust/20"
                />
            </div>

            <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
                {['Semua', ...CATEGORIES].map((c) => (
                    <button key={c} onClick={() => setCategory(c)} className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold ${category === c ? 'bg-crust text-white' : 'bg-white text-cocoa/70 ring-1 ring-orange-200'}`}>
                        {c}
                    </button>
                ))}
            </div>

            {filtered.length === 0 ? (
                <div className="rounded-3xl border-2 border-dashed border-orange-200 py-16 text-center text-cocoa/60">
                    <PackageOpen className="mx-auto mb-2" size={40} />
                    <p className="font-bold">Belum ada roti yang cocok.</p>
                    <p className="text-sm">Coba kata kunci lain atau tambah roti baru.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {filtered.map((p, i) => (
                        <ProductCard key={p.id} product={p} index={i} onFavorite={toggleFavorite} onEdit={openEdit} onDelete={setDeleting} />
                    ))}
                </div>
            )}

            {formOpen && <ProductForm initial={editing} onSubmit={handleSubmit} onClose={() => { setFormOpen(false); setEditing(null) }} />}
            {deleting && (
                <ConfirmModal title={`Hapus "${deleting.name}"?`} message="Roti ini akan dihapus dari menu dan tidak bisa dikembalikan." onConfirm={confirmDelete} onCancel={() => setDeleting(null)} />
            )}
            {toast && <div className="rise fixed bottom-24 left-1/2 z-50 -translate-x-1/2 rounded-full bg-cocoa px-5 py-3 text-sm font-bold text-white shadow-xl md:bottom-8">{toast}</div>}
        </div>
    )
}