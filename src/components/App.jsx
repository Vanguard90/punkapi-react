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
    this.isBeerInArray = this.isBeerInArray.bind(this);
  }

  getRandomBeerFn() {
    punkApiService.getRandomBeer().subscribe(randomBeer => {
      if (this.state.allBeers.length < 10 && !this.isBeerInArray(randomBeer, this.state.allBeers)) {
        this.setState(prevState => ({ allBeers: [...prevState.allBeers, randomBeer] }));
        if (this.state.allBeers.length < 10) {
          this.getRandomBeerFn();
        }
      }
      // This whole structure above is to make sure you don't get more than 10 beers
      // and there are no dublicate beers - CHECK AGAIN
    }, err => {
      console.error(`Error when gettting a random beer! Err: ${err}`);
    });
  }

  isBeerInArray(beerToCheck, arrayToCheck) {
    arrayToCheck.forEach(
      singleBeerInState => {
        if (beerToCheck.id === singleBeerInState.id) {
          return true;
        }
      },
    );
    return false;
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
          this.setState(prevState => ({ allBeers: newState }));
          break; // We no longer need to finish the loop since we have what we want
        }
      }

      this.setState(prevState => ({ favouriteBeers: [...prevState.favouriteBeers, singleBeer] }));
    }

  }

  render() {
    const addFavouriteBeer = this.addFavouriteBeer;
    return (
      <main className="col">
        <div className="col-sm-12">
          <div className="text-center">
            <h1>PunkAPI Beer Service</h1>
            <Button type="button" color="primary" onClick={this.getRandomBeerFn}> BEER ME! </Button>
          </div>
        </div>
        <div className="d-flex flex-lg-row flex-md-column justify-content-around align-content-stretch align-items-stretch">
          <div className="d-flex flex-fill justify-content-center">
            <BeerList addFavouriteBeer={addFavouriteBeer.bind(this)} displaysFavourite={false} beers={this.state.allBeers} />
          </div>
          <div className="d-flex flex-fill justify-content-center">
            <BeerListFavourite favouriteBeers={this.state.favouriteBeers} />
          </div>
        </div>
      </main>
    );
  }
}

export default App;
