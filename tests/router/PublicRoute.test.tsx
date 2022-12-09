import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import { AuthContext } from '../../src/auth/context';
import { PublicRoute } from '../../src/router/PublicRoute';

describe('Test on <PublicRoute/>', () => {
  test('should show children if not auth', () => {
    const authContextValue = {
      authSte: {
        logged: false,
      },
    };

    render(
      <AuthContext.Provider value={authContextValue}>
        <PublicRoute>
          <h1>Public Route</h1>
        </PublicRoute>
      </AuthContext.Provider>
    );

    expect(screen.getByText('Public Route')).toBeDefined();
  });

  test('should navigate when is auth', () => {
    const authContextValue = {
      authSte: {
        logged: true,
        id: '1',
        user: 'ivan',
      },
    };

    render(
      <AuthContext.Provider value={authContextValue}>
        <MemoryRouter initialEntries={['/login']}>
          <Routes>
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <h1>Public Route</h1>
                </PublicRoute>
              }
            />

            <Route path="/marvel" element={<h1>Marvel Page</h1>} />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText('Marvel Page')).toBeDefined();
  });
});
