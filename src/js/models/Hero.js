import { getData } from '../base';
import config from '../config';

export default class Hero {
    constructor(id) {
        this.url = `${config.charactersUrl}/${id}`;
    }

    async getHero() {
        const data = await getData(this.url);

        ({ 
            id: this.id,
            name: this.name,
            description: this.description, 
            thumbnail: this.thumbnail, 
            comics: this.comics,
            resourceURI: this.url,
            series: this.series,
            stories: this.stories
        } = data.results[0]);

        return {
            id: this.id,
            name: this.name,
            description: this.description,
            thumbnail: this.thumbnail,
            comics: this.comics,
            url: this.url,
            series: this.series,
            stories: this.stories
        }
    }
}