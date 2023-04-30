import React from "react";

interface InputProps {
  id: string;
  label: string;
  type: string;
  value: string;
  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = (props: InputProps) => {
  return (
    <div >
      <label htmlFor={props.id}>{props.label}</label>
      <input
        className="form-control"
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
};

export default Input;
