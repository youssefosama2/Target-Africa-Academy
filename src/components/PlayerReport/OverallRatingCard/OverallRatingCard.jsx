import React from "react";
import { useTranslation } from "react-i18next";
import { useReport } from "../../../Context/ReportContext";
import "./OverallRatingCard.css";
const OverallRatingCard = () => {
  const { t } = useTranslation();
  const { currentEvaluation, loading } = useReport();
  const overallAverage = Math.round(Number(currentEvaluation?.total_score) || 0);
  const levelClass = overallAverage >= 90 ? "excellent" : overallAverage >= 80 ? "very-good" : overallAverage >= 60 ? "good" : "weak";
  const levelText = overallAverage >= 90 ? t("report.overall.excellent") : overallAverage >= 80 ? t("report.overall.veryGood") : overallAverage >= 60 ? t("report.overall.good") : t("report.overall.weak");
  return (
    <div className="analysis-card overall-card">
      <div className="analysis-header">
        <h3>{t("report.overall.title")}</h3>
      </div>
      {loading ? (
        <div style={{ height: "220px", display: "flex", alignItems: "center", justifyContent: "center", color: "#64748b", fontWeight: "600" }}>{t("report.overall.loading")}</div>
      ) : (
        <>
          <div className="overall-circle">
            <svg viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="52" className="circle-bg" />
              <circle cx="60" cy="60" r="52" className="circle-progress" strokeDasharray={327} strokeDashoffset={327 - (327 * overallAverage) / 100} />
            </svg>
            <div className="circle-content">
              <h2>{overallAverage}</h2>
              <span>{t("report.overall.outOf100")}</span>
            </div>
          </div>
          <div className={`level-box ${levelClass}`}>{levelText}</div>
        </>
      )}
    </div>
  );
};
export default OverallRatingCard;