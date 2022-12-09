import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { vi } from 'vitest';
import React from 'react';
import { Search } from '../../../src/heroes/pages';
import { HeroCard } from '../../../src/heroes/components/HeroCard';
import { IHero } from '../../../src/heroes/models/hero';
import { getHeroesByName } from '../../../src/heroes/helpers/getHeroesByName';

vi.mock('react-router-dom', async () => {
  const mod = await vi.importActual<typeof import('react-router-dom')>(
    'react-router-dom'
  );
  return {
    ...mod,
    useNavigate: vi.fn(),
  };
});

vi.mock('../../../src/heroes/helpers/getHeroesByName', () => {
  return {
    getHeroesByName: vi.fn(),
  };
});

vi.mock('../../../src/heroes/components/HeroCard', () => {
  return {
    HeroCard: vi.fn(),
  };
});

describe('Test on <Search />', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  test('Should show correct with default values', () => {
    const { container } = render(
      <MemoryRouter>
        <Search />
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
  });

  test('Should show Batman with the query', () => {
    vi.mocked(HeroCard).mockImplementation(({ hero }: { hero: IHero }) => {
      return <h1 data-testid="hero-test-id">{hero.superhero}</h1>;
    });

    const heroes = [
      {
        alter_ego: 'batman',
        characters: 'bruce',
        first_appearance: '1234',
        id: 'dc-batman',
        publisher: 'DC Comics',
        superhero: 'Batman Test',
      },
    ];

    vi.mocked(getHeroesByName).mockReturnValue(heroes);

    render(
      <MemoryRouter initialEntries={['/search?q=batman']}>
        <Search />
      </MemoryRouter>
    );

    const batmanEl = screen.getByText(heroes[0].superhero);
    expect(batmanEl).toBeDefined();
  });

  test('Should not display (none) info and alert not found hero when search', () => {
    vi.mocked(HeroCard).mockImplementation(({ hero }: { hero: IHero }) => {
      return <h1 data-testid="hero-test-id">{hero.superhero}</h1>;
    });

    const heroes = [
      {
        alter_ego: 'batman',
        characters: 'bruce',
        first_appearance: '1234',
        id: 'dc-batman',
        publisher: 'DC Comics',
        superhero: 'Batman Test',
      },
    ];

    vi.mocked(getHeroesByName).mockReturnValue(heroes);

    render(
      <MemoryRouter initialEntries={['/search?q=batman']}>
        <Search />
      </MemoryRouter>
    );

    const infoSearch = screen.getByLabelText('info-search-hero');
    const alertNotFound = screen.getByLabelText('alert-hero-notfound');

    expect(infoSearch.style.display).toBe('none');
    expect(alertNotFound.style.display).toBe('none');
  });

  test('Should display alert when no hero found', () => {
    vi.mocked(HeroCard).mockImplementation(({ hero }: { hero: IHero }) => {
      return <h1 data-testid="hero-test-id">{hero.superhero}</h1>;
    });

    const heroes = [];

    vi.mocked(getHeroesByName).mockReturnValue(heroes);

    render(
      <MemoryRouter initialEntries={['/search?q=batman']}>
        <Search />
      </MemoryRouter>
    );

    const alertNotFound = screen.getByLabelText('alert-hero-notfound');

    expect(alertNotFound.style.display).toBe(''); 
  });

  test('Should navigate with the query when submit form', () => {
    const navigate = vi.fn();
    vi.mocked(useNavigate).mockReturnValue(navigate);

    render(
      <MemoryRouter>
        <Search />
      </MemoryRouter>
    );

    const searchText = 'Batman';
    const input = screen.getByRole<HTMLInputElement>('textbox');
    fireEvent.change(input, { target: { value: searchText } });
    const form = screen.getByRole<HTMLFormElement>('form');

    fireEvent.submit(form);

    expect(navigate).toBeCalledWith(`?q=${searchText}`);
  });

});
