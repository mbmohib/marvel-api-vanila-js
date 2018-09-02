import { getData } from '../base';

export default class Event {
    constructor(url) {
        this.url = url
    }

    async getEvent() {
        const data = await getData(this.url);

        ({ 
            id: this.id,
            title: this.title,
            description: this.description, 
            thumbnail: this.thumbnail, 
            issueNumber: this.issueNumber,
            pageCount: this.pageCount,
            characters: this.characters,
        } = data.results[0]);

        return {
            id: this.id,
            title: this.title,
            description: this.description,
            thumbnail: this.thumbnail,
            characters: this.characters,
            issueNumber: this.issueNumber,
            pageCount: this.pageCount,
        }
    }
}