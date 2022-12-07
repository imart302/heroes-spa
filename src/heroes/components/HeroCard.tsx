import React from 'react';
import { Link } from 'react-router-dom';
import { IHero } from '../models/hero';

export const HeroCard = ({ hero }: { hero: IHero }) => {
  const heroImageUrl = `/assets/heroes/${hero.id}.jpg`;

  return (
    <div className="col animate__animated animate__fadeIn">
      <div className="card">
        <div className="row no-gutters">
          <div className="col-4">
            <img
              src={heroImageUrl}
              className="card-img"
              alt={hero.superhero}
            ></img>
          </div>
          <div className="col-8">
            <div className="card-body">
              <h5 className="card-title">{hero.superhero}</h5>
              <p className="card-text">{hero.alter_ego}</p>
              {hero.alter_ego !== hero.characters && <p>{hero.characters}</p>}

              <p className="card-text">
                <small className="text-muted">{hero.first_appearance}</small>
              </p>

              <Link to={`/hero/${hero.id}`}>mas...</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
