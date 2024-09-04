import React, { useState } from "react";

function Dropdown({
  selectedOption,
  setSelectedOptionHandler,
  dropdownOptions,
}) {
  return (
    <div className="">
      <select
        className="p-0 border-2 border-black text-lg px-2 cursor-pointer outline-none"
        value={selectedOption}
        onChange={(event) => {
          setSelectedOptionHandler(event.target.value);
        }}
      >
        {dropdownOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Dropdown;
