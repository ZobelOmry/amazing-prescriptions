import { Alert } from "antd";
import { useEffect, useState } from "react";

import "./drug-interaction-alerts.scss";

const getDrugInteractionUrl = (codes) =>
  `https://rxnav.nlm.nih.gov/REST/interaction/list.json?rxcuis=${codes.join(
    "+"
  )}`;

// This is mock data -
// based on this https://lhncbc.nlm.nih.gov/RxNav/APIs/api-Interaction.findInteractionsFromList.html
const severityMap = {
  moderate: "warning",
  high: "error",
  low: "info",
  "N/A": "warning",
};

export default function DrugInteractionAlerts(props) {
  const { drugList } = props;

  const [drugCodes, setDrugCodes] = useState([]);
  const [interactionList, setInteractionList] = useState([]);

  const addInteraction = (interaction) => {
    if (interactionList.some((elem) => elem.message === interaction.message)) {
      // don't add duplicates
      return;
    }

    setInteractionList([...interactionList, interaction]);
  };

  useEffect(() => {
    const codes = drugList.map((drug) => drug.codes[0]);
    setDrugCodes(codes);
  }, [drugList]);

  useEffect(() => {
    const getDrugInteractions = async () => {
      setInteractionList([]);
      if (drugCodes.length === 0) {
        return;
      }

      const interactionsResponse = await fetch(
        getDrugInteractionUrl(drugCodes)
      );

      if (!interactionsResponse.ok) {
        // Can be handled better - but left out of scope
        // I would have a global error handler that would show a toast
        console.error(
          "Drug interactions search failed - please try again later"
        );

        return;
      }
      const interactions = await interactionsResponse.json();

      if (
        !interactions.fullInteractionTypeGroup ||
        interactions.fullInteractionTypeGroup.length === 0
      ) {
        return;
      }

      interactions.fullInteractionTypeGroup?.forEach((interaction) => {
        interaction.fullInteractionType?.forEach((interactionType) => {
          interactionType.interactionPair?.forEach((interactionPair) => {
            const { description, severity } = interactionPair;

            addInteraction({ message: description, severity });
          });
        });
      });
    };

    getDrugInteractions();
  }, [drugCodes]);

  return (
    <div className="drug-interaction-alerts">
      {interactionList.map((interaction) => (
        <Alert
          key={interaction.message}
          message={interaction.message}
          type={severityMap[interaction.severity]}
          showIcon
          style={{ marginTop: 16 }}
        />
      ))}
    </div>
  );
}
