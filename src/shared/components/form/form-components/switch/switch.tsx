import React, { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

export default function Switch({
  name,
  onChange,
  isDefaultValueSelect,
  values,
  ...props
}) {
  const {
    register,
    formState: { errors },
    setValue,
    getValues,
    control,
  } = useFormContext(); // retrieve all hook methods
  const [isChecked, setChecked] = useState(false);

  useEffect(() => {
    if (isDefaultValueSelect) {
      setChecked(true);
      setValue(name, true);
    }
  }, [isDefaultValueSelect]);

  return (
    <>
      <Controller
        control={control}
        {...register(name)}
        {...props}
        render={() => {
          return (
            <div
              className={`switchInput ${
                isChecked ? "switch switch-on" : "switch switch-off"
              }`}
            >
              <input
                type="checkbox"
                id={"switchInput-checkbox"}
                name={name}
                {...register(name)}
                checked={isChecked}
                value={isChecked ? "true" : "false"}
                onChange={(event) => {
                  setChecked(!isChecked);
                  setValue(name, !isChecked);
                  console.log(event.target.value);
                  if (onChange) {
                    onChange(!isChecked);
                  }
                }}
                className={`form-control ${errors?.[name] ? "is-invalid" : ""}`}
              />
              <label htmlFor={"switchInput-checkbox"}></label>
            </div>
          );
        }}
      />
      {errors?.[name]?.message ? (
        <span className="error-msg m-t-8">{errors?.[name]?.message}</span>
      ) : null}
    </>
  );
}
