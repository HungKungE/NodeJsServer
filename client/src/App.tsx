import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import IndexPage from './Pages/IndexPage';
import HomePage from './Pages/HomePage';

const App: React.FunctionComponent = () => {
  return (
    <div className="w-full h-screen">
    <Router>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
