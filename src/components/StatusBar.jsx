import { WifiOff, Download } from 'lucide-react'

// Banner status offline + tombol install PWA
export default function StatusBar({ online, canInstall, onInstall }) {
    return (
        <>
            {!online && (
                <div className="flex items-center justify-center gap-2 bg-ink px-4 py-2 text-sm text-paper">
                    <WifiOff size={15} /> Kamu sedang offline. Menu tetap bisa dilihat, tapi checkout butuh internet.
                </div>
            )}
            {canInstall && (
                <div className="flex items-center justify-between gap-3 border-b border-line bg-flour px-4 py-2 text-sm">
                    <span>Pasang Rosie Bakery di perangkatmu supaya bisa dibuka seperti aplikasi biasa.</span>
                    <button onClick={onInstall} className="btn btn-primary !px-3 !py-1.5 text-sm">
                        <Download size={14} /> Install
                    </button>
                </div>
            )}
        </>
    )
}