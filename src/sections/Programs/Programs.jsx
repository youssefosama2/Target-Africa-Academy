import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import "./Programs.css";
import { handleJoin } from "../../utils/joinHandler.js";
import { data } from "react-router";

const Programs = () => {
  const { t, i18n } = useTranslation();

  const programs = [
    {
      title: t("programs.program1.title"),
      desc: t("programs.program1.desc"),
      image:
        "/assets/img/full-shot-kid-training-football_23-2149270946.webp",
      btn: t("programs.program1.btn"),
      reverse: false,
      points: t("programs.program1.points", {
        returnObjects: true,
      }),
      animation: "fadeInLeft",
    },

    {
      title: t("programs.program2.title"),
      desc: t("programs.program2.desc"),
      image:
        "/assets/img/football-trainer-teaching-kid-side-view_23-2149742035.webp",
      btn: t("programs.program2.btn"),
      reverse: true,
      points: t("programs.program2.points", {
        returnObjects: true,
      }),
      animation: "fadeInRight",
    },

    {
      title: t("programs.program3.title"),
      desc: t("programs.program3.desc"),
      image:
        "/assets/img/boy-training-football-field_141188-5743.webp",
      btn: t("programs.program3.btn"),
      reverse: false,
      points: t("programs.program3.points", {
        returnObjects: true,
      }),
      animation: "fadeInLeft",
    },
  ];

  return (
    <section className="programs py-5" id="programs">
      <Container fluid>
        {programs.map((item, index) => (
          <Row
            key={index}
            className={`align-items-center py-5 g-5 ${
              item.reverse
                ? "flex-column-reverse flex-lg-row-reverse"
                : "flex-column-reverse flex-lg-row"
            } wow ${item.animation}`} data-wow-duration="2s" data-wow-delay=".2s">
            <Col lg={6} md={12}>
              <div
                className={`program-content ${ i18n.language === "en" ? "text-start" : "text-end"} }`}>
                <h2>{item.title}</h2>
                <p>{item.desc}</p>
                <ul>
                  {item.points.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
                <Button
                  className="program-btn"
                  onClick={() =>
                    handleJoin({
                      type: "info",
                      plan:
                        i18n.language === "ar"
                          ? "استفسار"
                          : "Inquiry",
                    })
                  }
                >
                  {item.btn}
                </Button>
              </div>
            </Col>
            <Col lg={6} md={12}>
              <div className="program-image">
                <img
                  src={item.image}
                  alt={item.title}
                  className="img-fluid"
                  loading="lazy"
                />
              </div>
            </Col>
          </Row>
        ))}
      </Container>
    </section>
  );
};

export default Programs;