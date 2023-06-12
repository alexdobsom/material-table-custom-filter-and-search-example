import { forwardRef } from "react";
import { useState } from "react";
import MaterialTable from "material-table";

import AddBoxIcon from "@material-ui/icons/AddBox";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import CheckIcon from "@material-ui/icons/Check";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ClearIcon from "@material-ui/icons/Clear";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditIcon from "@material-ui/icons/Edit";
import FilterListIcon from "@material-ui/icons/FilterList";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import LastPageIcon from "@material-ui/icons/LastPage";
import RemoveIcon from "@material-ui/icons/Remove";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import SearchIcon from "@material-ui/icons/Search";
import ViewColumnIcon from "@material-ui/icons/ViewColumn";
import MenuOpenIcon from "@material-ui/icons/MenuOpen";
import HistoryIcon from "@material-ui/icons/History";

import { customFilterAndSearch } from "material-table-custom-filter-and-search";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBoxIcon {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <CheckIcon {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <ClearIcon {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => (
    <DeleteOutlineIcon {...props} ref={ref} />
  )),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRightIcon {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <EditIcon {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAltIcon {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterListIcon {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPageIcon {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPageIcon {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => (
    <ChevronRightIcon {...props} ref={ref} />
  )),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeftIcon {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <ClearIcon {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <SearchIcon {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => (
    <ArrowDownwardIcon {...props} ref={ref} />
  )),
  ThirdStateCheck: forwardRef((props, ref) => (
    <RemoveIcon {...props} ref={ref} />
  )),
  ViewColumn: forwardRef((props, ref) => (
    <ViewColumnIcon {...props} ref={ref} />
  )),
  MenuOpen: forwardRef((props, ref) => <MenuOpenIcon {...props} ref={ref} />),
  History: forwardRef((props, ref) => <HistoryIcon {...props} ref={ref} />),
};

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
