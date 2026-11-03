export default function ConfirmModal({ title, message, confirmLabel = 'Ya, hapus', onConfirm, onCancel }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-cocoa/50 p-4" onClick={onCancel}>
            <div onClick={(e) => e.stopPropagation()} className="rise w-full max-w-sm rounded-3xl bg-white p-6 text-center shadow-xl">
                <div className="mb-2 text-4xl">🥺</div>
                <h2 className="font-display text-xl font-extrabold">{title}</h2>
                <p className="mt-1 text-sm text-cocoa/70">{message}</p>
                <div className="mt-5 flex gap-3">
                    <button onClick={onCancel} className="flex-1 rounded-xl bg-orange-100 py-2.5 font-bold text-crust-dark">Batal</button>
                    <button onClick={onConfirm} className="flex-1 rounded-xl bg-rose-600 py-2.5 font-bold text-white hover:bg-rose-700">{confirmLabel}</button>
                </div>
            </div>
        </div>
    )
}