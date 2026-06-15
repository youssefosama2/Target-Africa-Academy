import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { faCalendarAlt, faEye, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useReport } from "../../../Context/ReportContext";
import "./EvaluationsTable.css";
const technicalKeys = ["الاستلام والتسليم", "التمرير", "التصويب", "المراوغة", "الرؤية والتمرير الطويل", "الأداء المهاري"];
const fitnessKeys = ["القوة", "التحمل", "السرعة", "الرشاقة", "الاتزان والتناسق", "الأداء الحركي التوافقي"];
const mentalKeys = ["العمل الجماعي", "اتخاذ القرار", "التركيز", "الذكاء الكروي", "الالتزام والانضباط", "الشخصية والقيادة"];
const EvaluationsTable = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { allEvaluations, loading } = useReport();
  const handleOpenReport = (playerCode, evaluationId) => {
    if (!playerCode || !evaluationId) return;
    navigate(`/player-report/${playerCode}/${evaluationId}`);
  };
  const calculateAverage = (skills, keys) => {
    if (!skills) return 0;
    const values = keys.map((k) => Number(skills[k]) || 0).filter((n) => n > 0);
    return values.length ? Math.round(values.reduce((a, b) => a + b, 0) / values.length) : 0;
  };
  const formattedEvaluations = useMemo(() => {
    if (!allEvaluations?.length) return [];
    return allEvaluations.map((item) => {
      const skills = item.skills_scores || {};
      return {
        id: item.id,
        playerCode: item.player_code,
        date: new Date(item.created_at).toLocaleDateString(i18n.language === "ar" ? "ar-EG" : "en-US"),
        coach: item.coach_name || "---",
        total: `${item.total_score || 0}%`,
        skills: `${calculateAverage(skills, technicalKeys)}%`,
        fitness: `${calculateAverage(skills, fitnessKeys)}%`,
        intelligence: `${calculateAverage(skills, mentalKeys)}%`
      };
    });
  }, [allEvaluations, i18n.language]);
  if (loading) {
    return (
      <div className="evaluations-container">
        <div style={{ padding: "40px", textAlign: "center", fontWeight: "600" }}>{t("report.evaluationsTable.loading")}</div>
      </div>
    );
  }
  return (
    <div className="evaluations-container">
      <div className="table-header">
        <div className="title-wrapper">
          <FontAwesomeIcon icon={faCalendarAlt} className="header-icon" />
          <h3>{t("report.evaluationsTable.title")}</h3>
        </div>
      </div>
      <div className="table-wrapper">
        <table className="custom-table">
          <thead>
            <tr>
              <th>{t("report.evaluationsTable.date")}</th>
              <th>{t("report.evaluationsTable.coach")}</th>
              <th>{t("report.evaluationsTable.totalScore")}</th>
              <th>{t("report.evaluationsTable.technical")}</th>
              <th>{t("report.evaluationsTable.fitness")}</th>
              <th>{t("report.evaluationsTable.mental")}</th>
              <th>{t("report.evaluationsTable.viewReport")}</th>
            </tr>
          </thead>
          <tbody>
            {formattedEvaluations.length > 0 ? (
              formattedEvaluations.map((row) => (
                <tr key={row.id}>
                  <td data-label={t("report.evaluationsTable.date")}>{row.date}</td>
                  <td data-label={t("report.evaluationsTable.coach")}>{row.coach}</td>
                  <td data-label={t("report.evaluationsTable.totalScore")}>{row.total}</td>
                  <td data-label={t("report.evaluationsTable.technical")}>{row.skills}</td>
                  <td data-label={t("report.evaluationsTable.fitness")}>{row.fitness}</td>
                  <td data-label={t("report.evaluationsTable.mental")}>{row.intelligence}</td>
                  <td className="action-cell">
                    <button className="view-report-btn" onClick={() => handleOpenReport(row.playerCode, row.id)}>
                      <FontAwesomeIcon icon={faEye} /><span>{t("report.evaluationsTable.viewReport")}</span>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", padding: "30px", fontWeight: "600" }}>{t("report.evaluationsTable.noEvaluations")}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="table-footer">
        <FontAwesomeIcon icon={faInfoCircle} className="info-icon" />
        <p><span className="tip-label">{t("report.evaluationsTable.tipLabel")}</span>{t("report.evaluationsTable.tipText")}</p>
      </div>
    </div>
  );
};
export default EvaluationsTable;