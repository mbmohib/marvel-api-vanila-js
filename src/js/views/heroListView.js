import { elements, renderLoader } from '../base';
import records from '../records';

const renderHero = hero => `
    <div>
        <a href="#${hero.id}">
            <div class="uk-card uk-card-default uk-card-hover">
                <div class="uk-card-media-top">
                    <img class="uk-align-center" data-src="${hero.thumbnail.path}/landscape_xlarge.${hero.thumbnail.extension}" alt="" uk-img>
                </div>
                <div class="uk-card-body">
                    <h3 class="uk-card-title">${hero.name}</h3>
                </div>
            </div>
        </a>
    </div>
`;

export const renderHeroes = () => {
    const markup = records.map( hero => {
        return renderHero(hero);
    }).join('');


    elements.heroList.insertAdjacentHTML('beforeend', markup);
}