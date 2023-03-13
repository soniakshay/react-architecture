import React, { useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import { useFormContext, Controller } from 'react-hook-form';
// eslint-disable-next-line import/extensions,import/no-unresolved
import CalenderIcon from '@/src/shared/components/form/form-components/datepicker/datepicket-icon/calender-icon';
// eslint-disable-next-line import/extensions,import/no-unresolved
import SelectClear from '@/src/shared/components/form/form-components/select/select-icon/select-clear';
import 'react-datepicker/dist/react-datepicker.css';
import { v4 as uuidv4 } from 'uuid';

export default function DatepickerInput({
  name,
  disabled = false,
  showTimeInput = false,
  showDateReturnOption = false,
  isClearDate = false,
  ...props
}: any) {
  const uid = uuidv4();

  const {
    register,
    control,
    formState: { errors },
  } = useFormContext(); // retrieve all hook methods
  // const { ref, isComponentVisible, setIsComponentVisible } =
  //   UseComponentVisible({});
  const ref = useRef(null);
  const [isComponentVisible, setIsComponentVisible] = useState(false);
  const [isUTCTimeZone, setIsUTCTimeZone] = useState(false);
  // const  [isClearDateField, setIsClearDateField] =  useState(false);

  // const CustomInputText = ({ value, onClick }) => {
  //
  //   return (
  //     <input
  //       type="text"
  //       id={uid}
  //       disabled={disabled}
  //       onClick={(e) => {
  //         setIsComponentVisible(true);
  //         onClick(e);
  //       }}
  //       value={isClearDateField ? '' : value}
  //     />
  //   );
  // };
  // useEffect(() => {
  //   if (isClearDate){
  //     // @ts-ignore
  //     const dateData = document.getElementById(uid).value;
  //     if (dateData) {
  //       setIsDate(true);
  //     }
  //   }
  // }, [isClearDate]);
  // const CalendarContainer = ({ children }) => {
  //   const el = document.body;
  //
  //   return (
  //           <Portal container={el}>
  //               {children}
  //           </Portal>
  //   );
  // };
  return (
    <>
      <Controller
        control={control}
        {...register(name)}
        {...props}
        render={({ field: { onChange, onBlur, value } }) => {
          // @ts-ignore
          // @ts-ignore
          return (
            <>
              <div
                ref={ref}
                className={`${showDateReturnOption ? 'withSegment' : ''}
                   
                   ${
                     errors?.[name]?.message
                       ? 'is-invalid-datepicker bottomPadding'
                       : 'bottomPadding'
                   }`}
              >
                <DatePicker
                  /* eslint-disable-next-line @typescript-eslint/no-shadow */
                  onChange={(value) => {
                    // setIsClearDateField(false);
                    if (!showTimeInput) {
                      setIsComponentVisible(false);
                    }
                    if (showDateReturnOption) {
                      onChange(value);
                      if (props.onChange) {
                        props.onChange(value, isUTCTimeZone);
                      }
                    } else {
                      onChange(value);
                      if (props.onChange) {
                        props.onChange(value); // TODO need to check in other modules
                      }
                    }
                  }}
                  onBlur={onBlur}
                  open={isComponentVisible}
                  disabled={disabled}
                  isClearable={true}
                  valueDefault={null}
                  selected={value ? new Date(value) : ''}
                  className={`${errors?.[name]?.message ? 'is-invalid' : ''}`}
                  portalId="root"
                  onClickOutside={() => {
                    setIsComponentVisible(false);
                  }}
                  // popperContainer={CalendarContainer}
                  // @ts-ignore
                  id={uid}
                  timeInputLabel={showTimeInput ? 'Time:' : null}
                  dateFormat={
                    showTimeInput ? 'MM/dd/yyyy h:mm aa' : 'MM/dd/yyyy'
                  }
                  showTimeInput={showTimeInput}
                  // @ts-ignore
                  // customInput={<CustomInputText setOpenState={isComponentVisible}  />}
                  showMonthDropdown
                  showYearDropdown
                  yearDropdownItemNumber={50}
                  scrollableYearDropdown
                  placeholderText="MM/DD/YYYY"
                />
                {isClearDate && !disabled && value && (
                  <span
                    className={'clearicon'}
                    onClick={() => {
                      // @ts-ignore
                      document.getElementById(uid).nextSibling.click();
                      // setIsClearDateField(true);
                    }}
                  >
                    <SelectClear />
                  </span>
                )}
                <span
                  className={'calendericon'}
                  onClick={() => {
                    if (!disabled) {
                      setIsComponentVisible(true);
                    }
                  }}
                >
                  <CalenderIcon />
                </span>
              </div>

              {/*{*/}
              {/*    showDateReturnOption &&   <div className={'segmentedControlMain'}>*/}
              {/*        <SegmentedControl options={[{*/}
              {/*          id: 'local',*/}
              {/*          label: 'LOCAL',*/}

              {/*        },*/}
              {/*        {*/}
              {/*          id: 'utc',*/}
              {/*          label: 'UTC',*/}
              {/*        },*/}
              {/*        ]} onChange={(id) => {*/}
              {/*          if (id === 'utc'){*/}
              {/*            setIsUTCTimeZone(true);*/}

              {/*          } else {*/}
              {/*            setIsUTCTimeZone(false);*/}
              {/*          }*/}
              {/*          if (props.onChange)  {*/}
              {/*            const isUtc =  id === 'utc';*/}
              {/*            props.onChange(value, isUtc);*/}
              {/*          }*/}
              {/*        }}/>*/}
              {/*    </div>*/}

              {/*}*/}
            </>
          );
        }}
      />
      {errors?.[name]?.message ? (
        <span className="error-msg">{errors?.[name]?.message}</span>
      ) : null}
    </>
  );
}
