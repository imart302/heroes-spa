import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../src/auth/context';
import { AppRouter } from '../../src/router/AppRouter';
import { LoginPage } from '../../src/auth/pages/LoginPage';
import { MarvelPage } from '../../src/heroes/pages/MarvelPage';
import { vi } from 'vitest';

vi.mock('../../src/auth/pages/LoginPage', () => {
  return {
    LoginPage: () => {
      return <h1 data-testid="login-test-id">Login Page</h1>;
    },
  };
});

vi.mock('../../src/heroes/pages/MarvelPage', () => {
  return {
    MarvelPage: () => {
      return <h1 data-testid="marvel-test-id">Marvel Page Mock</h1>
    }
  }
});

describe('Test on <AppRouter/>', () => {
  test('Should show login when is not authenticated', () => {
    const authContext = {
      authSte: {
        logged: false,
      },
    };

    render(
      <MemoryRouter initialEntries={['/marvel']}>
        <AuthContext.Provider value={authContext}>
          <AppRouter />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    const login = screen.getByTestId('login-test-id');
    expect(login).toBeDefined();
  });

  test('Should show marvel (or other page) component if authenticated', () => {
    const authContext = {
      authSte: {
        logged: true,
        id: '1',
        user: 'ivan',
      },
    };

    render(
      <MemoryRouter initialEntries={['/marvel']}>
        <AuthContext.Provider value={authContext}>
          <AppRouter />
        </AuthContext.Provider>
      </MemoryRouter>
    );
    
    const login = screen.getByTestId('marvel-test-id');
    expect(login).toBeDefined();
  });
});
