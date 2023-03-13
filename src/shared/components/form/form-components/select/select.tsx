import React, { useEffect, useRef, useState } from "react";
import Select, { components } from "react-select";
import { Controller, useFormContext } from "react-hook-form";
import AsyncSelect from "react-select/async";
import SelectArrowdown from "./select-icon/select-arrow-down";
import SelectClear from "./select-icon/select-clear";
import SelectCheckArrow from "./select-icon/select-check-arrow";
// import classes from './select.module.scss';
import CreatableSelect from "react-select/creatable";
import {
  customStyleSelect,
  sortByPropertyInObject,
} from "@/src/shared/utils/utils";

export function ClearIndicatorFunc(props) {
  const {
    children = <SelectClear />,
    innerProps: { ref, ...restInnerProps },
  } = props;
  return (
    <div {...restInnerProps} ref={ref} className="closeicon">
      {children}
    </div>
  );
}

export function Input({ ...rest }) {
  if (rest.selectProps.maxLength) {
    // @ts-ignore
    return (
      <components.Input
        {...rest}
        autoComplete={"nope"}
        maxLength={rest.selectProps.maxLength}
      />
    );
  } else {
    // @ts-ignore
    return <components.Input {...rest} autoComplete={"nope"} />;
  }
}

export function NoOptionsMessageFunc({ ...rest }) {
  // @ts-ignore
  return <components.NoOptionsMessage {...rest} />;
}

export function ModifyChipsContainer({ children, ...props }) {
  return (
    // @ts-ignore
    <components.SingleValue {...props}>
      {Array.isArray(children) ? children[0] : children}
    </components.SingleValue>
  );
}

export function LimitedChipsContainer({
  children,
  hasValue,
  multiSelectMessage,
  ...props
}) {
  if (!hasValue) {
    return (
      // @ts-ignore
      <components.ValueContainer {...props}>
        {children}
      </components.ValueContainer>
    );
  }

  const [chips, otherChildren] = children;
  return (
    // @ts-ignore
    <components.ValueContainer {...props} className="multi-select-box">
      <span className="selected-count-box">
        {chips.length > 0 && `${chips.length} ${multiSelectMessage}`}
      </span>
      <span className="selected-search-box">{otherChildren}</span>
    </components.ValueContainer>
  );
}

export function optionFunc({ ...props }) {
  return (
    <div
      className={`${Array.isArray(props.label) ? "multi-value-label" : ""} ${
        props.isSelected ? `is-selected  selected` : ""
      } ${props.isFocused ? "is-focused" : ""} ${
        props.isDisabled ? "is-disabled" : ""
      }`}
    >
      {/*@ts-ignore*/}
      <components.Option {...props}>
        {Array.isArray(props.label)
          ? props.label.map((singleLabel, index) => (
              <span className={`${index === 0 ? "first-span" : ""}`}>
                {singleLabel}
              </span>
            ))
          : props.label}
      </components.Option>

      {props.isSelected ? (
        <span className={`checkarrow`}>
          <SelectCheckArrow />
        </span>
      ) : (
        <></>
      )}
    </div>
  );
}

export function DropdownIndicatorFunc({ ...props }) {
  return (
    // @ts-ignore
    <components.DropdownIndicator {...props}>
      <SelectArrowdown />
    </components.DropdownIndicator>
  );
}

const menuHeaderStyle = {
  padding: "8px 12px",
  background: "#fcfcfc",
  cursor: "pointer",
};

const menuHeaderSelectStyle = {
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "12px",
  color: "#898787",
  paddingLeft: "5px",
  border: "none",
};

