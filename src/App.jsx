import { useState } from 'react'
import Navbar from './components/Navbar'
import StatusBar from './components/StatusBar'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Favorites from './pages/Favorites'
import Profile from './pages/Profile'
import { useProducts } from './hooks/useProducts'
import { useOnlineStatus } from './hooks/useOnlineStatus'
import { useInstallPrompt } from './hooks/useInstallPrompt'

export default function App() {
  const [page, setPage] = useState('home')
  const store = useProducts()
  const online = useOnlineStatus()
  const { canInstall, install } = useInstallPrompt()

  const navigate = (id) => {
    setPage(id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen">
      <StatusBar online={online} canInstall={canInstall} onInstall={install} />
      <Navbar page={page} onNavigate={navigate} />

      <main className="mx-auto max-w-5xl px-4 pb-28 pt-6 md:px-6 md:pb-12">
        {store.loading && page !== 'profile' ? (
          <div className="flex flex-col items-center justify-center py-20 text-cocoa/60">
            <div className="mb-3 h-10 w-10 animate-spin rounded-full border-4 border-orange-200 border-t-crust"></div>
            <p className="font-bold">Memuat data dari server...</p>
          </div>
        ) : (
          <>
            {page === 'home' && <Home products={store.products} onNavigate={navigate} onFavorite={store.toggleFavorite} />}
            {page === 'menu' && <Menu {...store} />}
            {page === 'favorites' && <Favorites products={store.products} onFavorite={store.toggleFavorite} onNavigate={navigate} />}
            {page === 'profile' && <Profile onReset={store.resetProducts} />}
          </>
        )}
      </main>
    </div>
  )
}
