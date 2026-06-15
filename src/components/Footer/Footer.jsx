import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Footer.css";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faYoutube,
  faInstagram,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";

import {
  faMapMarkerAlt,
  faLocationDot,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

export default function Footer() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  return (
    <footer
      className="footer-section py-5 bg-white border-top wow fadeInUp"
      data-wow-duration="2s"
      data-wow-delay=".2s"
    >
      <Container className={isAr ? "text-end" : "text-start"}>
        <Row className="g-5">
          <Col lg={4} className={isAr ? "order-1" : "order-1"}>
            <h3 className="fw-bold mb-4">{t('footer.brand')}</h3>
            <div className="contact-info text-muted small">
              <p>
                <FontAwesomeIcon icon={faMapMarkerAlt} className={isAr ? "ms-2" : "me-2"} />
                {t('footer.country')}
              </p>
              <p>
                <FontAwesomeIcon icon={faLocationDot} className={isAr ? "ms-2" : "me-2"} />
                {t('footer.address')}
              </p>
              <p>
                <FontAwesomeIcon icon={faPhone} className={isAr ? "ms-2" : "me-2"} />
                556 50776546
              </p>
              <p>
                <FontAwesomeIcon icon={faEnvelope} className={isAr ? "ms-2" : "me-2"} />
                info@acstart.com
              </p>
            </div>
          </Col>
          <Col lg={3} className="order-2">
            <ul className="list-unstyled footer-links p-0">
              <li className="mb-3"><a href="#about">{t('navbar.about')}</a></li>
              <li className="mb-3"><a href="#pricing">{t('navbar.pricing')}</a></li>
              <li className="mb-3"><a href="#player">{t('navbar.stars')}</a></li>
              <li className="mb-3"><a href="#programs">{t('navbar.programs')}</a></li>
              <li className="mb-3"><a href="#joinUs">{t('navbar.join')}</a></li>
            </ul>
          </Col>
          <Col lg={5} className="order-3">
            <h2 className="fw-bold mb-4">
              {isAr ? (
                <>نعلمك<br />بأخبارنا</>
              ) : (
                <>Stay Updated<br />With Our News</>
              )}
            </h2>
            <div className="newsletter-form position-relative">
              <input
                type="email"
                className={`form-control border-0 border-bottom rounded-0 py-3 ${isAr ? "text-end" : "text-start"}`}
                placeholder="name@email.com"
              />
              <button className={`btn btn-primary rounded-pill px-4 position-absolute ${isAr ? "start-0" : "end-0"} top-50 translate-middle-y join-btn`}>
                {t('footer.subscribe')}
              </button>
            </div>
          </Col>
        </Row>
        <hr className="my-5 opacity-10" />
        <Row className="align-items-center">
          <Col md={4} className={isAr ? "text-center text-md-start" : "text-center text-md-end"}>
            <div className={`social-icons d-flex justify-content-center ${isAr ? "justify-content-md-start" : "justify-content-md-end"} gap-2`}>
              <a href="#!" className="rounded-circle border p-2 text-dark"><FontAwesomeIcon icon={faFacebookF} /></a>
              <a href="#!" className="rounded-circle border p-2 text-dark"><FontAwesomeIcon icon={faYoutube} /></a>
              <a href="#!" className="rounded-circle border p-2 text-dark"><FontAwesomeIcon icon={faInstagram} /></a>
              <a href="https://wa.me/201091654379" className="rounded-circle border p-2 text-dark"><FontAwesomeIcon icon={faWhatsapp} /></a>
            </div>
          </Col>
          <Col md={4} className="text-center">
            <div className="footer-bottom-links small">
              <a href="#!" className="text-muted text-decoration-none mx-2">{t('footer.privacy')}</a>
              <a href="#!" className="text-muted text-decoration-none mx-2">{t('footer.payment_policy')}</a>
            </div>
          </Col>
          <Col md={4} className={isAr ? "text-center text-md-end" : "text-center text-md-start"}>
            <p className="text-muted small mb-0">{t('footer.rights')}</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}