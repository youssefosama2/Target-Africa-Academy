import React, { useMemo } from "react";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip } from "recharts";
import { useReport } from "../../../context/ReportContext";
const RadarSkillsChart = ({ radarInView }) => {
  const { currentEvaluation, loading } = useReport();
  const getValue = (scores, key) => Number(scores?.[key]) || 0;
  const radarData = useMemo(() => {
    const scores = currentEvaluation?.skills_scores || {};
    const position = currentEvaluation?.position || "";
    if (position.includes("مهاجم")) {
      return [
        { subject: "التصويب", A: getValue(scores, "التصويب") },
        { subject: "المراوغة", A: getValue(scores, "المراوغة") },
        { subject: "السرعة", A: getValue(scores, "السرعة") },
        { subject: "الذكاء الكروي", A: getValue(scores, "الذكاء الكروي") },
        { subject: "الرشاقة", A: getValue(scores, "الرشاقة") },
        { subject: "الأداء المهاري", A: getValue(scores, "الأداء المهاري") }
      ];
    }
    if (position.includes("وسط")) {
      return [
        { subject: "التمرير", A: getValue(scores, "التمرير") },
        { subject: "الرؤية والتمرير الطويل", A: getValue(scores, "الرؤية والتمرير الطويل") },
        { subject: "التحمل", A: getValue(scores, "التحمل") },
        { subject: "الذكاء الكروي", A: getValue(scores, "الذكاء الكروي") },
        { subject: "اتخاذ القرار", A: getValue(scores, "اتخاذ القرار") },
        { subject: "العمل الجماعي", A: getValue(scores, "العمل الجماعي") }
      ];
    }
    if (position.includes("مدافع")) {
      return [
        { subject: "القوة", A: getValue(scores, "القوة") },
        { subject: "السرعة", A: getValue(scores, "السرعة") },
        { subject: "التركيز", A: getValue(scores, "التركيز") },
        { subject: "الذكاء الكروي", A: getValue(scores, "الذكاء الكروي") },
        { subject: "الالتزام والانضباط", A: getValue(scores, "الالتزام والانضباط") },
        { subject: "الاتزان والتناسق", A: getValue(scores, "الاتزان والتناسق") }
      ];
    }
    if (position.includes("حارس")) {
      return [
        { subject: "التركيز", A: getValue(scores, "التركيز") },
        { subject: "الرشاقة", A: getValue(scores, "الرشاقة") },
        { subject: "القوة", A: getValue(scores, "القوة") },
        { subject: "الشخصية والقيادة", A: getValue(scores, "الشخصية والقيادة") },
        { subject: "اتخاذ القرار", A: getValue(scores, "اتخاذ القرار") },
        { subject: "الذكاء الكروي", A: getValue(scores, "الذكاء الكروي") }
      ];
    }
    return [
      { subject: "الأداء المهاري", A: getValue(scores, "الأداء المهاري") },
      { subject: "التحمل", A: getValue(scores, "التحمل") },
      { subject: "الذكاء الكروي", A: getValue(scores, "الذكاء الكروي") },
      { subject: "السرعة", A: getValue(scores, "السرعة") },
      { subject: "التمرير", A: getValue(scores, "التمرير") },
      { subject: "التصويب", A: getValue(scores, "التصويب") }
    ];
  }, [currentEvaluation]);
  return (
    <div className="chart-card">
      <h3>أداء المهارات</h3>
      {loading ? (
        <div style={{ height: 300, display: "flex", alignItems: "center", justifyContent: "center" }}>جاري تحميل البيانات...</div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          {radarInView ? (
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
              <PolarGrid stroke="#E9EDF7" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12 }} />
              <Radar dataKey="A" stroke="#4318ff" fill="#4318ff" fillOpacity={0.2} strokeWidth={3} />
              <Tooltip />
            </RadarChart>
          ) : ( <div style={{ height: 300 }} /> )}
        </ResponsiveContainer>
      )}
    </div>
  );
};
export default RadarSkillsChart;