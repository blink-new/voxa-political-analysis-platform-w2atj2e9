import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { blink } from './blink/client'
import LandingPage from './components/LandingPage'
import Dashboard from './components/Dashboard'
import Onboarding from './components/Onboarding'
import Settings from './components/Settings'
import PoliticianProfile from './components/PoliticianProfile'
import PublicProfile from './components/PublicProfile'
import { Toaster } from './components/ui/toaster'

type AppState = 'landing' | 'onboarding' | 'dashboard' | 'settings' | 'politician'

// Main App Component (Protected Routes)
function MainApp() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [appState, setAppState] = useState<AppState>('landing')
  const [selectedPoliticianId, setSelectedPoliticianId] = useState<string | null>(null)

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setLoading(state.isLoading)
      
      if (state.user && appState === 'landing') {
        // Check if user has completed onboarding
        const hasCompletedOnboarding = localStorage.getItem('voxa_onboarding_completed')
        setAppState(hasCompletedOnboarding ? 'dashboard' : 'onboarding')
      }
    })
    return unsubscribe
  }, [appState])

  const handleOnboardingComplete = () => {
    localStorage.setItem('voxa_onboarding_completed', 'true')
    setAppState('dashboard')
  }

  const handleNavigate = (page: 'settings' | 'politician', data?: any) => {
    if (page === 'politician') {
      setSelectedPoliticianId(data)
    }
    setAppState(page)
  }

  const handleBackToDashboard = () => {
    setAppState('dashboard')
    setSelectedPoliticianId(null)
  }

  if (loading) {
    return (
      <div className="min-h-screen animated-bg flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-muted-foreground">Carregando Voxa...</p>
        </div>
      </div>
    )
  }

  if (appState === 'landing') {
    return <LandingPage onStateChange={setAppState} />
  }

  if (appState === 'onboarding') {
    return <Onboarding onComplete={handleOnboardingComplete} user={user} />
  }

  if (appState === 'settings') {
    return <Settings onBack={handleBackToDashboard} />
  }

  if (appState === 'politician' && selectedPoliticianId) {
    return (
      <PoliticianProfile 
        politicianId={selectedPoliticianId}
        onBack={handleBackToDashboard}
      />
    )
  }

  return (
    <Dashboard 
      user={user} 
      onStateChange={setAppState}
      onNavigate={handleNavigate}
    />
  )
}

// App with Router
function App() {
  return (
    <Router>
      <Routes>
        {/* Public Profile Routes - No authentication required */}
        <Route path="/profile/user/:id" element={<PublicProfile type="user" />} />
        <Route path="/profile/politician/:id" element={<PublicProfile type="politician" />} />
        
        {/* Main App Routes - Authentication required */}
        <Route path="/*" element={<MainApp />} />
      </Routes>
      <Toaster />
    </Router>
  )
}

export default App