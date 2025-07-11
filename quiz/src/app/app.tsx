import { Routes, Route } from "react-router-dom";
import { Form } from "./Form/Form";
import { LandingTargeted } from "./Form/LandingTargeted";
export function App() {
  return (
    <Routes>
      <Route path="/" element={<Form />} />
      <Route path="/targeted" element={<LandingTargeted />} />
    </Routes>
  );
}

export default App;
