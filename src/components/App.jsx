import React from 'react';
import { Button } from 'reactstrap';
import punkApiService from '../service/punkapi-service';
import BeerList from './BeerList';
import FavouriteBeerList from './BeerListFavourite';

class App extends React.Component {

  constructor() {
    super();
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

    // Make sure we have a space in localStorage to persist favourites list
    if (localStorage.getItem('favouriteBeers') == null) {
      localStorage.setItem('favouriteBeers', JSON.stringify({}));
    } else {
      // If there is a 'favouriteBeers' key on the localStorage,
      // we can just get out initial favourite beers from there
      this.setState(() => ({ favouriteBeers: JSON.parse(localStorage.getItem('favouriteBeers')) }));
    }
  }

  getRandomBeerFn() {
    punkApiService.getRandomBeer().subscribe(randomBeer => {
      if (this.state.allBeers.length < 10 && !this.isBeerInArray(randomBeer, this.state.allBeers)
        && !this.isBeerInArray(randomBeer, this.state.favouriteBeers)) {
          // Don't display duplicate beers
        this.setState(prevState => ({ allBeers: [...prevState.allBeers, randomBeer] }));
      }
      if (this.state.allBeers.length < 10) {
        // List should not contain more than 10 beers
        this.getRandomBeerFn();
      }
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

  removeFavouriteBeer(singleFavouriteBeer) {

    let beerToRemoveId;
    for (let i = 0; i < this.state.favouriteBeers.length; i++) {
      if (this.state.favouriteBeers[i].id === singleFavouriteBeer.id) {
        beerToRemoveId = i;
        const newState = this.state.favouriteBeers;
        newState.splice(beerToRemoveId, 1);
        this.setState(() => ({ favouriteBeers: newState }), this.updateLocalStorage(newState));
        break; // We no longer need to finish the loop since we have what we want, small performance gain
      }
    }
  }

  addFavouriteBeer(singleBeer) {

    if (!this.isBeerInArray(singleBeer, this.state.favouriteBeers)) {
      let beerToRemoveIndex;
      for (let i = 0; i < this.state.allBeers.length; i++) {
        if (this.state.allBeers[i].id === singleBeer.id) {
          beerToRemoveIndex = i;
          const newState = this.state.allBeers;
          newState.splice(beerToRemoveIndex, 1);
          this.setState(() => ({ allBeers: newState }));
          break;
        }
      }
      this.setState(prevState => ({ favouriteBeers: [...prevState.favouriteBeers, singleBeer] }), this.updateLocalStorage([...this.state.favouriteBeers, singleBeer]));
      // Update localStorage inside the setState since setState is async
    }
  }

  updateLocalStorage(updatedState) {
    // Change local storage state for favourites
    localStorage.setItem('favouriteBeers', JSON.stringify(updatedState));
  }

  render() {
    return (
      <main className="col">
        <div className="col-sm-12">
          <div className="text-center">
            <h1>PunkAPI Beer Service</h1>
            <Button type="button" color="primary" onClick={this.getRandomBeerFn}> BEER ME! </Button>
          </div>
        </div>
        <div className="d-flex flex-lg-row flex-sm-column justify-content-around">
          <div className="col-sm-12 col-lg-6">
            <BeerList
              addFavouriteBeer={this.addFavouriteBeer}
              beers={this.state.allBeers}
              favouriteBeers={this.state.favouriteBeers}
            />
          </div>
          <div className="col-sm-12 col-lg-6">
            <FavouriteBeerList
              removeFavouriteBeer={this.removeFavouriteBeer}
              favouriteBeers={this.state.favouriteBeers}
            />
          </div>
        </div>
      </main>
    );
  }
}

export default App;
