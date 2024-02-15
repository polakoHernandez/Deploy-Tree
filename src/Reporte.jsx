import React from "react";
import * as XLSX from "xlsx";

const ExportToExcel = ({ fileName, sheetName }) => {
  const data = [
    { Name: "Bill Clinton", Index: 42 },
    { Name: "GeorgeW Bush", Index: 43 },
    { Name: "Barack Obama", Index: 44 },
    { Name: "Donald Trump", Index: 45 },
    { Name: "Joseph Biden", Index: 46 },
  ];

  //*fuction to download data json like excel
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data); //sectio to converto json to sheet
    const wb = XLSX.utils.book_new(); //section to create a ne exce book
    XLSX.utils.book_append_sheet(wb, ws, sheetName || "Sheet1"); // section to include data into sheet

    // Guardar el archivo
    XLSX.writeFile(wb, fileName || "excel-export.xlsx"); //section to download data type xmlx
  };

  return (
    <div>
      <button onClick={exportToExcel}>Exportar a Excel</button>
    </div>
  );
};

export default ExportToExcel;
