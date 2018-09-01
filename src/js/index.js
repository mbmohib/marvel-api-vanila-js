import Event from './models/Events';
import { renderHeroes } from './views/heroListView';
import { renderHeroDetails } from './views/heroDetailsView';
import { renderEvent } from './views/eventView';
import { elements, renderLoader, clearLoader } from './base';
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
        renderHeroDetails(hashValue);
        viewChange('details');
    }
}

//Load Heros details after hashchange;
['load', 'hashchange'].forEach( event => window.addEventListener(event, toggleView))

const eventController = async endpoint => {
    renderLoader(elements.eventDetails);


    const event = new Event(endpoint);
    const data = await event.getEvent();

    clearLoader();
    renderEvent(data)
}

elements.heroDetails.addEventListener('click', e => {
    if (e.target.matches('.js--read-more')) {
        eventController(e.target.getAttribute('data-href'));
    }
})


const testHero = async (id) => {
    const hero = new Superhero(id);

    const heroDetails = await hero.getSuperhero()
    console.log(heroDetails);
}

// testHero('1010338')


