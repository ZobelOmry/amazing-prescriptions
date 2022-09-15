import React, { useState, useEffect } from "react";
import DrugSearch from "./drug-search/drug-search";
import DrugsTable from "./prescription-table/prescription-table";
import DrugInteractionAlerts from "./drug-interaction-alerts/drug-interaction-alerts";
import moment from "moment";
import { isEmpty } from "lodash";

import { DATE_FORMAT } from "./constants";

import "./app.scss";

const DEFAULT_PRESCRIPTION_DATE = "2016/05/12";
const LOCAL_STORAGE_KEY = "drugList";

const getDataFromLocalStorage = () => {
  const storeData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  return storeData.map((drug) => {
    return {
      ...drug,
      date: moment(drug.date),
    };
  });
};

const saveDataToLocalStorage = (drugList) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(drugList));
};

export default function App() {
  const [drugList, setDrugList] = useState(getDataFromLocalStorage() || []);

  useEffect(() => {
    saveDataToLocalStorage(drugList);
  }, [drugList]);

  const onAddDrug = (drug) => {
    if (!drug || isEmpty(drug)) {
      return;
    }

    const drugObject = {
      name: drug.value,
      codes: drug.codes,
      date: moment(DEFAULT_PRESCRIPTION_DATE, DATE_FORMAT),
    };

    setDrugList((drugList) => [...drugList, drugObject]);
  };

  const onDelete = (index) => {
    const newDrugList = [...drugList];
    newDrugList.splice(index, 1);

    setDrugList(newDrugList);
  };

  const onChangeDate = (index, date) => {
    const newDrugList = [...drugList];
    newDrugList[index].date = date;
    setDrugList(newDrugList);
  };

  return (
    <div className="app">
      <div className="app-title">Drug Prescription App</div>
      <div className="app-content">
        <DrugSearch onAddDrug={onAddDrug}></DrugSearch>
        {drugList.length > 0 && (
          <DrugsTable
            drugList={drugList}
            onDelete={onDelete}
            onChangeDate={onChangeDate}
          ></DrugsTable>
        )}
        <DrugInteractionAlerts drugList={drugList}></DrugInteractionAlerts>
      </div>
    </div>
  );
}
