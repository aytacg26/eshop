import React, { Fragment } from 'react';
import { Container } from 'react-bootstrap';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

const App = () => {
  return (
    <Fragment>
      <Header />
      <main className='py-3'>
        <Container>
          <h1>Welcome to MERN eShop</h1>
        </Container>
      </main>
      <Footer />
    </Fragment>
  );
};

export default App;
