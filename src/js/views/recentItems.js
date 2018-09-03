import { elements } from '../base';

export const recentItems = arr => {
    const heading = `<h3 class="uk-heading-line"><span>Recent Items</span></h3>`;
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

    elements.recentItems.parentElement.insertAdjacentHTML('afterbegin', heading);
    elements.recentItems.innerHTML = markup;
}