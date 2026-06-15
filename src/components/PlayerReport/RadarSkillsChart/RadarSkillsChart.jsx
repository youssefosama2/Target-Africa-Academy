import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip } from "recharts";
import { useReport } from "../../../Context/ReportContext";

const RadarSkillsChart = ({ radarInView }) => {
  const { t } = useTranslation();
  const { currentEvaluation, loading } = useReport();

  const getValue = (scores, key) => Number(scores?.[key]) || 0;

  const radarData = useMemo(() => {
    const scores = currentEvaluation?.skills_scores || {};
    const position = currentEvaluation?.position || "";

    if (position.includes("مهاجم")) {
      return [
        { subject: t("report.radarSkills.shooting"), A: getValue(scores, "التصويب") },
        { subject: t("report.radarSkills.dribbling"), A: getValue(scores, "المراوغة") },
        { subject: t("report.radarSkills.speed"), A: getValue(scores, "السرعة") },
        { subject: t("report.radarSkills.footballIQ"), A: getValue(scores, "الذكاء الكروي") },
        { subject: t("report.radarSkills.agility"), A: getValue(scores, "الرشاقة") },
        { subject: t("report.radarSkills.skillPerformance"), A: getValue(scores, "الأداء المهاري") }
      ];
    }

    if (position.includes("وسط")) {
      return [
        { subject: t("report.radarSkills.passing"), A: getValue(scores, "التمرير") },
        { subject: t("report.radarSkills.longVision"), A: getValue(scores, "الرؤية والتمرير الطويل") },
        { subject: t("report.radarSkills.endurance"), A: getValue(scores, "التحمل") },
        { subject: t("report.radarSkills.footballIQ"), A: getValue(scores, "الذكاء الكروي") },
        { subject: t("report.radarSkills.decisionMaking"), A: getValue(scores, "اتخاذ القرار") },
        { subject: t("report.radarSkills.teamwork"), A: getValue(scores, "العمل الجماعي") }
      ];
    }

    if (position.includes("مدافع")) {
      return [
        { subject: t("report.radarSkills.strength"), A: getValue(scores, "القوة") },
        { subject: t("report.radarSkills.speed"), A: getValue(scores, "السرعة") },
        { subject: t("report.radarSkills.focus"), A: getValue(scores, "التركيز") },
        { subject: t("report.radarSkills.footballIQ"), A: getValue(scores, "الذكاء الكروي") },
        { subject: t("report.radarSkills.discipline"), A: getValue(scores, "الالتزام والانضباط") },
        { subject: t("report.radarSkills.balance"), A: getValue(scores, "الاتزان والتناسق") }
      ];
    }

    if (position.includes("حارس")) {
      return [
        { subject: t("report.radarSkills.focus"), A: getValue(scores, "التركيز") },
        { subject: t("report.radarSkills.agility"), A: getValue(scores, "الرشاقة") },
        { subject: t("report.radarSkills.strength"), A: getValue(scores, "القوة") },
        { subject: t("report.radarSkills.leadership"), A: getValue(scores, "الشخصية والقيادة") },
        { subject: t("report.radarSkills.decisionMaking"), A: getValue(scores, "اتخاذ القرار") },
        { subject: t("report.radarSkills.footballIQ"), A: getValue(scores, "الذكاء الكروي") }
      ];
    }

    return [
      { subject: t("report.radarSkills.skillPerformance"), A: getValue(scores, "الأداء المهاري") },
      { subject: t("report.radarSkills.endurance"), A: getValue(scores, "التحمل") },
      { subject: t("report.radarSkills.footballIQ"), A: getValue(scores, "الذكاء الكروي") },
      { subject: t("report.radarSkills.speed"), A: getValue(scores, "السرعة") },
      { subject: t("report.radarSkills.passing"), A: getValue(scores, "التمرير") },
      { subject: t("report.radarSkills.shooting"), A: getValue(scores, "التصويب") }
    ];
  }, [currentEvaluation, t]);

  return (
    <div className="chart-card">
      <h3>{t("report.radarSkills.title")}</h3>
      {loading ? (
        <div style={{ height: 300, display: "flex", alignItems: "center", justifyContent: "center", color: "#64748b", fontWeight: "600" }}>
          {t("report.radarSkills.loading")}
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          {radarInView ? (
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
              <PolarGrid stroke="#E9EDF7" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12 }} />
              <Radar dataKey="A" stroke="#4318ff" fill="#4318ff" fillOpacity={0.2} strokeWidth={3} />
              <Tooltip formatter={(value) => [value, t("report.radarSkills.score")]} />
            </RadarChart>
          ) : (
            <div style={{ height: 300 }} />
          )}
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default RadarSkillsChart;