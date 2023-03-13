import React, { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import NumberFormat from "react-number-format";
import { maxAllowedNumber } from "@/src/shared/utils/utils";

// @typescript-eslint/no-loss-of-precision
export default function Number({
  name,
  onChange,
  maxlength = 16,
  minimumValue = 1,
  disabled = false,
  decimalScale,
  ...props
}) {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext(); // retrieve all hook methods
  const [max, setMax] = useState(maxAllowedNumber(16));
  useEffect(() => {
    setMax(maxAllowedNumber(16));
  }, [maxlength]);

  return (
    <>
      <Controller
        control={control}
        {...register(name)}
        {...props}
        render={({ field }) => {
          return (
            <>
              <NumberFormat
                disabled={disabled}
                name={name}
                className={`form-control  ${
                  errors?.[name] ? "is-invalid" : ""
                }`}
                thousandSeparator={true}
                allowNegative={false}
                decimalScale={decimalScale}
                fixedDecimalScale={true}
                isNumericString={true}
                defaultValue={field.value}
                onValueChange={(value) => {
                  if (onChange) {
                    onChange(
                      value.floatValue !== null ? value.floatValue : null
                    );
                  }
                  return field.onChange(
                    value.floatValue !== null ? value.floatValue : null
                  );
                }}
                // Check whether input should be allowed or not
                isAllowed={(values) => {
                  //  Extract floatValue
                  const { floatValue } = values;
                  // If value there and either min or max provided
                  if (
                    (floatValue || floatValue === 0) &&
                    (minimumValue !== null || max !== null)
                  ) {
                    if (minimumValue === null) {
                      //  If min is not there then only check for max
                      return floatValue <= max;
                    } else if (max === null) {
                      //  If max is not there then only check for min
                      return floatValue >= minimumValue;
                    } else {
                      // Check for both if both of them are there
                      return floatValue >= minimumValue && floatValue <= max;
                    }
                  }
                  return true;
                }}
              />
            </>
          );
        }}
      />
      {errors?.[name]?.message ? (
        <span className="error-msg m-t-8">{errors?.[name]?.message}</span>
      ) : null}
    </>
  );
}
