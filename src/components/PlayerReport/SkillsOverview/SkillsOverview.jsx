import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faFutbol, faDumbbell, faBrain, faStar, faEye, 
  faPersonRunning, faShieldHalved, faBolt, faFire, faMedal 
} from "@fortawesome/free-solid-svg-icons";
import { useReport } from "../../../Context/ReportContext";
import "./SkillsOverview.css";

const SkillsOverview = () => {
  const { currentEvaluation, loading } = useReport();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("technical");
  const [showAllSkills, setShowAllSkills] = useState(false);

  const skillsScores = currentEvaluation?.skills_scores || {};
  const getScore = (key) => Number(skillsScores?.[key]) || 0;

  const technicalSkills = useMemo(() => [
    { title: t("report.skills.receivePass"), score: getScore("الاستلام والتسليم"), color: "#2563ff", icon: faFutbol },
    { title: t("report.skills.passing"), score: getScore("التمرير"), color: "#22c55e", icon: faPersonRunning },
    { title: t("report.skills.shooting"), score: getScore("التصويب"), color: "#9333ea", icon: faShieldHalved },
    { title: t("report.skills.dribbling"), score: getScore("المراوغة"), color: "#f59e0b", icon: faBolt },
    { title: t("report.skills.vision"), score: getScore("الرؤية والتمرير الطويل"), color: "#14b8a6", icon: faEye },
    { title: t("report.skills.technicalPerformance"), score: getScore("الأداء المهاري"), color: "#ec4899", icon: faFire },
  ], [skillsScores, t]);

  const fitnessSkills = useMemo(() => [
    { title: t("report.skills.strength"), score: getScore("القوة"), color: "#f97316", icon: faDumbbell },
    { title: t("report.skills.endurance"), score: getScore("التحمل"), color: "#22c55e", icon: faMedal },
    { title: t("report.skills.speed"), score: getScore("السرعة"), color: "#2563ff", icon: faBolt },
    { title: t("report.skills.agility"), score: getScore("الرشاقة"), color: "#9333ea", icon: faPersonRunning },
    { title: t("report.skills.balance"), score: getScore("الاتزان والتناسق"), color: "#14b8a6", icon: faShieldHalved },
    { title: t("report.skills.coordination"), score: getScore("الأداء الحركي التوافقي"), color: "#f59e0b", icon: faFire },
  ], [skillsScores, t]);

  const mentalSkills = useMemo(() => [
    { title: t("report.skills.teamwork"), score: getScore("العمل الجماعي"), color: "#22c55e", icon: faBrain },
    { title: t("report.skills.decisionMaking"), score: getScore("اتخاذ القرار"), color: "#10b981", icon: faStar },
    { title: t("report.skills.focus"), score: getScore("التركيز"), color: "#ef4444", icon: faEye },
    { title: t("report.skills.footballIQ"), score: getScore("الذكاء الكروي"), color: "#9333ea", icon: faBrain },
    { title: t("report.skills.discipline"), score: getScore("الالتزام والانضباط"), color: "#2563ff", icon: faShieldHalved },
    { title: t("report.skills.leadership"), score: getScore("الشخصية والقيادة"), color: "#ec4899", icon: faMedal },
  ], [skillsScores, t]);

  const tabs = [
    { key: "technical", title: t("report.skillsOverview.technical"), icon: faFutbol, data: technicalSkills },
    { key: "fitness", title: t("report.skillsOverview.fitness"), icon: faDumbbell, data: fitnessSkills },
    { key: "mental", title: t("report.skillsOverview.mental"), icon: faBrain, data: mentalSkills },
  ];

  const allSkills = useMemo(() => [...technicalSkills, ...fitnessSkills, ...mentalSkills], [technicalSkills, fitnessSkills, mentalSkills]);
  const currentSkills = useMemo(() => (showAllSkills ? allSkills : tabs.find((t) => t.key === activeTab)?.data || []), [activeTab, showAllSkills, allSkills]);

  const averages = useMemo(() => {
    const calcAvg = (skills) => (skills.length ? Math.round(skills.reduce((acc, s) => acc + s.score, 0) / skills.length) : 0);
    return { technical: calcAvg(technicalSkills), fitness: calcAvg(fitnessSkills), mental: calcAvg(mentalSkills) };
  }, [technicalSkills, fitnessSkills, mentalSkills]);

  const { topSkills, weakSkills } = useMemo(() => {
    const sorted = [...allSkills].sort((a, b) => b.score - a.score);
    return { topSkills: sorted.slice(0, 3), weakSkills: [...sorted].reverse().slice(0, 3) };
  }, [allSkills]);

  const getLevel = (score) => {
    if (score >= 90) return t("report.skillsOverview.excellent");
    if (score >= 80) return t("report.skillsOverview.veryGood");
    if (score >= 65) return t("report.skillsOverview.good");
    if (score >= 50) return t("report.skillsOverview.acceptable");
    return t("report.skillsOverview.weak");
  };

  const getLevelClass = (s) => (s >= 90 ? "excellent" : s >= 80 ? "very-good" : s >= 65 ? "good" : s >= 50 ? "acceptable" : "weak");
  const renderStars = (s) => Array.from({ length: s >= 90 ? 5 : s >= 80 ? 4 : s >= 65 ? 3 : s >= 50 ? 2 : 1 }).map((_, i) => <FontAwesomeIcon key={i} icon={faStar} className="star-icon" />);

  if (loading) return <div style={{ textAlign: "center", padding: "40px", color: "#64748b", fontWeight: "600" }}>{t("report.skillsOverview.loading")}</div>;

  return (
    <>
      <div className="skills-overview-section">
        <div className="skills-overview-header">
          <div className="header-title">
            <h2>{t("report.skillsOverview.title")}</h2>
            <p>{t("report.skillsOverview.subtitle")}</p>
          </div>
          <div className="skills-tabs">
            {tabs.map((tab) => (
              <button key={tab.key} className={`skills-tab ${activeTab === tab.key && !showAllSkills ? "active" : ""}`} onClick={() => { setActiveTab(tab.key); setShowAllSkills(false); }}>
                <FontAwesomeIcon icon={tab.icon} /><span>{tab.title}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="skills-grid-overview">
          {currentSkills.map((skill, i) => (
            <div className="skill-card-overview" key={i}>
              <div className="skill-card-header">
                <div className="skill-icon-box" style={{ background: `${skill.color}15`, color: skill.color }}><FontAwesomeIcon icon={skill.icon} /></div>
                <div className="skill-data"><h4>{skill.title}</h4><strong>{skill.score}%</strong></div>
              </div>
              <div className="progress-bar"><div className="progress-fill" style={{ width: `${skill.score}%`, background: skill.color }} /></div>
              <div className="skill-footer-overview"><span className={`skill-level ${getLevelClass(skill.score)}`}>{getLevel(skill.score)}</span><div className="stars-wrapper">{renderStars(skill.score)}</div></div>
            </div>
          ))}
        </div>

        <div className="show-all-wrapper">
          <button className="show-all-button" onClick={() => setShowAllSkills(!showAllSkills)}>{showAllSkills ? t("report.skillsOverview.showLess") : t("report.skillsOverview.showAll", { count: allSkills.length })}</button>
        </div>
      </div>

      <div className="performance-analysis-section">
        <AnalysisCard title={t("report.skillsOverview.strengths")} icon={faMedal} type="strengths" data={topSkills} />
        <AnalysisCard title={t("report.skillsOverview.weaknesses")} icon={faFire} type="weakness" data={weakSkills} />
        <div className="analysis-card overall-skills-card">
          <div className="analysis-header overall"><h3>{t("report.skillsOverview.summary")}</h3><FontAwesomeIcon icon={faFire} /></div>
          <div className="analysis-list">
            <SummaryItem label={t("report.skillsOverview.technicalSummary")} score={averages.technical} />
            <SummaryItem label={t("report.skillsOverview.fitnessSummary")} score={averages.fitness} />
            <SummaryItem label={t("report.skillsOverview.mentalSummary")} score={averages.mental} />
          </div>
        </div>
      </div>
    </>
  );
};

const AnalysisCard = ({ title, icon, type, data }) => (
  <div className={`analysis-card ${type}-card`}>
    <div className={`analysis-header ${type}`}><h3>{title}</h3><FontAwesomeIcon icon={icon} /></div>
    <div className="analysis-list">
      {data.map((s, i) => (
        <div className="analysis-item" key={i}>
          <div className="analysis-info"><span>{s.title}</span><strong>{s.score}%</strong></div>
          <div className="analysis-progress"><div className={`analysis-progress-fill ${type}-fill`} style={{ width: `${s.score}%` }} /></div>
        </div>
      ))}
    </div>
  </div>
);

const SummaryItem = ({ label, score }) => (
  <div className="analysis-item">
    <div className="analysis-info"><span className="overall-label">{label}</span><strong>{score}%</strong></div>
    <div className="analysis-progress"><div className="analysis-progress-fill overall-fill" style={{ width: `${score}%` }} /></div>
  </div>
);

export default SkillsOverview;