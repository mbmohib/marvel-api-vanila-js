import { elements } from '../base';

const parseHash = value => {
    const regex = /\d{5,}/;
    return value.match(regex);
}

const renderCharecter = characters => {
    return characters.map( character => {
        return `
            <tr>
                <td class="uk-table-expand">${character.name}</td>
                <td class="uk-width-small"><a class="uk-button uk-button-default js--off-canvas-close" href="#${parseHash(character.resourceURI)}">View</a></td>
            </tr>
        `;
    }).join('')
}

export const renderEvent = event => {
    const markup = `
        <button class="uk-offcanvas-close" type="button" uk-close></button>
        <div class="events-details">
            ${event.thumbnail ? `<img class="uk-align-center" data-src="${event.thumbnail.path}/portrait_medium.${event.thumbnail.extension}" alt="${event.title}" uk-img>` : ''}
            
            <h2 class="events-details__heading uk-heading-bullet">${event.title}</h2>

            <p class="events-details__description">${event.description ? event.description : ''}</p>

            <h4 class="uk-heading-line uk-text-center"><span>Specification</span></h4>

            <div class="uk-margin">
                <p>Issue: ${event.issue}</p>
                <p>Total Page: ${event.page}</p>
            </div>

            <h4 class="uk-heading-line uk-text-center"><span>Charecters <em>(${event.characters.available})</em></span></h4>

            <table class="uk-table uk-table-hover uk-table-divider uk-table-middle">
                <tbody>
                    ${renderCharecter(event.characters.items)}
                </tbody>
            </table>
        </div>
    `;

    elements.eventDetails.insertAdjacentHTML('beforeend', markup);
}