import React from 'react';
import punkApiService from '../service/punkapi-service';
import BeerList from './BeerList';

// Note that defining variables inside a class body is a stage 3 proposal, see: https://github.com/tc39/proposal-class-fields
// but babel plugin "@babel/plugin-proposal-class-properties" is making it possible
class ExtendedBeer {
  isFavourite; // Is this beer a favourite beer?

  beerObject; // Beer object itself that's been returned from the API call

  constructor(beerObject, isFavourite) {
    this.beerObject = beerObject;
    this.isFavourite = isFavourite;
  }
}

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      allBeers: [],
    };
    this.getRandomBeerFn = this.getRandomBeerFn.bind(this);
  }

  getRandomBeerFn() {
    punkApiService.getRandomBeer().subscribe(randomBeer => {
      console.log(randomBeer);
      this.setState(prevState => ({ allBeers: [...prevState.allBeers, new ExtendedBeer(randomBeer)] }));
      console.log(this.state.allBeers);
      if (this.state.allBeers.length < 10) {
        // Make sure there are at least 10 random beers in the array
        this.getRandomBeerFn();
      }
    }, err => {
      console.error(`Error when gettting a random beer! Err: ${err}`);
    });
  }

  render() {
    return (
      <main className="main-container">
        <div className="content-area">
        <h1> PunkAPI Beer Service </h1>
          <button type="button" onClick={this.getRandomBeerFn}> BEER ME! </button>
        </div>
        <div className="beers-list">
        <BeerList/>
        </div>
        <div className="beers-favourite-list">
      <BeerList/>
        </div>
      </main>
    );
  }
}

export default App;
