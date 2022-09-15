import { AutoComplete, Input, Button } from "antd";
import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";

import "./drug-search.scss";

const DRUG_NAMES_INDEX = 1;
const DRUG_SEARCH_API_URL =
  "https://clinicaltables.nlm.nih.gov/api/rxterms/v3/search?terms=";

export default function DrugSearch(props) {
  const { onAddDrug } = props;

  const [options, setOptions] = useState([]);
  const [value, setValue] = useState("");

  // TODO: debounce and extract to util
  const onSearch = async (searchText) => {
    const rawDrugList = await fetch(`${DRUG_SEARCH_API_URL}${searchText}`);
    const drugList = await rawDrugList.json();
    const drugSearchOptions = drugList[DRUG_NAMES_INDEX].map((drug) => ({
      value: drug,
    }));

    setOptions(!searchText ? [] : drugSearchOptions);
  };

  return (
    <div className="drug-search">
      <div className="search-wrapper">
        <AutoComplete
          options={options}
          onSelect={setValue}
          onSearch={onSearch}
          style={{ width: "100%" }}
          placeholder="Search for a drug"
        >
          <Input
            style={{
              width: "100%",
              borderRadius: 4,
              border: "1px solid #ccc",
            }}
          />
        </AutoComplete>
      </div>
      <Button
        type="primary"
        style={{
          borderRadius: 4,
          height: "100%",
          marginTop: 2,
        }}
        icon={<PlusOutlined />}
        onClick={() => {
          onAddDrug(value);
          setValue("");
        }}
      >
        Add Drug
      </Button>
    </div>
  );
}
