import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { XrayDiagnosisPage } from './pages/XrayDiagnosisPage';
import { CoughAnalysisPage } from './pages/CoughAnalysisPage';
import { ChatbotPage } from './pages/ChatbotPage';
import { PDFReportPage } from './pages/PDFReportPage';
import { AboutPage } from './pages/AboutPage';
import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/xray-diagnosis" element={<XrayDiagnosisPage />} />
          <Route path="/cough-analysis" element={<CoughAnalysisPage />} />
          <Route path="/chatbot" element={<ChatbotPage />} />
          <Route path="/pdf-report" element={<PDFReportPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;