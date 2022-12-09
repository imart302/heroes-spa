import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import { AuthContext } from '../../src/auth/context';
import { PrivateRoute } from '../../src/router/PrivateRoute';
import { vi } from 'vitest';

describe('Test on <PrivateRoute/>', () => {
  test('should show children when is auth', () => {
    const setItem = vi.fn();
    Storage.prototype.setItem = setItem;
    const authContextValue = {
      authSte: {
        logged: true,
        id: '1',
        user: 'ivan',
      },
    };

    render(
      <AuthContext.Provider value={authContextValue}>
        <MemoryRouter initialEntries={['/priv?q=query']}>
          <Routes>
            <Route
              path="/priv"
              element={
                <PrivateRoute>
                  <h1 data-testid="private-el-id">Private Route</h1>
                </PrivateRoute>
              }
            />

            <Route path="/login" element={<h1>Login Page</h1>} />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByTestId('private-el-id')).toBeDefined();
    expect(setItem).toHaveBeenCalledWith("lastPath", '/priv?q=query');

  });

});
