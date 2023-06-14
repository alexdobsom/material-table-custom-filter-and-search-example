import { useState, useRef } from "react";
import MaterialTable from "material-table";
import { customFilterAndSearch } from "material-table-custom-filter-and-search";
import { tableIcons } from "./icons";

export default function Table() {
  const searchTerm = useRef("");
  const filtersArray = useRef();

  function defaultFilter(field) {
    // if (!filtersArray.length) return;
    return filtersArray.current?.find((filter) => filter.column.field === field)
      ?.value;
  }

  return (
    <div style={{ maxWidth: "100%" }}>
      <MaterialTable
        icons={tableIcons}
        onFilterChange={(filters) => {
          console.log("filters: ", filters);
          filtersArray.current = [...filters];
        }}
        onSearchChange={(term) => {
          console.log("term: ", term);
          searchTerm.current = term;
        }}
        options={{
          filtering: true,
        }}
        columns={[
          {
            title: "Name",
            field: "name",
            filtering: true,
            searchable: true,
            get defaultFilter() {
              return defaultFilter(this.field);
            },
            customFilterAndSearch: function (value, rowData) {
              return customFilterAndSearch(
                value,
                rowData,
                this.field,
                filtersArray.current,
                searchTerm.current,
                ["name", "surname", "age", "city"],
                rowData[this.field].toLowerCase().includes(value.toLowerCase())
              );
            },
          },
          {
            title: "Surname",
            field: "surname",
            get defaultFilter() {
              return defaultFilter(this.field);
            },
            customFilterAndSearch: function (value, rowData) {
              return customFilterAndSearch(
                value,
                rowData,
                this.field,
                filtersArray.current,
                searchTerm.current,
                ["name", "surname", "age", "city"],
                rowData[this.field].toLowerCase().includes(value.toLowerCase())
              );
            },
          },
          {
            title: "Age",
            field: "age",
            type: "numeric",
            get defaultFilter() {
              return defaultFilter(this.field);
            },
            customFilterAndSearch: function (value, rowData) {
              console.log(
                Number(rowData[this.field]),
                Number(value),
                Number(rowData[this.field]) >= Number(value)
              );
              return customFilterAndSearch(
                value,
                rowData,
                this.field,
                filtersArray.current,
                searchTerm.current,
                ["name", "surname", "age", "city"],
                Number(rowData[this.field]) >= Number(value),
                true
              );
            },
          },
          {
            title: "City",
            field: "city",
            lookup: { 1: "Paris", 2: "Madrid" },
            get defaultFilter() {
              return defaultFilter(this.field);
            },
            customFilterAndSearch: function (value, rowData) {
              return customFilterAndSearch(
                value,
                rowData,
                this.field,
                filtersArray.current,
                searchTerm.current,
                ["name", "surname", "age", "city"],
                value.length
                  ? value.includes(rowData[this.field].toString())
                  : true
              );
            },
          },
        ]}
        data={[
          {
            name: "Ana Belle",
            surname: "Sarandon",
            age: 22,
            city: 1,
          },
          {
            name: "Anabel",
            surname: "Smith",
            age: 23,
            city: 2,
          },
          {
            name: "Belmondo",
            surname: "Johnny",
            age: 33,
            city: 1,
          },
        ]}
        title="Demo Table"
      />
    </div>
  );
}
