import React, { useMemo } from "react";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";
import { useReport } from "../../../context/ReportContext"; 

const monthsArabic = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];

const EvolutionPerformanceChart = ({ evolutionInView }) => {
  const { allEvaluations, currentEvaluation, loading } = useReport();

  const calculateAverage = (skills, keys) => {
    const values = keys.map(key => Number(skills?.[key] || 0));
    if (!values.length) return 0;
    const total = values.reduce((acc, value) => acc + value, 0);
    return Math.round(total / values.length);
  };

  const evolutionData = useMemo(() => {
    if (!allEvaluations || allEvaluations.length === 0) return [];

    let filteredEvals = [...allEvaluations];
    if (currentEvaluation?.created_at) {
      const targetDate = new Date(currentEvaluation.created_at);
      filteredEvals = allEvaluations.filter(item => new Date(item.created_at) <= targetDate);
    }

    filteredEvals.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

    const groupedMonths = {};
    filteredEvals.forEach(item => {
      const skills = item.skills_scores || {};
      const technical = calculateAverage(skills, ["الاستلام والتسليم", "التمرير", "التصويب", "المراوغة", "الرؤية والتمرير الطويل", "الأداء المهاري"]);
      const fitness = calculateAverage(skills, ["القوة", "التحمل", "السرعة", "الرشاقة", "الاتزان والتناسق", "الأداء الحركي التوافقي"]);
      const mental = calculateAverage(skills, ["العمل الجماعي", "اتخاذ القرار", "التركيز", "الذكاء الكروي", "الالتزام والانضباط", "الشخصية والقيادة"]);
      
      const date = new Date(item.created_at);
      const monthKey = `${monthsArabic[date.getMonth()]} ${date.getFullYear()}`;
      
      if (!groupedMonths[monthKey]) { 
        groupedMonths[monthKey] = { month: monthKey, technicalTotal: 0, fitnessTotal: 0, mentalTotal: 0, count: 0 }; 
      }
      groupedMonths[monthKey].technicalTotal += technical;
      groupedMonths[monthKey].fitnessTotal += fitness;
      groupedMonths[monthKey].mentalTotal += mental;
      groupedMonths[monthKey].count += 1;
    });

    return Object.values(groupedMonths).map(item => ({
      month: item.month,
      "المهارات الفنية": Math.round(item.technicalTotal / item.count),
      "اللياقة البدنية": Math.round(item.fitnessTotal / item.count),
      "الذكاء والانضباط": Math.round(item.mentalTotal / item.count),
    }));
  }, [allEvaluations, currentEvaluation]);

  return (
    <div className="chart-card evolution-card">
      <h3>تطور الأداء عبر الشهور</h3>
      {loading ? (
        <div style={{ height: 300, display: "flex", alignItems: "center", justifyContent: "center", color: "#64748b", fontWeight: "600" }}>
          جاري تحميل البيانات...
        </div>
      ) : evolutionData.length === 0 ? (
        <div style={{ height: 300, display: "flex", alignItems: "center", justifyContent: "center", color: "#64748b", fontWeight: "600" }}>
          لا توجد بيانات
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          {evolutionInView ? (
            <LineChart data={evolutionData} margin={{ top: 25, right: 25, left: -25, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" padding={{ left: 20, right: 20 }} tick={{ fill: "#94a3b8", fontSize: 12 }} />
              <YAxis domain={[0, 100]} padding={{ top: 20, bottom: 10 }} tick={{ fill: "#94a3b8", fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="المهارات الفنية" stroke="#22c55e" strokeWidth={3} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="اللياقة البدنية" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="الذكاء والانضباط" stroke="#9333ea" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          ) : ( <div style={{ height: 250 }} /> )}
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default EvolutionPerformanceChart;