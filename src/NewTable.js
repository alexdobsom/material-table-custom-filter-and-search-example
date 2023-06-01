import MaterialTable from "material-table";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";

export default function Table() {
  // const [searchTerm, setSearchTerm] = useState("");

  // useEffect(() => {
  //   console.log("searchTerm", searchTerm);
  // }, [searchTerm]);

  return (
    <div style={{ maxWidth: "100%" }}>
      <MaterialTable
        options={{
          filtering: true,
        }}
        onSearchChange={(term) => console.log(term)}
        columns={[
          { title: "Adı", field: "name", filtering: true },
          { title: "Soyadı", field: "surname", filtering: true },
          {
            title: "Doğum Yılı",
            field: "birthYear",
            type: "numeric",
            filtering: true,
          },
          {
            title: "Doğum Yeri",
            field: "birthCity",
            lookup: { 34: "İstanbul", 63: "Şanlıurfa" },
          },
        ]}
        data={[
          { name: "Mehmet", surname: "Baran", birthYear: 1987, birthCity: 63 },
          { name: "Mehmet", surname: "Baran", birthYear: 1987, birthCity: 63 },
          { name: "Mehmet", surname: "Baran", birthYear: 1917, birthCity: 63 },
        ]}
        title="Demo Title"
      />
    </div>
  );
}
