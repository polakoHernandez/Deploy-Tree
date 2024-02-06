import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";

function InputBuscar({ label, onChange, value, ref, name }) {
  const [file, setFile] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  useEffect(() => {}, [file]);

  return (
    <div>
      <label
        htmlFor="fileInput"
        style={{
          display: "block",
          marginBottom: "8px",
          fontFamily: "'Nunito Sans', sans-serif",
        }}
      >
        {label}
      </label>
      <input
        value={value}
        name={name}
        ref={ref}
        // value={value}
        type="file"
        id="fileInput"
        accept=".pdf, .png, .jpg, .jpeg, .gif"
        onChange={onChange}
        style={{
          //   backgroundColor: "rgb(0,164,228)",
          fontFamily: "'Nunito Sans', sans-serif",
          border: "1px solid rgb(0,164,228)",
          borderRadius: "5px",
          width: "95%",
        }}
      />
    </div>
  );
}

export default InputBuscar;
