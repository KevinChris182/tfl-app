import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { icons } from './Icons';
import './Navbar.scss';

const Navbar: React.FC = () => {
  return (
    <Container fluid className='navbar-custom p-3'>
      <Row>
        <Col xs={12} md={{ span: 10, offset: 2 }}>
          <h5>
            <b>
              <img src={icons.pinpoint} />
              Find Nearest Stop Point With Transport For London API
            </b>
          </h5>
        </Col>
      </Row>
    </Container>
  );
};

export default Navbar;
