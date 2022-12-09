import React from 'react';
import { Navbar } from '../../ui/components';
import { Routes, Route, Navigate } from 'react-router-dom';
import { DCPage, Hero, MarvelPage, Search } from '../pages';

export const HeroesRoutes = () => {
  return (
    <>
      <Navbar />

      <div className='container'>
        <Routes>
          <Route path='/marvel' element={<MarvelPage></MarvelPage>} />
          <Route path='/dc' element={<DCPage></DCPage>} />
          
          <Route path='/search' element={<Search />} />
          <Route path='/hero/:id' element={<Hero />} />

          <Route path='/*' element={<Navigate to='/marvel' />} />

        </Routes>
      </div>

    </>
  );
};
