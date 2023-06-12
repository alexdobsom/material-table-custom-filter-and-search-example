import MaterialTable from "material-table";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { customFilterAndSearch } from "material-table-custom-filter-and-search";

export default function Table() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filtersArray, setFiltersArray] = useState([]);

  useEffect(() => {
    console.log("searchTerm", searchTerm);
  }, [searchTerm]);

  function defaultFilter(field) {
    return filtersArray?.find((filter) => filter.column.field === field)?.value;
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
              return defaultFilter(this.field);
            },
            customFilterAndSearch: function (value, rowData) {
              return customFilterAndSearch(
                value,
                rowData,
                this.field,
                filtersArray,
                searchTerm,
                ["name", "surname", "age"],
                rowData[this.field]?.toLowerCase().includes(value.toLowerCase())
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
