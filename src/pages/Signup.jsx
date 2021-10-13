import React from 'react';
import {
  Container, Row, Col, Card,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import signup from '../img/signup.jpg';
import SignupForm from '../components/SignupFrom.jsx';

const Signup = () => {
  const { t } = useTranslation();
  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="card-body row p-5">
              <Col className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img className="rounded-circle" src={signup} alt="signup" />
              </Col>
              <SignupForm />
            </Card.Body>
            <Card.Footer className="card-footer p-4">
              <Card.Text className="text-right">
                <Link to="/Login">{t('registrationForm.comeBack')}</Link>
              </Card.Text>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
} 

export default Signup;
