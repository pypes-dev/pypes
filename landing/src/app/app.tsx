import NxWelcome from "./Welcome";
import { Routes, Route } from "react-router-dom";
export function App() {
  return (
    <Routes>
      <Route path="/" element={<NxWelcome />} />
    </Routes>
  );
}

export default App;
