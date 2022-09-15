import DrugSearch from "./drug-search/drug-search";

import "./app.scss";

export default function App() {
  return (
    <div className="app">
      <div class="app-title">Drug Prescription App</div>
      <div className="app-content">
        <DrugSearch></DrugSearch>
      </div>
    </div>
  );
}
