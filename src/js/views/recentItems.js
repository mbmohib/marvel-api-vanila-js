import { elements } from '../base';

export const recentItems = arr => {
    const markup = arr.map( hero => {
        return `
            <div>
                <a href="#${hero.id}">
                    <div class="uk-card uk-card-default uk-card-hover">
                        <div class="uk-card-media-top">
                            <img class="uk-align-center" data-src="${hero.thumbnail.path}/landscape_xlarge.${hero.thumbnail.extension}" alt="" uk-img>
                        </div>
                    </div>
                </a>
            </div>
        `;
    }).join('');

    elements.recentItems.parentElement.querySelector('h3').classList.remove('uk-hidden');
    elements.recentItems.innerHTML = markup;
}