import { heroes } from "../data/heroes";


export const getHeroesByPublisher = (publisher: 'Marvel Comics' | 'DC Comics') => {

  return heroes.filter(hero => hero.publisher == publisher);

}