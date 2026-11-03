// Data awal (dipakai saat localStorage masih kosong)
export const CATEGORIES = ['Roti Manis', 'Roti Tawar', 'Pastry', 'Kue', 'Minuman']

export const EMOJI_OPTIONS = ['🥐', '🍞', '🥖', '🥯', '🧁', '🍰', '🍩', '🍪', '🥨', '☕']

export const seedProducts = [
    { id: 'p1', name: 'Croissant Butter', category: 'Pastry', price: 18000, stock: 24, emoji: '🥐', description: 'Berlapis renyah dengan butter Prancis yang harum.', favorite: true },
    { id: 'p2', name: 'Roti Tawar Gandum', category: 'Roti Tawar', price: 25000, stock: 12, emoji: '🍞', description: 'Sehat, lembut, dan cocok untuk sarapan.', favorite: false },
    { id: 'p3', name: 'Baguette Klasik', category: 'Roti Tawar', price: 22000, stock: 9, emoji: '🥖', description: 'Kulit garing, dalam empuk. Dipanggang tiap pagi.', favorite: false },
    { id: 'p4', name: 'Donat Cokelat', category: 'Roti Manis', price: 8000, stock: 40, emoji: '🍩', description: 'Donat kentang dengan glaze cokelat tebal.', favorite: true },
    { id: 'p5', name: 'Cupcake Vanilla', category: 'Kue', price: 15000, stock: 18, emoji: '🧁', description: 'Cupcake lembut dengan buttercream vanilla.', favorite: false },
    { id: 'p6', name: 'Cheesecake Slice', category: 'Kue', price: 32000, stock: 3, emoji: '🍰', description: 'Cheesecake creamy dengan dasar biskuit.', favorite: true },
    { id: 'p7', name: 'Cookies Choco Chip', category: 'Kue', price: 12000, stock: 30, emoji: '🍪', description: 'Renyah di tepi, chewy di tengah.', favorite: false },
    { id: 'p8', name: 'Latte Hangat', category: 'Minuman', price: 24000, stock: 50, emoji: '☕', description: 'Espresso dan susu steamed, teman roti terbaik.', favorite: false },
]