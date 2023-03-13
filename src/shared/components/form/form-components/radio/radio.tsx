import React from "react";
import { Controller, useFormContext } from "react-hook-form";

export default function Radio({ name, onChange, values, ...props }) {
  const {
    register,
    setValue,
    control,
    getValues,
    formState: { errors },
  } = useFormContext(); // retrieve all hook methods

  return (
    <>
      <Controller
        control={control}
        {...register(name)}
        {...props}
        render={() => {
          return (
            <div className="radio-main">
              {values.map(({ id, label }) => (
                <div>
                  <input
                    type="radio"
                    value={id}
                    key={`radio_${id}`}
                    {...register(name)}
                    {...props}
                    onChange={(event) => {
                      onChange ? onChange(event.target.value) : null;
                    }}
                    className={`form-control ${
                      errors?.[name] ? "is-invalid" : ""
                    }`}
                  />
                  <label>{label}</label>
                </div>
              ))}
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
