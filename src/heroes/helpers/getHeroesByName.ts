import { heroes } from "../data/heroes"


export const getHeroesByName = (name: string) => {
  
  const cName = name.toLowerCase().trim();

  return heroes.filter( hero => {
    return hero.superhero.toLowerCase().includes(cName);
  });
}