const MenuList = (props) => {
  function selectAll() {
    const selectedValueArr = [];
    const selectedValueObjectArr = [];
    for (let obj of props.children) {
      selectedValueArr.push(obj.props.data.value);
      selectedValueObjectArr.push({
        value: obj.props.data.value,
        label: obj.props.data.label,
      });
    }
    props.selectProps.onCustomChange(selectedValueArr);
    props.selectProps.customOnSelectChange(
      props.isMulti,
      selectedValueObjectArr
    );
  }

  function unselectAll() {
    props.selectProps.onCustomChange([]);
    props.selectProps.customOnSelectChange(props.isMulti, []);
  }
  return (
    <components.MenuList {...props}>
      {props.isMulti &&
      Array.isArray(props.children) &&
      props.children.length > 0 ? (
        <div style={menuHeaderStyle}>
          {props.selectProps.value.length === props.options.length ? (
            <span style={menuHeaderSelectStyle}>Select All</span>
          ) : (
            <span
              style={{ ...menuHeaderSelectStyle, color: "#F26A26" }}
              className="forceHide"
              onClick={selectAll}
            >
              Select All
            </span>
          )}
          {props.selectProps.value.length === 0 ? (
            <span style={{ ...menuHeaderSelectStyle, paddingLeft: "10px" }}>
              Unselect All
            </span>
          ) : (
            <span
              style={{
                ...menuHeaderSelectStyle,
                paddingLeft: "10px",
                color: "#F26A26",
              }}
              // className="forceHide"
              onClick={unselectAll}
            >
              Unselect All
            </span>
          )}
        </div>
      ) : (
        <></>
      )}
      {props.children}
    </components.MenuList>
  );
};

export const IndicatorSeparatorFunc = () => {
  return <></>;
};

export const customStyles = (errors: any, name) => ({
  ...customStyleSelect(errors, name),
});

export function UseComponentVisible({
  initialIsVisible = false,
  checkForceStop = false,
  makeEscapeActive = false,
}) {
  const [isComponentVisible, setIsComponentVisible] =
    useState(initialIsVisible);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const element = event.target as HTMLElement;

      if (
        event.target.classList.contains("forceHide") ||
        (element.tagName === "DIV" && event.target.innerHTML === "")
      ) {
        if (checkForceStop) {
          setTimeout(() => {
            setIsComponentVisible(false);
          });
        } else {
          setIsComponentVisible(false);
        }
      }
    };

    if (makeEscapeActive) {
      document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
          handleClickOutside(event);
        }
      });
      document.addEventListener(
        "click",
        (event) => handleClickOutside(event),
        true
      );
    } else {
      document.addEventListener(
        "click",
        (event) => handleClickOutside(event),
        true
      );
    }
    return () => {
      if (makeEscapeActive) {
        document.removeEventListener("keydown", function (event) {
          if (event.key === "Escape") {
            handleClickOutside(event);
          }
        });
        document.removeEventListener(
          "click",
          (event) => handleClickOutside(event),
          true
        );
      } else {
        document.removeEventListener(
          "click",
          (event) => handleClickOutside(event),
          true
        );
      }
    };
  }, []);
  return { ref, isComponentVisible, setIsComponentVisible };
}

