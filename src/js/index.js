import Event from './models/Event';
import Events from './models/Events';
import Hero from './models/Hero'
import { renderHeroes } from './views/heroListView';
import { renderHeroDetails, renderEvents, renderEventsIntro } from './views/heroDetailsView';
import { renderEvent } from './views/eventView';
import { elements, renderLoader, clearLoader } from './base';
import { viewChange } from './base';
import records from './records';
import config from './config';

// Center Data Store Point
const state = {};
window.state = state;

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

const handleEvents = async (name, count, url) => {
    // Prepare UI
    renderEventsIntro(name, count);
    const container = document.getElementById(`${name.toLowerCase()}-events`);
    renderLoader(container)
    
    try {
        // Load Data
        const events = new Events(url);
        const eventsData = await events.getEvents();

        // Redner Data
        clearLoader();
        renderEvents(container, eventsData);

    } catch(err) {
        console.log(err);
    }
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


    if (data.comics.available > 0) {
        handleEvents('Comics', data.comics.available, data.comics.collectionURI);
    };

    if (data.series.available > 0) {
        handleEvents('Series', data.series.available, data.series.collectionURI);
    };

    if (data.stories.available > 0) {
        handleEvents('Stories', data.stories.available, data.stories.collectionURI);
    };

    if (data.events.available > 0) {
        handleEvents('Events', data.events.available, data.events.collectionURI);
    };
}

/**
 * 
 *  Comics/Stories/Events/Series Controller
 *  @param {*} endpoint
 */
const eventController = async endpoint => {
    // TODO: Need to Refactor
    renderLoader(elements.eventDetails);

    const event = new Event(endpoint);
    const data = await event.getEvent();

    clearLoader();
    renderEvent(data)
}

const loadMoreEvents = async element => {

    const container = document.getElementById(`${element.dataset.event.toLowerCase()}-events`);
    renderLoader(container, true);

    const event = new Events(config[element.dataset.event], 6);
    const data = await event.getEvents();

    clearLoader();
    renderEvents(container, data)
}


/**
 * All Event Listener
-----------------------------------------------*/

// Load Comics/Stories/Events/Series Details after Readmore button click
elements.heroDetails.addEventListener('click', e => {
    if (e.target.matches('.js--read-more')) {
        eventController(e.target.getAttribute('data-href'));
    } else if (e.target.matches('#comics-load-more-btn')) {
        loadMoreEvents(e.target);
    } else if (e.target.matches('#stories-load-more-btn')) {
        loadMoreEvents(e.target);
    } else if (e.target.matches('#series-load-more-btn')) {
        loadMoreEvents(e.target);
    } else if (e.target.matches('#events-load-more-btn')) {
        loadMoreEvents(e.target);
    }
});

//Load backupHeros details after hashchange;
['load', 'hashchange'].forEach( event => window.addEventListener(event, toggleView))



