import React, { useMemo } from 'react';
import { getHeroesByPublisher } from '../helpers/getHeroesByPublisher';
import { HeroCard } from './HeroCard';
import { HeroItem } from './HeroItem';

export const HeroList = ({
  publisher,
}: {
  publisher: 'Marvel Comics' | 'DC Comics';
}) => {
  
  const heroes = useMemo(() => {
    return getHeroesByPublisher(publisher);
  }, [publisher]);

  return (
    <div className="row rows-cols-1 row-cols-md-3 g-3">
      {heroes.map((hero) => (
        <HeroCard key={hero.id} hero={hero} />
      ))}
    </div>
  );
};
