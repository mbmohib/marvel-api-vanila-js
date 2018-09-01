import axios from 'axios';
import CryptoJS from 'crypto-js';
import config from './config';

export const elements = {
    homeLink: document.querySelectorAll('.js--home-link'),
    header: document.getElementById('js--header'),
    homeIntro: document.getElementById('js--home-intro'),
    detailsIntro: document.getElementById('js--details-intro'),
    heroList: document.getElementById('js--hero-list'),
    heroDetails: document.getElementById('js--hero-details'),
    eventDetails: document.getElementById('js--event-details'),
}

export const getData = async (url) => {

    // New timestamp for every request                                                                                    
    const ts = new Date().getTime();
        
    // New Hash for every request
    const hash = CryptoJS.MD5(ts + config.privateKey + config.publicKey).toString();

    const res = await axios.get(url, {
        params: {
            ts: ts,
            apikey: config.publicKey,
            hash: hash,
        }}
    )

    return res.data.data;
}

export const renderLoader = element => {
    element.innerHTML = '';
    element.innerHTML = `
        <div class="uk-flex uk-flex-center" uk-spinner="ratio: 5"></div>`;
}

export const clearLoader = ()=> {
    const loader = document.querySelector('[uk-spinner]');
    if (loader) loader.parentElement.removeChild(loader);
}

export const viewChange = view => {
    if (view === 'home') {
        elements.heroList.classList.remove('uk-hidden', 'uk-animation-reverse');
        elements.homeIntro.classList.remove('uk-hidden', 'uk-animation-reverse');
        elements.header.style.backgroundImage = 'linear-gradient(rgba(0,0,0,.4),rgba(0,0,0,.9)), url(./src/images/home-bg.jpg)';

        elements.detailsIntro.classList.add('uk-hidden', 'uk-animation-reverse');
        elements.heroDetails.classList.add('uk-hidden', 'uk-animation-reverse');

    } else if (view === 'details') {
        elements.heroList.classList.add('uk-hidden', 'uk-animation-reverse');
        elements.homeIntro.classList.add('uk-hidden', 'uk-animation-reverse');
        elements.header.style.backgroundImage = 'linear-gradient(rgba(0,0,0,.4),rgba(0,0,0,.9)), url(./src/images/details-bg.jpg)';

        elements.detailsIntro.classList.remove('uk-hidden', 'uk-animation-reverse');
        elements.heroDetails.classList.remove('uk-hidden', 'uk-animation-reverse');
    }
}