import React, { useState } from "react";
import DrugSearch from "./drug-search/drug-search";
import DrugsTable from "./prescription-table/prescription-table";
import moment from "moment";
import { isEmpty } from "lodash";

import { DATE_FORMAT } from "./constants";

import "./app.scss";

const DEFAULT_PRESCRIPTION_DATE = "2016/05/12";

export default function App() {
  const [drugList, setDrugList] = useState([]);

  const onAddDrug = (drug) => {
    if (!drug || isEmpty(drug)) {
      return;
    }

    const drugObject = {
      name: drug.value,
      codes: drug.codes,
      date: moment(DEFAULT_PRESCRIPTION_DATE, DATE_FORMAT),
    };

    // TODO: consider adding to local storage
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
      </div>
    </div>
  );
}
