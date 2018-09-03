import { addHttps, elements } from '../base';
import moment from 'moment';

const truncateString = string => {
    // TODO: Improve string truncate algo
    if (string.length > 100) {
        return string.split('').splice(0, 100).join('') + '....';
    }

    return string;
}

export const renderEvents = (parent, arr) => {
    const markup = arr.map( item => {
        return `
            <div>
                <div class="uk-card uk-card-default">
                    <div class="uk-card-header">
                        <div class="uk-grid-small uk-flex-middle" uk-grid>
                            <div class="uk-width-auto">
                                <img data-src="${item.thumbnail ? addHttps(item.thumbnail.path) : ''}/portrait_small.${item.thumbnail ? item.thumbnail.extension : ''}" uk-img>
                            </div>
                            <div class="uk-width-expand">
                                <h3 class="uk-card-title uk-margin-remove-bottom">${item.title}</h3>
                                <p class="uk-text-meta uk-margin-remove-top"><time datetime="">${item.dates ? moment(item.dates[0].date).format("Do MMM, YYYY") : ''}</time></p>
                            </div>
                        </div>
                    </div>
                    <div class="uk-card-body">
                        <p>${item.description ? truncateString(item.description ): 'Sorry, description is not available at this moment.'}</p>
                    </div>
                    <div class="uk-card-footer">
                    <a href="#my-id" uk-toggle data-href="${item.resourceURI}" class="uk-button uk-button-text js--read-more">Read more</a>
                    </div>
                </div>
            </div>
        `;
    }).splice(0, 6).join('');

    parent.insertAdjacentHTML('beforeend', markup);
}

export const renderEventsIntro = (name, total) => {
    const markup = `
        <div class="uk-section uk-margin events-sec">
            <div class="uk-margin">
                <h1 class="events-sec__heading uk-heading-line"><span>${name} <em>(${total})</em></span></h1>
            </div>

            <div id="${name.toLowerCase()}-events" class="uk-child-width-1-3@m events-sec__content" uk-grid uk-height-match="target: > div > .uk-card">

            </div>

            <button data-event="${name.toLowerCase()}" id="${name.toLowerCase()}-load-more-btn" class="uk-button uk-button-primary uk-margin-medium-top uk-align-center">Load More</button>
        </div>
    `;

    elements.heroDetails.insertAdjacentHTML('beforeend', markup);
}

export const renderHeroDetails = data => {
    const markup = `
        <div class="uk-container">
            <div class="uk-child-width-1-2@m" uk-grid>
                <div>
                    <img class="uk-align-center uk-border-rounded intro-sec__thumbnail" data-src="${addHttps(data.thumbnail.path)}/portrait_uncanny.${data.thumbnail.extension}" alt="${data.name}" uk-img>
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