import React from "react";
import "./ReportPage.css";
import { ReportProvider, useReport } from "../../Context/ReportContext";
import PlayerInfoCard from "../../components/PlayerReport/PlayerInfoCard/PlayerInfoCard";
import QuickStatsCards from "../../components/PlayerReport/QuickStatsCards/QuickStatsCards";
import RadarSkillsChart from "../../components/PlayerReport/RadarSkillsChart/RadarSkillsChart";
import PerformanceChart from "../../components/PlayerReport/PerformanceChart/PerformanceChart";
import ComparePlayersCard from "../../components/PlayerReport/ComparePlayersCard/ComparePlayersCard";
import CoachNotesCard from "../../components/PlayerReport/CoachNotesCard/CoachNotesCard";
import EvolutionPerformanceChart from "../../components/PlayerReport/EvolutionPerformanceChart/EvolutionPerformanceChart";
import OverallRatingCard from "../../components/PlayerReport/OverallRatingCard/OverallRatingCard";
import SkillsOverview from "../../components/PlayerReport/SkillsOverview/SkillsOverview";
import EvaluationsTable from "../../components/PlayerReport/EvaluationsTable/EvaluationsTable";
import { useInView } from "react-intersection-observer";
import { useParams } from "react-router-dom";
import ReportActions from "../../components/PlayerReport/ReportActions/ReportActions";
import { useTranslation } from "react-i18next";
function ReportContent() {
  const { playerData, loading } = useReport();
  const { t } = useTranslation();
  const { ref: radarRef, inView: radarInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: performanceRef, inView: performanceInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: evolutionRef, inView: evolutionInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: compareRef, inView: compareInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  if (loading) {
    return (
      <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <h3>{t("report.page.loadingReport")}</h3>
      </div>
    );
  }
  if (!playerData) {
    return (
      <div className="container text-center py-5" style={{ minHeight: "70vh" }}>
        <h1>⚽</h1>
        <h2 className="mb-3">{t("report.page.playerNotFound")}</h2>
        <p>{t("report.page.playerNotFoundDescription")}</p>
      </div>
    );
  }
  return (
    <div className="dashboard">
      <main className="main-content">
        <div className="report-page container-fluid">
          <ReportActions />
          <PlayerInfoCard />
          <QuickStatsCards />
          <div className="row g-3 mb-4">
            <div className="col-lg-3" ref={radarRef}>
              <RadarSkillsChart radarInView={radarInView} />
            </div>
            <div className="col-lg-6" ref={performanceRef}>
              <PerformanceChart performanceInView={performanceInView} />
            </div>
            <div className="col-lg-3" ref={compareRef}>
              <ComparePlayersCard compareInView={compareInView} />
            </div>
          </div>
          <div className="row g-3 mb-4">
            <div className="col-lg-3">
              <CoachNotesCard />
            </div>
            <div className="col-lg-6" ref={evolutionRef}>
              <EvolutionPerformanceChart evolutionInView={evolutionInView} />
            </div>
            <div className="col-lg-3">
              <OverallRatingCard />
            </div>
          </div>
          <SkillsOverview />
          <EvaluationsTable />
        </div>
      </main>
    </div>
  );
}
const ReportPage = () => {
  const { playerCode, evaluationId } = useParams();
  return (
    <ReportProvider playerCode={playerCode} evaluationId={evaluationId}>
      <ReportContent />
    </ReportProvider>
  );
};
export default ReportPage;