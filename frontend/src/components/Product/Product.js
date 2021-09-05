import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from '../Rating/Rating';
import PropTypes from 'prop-types';

const Product = ({ product }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top' />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as='div'>
          {/* <div className='my-3'>
            {product.rating} from {product.numReviews} reviews
          </div> */}
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews.`}
          />
        </Card.Text>
        <Card.Text as='h3' style={{ padding: '15px 0 0 0' }}>
          €{product.price}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

Product.propTypes = {
  product: PropTypes.object.isRequired,
};

export default Product;
