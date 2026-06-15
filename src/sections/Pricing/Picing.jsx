import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import "./Pricing.css";
import { handleJoin } from "../../utils/joinHandler.js";

const Pricing = () => {

  const { t } = useTranslation();

  const plans = [
    {
      title: t("pricing.cards.monthly.title"),
      price: "400",
      duration: t("pricing.cards.monthly.duration"),
      desc: t("pricing.cards.monthly.desc"),
      animation: "fadeInRight",
      plan: t("pricing.cards.monthly.plan"),
    },

    {
      title: t("pricing.cards.quarterly.title"),
      price: "1200",
      duration: t("pricing.cards.quarterly.duration"),
      desc: t("pricing.cards.quarterly.desc"),
      animation: "fadeInUp",
      plan: t("pricing.cards.quarterly.plan"),
    },

    {
      title: t("pricing.cards.halfyear.title"),
      price: "2400",
      duration: t("pricing.cards.halfyear.duration"),
      desc: t("pricing.cards.halfyear.desc"),
      animation: "fadeInLeft",
      plan: t("pricing.cards.halfyear.plan"),
    },
  ];

  return (
    <>
      <section className="pricing-section" id="pricing">
        <Container fluid className="bg-light-custom p-4 p-md-5 rounded-5">
          <Row className="mb-4 align-items-center wow fadeInUp"  data-wow-duration="2s" data-wow-delay=".2s">
            <Col lg={6}>
              <h2 className="fw-bold">{t("pricing.title")}</h2>
              <p className="text-muted small">{t("pricing.desc")}</p>
            </Col>
            <Col lg={6}>
              <h2 className="fw-bold mb-3">{t("pricing.heading")}</h2>
            </Col>
          </Row>
          <Row className="g-3">
            {plans.map((item, index) => (
              <Col key={index} lg={4} md={6} sm={12} className={`wow ${item.animation}`} data-wow-duration="2s" data-wow-delay=".2s">
                <div className="pricing-card p-4 h-100 d-flex flex-column">
                  <div className="d-flex justify-content-between mb-3">
                    <h5 className="fw-bold">{item.title}</h5>
                    <div className="price-box text-center">
                      <span className="price"> {item.price}</span>
                      <span className="currency d-block"> {t("pricing.currency")}</span>
                      <p className="duration"> {item.duration}</p>
                    </div>
                  </div>
                  <p className="card-info text-muted">{item.desc}</p>
                  <Button className="btn btn-primary-custom w-50 mx-auto mt-auto"
                    onClick={() => handleJoin(item.plan)}> {t("pricing.button")}
                  </Button>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
      <section className="quote-section py-5 text-center wow fadeInUp"  data-wow-duration="2s" data-wow-delay=".2s">
        <Container>
          <h2 className="display-5 fw-bold">{t("pricing.quote")}</h2>
        </Container>
      </section>
    </>
  );
};

export default Pricing;