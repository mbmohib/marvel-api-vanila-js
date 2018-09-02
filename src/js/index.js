import Event from './models/Events';
import Hero from './models/Hero'
import { renderHeroes } from './views/heroListView';
import { renderHeroDetails, renderEvents } from './views/heroDetailsView';
import { renderEvent } from './views/eventView';
import { elements, renderLoader, clearLoader } from './base';
import { viewChange } from './base';
import records from './records';

// Center Data Store Point
const state = {};
window.state = state;
console.log(state);

/**
 * Hangle View based on Hash value
 *
 */
function toggleView() {
    const hashValue = window.location.hash.replace('#', '');

    if (!state.backupHeros) {
        state.backupHeros = records;
        renderHeroes(state.backupHeros);
    }

    if(hashValue === 'home' || hashValue === '') {
        // Render Hero List
        viewChange('home');

    } else if (parseInt(hashValue) !== NaN) {
        // Render Hero Details
        viewChange('details');
        heroDetailsController(parseInt(hashValue));
    } 

    // TODO: Catch error for other hash value
}


const heroDetailsController = async (id) => {
    let data;

    // Prepare UI
    renderLoader(elements.detailsIntro);
    elements.heroDetails.innerHTML = '';

    // Create visited heros array if NOT created before
    if (!state.visitedHeros) state.visitedHeros = [];

    const foundHero = state.visitedHeros.find( hero => hero.id === id)

    if (foundHero) {
        // Show hero from state if visited before
        data = foundHero;
    } else {
        // Store Hero if not req before
        try {
            const hero = new Hero(id);
            data = await hero.getHero();
            state.visitedHeros.push(data);
        } catch(err) {
            console.log(err);
        }
    }


    // Render Data to the UI
    clearLoader();
    renderHeroDetails(data)

    if (data.series.available > 0) renderEvents('Series', data.series);
    if (data.events.available > 0) renderEvents('Events', data.events);
    if (data.stories.available > 0) renderEvents('Stories', data.stories);
    if (data.comics.available > 0) renderEvents('Comics', data.comics);
}

/**
 * 
 *  Comics/Stories/Events/Series Controller
 * @param {*} endpoint
 */
const eventController = async endpoint => {
    renderLoader(elements.eventDetails);


    const event = new Event(endpoint);
    const data = await event.getEvent();

    clearLoader();
    renderEvent(data)
}


/**
 * All Event Listener
-----------------------------------------------*/

// Load Comics/Stories/Events/Series Details after Readmore button click
elements.heroDetails.addEventListener('click', e => {
    if (e.target.matches('.js--read-more')) {
        eventController(e.target.getAttribute('data-href'));
    }
});

//Load backupHeros details after hashchange;
['load', 'hashchange'].forEach( event => window.addEventListener(event, toggleView))



