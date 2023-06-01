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
        onSearchChange={(term) => console.log(term)}
        columns={[
          { title: "Adı", field: "name" },
          { title: "Soyadı", field: "surname" },
          { title: "Doğum Yılı", field: "birthYear", type: "numeric" },
          {
            title: "Doğum Yeri",
            field: "birthCity",
            lookup: { 34: "İstanbul", 63: "Şanlıurfa" },
          },
        ]}
        data={[
          { name: "Mehmet", surname: "Baran", birthYear: 1987, birthCity: 63 },
        ]}
        title="Demo Title"
      />
    </div>
  );
}
