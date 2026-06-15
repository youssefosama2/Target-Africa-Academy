import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";
import { useReport } from "../../../context/ReportContext"; 

const CoachNotesCard = () => {
  const { currentEvaluation, loading } = useReport();
  const notes = currentEvaluation?.notes || "";

  return (
    <div className="notes-card-new h-100">
      <div className="notes-header">
        <FontAwesomeIcon icon={faClipboardList} className="notes-icon" />
        <h3>ملاحظات المدرب</h3>
      </div>
      {loading ? (
        <p style={{ color: "#64748b", fontWeight: "600" }}>جاري تحميل الملاحظات...</p>
      ) : (
        <p>{notes.trim() ? notes : "لا توجد ملاحظات للمدرب حتى الآن."}</p>
      )}
    </div>
  );
};

export default CoachNotesCard;