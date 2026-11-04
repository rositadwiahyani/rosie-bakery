import { useState } from 'react'
import Navbar from './components/Navbar'
import SplashScreen from './components/SplashScreen'
import StatusBar from './components/StatusBar'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Favorites from './pages/Favorites'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Profile from './pages/Profile'
import { useProducts } from './hooks/useProducts'
import { useCart } from './hooks/useCart'
import { useOnlineStatus } from './hooks/useOnlineStatus'
import { useInstallPrompt } from './hooks/useInstallPrompt'

export default function App() {
  const [showSplash, setShowSplash] = useState(true)
  const [page, setPage] = useState('home')
  const [from, setFrom] = useState('menu') // halaman asal sebelum membuka detail
  const [productId, setProductId] = useState(null)

  const store = useProducts()
  const cart = useCart(store.products)
  const online = useOnlineStatus()
  const { canInstall, install } = useInstallPrompt()

  const navigate = (id) => {
    setPage(id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const openProduct = (id) => {
    if (page !== 'detail') setFrom(page)
    setProductId(id)
    setPage('detail')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const common = {
    onOpen: openProduct,
    onAddToCart: cart.addToCart,
    qtyOf: cart.qtyOf,
  }

  return (
    <div className="min-h-screen">
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
      <StatusBar online={online} canInstall={canInstall} onInstall={install} />
      <Navbar page={page} onNavigate={navigate} cartCount={cart.count} />

      <main className="mx-auto max-w-6xl px-4 pb-28 pt-8 md:px-6 md:pb-14">
        {page === 'home' && <Home products={store.products} onNavigate={navigate} onFavorite={store.toggleFavorite} {...common} />}
        {page === 'menu' && <Menu {...store} {...common} />}
        {page === 'favorites' && <Favorites products={store.products} onFavorite={store.toggleFavorite} onNavigate={navigate} {...common} />}
        {page === 'detail' && (
          <ProductDetail
            product={store.products.find((p) => p.id === productId)}
            products={store.products}
            onBack={() => navigate(from)}
            onFavorite={store.toggleFavorite}
            onGoCart={() => navigate('cart')}
            {...common}
          />
        )}
        {page === 'cart' && (
          <Cart
            lines={cart.lines}
            total={cart.total}
            count={cart.count}
            setQty={cart.setQty}
            removeFromCart={cart.removeFromCart}
            clearCart={cart.clearCart}
            onOpen={openProduct}
            onNavigate={navigate}
          />
        )}
        {page === 'profile' && <Profile onSeed={store.seedData} onReplaySplash={() => setShowSplash(true)} />}
      </main>
    </div>
  )
}