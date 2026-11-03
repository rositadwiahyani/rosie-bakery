import { ArrowRight, Flame, Wheat, Clock } from 'lucide-react'
import ProductCard from '../components/ProductCard'

export default function Home({ products, onNavigate, onFavorite }) {
    const featured = products.slice(0, 4)
    const totalStock = products.reduce((s, p) => s + p.stock, 0)

    return (
        <div className="space-y-10">
            <section className="rise relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-crust to-amber-600 p-7 text-white sm:p-12">
                <div className="relative z-10 max-w-md">
                    <p className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-bold"><Flame size={14} /> Baru keluar oven</p>
                    <h1 className="font-display text-4xl font-extrabold leading-tight sm:text-5xl">Hangat, harum, dan dibuat dengan cinta.</h1>
                    <p className="mt-3 text-white/90">Selamat datang di Rosie Bakery. Dari croissant berlapis sampai donat cokelat - semua dipanggang segar setiap pagi.</p>
                    <button onClick={() => onNavigate('menu')} className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-bold text-crust shadow-lg transition hover:scale-105">
                        Lihat Menu <ArrowRight size={18} />
                    </button>
                </div>
                <span aria-hidden className="absolute -right-4 -top-2 select-none text-[9rem] opacity-90 sm:right-8 sm:text-[12rem]">🥐</span>
            </section>

            <section className="grid grid-cols-3 gap-3">
                {[
                    { icon: Wheat, label: 'Varian roti', value: products.length },
                    { icon: Flame, label: 'Total stok', value: totalStock },
                    { icon: Clock, label: 'Buka setiap hari', value: '07.00' },
                ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="rounded-2xl border border-orange-200/70 bg-white p-4 text-center">
                        <Icon className="mx-auto mb-1 text-crust" size={22} />
                        <div className="font-display text-2xl font-extrabold">{value}</div>
                        <div className="text-xs font-semibold text-cocoa/60">{label}</div>
                    </div>
                ))}
            </section>

            <section>
                <div className="mb-4 flex items-end justify-between">
                    <h2 className="font-display text-2xl font-extrabold">Pilihan Hari Ini</h2>
                    <button onClick={() => onNavigate('menu')} className="text-sm font-bold text-crust">Semua menu →</button>
                </div>
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                    {featured.map((p, i) => (
                        <ProductCard key={p.id} product={p} index={i} onFavorite={onFavorite} />
                    ))}
                </div>
            </section>
        </div>
    )
}