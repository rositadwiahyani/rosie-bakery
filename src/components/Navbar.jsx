import { Home, UtensilsCrossed, Heart, User } from 'lucide-react'

const NAV_ITEMS = [
    { id: 'home', label: 'Beranda', icon: Home },
    { id: 'menu', label: 'Menu', icon: UtensilsCrossed },
    { id: 'favorites', label: 'Favorit', icon: Heart },
    { id: 'profile', label: 'Profil', icon: User },
]

export default function Navbar({ page, onNavigate }) {
    return (
        <>
            {/* Desktop: navigasi atas */}
            <header className="sticky top-0 z-30 hidden border-b border-orange-200/70 bg-cream/90 backdrop-blur md:block">
                <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
                    <button onClick={() => onNavigate('home')} className="font-display flex items-center gap-2 text-2xl font-extrabold text-crust">
                        <span>🥐</span> Rosie Bakery
                    </button>
                    <nav className="flex gap-1">
                        {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
                            <button
                                key={id}
                                onClick={() => onNavigate(id)}
                                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition ${page === id ? 'bg-crust text-white' : 'text-cocoa/70 hover:bg-orange-100'
                                    }`}
                            >
                                <Icon size={16} /> {label}
                            </button>
                        ))}
                    </nav>
                </div>
            </header>

            {/* Mobile: navigasi bawah */}
            <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-orange-200 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden">
                <div className="grid grid-cols-4">
                    {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
                        <button
                            key={id}
                            onClick={() => onNavigate(id)}
                            className={`flex flex-col items-center gap-0.5 py-2.5 text-[11px] font-bold ${page === id ? 'text-crust' : 'text-cocoa/50'
                                }`}
                        >
                            <Icon size={22} strokeWidth={page === id ? 2.6 : 2} />
                            {label}
                        </button>
                    ))}
                </div>
            </nav>
        </>
    )
}