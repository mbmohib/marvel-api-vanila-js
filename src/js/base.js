import axios from 'axios';
import CryptoJS from 'crypto-js';
import config from './config';

export const elements = {
    searchInput: document.getElementById('js--search-field'),
    submitSearch: document.getElementById('js--search-submit'),
    heroList: document.getElementById('js--hero-list'),
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

export const renderLoader = parent => {
    const loader = `
        <div class="loader">
            <svg>
                <use href="./src/images/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;

    parent.insertAdjacentHTML('afterbegin', loader);
}

export const clearLoader = ()=> {
    const loader = document.querySelector('.loader');
    if (loader) loader.parentElement.removeChild(loader);
}