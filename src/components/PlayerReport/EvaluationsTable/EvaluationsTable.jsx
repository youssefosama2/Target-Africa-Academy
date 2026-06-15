import React, { useMemo } from "react";
import { faCalendarAlt, faEye, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useReport } from "../../../context/ReportContext";
import "./EvaluationsTable.css";

const technicalKeys = ["الاستلام والتسليم", "التمرير", "التصويب", "المراوغة", "الرؤية والتمرير الطويل", "الأداء المهاري"];
const fitnessKeys = ["القوة", "التحمل", "السرعة", "الرشاقة", "الاتزان والتناسق", "الأداء الحركي التوافقي"];
const mentalKeys = ["العمل الجماعي", "اتخاذ القرار", "التركيز", "الذكاء الكروي", "الالتزام والانضباط", "الشخصية والقيادة"];

const EvaluationsTable = () => {
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
        date: new Date(item.created_at).toLocaleDateString("ar-EG"),
        coach: item.coach_name || "---",
        total: `${item.total_score || 0}%`,
        skills: `${calculateAverage(skills, technicalKeys)}%`,
        fitness: `${calculateAverage(skills, fitnessKeys)}%`,
        intelligence: `${calculateAverage(skills, mentalKeys)}%`,
      };
    });
  }, [allEvaluations]);

  if (loading) {
    return (
      <div className="evaluations-container">
        <div style={{ padding: "40px", textAlign: "center", fontWeight: "600" }}>جاري تحميل التقييمات...</div>
      </div>
    );
  }

  return (
    <div className="evaluations-container">
      <div className="table-header">
        <div className="title-wrapper">
          <FontAwesomeIcon icon={faCalendarAlt} className="header-icon" />
          <h3>سجل التقييمات</h3>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="custom-table">
          <thead>
            <tr>
              <th>التاريخ</th>
              <th>المدرب</th>
              <th>التقييم العام</th>
              <th>المهارات الفنية</th>
              <th>اللياقة البدنية</th>
              <th>الذكاء والانضباط</th>
              <th>عرض التقرير</th>
            </tr>
          </thead>
          <tbody>
            {formattedEvaluations.length > 0 ? (
              formattedEvaluations.map((row) => (
                <tr key={row.id}>
                  <td data-label="التاريخ">{row.date}</td>
                  <td data-label="المدرب">{row.coach}</td>
                  <td data-label="التقييم العام">{row.total}</td>
                  <td data-label="المهارات الفنية">{row.skills}</td>
                  <td data-label="اللياقة البدنية">{row.fitness}</td>
                  <td data-label="الذكاء والانضباط">{row.intelligence}</td>
                  <td className="action-cell">
                    <button className="view-report-btn" onClick={() => handleOpenReport(row.playerCode, row.id)}>
                      <FontAwesomeIcon icon={faEye} />
                      <span>عرض التقرير</span>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", padding: "30px", fontWeight: "600" }}>لا توجد تقييمات</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="table-footer">
        <FontAwesomeIcon icon={faInfoCircle} className="info-icon" />
        <p><span className="tip-label">النصيحة : </span>حافظ على التدريبات المستمرة لتحسين نقاط الضعف والارتقاء بمستوى اللاعب.</p>
      </div>
    </div>
  );
};

export default EvaluationsTable;