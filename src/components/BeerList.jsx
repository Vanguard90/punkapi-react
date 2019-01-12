
import React from 'react';
import {
  ListGroup,
  ListGroupItem,
  Input,
  Button,
} from 'reactstrap';

class BeerList extends React.Component {
  // A component that displays beers in a list format

  constructor(props) {
    super(props);
    this.renderBeerList = this.renderBeerList.bind(this);
  }

  renderBeerList() {
    if (this.props && this.props.beers) {
      return this.props.beers.map((singleExtendedBeer) => {
        return (
          <ListGroupItem key={singleExtendedBeer.beerObject.name}>
            {this.props.displaysFavourite ? '' : <Input type="checkbox" />}
            {singleExtendedBeer.beerObject.name}
            {this.props.displaysFavourite ? <Button type="button" color="danger"> Remove </Button> : ''}
          </ListGroupItem>
        );
      });
    } else {
      return null;
    }
  }

  render() {
    const listHeading = this.props.displaysFavourite ? 'Favourite beers' : 'Beers';
    return (
      <div className="text-center">
        <h3>{listHeading}</h3>
        <ListGroup>
          {
            this.renderBeerList()
          }
        </ListGroup>
      </div>
    );
  }
}

export default BeerList;
