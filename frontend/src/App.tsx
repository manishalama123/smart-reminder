import { useEffect, useState } from 'react'
import './App.css'
import { Button } from './components/ui/button'
import { BrowserRouter as Router, Routes, Route, Navigate, BrowserRouter } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import NotFound from './pages/NotFound'
import { useAuthStore } from './stores/authStore'

// Protected Route component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuthStore();

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <p>Loading...</p>
      </div>
    );
  }
  return isAuthenticated ? <>{children}</> : <Navigate to='/login' />
}

// Public Route ( redirect to dashboard if already logged in)
function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuthStore();

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <p>Loading...</p>
      </div>
    );

  }
  return isAuthenticated ? <Navigate to='/dashboard' /> : <>{children}</>
}
function App() {
  const initAuth = useAuthStore((state) => state.initAuth);

  useEffect(() => {
    initAuth();
  }, [initAuth])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/dashboard' />} />
        <Route path='/login' element={<PublicRoute><Login /></PublicRoute>} />
        <Route path='/register' element={<PublicRoute><Register /></PublicRoute>} />
        <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
