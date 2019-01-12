import React from 'react';
import { Button } from 'reactstrap';
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
      <main className="col">
        <div className="col-sm-12">
          <div className="text-center">
            <h1>PunkAPI Beer Service</h1>
            <Button type="button" color="primary" onClick={this.getRandomBeerFn}> BEER ME! </Button>
          </div>
        </div>
        <div className="d-flex flex-lg-row flex-md-column justify-content-around align-content-stretch align-items-stretch">
        <div className="d-flex flex-fill justify-content-center">
          <BeerList displaysFavourite={false} beers={this.state.allBeers} />
        </div>
        <div className="d-flex flex-fill justify-content-center">
          <BeerList displaysFavourite/>
        </div>
        </div>
      </main>
    );
  }
}

export default App;
