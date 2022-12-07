import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom';
import { LoginPage } from '../auth/pages';
import { DCPage, MarvelPage } from '../heroes/pages';
import { HeroesRoutes } from '../heroes/routes/HeroesRoutes';
import { Navbar } from '../ui/components';

export const AppRouter = () => {
  return (
    <>
      <Routes>

        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/*' element={ <HeroesRoutes /> } />
      </Routes> 
    </>
  )
}
