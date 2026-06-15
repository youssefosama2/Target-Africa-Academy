import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faShareNodes, faCopy } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import Swal from "sweetalert2";
import "./ReportActions.css";

const ReportActions = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({
          title: t("report.actions.shareTitle"),
          text: t("report.actions.shareText"),
          url,
        });
        return;
      }
      await navigator.clipboard.writeText(url);
      showSuccessAlert();
    } catch (err) {
      console.error("Share failed:", err);
    }
  };

  const handleWhatsappShare = () => {
    const url = window.location.href;
    const text = `${t("report.actions.shareWhatsappTitle")}\n\n${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      showSuccessAlert();
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  const showSuccessAlert = () => {
    Swal.fire({
      icon: "success",
      title: t("report.actions.linkCopied"),
      timer: 1500,
      showConfirmButton: false,
      scrollbarPadding: false,
    });
  };

  return (
    <div className="report-actions">
      <button className="action-btn home-btn" onClick={() => navigate("/")}>
        <FontAwesomeIcon icon={faHouse} />
        <span>{t("report.actions.home")}</span>
      </button>

      <button className="action-btn whatsapp-btn" onClick={handleWhatsappShare}>
        <FontAwesomeIcon icon={faWhatsapp} />
        <span>{t("report.actions.whatsapp")}</span>
      </button>

      <button className="action-btn share-btn" onClick={handleShare}>
        <FontAwesomeIcon icon={faShareNodes} />
        <span>{t("report.actions.share")}</span>
      </button>

      <button className="action-btn copy-btn" onClick={copyLink}>
        <FontAwesomeIcon icon={faCopy} />
        <span>{t("report.actions.copyLink")}</span>
      </button>
    </div>
  );
};

export default ReportActions;