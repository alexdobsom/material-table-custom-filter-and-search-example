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
            customFilterAndSearch: (value, rowData) => {
              console.log(value, rowData);

              // CONDITION FOR FILTER SEARCH:
              const columFilterValue = filtersArray.find(
                (filter) => filter.column.field === "name"
              )?.value;

              if (columFilterValue) {
                // FLTER SEARCH
                let searchTermIsFound = null;

                const lookupKeys = ["name", "surname", "birth"];

                lookupKeys.forEach((key) => {
                  if (typeof rowData[key] === "string") {
                    const isTrue = rowData[key].includes(searchTerm);
                    if (isTrue) {
                      return (searchTermIsFound = rowData[key]);
                    }
                  }
                  if (typeof rowData[key] === "number") {
                    const isTrue = rowData[key].toString().includes(searchTerm);
                    if (isTrue) {
                      return (searchTermIsFound = rowData[key]);
                    }
                  }
                  if (typeof rowData[key] === "object") {
                    const isTrue = Object.keys(rowData[key])
                      .map((key) => rowData[key][key])
                      .join("")
                      .includes(searchTerm);
                    if (isTrue) {
                      return (searchTermIsFound = rowData[key]);
                    }
                  }
                  if (Array.isArray(rowData[key])) {
                    const isTrue = rowData[key].includes(searchTerm);
                    if (isTrue) {
                      return (searchTermIsFound = rowData[key]);
                    }
                  }
                });

                const conditionForFilteringIsTrue =
                  searchTermIsFound &&
                  rowData.name.length > columFilterValue.length;

                return conditionForFilteringIsTrue ? true : false;
              } else {
                // TABLE SEARCH
                const conditionForSearchIsTrue =
                  rowData.name.includes(searchTerm);

                return conditionForSearchIsTrue ? true : false;
              }
            },
          },
          // {
          //   title: "Name",
          //   field: "name",
          //   customFilterAndSearch: (value, rowData) => {
          //     console.log(
          //       searchTerm,
          //       value,
          //       rowData,
          //       rowData.name,
          //       rowData.name.indexOf(searchTerm)
          //     );

          //     return rowData["name"].indexOf(searchTerm) !== -1 ? true : false;
          //   },
          // },
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
            name: "aaa",
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
