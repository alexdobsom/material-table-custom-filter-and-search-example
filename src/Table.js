import MaterialTable from "material-table";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";

export default function Table() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filtersArray, setFiltersArray] = useState([]);

  useEffect(() => {
    console.log("searchTerm", searchTerm);
  }, [searchTerm]);

  function customFilterAndSearch(
    value, // value of the column filter input / table search input, should come from the table's `customFilterAndSearch`
    rowData, // data of a table row, should come from table's `customFilterAndSearch`
    columnField, // name of the table column field
    filtersArray, // all the filters saved from table in a react state -> `useState([])`
    searchTerm, // value of the table search input saved in a react state -> `useState("")`
    lookupColumnFields = [], // array of strings; all the (necessary) fields that should be included for searching based on `searchTerm`, example: ["name", "surname", "birth"]
    FILTER_CONDITION // the condition for Filter to return `true` as in accepted row for display
  ) {
    console.log(value, rowData, columnField);

    if (lookupColumnFields.length === 0)
      lookupColumnFields = [...Object.keys(rowData)];

    // CONDITION FOR FILTER SEARCH:

    const termExistsOnRow = (field) => {
      let searchTermIsFoundInRow = null;
      const fieldValue = rowData[field];

      if (typeof fieldValue === "string") {
        const isTrue = fieldValue
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        if (isTrue) {
          return (searchTermIsFoundInRow = fieldValue);
        }
      }
      if (typeof fieldValue === "number") {
        const isTrue = fieldValue.toString().includes(searchTerm);
        if (isTrue) {
          return (searchTermIsFoundInRow = fieldValue);
        }
      }
      if (Array.isArray(fieldValue)) {
        const isTrue = fieldValue
          .map((field) => field.toLowerCase())
          .includes(searchTerm.toLowerCase());
        if (isTrue) {
          return (searchTermIsFoundInRow = fieldValue);
        }
      }
      if (typeof fieldValue === "object") {
        const isTrue = Object.keys(fieldValue)
          .map((field) => fieldValue[field].toLowerCase())
          .join("")
          .includes(searchTerm.toLowerCase());
        if (isTrue) {
          return (searchTermIsFoundInRow = fieldValue);
        }
      }
      return searchTermIsFoundInRow ? true : false;
    };

    const columFilterValue = filtersArray.find(
      (filter) => filter.column.field === columnField
    )?.value;

    if (columFilterValue) {
      // FLTER SEARCH

      const termExistsInAnyCell = lookupColumnFields.some(termExistsOnRow);

      // examples of FILTER_CONDITION:
      // rowData[columnField].includes(value);
      // or
      // rowData[columnField].length > value.length;

      const conditionForFilteringisTrue =
        termExistsInAnyCell && FILTER_CONDITION;

      return conditionForFilteringisTrue ? true : false;
    } else {
      // TABLE SEARCH
      // const conditionForSearch = rowData[columnField].includes(searchTerm);
      const conditionForSearch = termExistsOnRow(columnField);

      return conditionForSearch ? true : false;
    }
  }

  return (
    <div style={{ maxWidth: "100%" }}>
      <MaterialTable
        onFilterChange={(filters) => {
          setFiltersArray([...filters]);
          // console.log("onFilterChange", filters);
        }}
        onSearchChange={(term) => {
          console.log(term);
          setSearchTerm(term);
        }}
        options={{
          filtering: true,
        }}
        columns={[
          {
            title: "Names",
            field: "name",
            filtering: true,
            searchable: true,
            // defaultFilter: filtersArray.find(
            //   (filter) => filter.column.field === "name"
            // )?.value,
            get defaultFilter() {
              return filtersArray.find(
                (filter) => filter.column.field === this.field
              )?.value;
            },
            customFilterAndSearch: function (value, rowData) {
              return customFilterAndSearch(
                value,
                rowData,
                this.field,
                filtersArray,
                searchTerm,
                ["name", "surname", "age"],
                rowData[this.field].toLowerCase().includes(value.toLowerCase())
              );
            },
          },
          {
            title: "Surname",
            field: "surname",
            get defaultFilter() {
              return filtersArray.find(
                (filter) => filter.column.field === this.field
              )?.value;
            },
            customFilterAndSearch: function (value, rowData) {
              return customFilterAndSearch(
                value,
                rowData,
                this.field,
                filtersArray,
                searchTerm,
                ["name", "surname", "age"],
                rowData[this.field].toLowerCase().includes(value.toLowerCase())
              );
            },
          },
          {
            title: "Age",
            field: "age",
            type: "numeric",
            get defaultFilter() {
              return filtersArray.find(
                (filter) => filter.column.field === this.field
              )?.value;
            },
            customFilterAndSearch: function (value, rowData) {
              return customFilterAndSearch(
                value,
                rowData,
                this.field,
                filtersArray,
                searchTerm,
                ["name", "surname", "age"],
                rowData[this.field].toString().includes(value)
              );
            },
          },
          {
            title: "City",
            field: "city",
            lookup: { 1: "Arad", 2: "Timisoara" },
            get defaultFilter() {
              return filtersArray.find(
                (filter) => filter.column.field === this.field
              )?.value;
            },
            customFilterAndSearch: function (value, rowData) {
              return customFilterAndSearch(
                value,
                rowData,
                this.field,
                filtersArray,
                searchTerm,
                ["name", "surname", "age"],
                value.length
                  ? value.includes(rowData[this.field].toString())
                  : true
              );
            },
          },
        ]}
        data={[
          {
            name: "aa",
            surname: "Baran",
            age: 1980,
            city: 1,
          },
          {
            name: "ehm",
            surname: "abaa",
            age: 1980,
            city: 2,
          },
          {
            name: "aaab",
            surname: "bb",
            age: 1900,
            city: 1,
          },
        ]}
        title="Demo Title"
      />
    </div>
  );
}
