import { viewChange, elements, renderLoader, clearLoader } from '../base';
import Hero from '../models/Hero'

const renderData = data => {
    const markup = `
        <div class="uk-container">
            <div class="uk-child-width-1-2@m" uk-grid>
                <div>
                    <img class="uk-align-center uk-border-rounded intro-sec__thumbnail" data-src="${data.thumbnail.path}/portrait_uncanny.${data.thumbnail.extension}" alt="${data.name}" uk-img>
                </div>
                <div>
                    <h1 class="intro-sec__heading">${data.name}</h1>
                    <p class="intro-sec__desc uk-dropcap">${data.description}</p>

                    <div class="uk-margin intro-sec__buttons">
                        <a href="" class="uk-button uk-button-default">Visit Resourse</a>
                    </div>
                </div>
            </div>
        </div>
    `;

    elements.detailsIntro.insertAdjacentHTML('afterbegin', markup);
}

const event = (arr) => {
    return arr.map( data => {
        return `
            <div>
                <div class="uk-card uk-card-default">
                    <div class="uk-card-header">
                        <div class="uk-grid-small uk-flex-middle" uk-grid>
                            <div class="uk-width-auto">
                                <span uk-icon="nut"></span>
                            </div>
                            <div class="uk-width-expand">
                                <h3 class="uk-card-title uk-margin-remove-bottom">${data.name}</h3>
                                <p class="uk-text-meta uk-margin-top">${data.type ? data.type : ''}</p>
                            </div>
                        </div>
                    </div>
                    <div class="uk-card-footer">
                        <a href="#my-id" uk-toggle data-href="${data.resourceURI}" class="uk-button uk-button-text js--read-more">Read more</a>
                    </div>
                </div>
            </div>
        `;
    }).splice(0, 6).join('');
}

const events = (name, data) => {
    const markup = `
        <div class="uk-section uk-margin events-sec">
            <div class="uk-margin">
                <h1 class="events-sec__heading uk-heading-line"><span>${name} <em>(${data.available})</em></span></h1>
            </div>

            <div class="uk-child-width-1-3@m events-sec__content" uk-grid>
                ${event(data.items)}
            </div>

            <button class="uk-button uk-button-primary uk-margin-medium-top uk-align-center">Load More</button>
        </div>
    `;

    elements.heroDetails.insertAdjacentHTML('afterbegin', markup);
}

export const renderHeroDetails = async (id) => {
    
    viewChange('details');
    renderLoader(elements.detailsIntro);
    elements.heroDetails.innerHTML = '';

    const hero = new Hero(id);
    const data = await hero.getHero();

    // Render Data to the UI
    clearLoader();
    renderData(data)

    if (data.series.available > 0) events('Series', data.series);
    if (data.stories.available > 0) events('Stories', data.stories);
    if (data.comics.available > 0) events('Comics', data.comics);
}