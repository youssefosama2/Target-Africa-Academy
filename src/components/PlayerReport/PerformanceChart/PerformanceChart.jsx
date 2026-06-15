import React, { useMemo } from "react";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { useReport } from "../../../context/ReportContext";
const monthsArabic = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];
const PerformanceChart = ({ performanceInView }) => {
  const { allEvaluations, currentEvaluation, loading } = useReport();
  const performanceData = useMemo(() => {
    if (!allEvaluations?.length) return [];
    let filteredEvals = [...allEvaluations];
    if (currentEvaluation?.created_at) {
      const targetDate = new Date(currentEvaluation.created_at);
      filteredEvals = allEvaluations.filter((item) => new Date(item.created_at) <= targetDate);
    }
    const grouped = {};
    filteredEvals.forEach((item) => {
      if (!item.created_at) return;
      const date = new Date(item.created_at);
      const monthIndex = date.getMonth();
      const year = date.getFullYear();
      const key = `${year}-${monthIndex}`;
      if (!grouped[key]) {
        grouped[key] = {
          month: monthsArabic[monthIndex],
          year,
          scores: [],
          sortDate: new Date(year, monthIndex),
        };
      }
      grouped[key].scores.push(Number(item.total_score) || 0);
    });
    return Object.values(grouped)
      .sort((a, b) => a.sortDate - b.sortDate)
      .slice(-6)
      .map((item) => ({
        month: item.month,
        value: Math.round(item.scores.reduce((sum, score) => sum + score, 0) / item.scores.length),
      }));
  }, [allEvaluations, currentEvaluation]);
  return (
    <div className="chart-card">
      <h3>تطور التقييم العام</h3>
      {loading ? (
        <div style={{ height: "300px", display: "flex", alignItems: "center", justifyContent: "center", color: "#64748b", fontWeight: "600" }}>
          جاري تحميل البيانات...
        </div>
      ) : performanceData.length === 0 ? (
        <div style={{ height: "300px", display: "flex", alignItems: "center", justifyContent: "center", color: "#64748b", fontWeight: "600" }}>
          لا توجد تقييمات حتى الآن
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          {performanceInView ? (
            <LineChart data={performanceData} margin={{ top: 20, right: 20, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4318ff" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#4318ff" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="0" vertical={false} stroke="#F4F7FE" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#A3AED0", fontSize: 12 }} />
              <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fill: "#A3AED0", fontSize: 12 }} />
              <Tooltip contentStyle={{ borderRadius: "10px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", textAlign: "right" }} />
              <Line type="monotone" dataKey="value" stroke="#4318ff" strokeWidth={3} dot={{ r: 5, fill: "#4318ff", stroke: "#fff" }} activeDot={{ r: 7 }} />
            </LineChart>
          ) : (
            <div style={{ height: 300 }} />
          )}
        </ResponsiveContainer>
      )}
    </div>
  );
};
export default PerformanceChart;