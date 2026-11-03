import { WifiOff, Download } from 'lucide-react'

// Banner status offline + tombol install PWA
export default function StatusBar({ online, canInstall, onInstall }) {
    return (
        <>
            {!online && (
                <div className="flex items-center justify-center gap-2 bg-cocoa px-4 py-2 text-sm font-bold text-butter">
                    <WifiOff size={16} /> Kamu sedang offline - data tetap tersimpan di perangkat.
                </div>
            )}
            {canInstall && (
                <div className="flex items-center justify-between gap-3 bg-butter px-4 py-2 text-sm font-bold text-cocoa">
                    <span>Pasang Rosie Bakery di perangkatmu 🥐</span>
                    <button onClick={onInstall} className="flex items-center gap-1.5 rounded-full bg-crust px-3 py-1.5 text-white">
                        <Download size={14} /> Install
                    </button>
                </div>
            )}
        </>
    )
}