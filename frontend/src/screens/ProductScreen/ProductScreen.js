import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails } from '../../actions/productActions';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from 'react-bootstrap';
import Rating from '../../components/Rating/Rating';
import { Fragment } from 'react';
import Loader from '../../components/Loader/Loader';
import Message from '../../components/Message/Message';

const ProductScreen = ({ history, match }) => {
  const [quantity, setQuantity] = useState(0);

  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [match.params.id, dispatch]);

  const quantitySelectHandler = (e) => {
    setQuantity(e.target.value);
  };

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?quantity=${quantity}`);
  };

  const productDetailsView = (
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
                <Col style={{ color: product.countInStock === 0 ? 'red' : '' }}>
                  {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}{' '}
                </Col>
              </Row>
            </ListGroup.Item>

            {product.countInStock > 0 && (
              <ListGroup.Item>
                <Row>
                  <Col>Quantity</Col>
                  <Col>
                    <Form.Control
                      as='select'
                      value={quantity}
                      onChange={quantitySelectHandler}
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                </Row>
              </ListGroup.Item>
            )}

            {product.countInStock !== 0 && (
              <ListGroup.Item>
                <Button
                  className='btn-block w-100'
                  type='button'
                  onClick={addToCartHandler}
                >
                  Add To Cart
                </Button>
              </ListGroup.Item>
            )}
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );

  return (
    <Fragment>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        productDetailsView
      )}
    </Fragment>
  );
};

export default ProductScreen;
