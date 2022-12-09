import React, { FormEvent, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import { useForm } from '../../hooks/useForm';
import { HeroCard } from '../components/HeroCard';
import { getHeroesByName } from '../helpers/getHeroesByName';

export const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { q = '' } = queryString.parse(location.search);
  
  const heroes = useMemo(() => {
    if (q == '') return [];

    return getHeroesByName(q as string);
  }, [q]);

  const { formFields, onInputChange } = useForm({
    fields: [
      {
        name: 'searchText',
        value: q as string,
      },
    ],
  });

  const onFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const searchText = formFields.find((field) => field.name == 'searchText');
    if (searchText && searchText.value.length <= 1) {
      return;
    }

    navigate(`?q=${searchText?.value}`);
  };

  return (
    <>
      <h1>Search</h1>
      <hr />

      <div className="row">
        <div className="col-5">
          <h4>Seaching</h4>
          <hr></hr>

          <form onSubmit={onFormSubmit} aria-label="form">
            <input
              type="text"
              placeholder="Search a hero"
              className="form-control"
              name="searchText"
              autoComplete="off"
              onChange={onInputChange}
            ></input>
            <button className="btn btn-outline-primary mt-1" type="submit">
              Search
            </button>
          </form>
        </div>

        <div className="col-7">
          <h4>Results</h4>
          <hr></hr>

          <div
            aria-label="info-search-hero"
            className="alert alert-primary"
            style={{ display: q != '' ? 'none' : '' }}
          >
            Search a hero
          </div>
          <div
            aria-label="alert-hero-notfound"
            className="alert alert-danger"
            style={{
              display:
                heroes.length == 0 && (q as string).length > 0 ? '' : 'none',
            }}
          >
            No hero found
          </div>

          {heroes.map((hero) => (
            <HeroCard key={hero.id} hero={hero} />
          ))}
        </div>
      </div>
    </>
  );
};
