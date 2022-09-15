import { AutoComplete, Input, Button } from "antd";
import React, { useState, useCallback } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { debounce } from "lodash";

import "./drug-search.scss";

const DRUG_NAMES_INDEX = 1;
const DRUG_CODES_INDEX = 2;
const DRUG_CODES_KEY = "RXCUIS";

const DEBOUNCE_DELAY = 1000;

const getDrugSearchUrl = (drugName) =>
  `https://clinicaltables.nlm.nih.gov/api/rxterms/v3/search?terms=${drugName}&ef=RXCUIS`;

export default function DrugSearch(props) {
  const { onAddDrug } = props;

  const [options, setOptions] = useState([]);
  const [value, setValue] = useState({});

  const fetchDrugsSearch = async (searchText) => {
    const drugListResponse = await fetch(getDrugSearchUrl(searchText));

    if (!drugListResponse.ok) {
      // Can be handled better - but left out of scope
      // I would have a global error handler that would show a toast
      console.error("Drug search failed - please try again later");

      return;
    }

    const drugList = await drugListResponse.json();
    const drugSearchOptions = drugList[DRUG_NAMES_INDEX].map((drug, index) => ({
      value: drug,
      codes: drugList[DRUG_CODES_INDEX][DRUG_CODES_KEY][index],
    }));

    setOptions(!searchText ? [] : drugSearchOptions);
  };

  const onSearch = useCallback(debounce(fetchDrugsSearch, DEBOUNCE_DELAY), []);

  return (
    <div className="drug-search">
      <div className="search-wrapper">
        <AutoComplete
          options={options}
          onSelect={(val, option) => setValue(option)}
          onSearch={onSearch}
          value={value.value}
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
      <div>
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
            setValue({});
          }}
        >
          Add Drug
        </Button>
      </div>
    </div>
  );
}
