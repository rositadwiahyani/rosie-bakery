import { GraduationCap, IdCard, Users, RotateCcw } from 'lucide-react'

const PROFILE = {
    nama: 'Rosita Dwi Ahyani',
    nim: '21120124120043',
    kelompok: '37',
}

export default function Profile({ onReset }) {
    const rows = [
        { icon: GraduationCap, label: 'Nama', value: PROFILE.nama },
        { icon: IdCard, label: 'NIM', value: PROFILE.nim },
        { icon: Users, label: 'Kelompok', value: PROFILE.kelompok },
    ]

    return (
        <div className="mx-auto max-w-md space-y-6">
            <section className="rise overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-orange-200/70">
                <div className="relative h-28 bg-gradient-to-br from-crust to-amber-500">
                    <span aria-hidden className="absolute right-4 top-2 text-6xl opacity-80">🍞</span>
                </div>
                <div className="-mt-12 px-6 pb-6 text-center">
                    <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-butter font-display text-4xl font-extrabold text-crust shadow">
                        RD
                    </div>
                    <h1 className="font-display mt-3 text-2xl font-extrabold">{PROFILE.nama}</h1>
                    <p className="text-sm font-semibold text-crust">Pemilik Rosie Bakery</p>

                    <dl className="mt-6 space-y-3 text-left">
                        {rows.map(({ icon: Icon, label, value }) => (
                            <div key={label} className="flex items-center gap-4 rounded-2xl bg-cream p-4">
                                <span className="rounded-xl bg-white p-2.5 text-crust shadow-sm"><Icon size={20} /></span>
                                <div>
                                    <dt className="text-xs font-bold uppercase tracking-wide text-cocoa/50">{label}</dt>
                                    <dd className="font-bold">{value}</dd>
                                </div>
                            </div>
                        ))}
                    </dl>
                </div>
            </section>

            <section className="rounded-3xl bg-white p-5 text-sm ring-1 ring-orange-200/70">
                <h2 className="font-display mb-1 text-lg font-extrabold">Tentang Aplikasi</h2>
                <p className="text-cocoa/70">Rosie Bakery adalah Progressive Web App (React + Vite) yang dapat di-install dan berjalan offline. Praktikum PPB - Modul 5 PWA.</p>
                <button
                    onClick={() => { if (confirm('Kembalikan menu ke data awal?')) onReset() }}
                    className="mt-4 flex items-center gap-2 rounded-xl bg-orange-100 px-4 py-2.5 font-bold text-crust-dark hover:bg-orange-200"
                >
                    <RotateCcw size={16} /> Reset data menu
                </button>
            </section>
        </div>
    )
}