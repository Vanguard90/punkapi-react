
import React from 'react';
import {
  ListGroup,
  ListGroupItem,
  Button,
} from 'reactstrap';

class BeerListFavourite extends React.Component {
  // A component that displays beers in a list format

  constructor(props) {
    super(props);
    this.renderBeerList = this.renderBeerList.bind(this);
  }

  renderBeerList() {
    if (this.props && this.props.favouriteBeers) {
      return this.props.favouriteBeers.map((singleBeer) => {
        const addFavouriteBeer = this.props.addFavouriteBeer;
        return (
          <ListGroupItem key={`${singleBeer.id}`}>
            {singleBeer.name}
           <Button size="sm" type="button" color="danger"> Remove </Button>
          </ListGroupItem>
        );
      });
    } else {
      return null;
    }
  }

  render() {
    return (
      <div className="text-center">
        <h3>Favourite Beers</h3>
        <ListGroup>
          {
            this.renderBeerList()
          }
        </ListGroup>
      </div>
    );
  }
}

export default BeerListFavourite;