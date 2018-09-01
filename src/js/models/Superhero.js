import { getData, characterIds } from '../base';
import config from '../config';

export default class Superhero {
    constructor(id) {
        this.url = `${config.charactersUrl}/${id}`;
    }

    async getSuperhero() {
        const data = await getData(this.url);
        console.log(data);

        ({ 
            id: this.id,
            name: this.name,
            description: this.description, 
            thumbnail: this.thumbnail, 
            comics: this.comics
        } = data.results[0]);

        return {
            id: this.id,
            name: this.name,
            description: this.description,
            thumbnail: this.thumbnail,
            comics: this.comics
        }
    }
}