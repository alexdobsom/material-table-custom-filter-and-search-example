import { useState } from "react";
import MaterialTable from "material-table";
import { customFilterAndSearch } from "material-table-custom-filter-and-search";
import { tableIcons } from "./icons";

export default function Table() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filtersArray, setFiltersArray] = useState([]);

  function defaultFilter(field) {
    return filtersArray?.find((filter) => filter.column.field === field)?.value;
  }

  return (
    <div style={{ maxWidth: "100%" }}>
      <MaterialTable
        icons={tableIcons}
        onFilterChange={(filters) => {
          setFiltersArray([...filters]);
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
                ["name", "surname", "age", "city"],
                rowData[this.field].length > value.length
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
                filtersArray,
                searchTerm,
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
              return customFilterAndSearch(
                value,
                rowData,
                this.field,
                filtersArray,
                searchTerm,
                ["name", "surname", "age", "city"],
                rowData[this.field].toString().includes(value)
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
                filtersArray,
                searchTerm,
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
        title="Demo Title"
      />
    </div>
  );
}
