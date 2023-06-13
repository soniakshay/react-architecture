import * as Yup from 'yup';
import React, { useEffect, useRef, useState } from 'react';
import Form, { FormItems } from '../../src/shared/components/form/form';
import { InputEle } from '../../src/shared/components/form/form-components/input/input';

const FormComponents = () => {
  const formRef = useRef(null);
  const [defaultValues, setDefultValues] = useState(null);
  const [validationSchemaObj, setValidationSchemaObj] = useState(null);
  const formState = [
    {
      name: 'text',
      type: 'input',
      label: 'text',
      maxlength: 250,
      maxCharacter: 250,

    },
    {
      name: 'number',
      type: 'number',
      maxlength: 6,
      label: 'number',
      minimumValue: 0,
      decimalScale: 0,
    },
    {
      name: 'password',
      type: 'password',
      label: 'password',
      minimumValue: 0,
      decimalScale: 0,
    },
    {
      name: 'select',
      type: 'select',
      label: 'select',
      isMulti: false,
      isCreatable: false,
      isClearable: true,
      menuPlacement: 'bottom',
      // loadData: getData,
      options: [
        {
          label: 'Option 1',
          value: 'Option1',
        },
        {
          label: 'Option 2',
          value: 'Option2',
        },
      ],
      maxCharacter: 50,
      // loadingDependentQuery: JSON.stringify(reloadData[FLEXIBLE_FIELD_ENVIRONMENT_BACKUP_SOLUTION]),
      selectMapObj: {
        key: 'title',
        value: 'value',
      },
      placeholder: 'Select Options',
      // loadingMessage: `Loading ${backupsLabel.backupSolution} (Optional)`,
      multiSelectMessage: 'Selected',
    },
    {
      name: 'textArea',
      type: 'textarea',
      label: 'Textarea',
      placeholder: 'Add text...',
      maxCharacter: 2000,
      maxlength: 2000,
    },
    {
      name: 'switchInput',
      type: 'switchInput',
      label: 'switchInput',
      isDefaultValueSelect: false,
    },
    {
      name: 'radio',
      type: 'radio',
      label: 'radio',
      values: [
        {
          label: 'On',
          value: 'on',
        },
        {
          label: 'Off',
          value: 'off',
        },
      ],
    },
    {
      name: 'checkbox',
      type: 'checkbox',
      label: 'checkbox',
      values: [
        {
          label: 'On',
          id: 'on',
        },
        {
          label: 'Off',
          id: 'off',
        },
      ],
    },
    {
      name: 'DatePicker',
      type: 'datePicker',
      label: 'Date Picker',
      isClearDate: true,
    },
  ];
  useEffect(() => {
    // if (formRef && formRef.current) {
    //     formRef.current.submit();
    // }
  }, []);
  const onSubmit = () => {
    if (formRef && formRef.current) {
      formRef.current.submit();
    }
  };
  return (
    <>
      <Form
        ref={formRef}
        formItems={formState}
        defaultValues={{

        }}
        validationSchema={Yup.object().shape({})}
        onSubmit={(data) => {
          console.log(data);
        }}
      >
        <FormItems fields={formState} />


      </Form>
      <button
        onClick={() => {
          onSubmit();
        }}
      >
        Submit
      </button>

  <h1>Single element</h1>
      <InputEle
      className={'form-element'}
      onChange={() => {
      }}
      />
    </>
  );
};

export default FormComponents;
