import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home/Home';
import ReportPage from './pages/ReportPage/ReportPage';


const ProtectedRoute = ({ children }) => {
  const { academyId, loading } = useAcademy();
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">جاري التحميل...</span>
        </div>
      </div>
    );
  }
  return academyId ? children : <Navigate to="/login" replace />;
};

function App() {

  return (
    <>
    <BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/report/:playerCode" element={<ReportPage />} /><Route path="/player-report/:playerCode/:evaluationId" element={<ReportPage />}/>
  </Routes>
</BrowserRouter>
    
    </>
  )
}

export default App
