import React, { useMemo, useState } from "react";
import { faFutbol, faDumbbell, faBrain, faStar, faEye, faPersonRunning, faShieldHalved, faBolt, faFire, faMedal } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useReport } from "../../../context/ReportContext";
import "./SkillsOverview.css";
const SkillsOverview = () => {
  const { currentEvaluation, loading } = useReport();
  const [activeTab, setActiveTab] = useState("technical");
  const [showAllSkills, setShowAllSkills] = useState(false);
  const skillsScores = currentEvaluation?.skills_scores || {};
  const getScore = (key) => Number(skillsScores?.[key]) || 0;
  const technicalSkills = useMemo(() => [
    { title: "الاستلام والتسليم", score: getScore("الاستلام والتسليم"), color: "#2563ff", icon: faFutbol },
    { title: "التمرير", score: getScore("التمرير"), color: "#22c55e", icon: faPersonRunning },
    { title: "التصويب", score: getScore("التصويب"), color: "#9333ea", icon: faShieldHalved },
    { title: "المراوغة", score: getScore("المراوغة"), color: "#f59e0b", icon: faBolt },
    { title: "الرؤية والتمرير الطويل", score: getScore("الرؤية والتمرير الطويل"), color: "#14b8a6", icon: faEye },
    { title: "الأداء المهاري", score: getScore("الأداء المهاري"), color: "#ec4899", icon: faFire }
  ], [skillsScores]);
  const fitnessSkills = useMemo(() => [
    { title: "القوة", score: getScore("القوة"), color: "#f97316", icon: faDumbbell },
    { title: "التحمل", score: getScore("التحمل"), color: "#22c55e", icon: faMedal },
    { title: "السرعة", score: getScore("السرعة"), color: "#2563ff", icon: faBolt },
    { title: "الرشاقة", score: getScore("الرشاقة"), color: "#9333ea", icon: faPersonRunning },
    { title: "الاتزان والتناسق", score: getScore("الاتزان والتناسق"), color: "#14b8a6", icon: faShieldHalved },
    { title: "الأداء الحركي التوافقي", score: getScore("الأداء الحركي التوافقي"), color: "#f59e0b", icon: faFire }
  ], [skillsScores]);
  const mentalSkills = useMemo(() => [
    { title: "العمل الجماعي", score: getScore("العمل الجماعي"), color: "#22c55e", icon: faBrain },
    { title: "اتخاذ القرار", score: getScore("اتخاذ القرار"), color: "#10b981", icon: faStar },
    { title: "التركيز", score: getScore("التركيز"), color: "#ef4444", icon: faEye },
    { title: "الذكاء الكروي", score: getScore("الذكاء الكروي"), color: "#9333ea", icon: faBrain },
    { title: "الالتزام والانضباط", score: getScore("الالتزام والانضباط"), color: "#2563ff", icon: faShieldHalved },
    { title: "الشخصية والقيادة", score: getScore("الشخصية والقيادة"), color: "#ec4899", icon: faMedal }
  ], [skillsScores]);
  const tabs = [
    { key: "technical", title: "المهارات الفنية", icon: faFutbol, data: technicalSkills },
    { key: "fitness", title: "اللياقة البدنية", icon: faDumbbell, data: fitnessSkills },
    { key: "mental", title: "الذكاء والانضباط", icon: faBrain, data: mentalSkills }
  ];
  const allSkills = useMemo(() => [...technicalSkills, ...fitnessSkills, ...mentalSkills], [technicalSkills, fitnessSkills, mentalSkills]);
  const currentSkills = useMemo(() => (showAllSkills ? allSkills : tabs.find((t) => t.key === activeTab)?.data || []), [activeTab, showAllSkills, allSkills]);
  const averages = useMemo(() => {
    const calcAvg = (skills) => (skills.length ? Math.round(skills.reduce((acc, s) => acc + s.score, 0) / skills.length) : 0);
    return { technical: calcAvg(technicalSkills), fitness: calcAvg(fitnessSkills), mental: calcAvg(mentalSkills) };
  }, [technicalSkills, fitnessSkills, mentalSkills]);
  const getLevel = (s) => (s >= 90 ? "ممتاز" : s >= 80 ? "جيد جداً" : s >= 65 ? "جيد" : s >= 50 ? "مقبول" : "ضعيف");
  const getLevelClass = (s) => (s >= 90 ? "excellent" : s >= 80 ? "very-good" : s >= 65 ? "good" : s >= 50 ? "acceptable" : "weak");
  const renderStars = (s) => Array.from({ length: s >= 90 ? 5 : s >= 80 ? 4 : s >= 65 ? 3 : s >= 50 ? 2 : 1 }).map((_, i) => <FontAwesomeIcon key={i} icon={faStar} className="star-icon" />);
  const { topSkills, weakSkills } = useMemo(() => {
    const sorted = [...allSkills].sort((a, b) => b.score - a.score);
    return { topSkills: sorted.slice(0, 3), weakSkills: [...sorted].reverse().slice(0, 3) };
  }, [allSkills]);
  if (loading) return <div style={{ textAlign: "center", padding: "40px", color: "#64748b", fontWeight: "600" }}>جاري تحميل المهارات...</div>;
  return (
    <>
      <div className="skills-overview-section">
        <div className="skills-overview-header">
          <div className="header-title"><h2>تقرير الأداء التفصيلى للاعب</h2><p>تحليل كامل لجميع مهارات اللاعب</p></div>
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
          <button className="show-all-button" onClick={() => setShowAllSkills(!showAllSkills)}>{showAllSkills ? "عرض أقل" : `عرض جميع الـ ${allSkills.length} مهارة`}</button>
        </div>
      </div>
      <div className="performance-analysis-section">
        <div className="analysis-card strengths-card">
          <div className="analysis-header strengths"><h3>نقاط القوة</h3><FontAwesomeIcon icon={faMedal} /></div>
          <div className="analysis-list">
            {topSkills.map((s, i) => (
              <div className="analysis-item" key={i}>
                <div className="analysis-info"><span>{s.title}</span><strong>{s.score}%</strong></div>
                <div className="analysis-progress"><div className="analysis-progress-fill strengths-fill" style={{ width: `${s.score}%` }} /></div>
              </div>
            ))}
          </div>
        </div>
        <div className="analysis-card weakness-card">
          <div className="analysis-header weakness"><h3>يحتاج تطوير</h3><FontAwesomeIcon icon={faFire} /></div>
          <div className="analysis-list">
            {weakSkills.map((s, i) => (
              <div className="analysis-item" key={i}>
                <div className="analysis-info"><span>{s.title}</span><strong>{s.score}%</strong></div>
                <div className="analysis-progress"><div className="analysis-progress-fill weakness-fill" style={{ width: `${s.score}%` }} /></div>
              </div>
            ))}
          </div>
        </div>
        <div className="analysis-card overall-skills-card">
          <div className="analysis-header overall"><h3>ملخص المهارات</h3><FontAwesomeIcon icon={faFire} /></div>
          <div className="analysis-list">
            <div className="analysis-item"><div className="analysis-info"><span className="overall-label">المهارات الفنية</span><strong>{averages.technical}%</strong></div><div className="analysis-progress"><div className="analysis-progress-fill overall-fill" style={{ width: `${averages.technical}%` }} /></div></div>
            <div className="analysis-item"><div className="analysis-info"><span className="overall-label">اللياقة البدنية</span><strong>{averages.fitness}%</strong></div><div className="analysis-progress"><div className="analysis-progress-fill overall-fill" style={{ width: `${averages.fitness}%` }} /></div></div>
            <div className="analysis-item"><div className="analysis-info"><span className="overall-label">الذكاء والانضباط</span><strong>{averages.mental}%</strong></div><div className="analysis-progress"><div className="analysis-progress-fill overall-fill" style={{ width: `${averages.mental}%` }} /></div></div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SkillsOverview;