import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { faStar, faChartLine, faFileAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useReport } from "../../../Context/ReportContext";
import "./QuickStatsCards.css";

const QuickStatsCards = () => {
  const { t, i18n } = useTranslation();
  const { allEvaluations, loading } = useReport();

  const statsData = useMemo(() => {
    if (!allEvaluations?.length) {
      return [
        { title: t("report.quickStats.performanceGrowth"), value: "0%", desc: t("report.quickStats.noData"), icon: faChartLine },
        { title: t("report.quickStats.lastEvaluation"), value: "0", desc: "---", icon: faStar },
        { title: t("report.quickStats.bestEvaluation"), value: "0", desc: "---", icon: faStar },
        { title: t("report.quickStats.totalEvaluations"), value: "0", desc: t("report.quickStats.evaluations"), icon: faFileAlt }
      ];
    }

    const sortedEvaluations = [...allEvaluations].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    const lastEvaluation = sortedEvaluations[sortedEvaluations.length - 1];
    const bestEvaluation = [...sortedEvaluations].sort((a, b) => (b.total_score || 0) - (a.total_score || 0))[0];

    const firstScore = Number(sortedEvaluations[0]?.total_score) || 0;
    const lastScore = Number(lastEvaluation?.total_score) || 0;
    const improvement = firstScore > 0 ? Math.round(((lastScore - firstScore) / firstScore) * 100) : 0;

    const formatDate = (date) => {
      if (!date) return "---";
      return new Date(date).toLocaleDateString(i18n.language === "ar" ? "ar-EG" : "en-US", { month: "long", year: "numeric" });
    };

    return [
      { title: t("report.quickStats.totalEvaluations"), value: sortedEvaluations.length, desc: t("report.quickStats.evaluations"), icon: faFileAlt },
      { title: t("report.quickStats.lastEvaluation"), value: lastEvaluation?.total_score || 0, desc: formatDate(lastEvaluation?.created_at), icon: faStar },
      { title: t("report.quickStats.bestEvaluation"), value: bestEvaluation?.total_score || 0, desc: formatDate(bestEvaluation?.created_at), icon: faStar },
      { 
        title: t("report.quickStats.performanceGrowth"), 
        value: `${improvement > 0 ? "+" : ""}${improvement}%`, 
        desc: improvement >= 0 ? t("report.quickStats.improved") : t("report.quickStats.decreased"), 
        green: improvement > 0, 
        negative: improvement < 0, 
        icon: faChartLine 
      }
    ];
  }, [allEvaluations, t, i18n.language]);

  if (loading) {
    return (
      <div className="row g-3 mb-4">
        <div style={{ textAlign: "center", padding: "20px", color: "#64748b", fontWeight: "600" }}>{t("report.quickStats.loading")}</div>
      </div>
    );
  }

  return (
    <div className="row g-3 mb-4">
      {statsData.map((item, index) => (
        <div className="col-md-4 col-lg-3 col-12" key={index}>
          <StatCard {...item} />
        </div>
      ))}
    </div>
  );
};

const StatCard = ({ title, value, desc, green, negative, icon }) => (
  <div className="stat-card h-100">
    <div>
      <p>{title}</p>
      <h2 className={green ? "green-text" : negative ? "red-text" : ""}>{value}</h2>
      <span>{desc}</span>
    </div>
    <div className="stat-icon">
      <FontAwesomeIcon icon={icon} />
    </div>
  </div>
);

export default QuickStatsCards;