import Superhero from './models/Hero';
import { renderHeroes } from './views/heroListView';
import { renderHero } from './views/heroDetailsView';
import { elements } from './base';
import { viewChange } from './base';
let flag = true;

function toggleView() {
    const hashValue = window.location.hash.replace('#', '');

    if(hashValue === 'home' || hashValue === '') {
        // Render Hero List
        viewChange('home');
        if (flag) {
            renderHeroes();
            flag = false;
        }
    } else {
        // Render Hero Details
        renderHero(hashValue);
        viewChange('details');
    }
}

//Load Heros details after hashchange;
['load', 'hashchange'].forEach( event => window.addEventListener(event, toggleView))


const testHero = async (id) => {
    const hero = new Superhero(id);

    const heroDetails = await hero.getSuperhero()
    console.log(heroDetails);
}

// testHero('1010338')


