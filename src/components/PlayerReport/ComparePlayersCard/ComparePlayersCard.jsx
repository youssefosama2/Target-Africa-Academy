import React, { useState, useEffect, useMemo } from "react";
import { supabase } from "../../../utils/supabaseClient";
import { useAcademy } from "../../../context/AcademyContext";
import { useReport } from "../../../context/ReportContext";

const ComparePlayersCard = ({ compareInView }) => {
  const { academyId } = useAcademy();
  const { currentEvaluation, loading: contextLoading } = useReport();
  const [loading, setLoading] = useState(true);
  const [academyAverage, setAcademyAverage] = useState(0);
  const [bestPlayer, setBestPlayer] = useState(0);
  const [lowestPlayer, setLowestPlayer] = useState(0);

  useEffect(() => {
    if (!academyId) return;
    const fetchAcademyStats = async () => {
      try {
        setLoading(true);
        const { data: academyEvaluations, error: academyError } = await supabase
          .from("evaluations")
          .select("total_score")
          .eq("academy_id", academyId);
        if (academyError) throw academyError;
        if (academyEvaluations && academyEvaluations.length > 0) {
          const scores = academyEvaluations.map((item) => Number(item.total_score) || 0);
          const academyAvg = Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length);
          const best = Math.max(...scores);
          const lowest = Math.min(...scores);
          setAcademyAverage(academyAvg);
          setBestPlayer(best);
          setLowestPlayer(lowest);
        }
      } catch (err) {
        console.error("Compare card academy stats error:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAcademyStats();
  }, [academyId]);

  const compareData = useMemo(() => {
    const playerScore = Number(currentEvaluation?.total_score) || 0;
    const playerName = currentEvaluation?.player_name || "اللاعب";
    return [
      { label: playerName, value: playerScore, color: "#2563ff" },
      { label: "متوسط الأكاديمية", value: academyAverage, color: "#22c55e" },
      { label: "أفضل تقييم", value: bestPlayer, color: "#9333ea" },
      { label: "أقل تقييم", value: lowestPlayer, color: "#ef4444" }
    ];
  }, [currentEvaluation, academyAverage, bestPlayer, lowestPlayer]);

  const isPageLoading = contextLoading || loading;

  return (
    <div className="compare-card h-100">
      <h3>مقارنة اللاعبين</h3>
      {isPageLoading ? (
        <div style={{ height: "250px", display: "flex", alignItems: "center", justifyContent: "center", color: "#64748b", fontWeight: "600" }}>
          جاري تحميل البيانات...
        </div>
      ) : (
        compareData.map((item, index) => (
          <CompareBar key={index} label={item.label} value={item.value} color={item.color} isVisible={compareInView} />
        ))
      )}
    </div>
  );
};

const CompareBar = ({ label, value, color, isVisible }) => {
  const [currentWidth, setCurrentWidth] = useState(0);
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => { setCurrentWidth(value); }, 100);
      return () => clearTimeout(timer);
    }
  }, [value, isVisible]);

  return (
    <div className="compare-item">
      <div className="compare-top">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="compare-progress">
        <div style={{ width: `${currentWidth}%`, background: color, transition: "width 1.5s ease-out" }} />
      </div>
    </div>
  );
};

export default ComparePlayersCard;