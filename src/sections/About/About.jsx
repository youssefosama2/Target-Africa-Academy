import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './About.css';

import { useTranslation } from 'react-i18next';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faUserGraduate,
  faShieldAlt,
  faFutbol
} from '@fortawesome/free-solid-svg-icons';

const About = () => {

  const { t } = useTranslation();

  return (
    <section id="about">
      <section className="About py-5">
        <Container fluid>
          <Row className="align-items-center">
            <Col md={6} sm={12} className="wow fadeInRight" data-wow-duration="2s" data-wow-delay=".2s">
              <h3 className="mb-4">{t("about.title")}</h3>
              <img
                src="/assets/img/medium-shot-kids-laying-grass_23-2149270905.webp"
                width="500"
                height="300"
                loading="lazy"
                alt="kids football"
                className="img-fluid rounded-4"
              />
            </Col>
            <Col md={6} sm={12} className="wow fadeInLeft" data-wow-duration="2s" data-wow-delay=".2s">
              <h3 className="mb-3">{t("about.subtitle")}</h3>
              <p>{t("about.desc1")}</p>
              <p>{t("about.desc2")}</p>
              <p>{t("about.desc3")}</p>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="features text-center py-5 bg-light">
        <Container>
          <Row className="g-4">
            <Col md={4} className="wow fadeInRight" data-wow-duration="2s" data-wow-delay=".2s">
              <div className="feature-card p-4 shadow-sm bg-white">
                <FontAwesomeIcon icon={faUserGraduate} size="3x" className="text-primary mb-3" />
                <h3>{t("features.card1.title")}</h3>       
                <p>{t("features.card1.desc")}</p>
              </div>
            </Col>
            <Col md={4} className="wow fadeInUp" data-wow-duration="2s" data-wow-delay=".2s">
              <div className="feature-card p-4 shadow-sm bg-white">
                <FontAwesomeIcon icon={faShieldAlt} size="3x" className="text-success mb-3"/>
                <h3>{t("features.card2.title")}</h3>
                <p>{t("features.card2.desc")}</p>
              </div>
            </Col>
            <Col md={4} className="wow fadeInLeft" data-wow-duration="2s" data-wow-delay=".2s">
              <div className="feature-card p-4 shadow-sm bg-white">
                <FontAwesomeIcon icon={faFutbol} size="3x" className="text-warning mb-3"/>
                <h3>{t("features.card3.title")}</h3>
                <p>{t("features.card3.desc")} </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </section>
  );
}

export default About;