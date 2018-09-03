import { getData } from '../base';

export default class Events {
    constructor(url, offset) {
        this.url = url;
        this.offset = offset;
        this.limit = 6;
    }

    async getEvents() {
        const data = await getData(this.url, this.offset, this.limit);
        return data.results;
    }
}