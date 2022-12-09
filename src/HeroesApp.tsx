import React from 'react'
import { AuthProvider } from './auth/context'
import { AppRouter } from './router/AppRouter'
import { Navbar } from './ui/components'

export const HeroesApp = () => {
  return (
    
    <AuthProvider>
      <AppRouter />
    </AuthProvider>

  )
}
