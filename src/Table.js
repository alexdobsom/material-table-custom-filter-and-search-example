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
    columnName, // name of the table column field
    filtersArray, // all the filters saved from table in a react state -> `useState([])`
    searchTerm, // value of the table search input saved in a react state -> `useState("")`
    lookupKeys = [], // array of strings; the fields that should be searched for `searchTerm`, example: ["name", "surname", "birth"]
    FILTER_CONDITION // the condition for Filter to return `true` as in accepted row for display
  ) {
    console.log(value, rowData, columnName);

    if (lookupKeys.length === 0) lookupKeys = [...rowData];

    // CONDITION FOR FILTER SEARCH:
    const columFilterValue = filtersArray.find(
      (filter) => filter.column.field === columnName
    )?.value;

    if (columFilterValue) {
      // FLTER SEARCH
      let searchTermIsFoundInRow = null;

      lookupKeys.forEach((key) => {
        if (typeof rowData[key] === "string") {
          const isTrue = rowData[key].includes(searchTerm);
          if (isTrue) {
            return (searchTermIsFoundInRow = rowData[key]);
          }
        }
        if (typeof rowData[key] === "number") {
          const isTrue = rowData[key].toString().includes(searchTerm);
          if (isTrue) {
            return (searchTermIsFoundInRow = rowData[key]);
          }
        }
        if (typeof rowData[key] === "object") {
          const isTrue = Object.keys(rowData[key])
            .map((key) => rowData[key][key])
            .join("")
            .includes(searchTerm);
          if (isTrue) {
            return (searchTermIsFoundInRow = rowData[key]);
          }
        }
        if (Array.isArray(rowData[key])) {
          const isTrue = rowData[key].includes(searchTerm);
          if (isTrue) {
            return (searchTermIsFoundInRow = rowData[key]);
          }
        }
      });

      // examples of FILTER_CONDITION:
      // rowData[columnName].includes(value);
      // or
      // rowData[columnName].length > value.length;

      const conditionForFilteringisTrue =
        searchTermIsFoundInRow && FILTER_CONDITION;

      return conditionForFilteringisTrue ? true : false;
    } else {
      // TABLE SEARCH
      const conditionForSearch = rowData[columnName].includes(searchTerm);
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
            defaultFilter: filtersArray.find(
              (filter) => filter.column.field === "name"
            )?.value,
            customFilterAndSearch: function (value, rowData) {
              return customFilterAndSearch(
                value,
                rowData,
                this.field,
                filtersArray,
                searchTerm,
                ["name", "surname", "birth"],
                rowData[this.field].includes(value)
              );
            },
          },
          {
            title: "Surname",
            field: "surname",
          },
          {
            title: "Age",
            field: "birth",
            type: "numeric",
          },
          //   {
          //     title: "City",
          //     field: "city",
          //     lookup: { 1: "Arad", 2: "Timisoara" },
          //   },
        ]}
        data={[
          {
            name: "aa",
            surname: "Baran",
            birth: 1987,
            // city: 1,
          },
          {
            name: "ehm",
            surname: "abaa",
            birth: 1980,
            // city: 2,
          },
          {
            name: "aaab",
            surname: "bb",
            birth: 1900,
            // city: 1,
          },
        ]}
        title="Demo Title"
      />
    </div>
  );
}
