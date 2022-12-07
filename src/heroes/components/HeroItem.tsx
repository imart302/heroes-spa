import React from 'react';
import { IHero } from '../models/hero';

export const HeroItem = ({ hero }: { hero: IHero }) => {
  return (

    <li>
      <h6>{hero.superhero}</h6>
    </li>

  );
};
