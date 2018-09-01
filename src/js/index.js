import Superhero from './models/Superhero';
import { renderHeroes } from './controller/heroController';

//Load Heros after loading;
window.addEventListener('load', renderHeroes);


const testHero = async (id) => {
    const hero = new Superhero(id);

    const heroDetails = await hero.getSuperhero()
    console.log(heroDetails);
}

// testHero('1010338')


