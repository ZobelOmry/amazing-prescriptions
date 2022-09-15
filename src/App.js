import React, { useState } from "react";
import DrugSearch from "./drug-search/drug-search";

import "./app.scss";

export default function App() {
  const [drugList, setDrugList] = useState("");

  const onAddDrug = (drug) => {
    if (!drug) {
      return;
    }

    // TODO: consider adding to local storage
    setDrugList((drugList) => [...new Set([...drugList, drug])]);
  };

  return (
    <div className="app">
      <div className="app-title">Drug Prescription App</div>
      <div className="app-content">
        <DrugSearch onAddDrug={onAddDrug}></DrugSearch>
        {drugList}
      </div>
    </div>
  );
}
