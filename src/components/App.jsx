import React from 'react';
import punkApiService from '../service/punkapi-service';

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
      this.setState(prevState => ({ allBeers: [...prevState.allBeers, randomBeer] }));
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
      </main>
    );
  }
}

export default App;
