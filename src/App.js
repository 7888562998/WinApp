import { Home } from "./Pages/Home";
import { WinLog } from "./Pages/WinLog";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="winning-logs" element={<WinLog />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
