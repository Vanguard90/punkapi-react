
import React from 'react';
import {
  ListGroup,
  ListGroupItem,
  Button,
} from 'reactstrap';

class BeerListFavourite extends React.Component {
  // A component that displays favourite beers in a list format

  constructor(props) {
    super(props);
    this.renderBeerList = this.renderBeerList.bind(this);
  }

  renderBeerList() {
    if (this.props && this.props.favouriteBeers) {
      return this.props.favouriteBeers.map((favouriteBeer) => {
        const removeFavouriteBeer = this.props.removeFavouriteBeer;
        return (
          <ListGroupItem key={`${favouriteBeer.id}`}>
            <span className="padding-adjust-right">{favouriteBeer.name}</span>
           <Button size="sm" type="button" color="danger" onClick={() => removeFavouriteBeer(favouriteBeer)}> Remove </Button>
          </ListGroupItem>
        );
      });
    }
  }

  render() {
    return (
      <div className="text-center col-sm-12">
        <h3>Favourite Beers</h3>
        <ListGroup className="col-sm-12 offset-lg-3 col-lg-6">
          {
            this.renderBeerList()
          }
        </ListGroup>
      </div>
    );
  }
}

export default BeerListFavourite;
