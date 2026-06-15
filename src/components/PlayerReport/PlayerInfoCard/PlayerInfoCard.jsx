import React from "react";
import { useTranslation } from "react-i18next";
import { useReport } from "../../../Context/ReportContext";
import "./PlayerInfoCard.css";

const getPositionKey = (position) => {
  switch (position?.trim()) {
    case "مهاجم": case "Forward": return "forward";
    case "مدافع": case "Defender": return "defender";
    case "خط وسط": case "Midfielder": return "midfielder";
    case "حارس مرمى": case "Goalkeeper": return "goalkeeper";
    default: return null;
  }
};

const PlayerInfoCard = () => {
  const { t } = useTranslation();
  const { playerData, currentEvaluation, loading } = useReport();

  if (loading) {
    return (
      <div className="row mb-4">
        <div className="col-12">
          <section className="player-info-card" style={{ minHeight: "160px", display: "flex", alignItems: "center", justifyContent: "center", color: "#64748b", fontWeight: "600" }}>
            {t("report.playerInfo.loadingPlayer")}
          </section>
        </div>
      </div>
    );
  }

  if (!playerData) {
    return (
      <div className="row mb-4">
        <div className="col-12">
          <section className="player-info-card" style={{ minHeight: "160px", display: "flex", alignItems: "center", justifyContent: "center", color: "#ef4444", fontWeight: "600" }}>
            {t("report.playerInfo.playerNotFound")}
          </section>
        </div>
      </div>
    );
  }

  const coachName = currentEvaluation?.coach_name || "---";
  const positionKey = getPositionKey(playerData?.position);

  const dataFields = [
    { label: t("report.playerInfo.coach"), value: coachName },
    { label: t("report.playerInfo.ageCategory"), value: playerData.age_category ? `${playerData.age_category} ${t("report.playerInfo.years")}` : "---" },
    { label: t("report.playerInfo.position"), value: positionKey ? t(`report.playerInfo.positions.${positionKey}`) : playerData.position || "---" },
    { label: t("report.playerInfo.playerCode"), value: playerData.player_code || "---" },
  ];

  return (
    <div className="row mb-4">
      <div className="col-12">
        <section className="player-info-card">
          <div className="player-profile">
            <img 
              src={playerData.avatar_url || "/assets/default-player.png"} 
              alt={playerData.name || t("report.playerInfo.player")} 
              onError={(e) => { e.target.src = "/assets/default-player.png"; }} 
            />
            <div>
              <h3>{playerData.name || t("report.playerInfo.player")}</h3>
            </div>
          </div>

          <div className="player-data">
            {dataFields.map((item, index) => (
              <DataField key={index} label={item.label} value={item.value} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

const DataField = ({ label, value }) => (
  <div className="data-item">
    <span>{label}</span>
    <strong>{value}</strong>
  </div>
);

export default PlayerInfoCard;