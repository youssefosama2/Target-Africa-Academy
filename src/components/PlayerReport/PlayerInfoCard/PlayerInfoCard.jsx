import React from "react";
import { useReport } from "../../../context/ReportContext";
import "./PlayerInfoCard.css";
const PlayerInfoCard = () => {
  const { playerData, currentEvaluation, loading } = useReport();
  if (loading) {
    return (
      <div className="row mb-4">
        <div className="col-12">
          <section className="player-info-card" style={{ minHeight: "160px", display: "flex", alignItems: "center", justifyContent: "center", color: "#64748b", fontWeight: "600" }}>
            جاري تحميل بيانات اللاعب...
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
            اللاعب غير موجود
          </section>
        </div>
      </div>
    );
  }
  const coachName = currentEvaluation?.coach_name || "---";
  const dataFields = [
    { label: "المدرب", value: coachName },
    { label: "الفئة العمرية", value: playerData.age_category ? `${playerData.age_category} سنة` : "---" },
    { label: "المركز", value: playerData.position || "---" },
    { label: "رقم اللاعب", value: playerData.player_code || "---" }
  ];
  return (
    <div className="row mb-4">
      <div className="col-12">
        <section className="player-info-card">
          <div className="player-profile">
            <img 
              src={playerData.avatar_url || "/assets/default-player.png"} 
              alt={playerData.full_name || "player"} 
              onError={(e) => { e.target.src = "/assets/default-player.png"; }} 
            />
            <div><h3>{playerData.full_name || playerData.name || "لاعب"}</h3></div>
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