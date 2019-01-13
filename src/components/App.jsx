import React from 'react';
import { Button } from 'reactstrap';
import punkApiService from '../service/punkapi-service';
import BeerList from './BeerList';
import BeerListFavourite from './BeerListFavourite';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      allBeers: [],
      favouriteBeers: [],
    };
    this.getRandomBeerFn = this.getRandomBeerFn.bind(this);
    this.addFavouriteBeer = this.addFavouriteBeer.bind(this);
    this.removeFavouriteBeer = this.removeFavouriteBeer.bind(this);
    this.isBeerInArray = this.isBeerInArray.bind(this);
    this.updateLocalStorage = this.updateLocalStorage.bind(this);
  }

  componentDidMount() {

    // Make surer we have a space in localStorage to persist favourites
    if (localStorage.getItem('favouriteBeers') == null) {
      localStorage.setItem('favouriteBeers', JSON.stringify({}));
    } else {
      // If there is a 'favouriteBeers' key on the localStorage,
      // We can just get out initial favourites from there
      this.setState(() => ({ favouriteBeers: JSON.parse(localStorage.getItem('favouriteBeers')) }));
    }

  }

  getRandomBeerFn() {
    punkApiService.getRandomBeer().subscribe(randomBeer => {
      if (this.state.allBeers.length < 10 && !this.isBeerInArray(randomBeer, this.state.allBeers)
        && !this.isBeerInArray(randomBeer, this.state.favouriteBeers)) {
        this.setState(prevState => ({ allBeers: [...prevState.allBeers, randomBeer] }));
      }
      if (this.state.allBeers.length < 10) {
        this.getRandomBeerFn();
      }
      // This whole structure above is to make sure you don't get more than 10 beers
      // at the beers list and there are no duplicate beers
    }, err => {
      console.error(`Error when gettting a random beer! Err: ${err}`);
    });
  }

  isBeerInArray(beerToCheck, arrayToCheck) {
    let result = false;
    arrayToCheck.forEach( // Performance can be improved with a for loop here
      singleBeerInState => {
        if (beerToCheck.id === singleBeerInState.id) {
          result = true;
        }
      },
    );
    return result;
  }

  removeFavouriteBeer = (singleFavouriteBeer) => {

    let beerToRemoveId;
    for (let i = 0; i < this.state.favouriteBeers.length; i++) {
      if (this.state.favouriteBeers[i].id === singleFavouriteBeer.id) {
        beerToRemoveId = i;
        const newState = this.state.favouriteBeers;
        newState.splice(beerToRemoveId, 1);
        this.setState(() => ({ favouriteBeers: newState }), this.updateLocalStorage(newState));
        break; // We no longer need to finish the loop since we have what we want
      }
    }
  }

  addFavouriteBeer = (singleBeer) => {

    if (!this.isBeerInArray(singleBeer, this.state.favouriteBeers)) {
      // The beer we're looking at is not in the favourites array
      let beerToRemoveId;
      for (let i = 0; i < this.state.allBeers.length; i++) {
        if (this.state.allBeers[i].id === singleBeer.id) {
          beerToRemoveId = i;
          const newState = this.state.allBeers;
          newState.splice(beerToRemoveId, 1);
          this.setState(() => ({ allBeers: newState }));
          break; // We no longer need to finish the loop since we have what we want
        }
      }
      this.setState(prevState => ({ favouriteBeers: [...prevState.favouriteBeers, singleBeer] }), this.updateLocalStorage([...this.state.favouriteBeers, singleBeer]));
    }

  }

  updateLocalStorage(updatedState) {
    // Change local storage state for favourites
    localStorage.setItem('favouriteBeers', JSON.stringify(updatedState));
  }

  render() {
    const addFavouriteBeer = this.addFavouriteBeer;
    const removeFavouriteBeer = this.removeFavouriteBeer;
    return (
      <main className="col">
        <div className="col-sm-12">
          <div className="text-center">
            <h1>PunkAPI Beer Service</h1>
            <Button type="button" color="primary" onClick={this.getRandomBeerFn}> BEER ME! </Button>
          </div>
        </div>
        <div className="d-flex flex-lg-row flex-sm-column justify-content-around">
          <div className="d-flex flex-fill justify-content-center">
            <BeerList
              addFavouriteBeer={addFavouriteBeer.bind(this)}
              displaysFavourite={false}
              beers={this.state.allBeers}
              favouriteBeers={this.state.favouriteBeers}
            />
          </div>
          <div className="d-flex flex-fill justify-content-center">
            <BeerListFavourite
              removeFavouriteBeer={removeFavouriteBeer.bind(this)}
              favouriteBeers={this.state.favouriteBeers}
            />
          </div>
        </div>
      </main>
    );
  }
}

export default App;
