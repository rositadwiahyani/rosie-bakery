import { Heart, Pencil, Trash2 } from 'lucide-react'
import { rupiah } from '../utils'

const TINTS = ['bg-amber-100', 'bg-orange-100', 'bg-rose-100', 'bg-yellow-100']

export default function ProductCard({ product, index = 0, onFavorite, onEdit, onDelete }) {
    const { name, category, price, stock, emoji, description, favorite } = product
    const lowStock = stock <= 5

    return (
        <article className="rise flex flex-col overflow-hidden rounded-3xl border border-orange-200/70 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md" style={{ animationDelay: `${index * 40}ms` }}>
            <div className={`relative flex h-32 items-center justify-center text-6xl ${TINTS[index % TINTS.length]}`}>
                <span aria-hidden>{emoji}</span>
                <button
                    onClick={() => onFavorite(product.id)}
                    aria-label={favorite ? 'Hapus dari favorit' : 'Tambah ke favorit'}
                    className="absolute right-3 top-3 rounded-full bg-white/90 p-2 shadow"
                >
                    <Heart size={18} className={favorite ? 'fill-rose-500 text-rose-500' : 'text-cocoa/50'} />
                </button>
                <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold text-crust">{category}</span>
            </div>

            <div className="flex flex-1 flex-col gap-1 p-4">
                <h3 className="font-display text-lg font-extrabold leading-tight">{name}</h3>
                <p className="line-clamp-2 text-sm text-cocoa/70">{description}</p>
                <div className="mt-2 flex items-end justify-between">
                    <span className="text-lg font-bold text-crust">{rupiah(price)}</span>
                    <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${lowStock ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'}`}>
                        Stok {stock}
                    </span>
                </div>

                {(onEdit || onDelete) && (
                    <div className="mt-3 flex gap-2 border-t border-orange-100 pt-3">
                        {onEdit && (
                            <button onClick={() => onEdit(product)} className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-orange-100 py-2 text-sm font-bold text-crust-dark hover:bg-orange-200">
                                <Pencil size={14} /> Edit
                            </button>
                        )}
                        {onDelete && (
                            <button onClick={() => onDelete(product)} className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-rose-50 py-2 text-sm font-bold text-rose-700 hover:bg-rose-100">
                                <Trash2 size={14} /> Hapus
                            </button>
                        )}
                    </div>
                )}
            </div>
        </article>
    )
}