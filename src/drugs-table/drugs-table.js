import { Table, DatePicker } from "antd";
import React from "react";
import moment from "moment";
import { CloseCircleFilled } from "@ant-design/icons";
import { DATE_FORMAT } from "../constants";

import "./drugs-table.scss";

const getColumns = (onDelete, onChangeDate) => [
  {
    dataIndex: "name",
    key: "name",
    width: "65%",
    render: (text) => <div>{text}</div>,
  },
  {
    dataIndex: "date",
    key: "date",
    width: "30%",
    render: (date, record, index) => (
      <DatePicker
        defaultValue={date}
        format={DATE_FORMAT}
        onChange={(newDate) => onChangeDate(index, newDate)}
      />
    ),
  },
  {
    key: "delete",
    width: "5%",
    render: (text, record, index) => (
      <div className="delete-icon">
        <CloseCircleFilled onClick={() => onDelete(index)} />
      </div>
    ),
  },
];

export default function DrugsTable(props) {
  const { drugList, onDelete, onChangeDate } = props;

  return (
    <div className="drugs-table">
      <Table
        showHeader={false}
        columns={getColumns(onDelete, onChangeDate)}
        dataSource={drugList}
        pagination={false}
      />
    </div>
  );
}
