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
        {page === 'home' && <Home products={store.products} onNavigate={navigate} onFavorite={store.toggleFavorite} />}
        {page === 'menu' && <Menu {...store} />}
        {page === 'favorites' && <Favorites products={store.products} onFavorite={store.toggleFavorite} onNavigate={navigate} />}
        {page === 'profile' && <Profile onReset={store.resetProducts} />}
      </main>
    </div>
  )
}