
import React from 'react';
import {
  ListGroup,
  ListGroupItem,
  Input,
} from 'reactstrap';

class BeerList extends React.Component {
  // A component that displays beers in a list format

  constructor(props) {
    super(props);
    this.renderBeerList = this.renderBeerList.bind(this);
  }

  renderBeerList() {
    if (this.props && this.props.beers) {
      return this.props.beers.map((singleBeer) => {
        const addFavouriteBeer = this.props.addFavouriteBeer;
        return (
          <ListGroupItem key={`${singleBeer.id}`}>
            <Input disabled={this.props.favouriteBeers.length >= 10 ? true : null} onClick={() => addFavouriteBeer(singleBeer)} type="checkbox" />
            {singleBeer.name}
          </ListGroupItem>
        );
      });
    }
  }

  render() {
    return (
      <div className="text-center col-sm-12">
          <h3>Beers</h3>
        <ListGroup className="col-sm-12 offset-lg-3 col-lg-6">
          {
            this.renderBeerList()
          }
        </ListGroup>
      </div>
    );
  }
}

export default BeerList;
