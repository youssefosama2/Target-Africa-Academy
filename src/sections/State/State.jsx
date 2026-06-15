import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./State.css";
import { handleJoin } from "../../utils/joinHandler.js";
import { useTranslation } from "react-i18next"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

export default function StatsSection() {
  const { t, i18n } = useTranslation();
  const sectionRef = useRef(null);
  const [start, setStart] = useState(false);

  const statsData = [
    { title: t("stats.coach"), target: 16, plus: true },
    { title: t("stats.technical"), target: 8 },
    { title: t("stats.trophies"), target: 12 },
    { title: t("stats.player"), target: 170, plus: true },
  ];
  
  const [counts, setCounts] = useState(statsData.map(() => 0));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStart(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!start) return;

    statsData.forEach((item, index) => {
      let current = 0;
      const interval = setInterval(() => {
        current += Math.ceil(item.target / 100);
        setCounts((prev) => {
          const updated = [...prev];
          updated[index] = current > item.target ? item.target : current;
          return updated;
        });
        if (current >= item.target) clearInterval(interval);
      }, 25);
    });
  }, [start, i18n.language]);

  return (
    <>
      <div ref={sectionRef} id="joinUs" className="stats-section py-5 wow fadeInUp"  data-wow-duration="2s" data-wow-delay=".2s" >
        <Container className="bg-dark text-white p-5 rounded-5 shadow-lg">
          <Row className="align-items-center g-5">
            <Col lg={6} className={i18n.language === 'ar' ? "text-lg-end text-center" : "text-lg-start text-center"}>
              <h2 className="fw-bold mb-3 position-relative d-inline-block">
                {t("stats.heading")}
                <span className="title-line"></span>
              </h2>
              <p className="text-white-50 lh-lg mb-4">{t("stats.description")}</p>
              <Button 
                className="btn btn-primary rounded-pill px-5 py-2 fw-bold" 
                onClick={() => handleJoin({ type: "info", plan: t("stats.btn") })}
              > 
                {t("stats.btn")}
              </Button>
            </Col>
            <Col lg={6}>
              <Row className="text-center g-4">
                {statsData.map((item, index) => (
                  <Col xs={6} key={index}>
                    <div className="stat-item">
                      <h2 className="display-5 fw-bold mb-0">
                        {counts[index]}
                        {item.plus && (<span>+</span>)}
                      </h2> 
                      <p className="text-white-50 small">{item.title}</p>
                    </div>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
      <div>
        <a
          href="https://wa.me/201091654379"
          className="whatsapp"
          target="_blank"
          rel="noreferrer"
        >
          <FontAwesomeIcon icon={faWhatsapp} />
        </a>
      </div>
    </>
  );
}