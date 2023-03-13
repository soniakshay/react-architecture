import React, {
  useRef,
  useImperativeHandle,
  forwardRef,
  useState,
  useEffect,
} from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
//
// import classes from './form.module.scss';
import Input from './form-components/input/input';
import Number from './form-components/number/number';
import Password from './form-components/password/password';
// import Input from './input/input';
// import Number from './number/number';
// import Password from './password/password';
import Textarea from './form-components/textarea/textarea';
import Checkbox from './form-components//checkbox/checkbox';
import Radio from './form-components/radio/radio';
import SelectList from './form-components/select/select';
// import Datepicker from './form-components/datepicker/datepicker';
// import Daterangepicker from './daterangepicker/daterangepicker';
// import MaskInput from './mask/mask';
// import ControllerField from './controller/controller';
// import HiddenField from './hidden/hidden';
// import GoogleAutocomplete from './google-autocomplete/google-autocomplete';
// import CanIHavePermission from '../can-i-have-permissions/can-i-have-permission';
// import PercentagInput from './percentage-input/percentage-input';
// import CurrencyInput from './currency-input/currency-input';
// import IpAddressInput from './ipAddress-input/ipAddress-input';
// import CustomDateRangePicker from './customDateRangePicker/customDateRangePicker';
import Switch from './form-components/switch/switch';
import DatepickerInput from './form-components/datepicker/datepicker';

function ItemBlock({
  label,
  type,
  blocktype,
  actions = [],
  hide = true,
  ...props
}: any) {
  const typeArr = {
    input: Input,
    number: Number,
    password: Password,
    textarea: Textarea,
    checkbox: Checkbox,
    radio: Radio,
    select: SelectList,
    datePicker: DatepickerInput,
    // daterangepicker: Daterangepicker,
    // customDateRangePicker: CustomDateRangePicker,
    // mask: MaskInput,
    // objectField: ControllerField,
    // hiddenField: HiddenField,
    // GoogleAutocomplete: GoogleAutocomplete,
    // currencyInput: CurrencyInput,
    // ipAddressInput: IpAddressInput,
    // percentageInput: PercentagInput,
    switchInput: Switch,
  };

  const TypeComp = typeArr[type];

  const formElement = () => {
    return label ? (
      <div className={`${blocktype === 'left' ? 'left' : 'right'}`}>
        <label htmlFor={`${props.name}`}>{label}</label>
        <TypeComp key={1} {...props} type={type} />
      </div>
    ) : (
      <div className={`${blocktype === 'left' ? ' left' : 'right'}`}>
        <TypeComp key={1} {...props} type={type} />
      </div>
    );
  };

  return <>{formElement()}</>;
}

function FormItems({ fields }) {
  console.log('fields', fields);
  return (
    <div className={'formMain'}>
      {fields.map((items) => (
        <div className={'formbox '}>
          <div className={'ordformlist'}>
            <ItemBlock
              key={`formelement_${items.name}_left`}
              blocktype="left"
              {...items}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function Form(props, ref) {
  const { formItems, defaultValues, validationSchema, onSubmit, children } =
    props;
  console.log(formItems);
  const submitRef = useRef(null);
  const formOptions = {
    defaultValues,
    resolver: yupResolver(validationSchema),
  };
  const methods = useForm({ ...formOptions, mode: 'all' });

  useImperativeHandle(ref, () => ({
    submit(invalidStatusCallback = null) {
      if (submitRef.current !== null) {
        submitRef.current.click();
      }
      if (invalidStatusCallback !== null) {
        setTimeout(() => {
          invalidStatusCallback(methods.formState.isValid);
        }, 500);
      }
    },
    resetFieldWithError(field, defaultValue) {
      setTimeout(() => {
        methods.resetField(field, {
          keepDirty: false,
          keepTouched: false,
          keepError: false,
          defaultValue: defaultValue ?? '',
        });
      }, 100);
    },
    resetAll() {
      setTimeout(() => {
        methods.reset(
          {},
          {
            keepErrors: true,
            keepDirty: true,
            keepIsSubmitted: false,
            keepTouched: false,
            keepIsValid: false,
            keepSubmitCount: false,
          },
        );
      }, 100);
    },
    resetField(field, value = '') {
      setTimeout(() => {
        methods.setValue(field, value, { shouldValidate: true });
      }, 100);
    },
    // isFormValid();
  }));

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <FormItems fields={formItems} />
        {children}
        <input type="submit" style={{ display: 'none' }} ref={submitRef} />
      </form>
    </FormProvider>
  );
}

export default forwardRef(Form);
