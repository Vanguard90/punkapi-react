import { Observable } from 'rxjs';

const punkApiBaseUrl = 'https://api.punkapi.com/v2/beers';

// Keep the API calls in one place to keep them organized and close to each other.
const punkApiService = {
    getRandomBeer() {
        return Observable.create(observer => {
            fetch(`${punkApiBaseUrl}/random`)
                .then(response => response.json())
                .then(jsonResponse => observer.next(jsonResponse[0]));
                // What's returned is the object within the array!
        }, err => {
            console.error(`getRandomBeer API request error! Err: ${err}`);
        });
    },
};

export { punkApiService as default };
