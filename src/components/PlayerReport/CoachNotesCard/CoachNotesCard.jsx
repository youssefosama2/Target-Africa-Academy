import React from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";
import { useReport } from "../../../Context/ReportContext";
const CoachNotesCard = () => {
  const { t } = useTranslation();
  const { currentEvaluation, loading } = useReport();
  const notes = currentEvaluation?.notes || "";
  return (
    <div className="notes-card-new h-100">
      <div className="notes-header">
        <FontAwesomeIcon icon={faClipboardList} className="notes-icon" />
        <h3>{t("report.coachNotes.title")}</h3>
      </div>
      {loading ? (
        <p style={{ color: "#64748b", fontWeight: "600" }}>{t("coachNotes.loadingNotes")}</p>
      ) : (
        <p>{notes.trim() ? notes : t("coachNotes.noCoachNotes")}</p>
      )}
    </div>
  );
};
export default CoachNotesCard;