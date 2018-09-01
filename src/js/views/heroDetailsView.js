import { viewChange, elements } from '../base';
import Hero from '../models/Hero'

export const renderHero = async (id) => {
    viewChange('details');

    elements.heroDetailsThumbnail.setAttribute('data-src', ``);

    const hero = new Hero(id);
    const data = await hero.getHero();


    elements.heroDetailsThumbnail.setAttribute('data-src', `${data.thumbnail.path}/portrait_uncanny.${data.thumbnail.extension}`)
    elements.heroDetailsHeading.textContent = data.name;
    if (data.description) {
        elements.heroDetailsContent.classList.add('uk-dropcap');
        elements.heroDetailsContent.textContent = data.description;
    } else {
        elements.heroDetailsContent.classList.remove('uk-dropcap');
        elements.heroDetailsContent.textContent = 'Sorry, No description found yet!'
    }
}