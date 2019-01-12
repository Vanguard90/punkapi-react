import { Observable } from 'rxjs';
// RxJS is a very powerful library that I use frequently.

const punkApiBaseUrl = 'https://api.punkapi.com/v2/beers';
// Tying the common parts of url's is useful if there are api changes in the future

// On the same vein, I also keep the API calls in one place to keep them organized and close to each other.
const punkApiService = {
    getRandomBeer() {
        return Observable.create(observer => {
            fetch(`${punkApiBaseUrl}/random`)
                .then(response => response.json())
                .then(jsonResponse => observer.next(jsonResponse[0]));
        }, err => {
            console.error(`getRandomBeer API request error! Err: ${err}`);
        });
    },
};

export { punkApiService as default };
