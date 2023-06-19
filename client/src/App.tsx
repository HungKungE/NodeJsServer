import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import IndexPage from './Pages/IndexPage';

const App: React.FunctionComponent = () => {
  return (
    <div className="w-full h-screen">
    <Router>
      <Routes>
        <Route path="/" element={<IndexPage />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
