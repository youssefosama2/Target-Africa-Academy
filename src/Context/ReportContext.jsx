import React, { createContext, useContext, useState, useEffect, useCallback,} from "react";
import { supabase } from "../utils/supabaseClient";
import { ACADEMY_ID } from "../config/academy";

const ReportContext = createContext();

export const ReportProvider = ({ playerCode, evaluationId, children,}) => {
  const [playerData, setPlayerData] = useState(null);
  const [currentEvaluation, setCurrentEvaluation] = useState(null);
  const [allEvaluations, setAllEvaluations] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadReportData = useCallback(async () => {
    if (!playerCode) return;
    try {
      setLoading(true);
      const { data: player, error: playerError } = await supabase
        .from("players")
        .select("*")
        .eq("academy_id", ACADEMY_ID)
        .eq("player_code", playerCode)
        .single();
      console.log("PLAYER =>", player);
      console.log("PLAYER ERROR =>", playerError);

      if (playerError || !player) {
        setPlayerData(null);
        setCurrentEvaluation(null);
        setAllEvaluations([]);
        return;
      }

      setPlayerData(player);

      const { data: allRows, error: allRowsError } = await supabase
        .from("evaluations")
        .select("*")
        .eq("academy_id", ACADEMY_ID)
        .order("created_at", { ascending: false });

      if (allRowsError) {
        console.error(allRowsError);
        return;
      }

      const playerEvaluations =
        allRows?.filter(
          (item) =>
            String(item.player_code).trim() ===
            String(playerCode).trim()
        ) || [];

      console.log(
        "PLAYER EVALUATIONS =>",
        playerEvaluations
      );
      console.log(
  "CURRENT EVALUATION =>",
  playerEvaluations[0]
);

      setAllEvaluations(playerEvaluations);
      console.log("CURRENT EVALUATION ID =", evaluationId);

console.log(
  "FOUND EVALUATION =",
  playerEvaluations.find(
    (e) => String(e.id) === String(evaluationId)
  )
);

      if (playerEvaluations.length > 0) {
        const selected = evaluationId
          ? playerEvaluations.find(
              (e) =>
                String(e.id) === String(evaluationId)
            )
          : playerEvaluations[0];

        setCurrentEvaluation(
          selected || playerEvaluations[0]
        );
      } else {
        setCurrentEvaluation(null);
      }
    } catch (err) {
      console.error("ReportContext Error:", err);
    } finally {
      setLoading(false);
    }
  }, [playerCode, evaluationId]);
  

  useEffect(() => {
    loadReportData();
  }, [loadReportData]);
  

  return (
    <ReportContext.Provider
      value={{
        playerData,
        currentEvaluation,
        allEvaluations,
        loading,
      }}
    >
      {children}
    </ReportContext.Provider>
  );
};

export const useReport = () => useContext(ReportContext);