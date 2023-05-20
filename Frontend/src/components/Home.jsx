import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

function Home() {
  return (
  
    <Carousel slide={false}>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src="https://images.unsplash.com/photo-1598955890270-d77cdb06d2bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
        alt="First slide"
      />
      <Carousel.Caption>
        <h3>Welcome to CitizenConnect</h3>
        
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src="https://images.unsplash.com/photo-1612862862126-865765df2ded?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80"
        alt="Second slide"
      />

      <Carousel.Caption>
      <h3>Welcome to CitizenConnect</h3>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src="https://images.unsplash.com/photo-1561150018-8bb356679537?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2044&q=80"
        alt="Third slide"
      />

      <Carousel.Caption>
      <h3>Welcome to CitizenConnect</h3>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
  
  );
}

export default Home;
