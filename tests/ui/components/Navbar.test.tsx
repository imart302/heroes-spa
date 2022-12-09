import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AuthContext } from '../../../src/auth/context';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { Navbar } from '../../../src/ui/components';
import { vi } from 'vitest';

vi.mock('react-router-dom', async () => {
  const mod = await vi.importActual<typeof import('react-router-dom')>(
    'react-router-dom'
  );
  return {
    ...mod,
    useNavigate: vi.fn(),
  };
});

describe('Tests on <Navbar />', () => {

  beforeEach(() => {
    vi.resetAllMocks();
  })

  test('Should show username when is Authenticated', () => {
    const authContext = {
      authSte: {
        logged: true,
        user: 'User Test',
        id: '1',
      },
    };

    render(
      <MemoryRouter>
        <AuthContext.Provider value={authContext}>
          <Navbar></Navbar>
        </AuthContext.Provider>
      </MemoryRouter>
    );

    const user = screen.getByText(authContext.authSte.user);
    expect(user).toBeDefined();
  });

  test('Should call logout and navigate when click en logout', () => {
    const authContext = {
      logout: vi.fn(),
      authSte: {
        logged: true,
        user: 'User Test',
        id: '1',
      },
    };

    const navigate = vi.fn();
    vi.mocked(useNavigate).mockImplementation(() => {
      return navigate;
    });

    render(
      <MemoryRouter>
        <AuthContext.Provider value={authContext}>
          <Navbar></Navbar>
        </AuthContext.Provider>
      </MemoryRouter>
    );

    const logout = screen.getByRole<HTMLButtonElement>('button');
    fireEvent.click(logout);

    expect(authContext.logout).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith("/login", {replace: true});
  });
});