export default function SelectList({
  name,
  options = [],
  isMulti = false,
  isCreatable = false,
  isSearchable = false,
  onSearch = null,
  creatableMessage = "Create",
  placeholder = "Select",
  multiSelectMessage = "Selected",
  NoOptionsMessage = "No Options",
  loadingMessage = "",
  loadData = null,
  loadingDependentQuery = "",
  selectMapObj = null,
  disabled = false,
  searchValues = true,
  isClearable = true,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onSelectChange = (a: any, b: any) => null,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onCreate = (a: any, b: any) => null,
  menuPlacement = "auto",
  maxLength = 50,
  regexForCreatableValue = null,
  isMenuBodyTarget = true,
  isCategorizeOptions = false,
  ...props
}) {
  const { ref, isComponentVisible, setIsComponentVisible } =
    UseComponentVisible({ checkForceStop: true });
  const [selectOptions, setSelectOptions] = useState(options);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(disabled);
  const [createValue, setCreateValue] = useState(null);
  const [categorizeOptions, setCategorizeOptions] = useState([]);

  useEffect(() => {
    setIsDisabled(disabled);
  }, [disabled]);

  const validateCreatableValue = (event) => {
    const regex = new RegExp(regexForCreatableValue);
    if (!regex.test(event.key)) {
      event.preventDefault();
    }
  };

  const selectcustomStyles = (errors: any, fieldName) => {
    const style = customStyleSelect(errors, fieldName);
    return {
      ...style,
      option: (provided, state) => ({
        ...provided,
        borderBottom: 0,
        color: state.isSelected ? "#F26A26" : "#1F1F1F",
        backgroundColor: state.isSelected ? "#F9F9F9" : "#ffffff",
        pointerEvents: state.isSelected && !isMulti ? "none" : "auto",
        padding: "12px 16px",
        fontSize: 14,
        "&:hover": {
          backgroundColor: "#F9F9F9",
          // color: "#F26A26",
        },
        ...style.option,
      }),
      groupHeading: (provided) => ({
        ...provided,
        fontSize: 13,
        color: "#2E2E2E",
        fontWeight: "600",
      }),
    };
  };

  const selectChangeFunc = (a: any, b: any) => {
    onSelectChange(a, b);
  };

  useEffect(() => {
    async function loadingData() {
      setIsLoading(true);
      setIsDisabled(true);
      try {
        const data =
          loadingDependentQuery !== ""
            ? await loadData(
                JSON.parse(loadingDependentQuery) ?? loadingDependentQuery
              )
            : await loadData();
        if (isCategorizeOptions) {
          const optionArr = [];
          const optionWithOutGroupName = [];
          data.map(({ label, options: opa }) => {
            const optionObj = {
              label: label,
              options:
                opa && opa.length
                  ? opa.map((element) => {
                      optionWithOutGroupName.push({
                        value: element[selectMapObj.key],
                        label: element[selectMapObj.value],
                      });
                      return {
                        value: element[selectMapObj.key],
                        label: element[selectMapObj.value],
                      };
                    })
                  : [],
            };
            optionArr.push(optionObj);
          });

          setCategorizeOptions(optionWithOutGroupName);
          setSelectOptions([...optionArr]);
        } else {
          setSelectOptions(
            data.map((element) =>
              selectMapObj !== null
                ? {
                    value: element[selectMapObj.key],
                    label: element[selectMapObj.value],
                  }
                : element
            )
          );
        }

        setIsLoading(false);
        if (disabled === false) setIsDisabled(false);
      } catch (error) {
        setSelectOptions([]);
        setIsLoading(false);
        if (disabled === false) setIsDisabled(false);
      }
    }

    if (loadData !== null) {
      loadingData();
    } else {
      setSelectOptions([...options]);
    }
  }, [loadingDependentQuery, createValue]);
  useEffect(() => {
    (async () => {
      if (onSearch !== null) {
        const data = await onSearch("");
        setSelectOptions(data);
      }
    })();
  }, []);

  const {
    register,
    control,
    resetField,
    setValue,
    formState: { errors },
  } = useFormContext(); // retrieve all hook methods

  let restProps = {};
  if (isMulti) {
    restProps = {
      menuIsOpen: isDisabled ? false : isComponentVisible,
    };
  }

  const SelectType = isSearchable ? AsyncSelect : Select;
  return (
    <Controller
      control={control}
      {...register(name)}
      {...props}
      render={({ field: { onChange, onBlur, value, name: fieldName } }) => (
        <div ref={ref} onClick={() => setIsComponentVisible(true)}>
          {/* {`${JSON.stringify(value)}`} */}
          {isCreatable ? (
            <CreatableSelect
              // @ts-ignore
              width="100%"
              NoOptionsMessage={NoOptionsMessage}
              // @ts-ignore
              menuPlacement={menuPlacement}
              menuShouldBlockScroll={true}
              // menuPortalTarget={isMenuBodyTarget ? document.body : null }
              maxLength={maxLength}
              className="react-select-container"
              styles={selectcustomStyles(errors, name)}
              captureMenuScroll={true}
              onKeyDown={regexForCreatableValue && validateCreatableValue}
              placeholder={
                isLoading
                  ? loadingMessage
                  : Array.isArray(value) && value.length > 0
                  ? `${value.length} Selected`
                  : placeholder
              }
              isMulti={isMulti}
              isClearable={isClearable}
              onChange={async (optionsSelected, actionMeta) => {
                setCreateValue(null);
                if (actionMeta.action === "create-option") {
                  // add new item
                  const data = await onCreate(name, actionMeta?.option?.value);
                  setSelectOptions([
                    ...selectOptions,
                    {
                      value: data.meta.newValue.id,
                      label: data.meta.newValue.value,
                    },
                  ]);
                  if (data?.meta?.newValue) {
                    const optionsData = [
                      ...selectOptions,
                      {
                        value: data.meta.newValue.id,
                        label: data.meta.newValue.value,
                      },
                    ];
                    const sortedData = optionsData.sort(
                      sortByPropertyInObject("label")
                    );
                    setSelectOptions(sortedData);
                  }
                  if (!isMulti && data?.meta?.newValue) {
                    resetField(fieldName, {
                      keepDirty: true,
                      keepTouched: true,
                      keepError: true,
                      defaultValue: data.meta.newValue.id,
                    });
                    setTimeout(() => {
                      setValue(fieldName, data.meta.newValue.id, {
                        shouldDirty: true,
                        shouldTouch: true,
                        shouldValidate: true,
                      });
                    }, 1000);

                    onSelectChange(isMulti, {
                      value: data.meta.newValue.id,
                      label: data.meta.newValue.value,
                    });
                  }
                } else {
                  if (optionsSelected === null) {
                    onSelectChange(isMulti, undefined);
                    return onChange(null);
                  }
                  onSelectChange(isMulti, optionsSelected);
                  return isMulti
                    ? onChange(optionsSelected?.map((option) => option.value))
                    : onChange(optionsSelected.value);
                }
              }}
              isLoading={isLoading}
              isDisabled={isDisabled}
              backspaceRemovesValue={false}
              isSearchable={searchValues}
              onBlur={onBlur}
              options={selectOptions}
              hideSelectedOptions={false}
              onCustomChange={onChange}
              customOnSelectChange={selectChangeFunc}
              closeMenuOnSelect={!isMulti}
              components={
                isMulti
                  ? {
                      // eslint-disable-next-line @typescript-eslint/no-shadow
                      ValueContainer: ({ ...props }) =>
                        LimitedChipsContainer({ ...props, multiSelectMessage }),
                      Option: optionFunc,
                      ClearIndicator: ClearIndicatorFunc,
                      DropdownIndicator: DropdownIndicatorFunc,
                      IndicatorSeparator: IndicatorSeparatorFunc,
                      Input: Input,
                      // eslint-disable-next-line @typescript-eslint/no-shadow
                      NoOptionsMessage: ({ ...props }) =>
                        NoOptionsMessageFunc({
                          ...props,
                          children: NoOptionsMessage,
                        }),
                      MenuList: MenuList,
                    }
                  : {
                      SingleValue: ModifyChipsContainer,
                      Option: optionFunc,
                      ClearIndicator: ClearIndicatorFunc,
                      DropdownIndicator: DropdownIndicatorFunc,
                      // eslint-disable-next-line @typescript-eslint/no-shadow
                      NoOptionsMessage: ({ ...props }) =>
                        NoOptionsMessageFunc({
                          ...props,
                          children: NoOptionsMessage,
                        }),
                      IndicatorSeparator: IndicatorSeparatorFunc,
                      Input: Input,
                      MenuList: MenuList,
                    }
              }
              {...restProps}
              /*  @ts-ignore */
              cacheOptions
              isOptionDisabled={(option) => option.disabled}
              value={
                isCategorizeOptions
                  ? Array.isArray(categorizeOptions) &&
                    categorizeOptions.length > 0
                    ? categorizeOptions.filter((option) =>
                        value?.includes(option.value)
                      )
                    : ""
                  : Array.isArray(selectOptions) && selectOptions.length > 0
                  ? selectOptions.filter((option) =>
                      value?.includes(option.value)
                    )
                  : ""
              }
              defaultValue={
                isCategorizeOptions
                  ? Array.isArray(categorizeOptions) &&
                    categorizeOptions.length > 0
                    ? categorizeOptions.filter((option) => {
                        return isMulti
                          ? value?.includes(option.value)
                          : value === option.value;
                      })
                    : ""
                  : Array.isArray(selectOptions) && selectOptions.length > 0
                  ? selectOptions.filter((option) => {
                      return isMulti
                        ? value?.includes(option.value)
                        : value === option.value;
                    })
                  : ""
              }
              formatCreateLabel={(inputValue: string) =>
                `${creatableMessage} "${inputValue}"`
              }
            />
          ) : (
            <SelectType
              // @ts-ignore
              width="100%"
              // @ts-ignore
              menuPlacement={menuPlacement}
              NoOptionsMessage={NoOptionsMessage}
              menuShouldBlockScroll={true}
              // menuPortalTarget={isMenuBodyTarget ? document.body : null }
              className="react-select-container"
              styles={selectcustomStyles(errors, name)}
              openMenuOnClick={true}
              onCustomChange={onChange}
              customOnSelectChange={selectChangeFunc}
              placeholder={
                isLoading
                  ? loadingMessage
                  : Array.isArray(value) && value.length > 0
                  ? `${value.length} Selected`
                  : placeholder
              }
              isMulti={isMulti}
              isClearable={isClearable}
              onChange={(optionsSelected) => {
                if (optionsSelected === null) {
                  onSelectChange(isMulti, undefined);
                  return onChange(null);
                }
                onSelectChange(isMulti, optionsSelected);
                return isMulti
                  ? onChange(optionsSelected?.map((option) => option.value))
                  : onChange(optionsSelected.value);
              }}
              loadOptions={(inputValue: string) => {
                return new Promise(async (resolve) => {
                  const data = await onSearch(inputValue);
                  setSelectOptions(data);
                  resolve(data);
                });
              }}
              isLoading={isLoading}
              isDisabled={isDisabled}
              backspaceRemovesValue={false}
              isSearchable={searchValues}
              onBlur={onBlur}
              options={selectOptions}
              hideSelectedOptions={false}
              closeMenuOnSelect={!isMulti}
              components={
                isMulti
                  ? {
                      // eslint-disable-next-line @typescript-eslint/no-shadow
                      ValueContainer: ({ ...props }) =>
                        LimitedChipsContainer({ ...props, multiSelectMessage }),
                      Option: optionFunc,
                      ClearIndicator: ClearIndicatorFunc,
                      DropdownIndicator: DropdownIndicatorFunc,
                      IndicatorSeparator: IndicatorSeparatorFunc,
                      // eslint-disable-next-line @typescript-eslint/no-shadow
                      NoOptionsMessage: ({ ...props }) =>
                        NoOptionsMessageFunc({
                          ...props,
                          children: NoOptionsMessage,
                        }),
                      Input: Input,
                      MenuList: MenuList,
                    }
                  : {
                      SingleValue: ModifyChipsContainer,
                      Option: optionFunc,
                      ClearIndicator: ClearIndicatorFunc,
                      DropdownIndicator: DropdownIndicatorFunc,
                      IndicatorSeparator: IndicatorSeparatorFunc,
                      // eslint-disable-next-line @typescript-eslint/no-shadow
                      NoOptionsMessage: ({ ...props }) =>
                        NoOptionsMessageFunc({
                          ...props,
                          children: NoOptionsMessage,
                        }),
                      Input: Input,
                      MenuList: MenuList,
                    }
              }
              {...restProps}
              cacheOptions
              defaultOptions
              isOptionDisabled={(option) => option.disabled}
              value={
                isCategorizeOptions
                  ? Array.isArray(categorizeOptions) &&
                    categorizeOptions.length > 0
                    ? categorizeOptions.filter((option) =>
                        value?.includes(option.value)
                      )
                    : ""
                  : Array.isArray(selectOptions) && selectOptions.length > 0
                  ? selectOptions.filter((option) =>
                      value?.includes(option.value)
                    )
                  : ""
              }
              defaultValue={
                isCategorizeOptions
                  ? Array.isArray(categorizeOptions) &&
                    categorizeOptions.length > 0
                    ? categorizeOptions.filter((option) => {
                        return isMulti
                          ? value?.includes(option.value)
                          : value === option.value;
                      })
                    : ""
                  : Array.isArray(selectOptions) && selectOptions.length > 0
                  ? selectOptions.filter((option) => {
                      return isMulti
                        ? value?.includes(option.value)
                        : value === option.value;
                    })
                  : ""
              }
            />
          )}
          {errors?.[name]?.message ? (
            <span className="error-msg m-t-8">{errors?.[name]?.message}</span>
          ) : null}
        </div>
      )}
    />
  );
}
