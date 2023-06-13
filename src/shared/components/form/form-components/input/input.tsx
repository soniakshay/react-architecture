import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { InputGroup } from '@blueprintjs/core';


export const InputEle = (elementProps: any) => {
  return (
      <InputGroup
        {...elementProps}
      />
  );
};

export default function Input({ name, onChange, ...props }: any) {
  const {
    register,
    control,
    formState: { errors },
  }: any = useFormContext(); // retrieve all hook methods
  const elementProps = {
    name: name,
    ...props,
    onChange: (event: any) => (onChange ? onChange(event.target.value) : null),
    className: `form-control ${errors?.[name] ? 'is-invalid' : ''}`,
  };

  // @ts-ignore
  // @ts-ignore
  return (
    <>

      <Controller
        control={control}
        {...register(name)}
        {...props}
        render={({ field: { onChange: onChangeValue, value } }) => (
            <InputEle
              {...elementProps}
              value={value}
              onChange={(event: any) => {
                onChangeValue(event);
                if (elementProps?.onChange) {
                  elementProps.onChange(event);
                }
              }}
            />
        )}
      />
      {errors?.[name]?.message ? (
        <span className="error-msg m-t-8">{errors?.[name]?.message}</span>
      ) : null}
    </>
  );
}
