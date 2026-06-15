import React, { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { supabase } from "../../../utils/supabaseClient";
import { useReport } from "../../../Context/ReportContext";
import { ACADEMY_ID } from "../../../config/academy";
const ComparePlayersCard = ({ compareInView }) => {
  const { t } = useTranslation();
  const { currentEvaluation, loading: contextLoading } = useReport();
  const [loading, setLoading] = useState(true);
  const [academyAverage, setAcademyAverage] = useState(0);
  const [bestPlayer, setBestPlayer] = useState(0);
  const [lowestPlayer, setLowestPlayer] = useState(0);
  useEffect(() => {
    const fetchAcademyStats = async () => {
      try {
        setLoading(true);
        const { data: academyEvaluations, error } = await supabase.from("evaluations").select("total_score").eq("academy_id", ACADEMY_ID);
        if (error) throw error;
        if (academyEvaluations?.length) {
          const scores = academyEvaluations.map((item) => Number(item.total_score) || 0);
          setAcademyAverage(Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length));
          setBestPlayer(Math.max(...scores));
          setLowestPlayer(Math.min(...scores));
        }
      } catch (err) {
        console.error("Compare card academy stats error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAcademyStats();
  }, []);
  const compareData = useMemo(() => {
    const playerScore = Number(currentEvaluation?.total_score) || 0;
    return [
      { label: currentEvaluation?.player_name || t("report.compare.player"), value: playerScore, color: "#2563ff" },
      { label: t("report.compare.academyAverage"), value: academyAverage, color: "#22c55e" },
      { label: t("report.compare.bestScore"), value: bestPlayer, color: "#9333ea" },
      { label: t("report.compare.lowestScore"), value: lowestPlayer, color: "#ef4444" }
    ];
  }, [currentEvaluation, academyAverage, bestPlayer, lowestPlayer, t]);
  const isPageLoading = contextLoading || loading;
  return (
    <div className="compare-card h-100">
      <h3>{t("report.compare.title")}</h3>
      {isPageLoading ? (
        <div style={{ height: "250px", display: "flex", alignItems: "center", justifyContent: "center", color: "#64748b", fontWeight: "600" }}>
          {t("report.compare.loading")}
        </div>
      ) : (
        compareData.map((item, index) => <CompareBar key={index} label={item.label} value={item.value} color={item.color} isVisible={compareInView} />)
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