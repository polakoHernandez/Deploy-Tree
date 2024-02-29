import React, { useState } from "react";
import InputSelect from "../Componentes/General/InputSelect";
const Probandoo = () => {
  const [data, setData] = useState("");
  return (
    <div>
      <InputSelect
        value={{ label: data }}
        options={[{ label: "1" }, { label: "2" }]}
        onChange={(e) => {
          console.log(e.target.value);
          setData(e.target.value);
        }}
      ></InputSelect>
    </div>
  );
};

export default Probandoo;
