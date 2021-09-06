import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import Rating from '../../components/Rating/Rating';
import { Fragment } from 'react';
import axios from 'axios';

const ProductScreen = ({ match }) => {
  const [product, setProduct] = useState({});
  const productId = match.params.id;

  useEffect(() => {
    const fetchProduct = async (pId) => {
      const res = await axios.get(`/api/products/${pId}`);
      const product = res.data;

      setProduct(product);
    };

    fetchProduct(productId);
  }, [productId]);

  return (
    <Fragment>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews.`}
              />
            </ListGroup.Item>
            <ListGroup.Item>Price : €{product.price}</ListGroup.Item>
            <ListGroup.Item>Description : {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>Price : </Col>
                  <Col>
                    <strong>€{product.price}</strong>{' '}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status : </Col>
                  <Col
                    style={{ color: product.countInStock === 0 ? 'red' : '' }}
                  >
                    {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}{' '}
                  </Col>
                </Row>
              </ListGroup.Item>
              {product.countInStock !== 0 && (
                <ListGroup.Item>
                  <Button className='btn-block w-100' type='button'>
                    Add To Cart
                  </Button>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default ProductScreen;
