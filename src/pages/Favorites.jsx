import { Heart } from 'lucide-react'
import ProductCard from '../components/ProductCard'

export default function Favorites({ products, onFavorite, onNavigate }) {
    const favs = products.filter((p) => p.favorite)

    return (
        <div className="space-y-5">
            <div>
                <h1 className="font-display text-3xl font-extrabold">Roti Favorit</h1>
                <p className="text-sm text-cocoa/60">{favs.length} roti yang kamu sukai</p>
            </div>

            {favs.length === 0 ? (
                <div className="rounded-3xl border-2 border-dashed border-orange-200 py-16 text-center text-cocoa/60">
                    <Heart className="mx-auto mb-2" size={40} />
                    <p className="font-bold">Belum ada favorit.</p>
                    <button onClick={() => onNavigate('menu')} className="mt-3 rounded-full bg-crust px-5 py-2.5 text-sm font-bold text-white">Jelajahi menu</button>
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                    {favs.map((p, i) => <ProductCard key={p.id} product={p} index={i} onFavorite={onFavorite} />)}
                </div>
            )}
        </div>
    )
}