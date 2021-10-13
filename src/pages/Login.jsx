import React from 'react';
import {
  Container, Row, Col, Card,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import img1 from '../img/img1.jpg';
import Loginform from '../components/Loginform.jsx';

const Login = () => {
  const { t } = useTranslation();

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="p-5 row">
              <Col className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img className="rounded-circle" src={img1} alt="Войти" />
              </Col>
              <Loginform />
            </Card.Body>
            <Card.Footer className="p-4">
              <Card.Text>
                {t('loginForm.dontHaveAnAccount')}
                {' '}
                <Link to="/Signup">{t('loginForm.registration')}</Link>
              </Card.Text>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
