import React from 'react';
import { Col, Row } from 'react-bootstrap';

const Footer: React.FC = () => {
  return (
    <Row className='g-0 mx-0 bg-light p-4'>
      <Col className='text-center'>
        <span>
          Homemade by{' '}
          <a href='https://github.com/KevinChris182'>KevinChris182</a>
        </span>
      </Col>
    </Row>
  );
};

export default Footer;
