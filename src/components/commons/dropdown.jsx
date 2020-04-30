import React from "react";

const Dropdown = ({ name, label, list }) => {
  return (
    <div class="form-group">
      <label for={name}>{label}</label>
      <select multiple class="form-control" id={name}>
        {list.map((item) => (
          <option>{item}</option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
