import React, { useMemo } from "react";
import { faStar, faChartLine, faFileAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useReport } from "../../../context/ReportContext";
import "./QuickStatsCards.css";
const QuickStatsCards = () => {
  const { allEvaluations, loading } = useReport();
  const statsData = useMemo(() => {
    if (!allEvaluations || allEvaluations.length === 0) {
      return [
        { title: "تطور الأداء", value: "0%", desc: "لا توجد بيانات", green: false, icon: faChartLine },
        { title: "آخر تقييم", value: "0", desc: "---", icon: faStar },
        { title: "أفضل تقييم", value: "0", desc: "---", icon: faStar },
        { title: "إجمالي التقييمات", value: "0", desc: "تقييمات", icon: faFileAlt },
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
      return new Date(date).toLocaleDateString("ar-EG", { month: "long", year: "numeric" });
    };
    return [
  {
    title: "تطور الأداء",
    value: `${improvement > 0 ? "+" : ""}${improvement}%`,
    desc: improvement >= 0 ? "تحسن عام" : "انخفاض الأداء",
    colorClass:
      improvement > 0
        ? "green-text"
        : improvement < 0
        ? "red-text"
        : "",
    icon: faChartLine,
  },
  {
    title: "آخر تقييم",
    value: lastEvaluation?.total_score || 0,
    desc: formatDate(lastEvaluation?.created_at),
    colorClass: "",
    icon: faStar,
  },
  {
    title: "أفضل تقييم",
    value: bestEvaluation?.total_score || 0,
    desc: formatDate(bestEvaluation?.created_at),
    colorClass: "",
    icon: faStar,
  },
  {
    title: "إجمالي التقييمات",
    value: sortedEvaluations.length,
    desc: "تقييمات",
    colorClass: "",
    icon: faFileAlt,
  },
];
  }, [allEvaluations]);
  if (loading) {
    return (
      <div className="row g-3 mb-4">
        <div style={{ textAlign: "center", padding: "20px", color: "#64748b", fontWeight: "600" }}>جاري تحميل الإحصائيات...</div>
      </div>
    );
  }
  return (
    <div className="row g-3 mb-4">
      {statsData.map((item, index) => (
        <div className="col-md-4 col-lg-3 col-12" key={index}>
<StatCard
  title={item.title}
  value={item.value}
  desc={item.desc}
  colorClass={item.colorClass}
  icon={item.icon}
/>        </div>
      ))}
    </div>
  );
};
const StatCard = ({
  title,
  value,
  desc,
  colorClass,
  icon,
}) => (
  <div className="stat-card h-100">
    <div>
      <p>{title}</p>

      <h2 className={colorClass}>
        {value}
      </h2>

      <span>{desc}</span>
    </div>

    <div className="stat-icon">
      <FontAwesomeIcon icon={icon} />
    </div>
  </div>
);
export default QuickStatsCards;