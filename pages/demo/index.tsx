import * as Yup from 'yup';
import React, { useEffect, useRef, useState } from 'react';
import Form, { FormItems } from '../../src/shared/components/form/form';
import { InputEle } from '../../src/shared/components/form/form-components/input/input';
import { Modal } from '../../src/shared/components/modal/modal';
import { Button } from '@blueprintjs/core';
import { DataTable } from '../../src/shared/components/table/table';
import { MaskInputEle } from '../../src/shared/components/form/form-components/mask-input/input-mask';
import SideDrawer from '../../src/shared/components/side-drawer';


const FormComponents = () => {
  const formRef = useRef(null);
  const [defaultValues, setDefultValues] = useState(null);
  const [isOpen, setOpen]  = useState(false);
  const [validationSchemaObj, setValidationSchemaObj] = useState(null);
  const ref = useRef(null);

  const getData = async () => {
    return new Promise((resolve, reject) => {
      resolve([ {
        color: 'red',
        value: '#f00',
        num:10,
      },
      {
        color: 'green',
        value: '#0f0',
        num:1,
      },
      {
        color: 'blue',
        value: '#00f',
        num:8,
      },
      {
        color: 'cyan',
        value: '#0ff',
        num:8,
      },
      {
        color: 'magenta',
        value: '#f0f',
        num:52,
      },
      {
        color: 'yellow',
        value: '#ff0',
        num:9,
      },
      {
        color: 'black',
        value: '#000',
        num:40,
      },
      {
        color: 'black1',
        value: '#000',
        num:20,
      },
      {
        color: 'green',
        value: '#0f0',
        num:1,
      },
      {
        color: 'blue',
        value: '#00f',
        num:8,
      },
      {
        color: 'cyan',
        value: '#0ff',
        num:8,
      },
      {
        color: 'magenta',
        value: '#f0f',
        num:52,
      },
      {
        color: 'yellow',
        value: '#ff0',
        num:9,
      },
      {
        color: 'black',
        value: '#000',
        num:40,
      },
      {
        color: 'black1',
        value: '#000',
        num:20,
      },
      {
        color: 'green',
        value: '#0f0',
        num:1,
      },
      {
        color: 'blue',
        value: '#00f',
        num:8,
      },
      {
        color: 'cyan',
        value: '#0ff',
        num:8,
      },
      {
        color: 'magenta',
        value: '#f0f',
        num:52,
      },
      {
        color: 'yellow',
        value: '#ff0',
        num:9,
      },
      {
        color: 'black',
        value: '#000',
        num:40,
      },
      {
        color: 'black1',
        value: '#000',
        num:20,
      },
      {
        color: 'green',
        value: '#0f0',
        num:1,
      },
      {
        color: 'blue',
        value: '#00f',
        num:8,
      },
      {
        color: 'cyan',
        value: '#0ff',
        num:8,
      },
      {
        color: 'magenta',
        value: '#f0f',
        num:52,
      },
      {
        color: 'yellow',
        value: '#ff0',
        num:9,
      },
      {
        color: 'black',
        value: '#000',
        num:40,
      },
      {
        color: 'black1',
        value: '#000',
        num:20,
      },
      {
        color: 'green',
        value: '#0f0',
        num:1,
      },
      {
        color: 'blue',
        value: '#00f',
        num:8,
      },
      {
        color: 'cyan',
        value: '#0ff',
        num:8,
      },
      {
        color: 'magenta',
        value: '#f0f',
        num:52,
      },
      {
        color: 'yellow',
        value: '#ff0',
        num:9,
      },
      {
        color: 'black',
        value: '#000',
        num:40,
      },
      {
        color: 'black1',
        value: '#000',
        num:20,
      },
      ]);
    });
  };
  const formState = [
    {
      name: 'text',
      type: 'input',
      label: 'text',
      maxlength: 250,
      maxCharacter: 250,

    },
    {
      name: 'mask',
      type: 'mask',
      label: 'mask',
      mask: '999.999.999.999/99',
      placeholder: 'Enter Ip Address',

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

  const formState1 =   [{
    name: 'name1',
    type: 'input',
    label: 'text',
    maxlength: 250,
    maxCharacter: 250,

  }];
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
      <h1>Form </h1>
      <Form
        ref={formRef}
        defaultValues={{

        }}
        validationSchema={Yup.object().shape({
          // text:Yup.string().required('Owner is required.'),

          mask: Yup.string()
            .required('IP address is required')
            .matches(
              /^([0-9]{1,3}\.){3}[0-9]{1,3}\/[0-9]{1,2}$/,
              'Invalid IP address with subnet',
            ),
        })}
        onSubmit={(data) => {
          console.log(data);
        }}
      >
        <FormItems fields={formState} />
        <FormItems fields={formState1} />


      </Form>
      <button
        onClick={() => {
          onSubmit();
        }}
      >
        Submit
      </button>



        <h1>Modal</h1>

      <Modal title={'Demo'} isOpen={isOpen}  closeDialog={() => {
        setOpen(false);
      }}>
        <h1>This Demo Dialog</h1>
      </Modal>


      <h1>
        Drawer
      </h1>

      <button onClick={() => {
        if (ref.current) {
          ref.current.open();
        }

      }}>
        Open Sidebar
      </button>
      <SideDrawer
        ref={ref}
        title={'Header'}
        footer={
          <>
              <h3>Footer</h3>
          </>
        }

      >
        <h2>Drawer Body</h2>

      </SideDrawer>

      <Button onClick={() => {
        setOpen(true);
      }
      }>Open Dialog</Button>

  <h1>Single element</h1>
      <InputEle
      className={'form-element'}
      onChange={() => {
      }}
      />


        <br/>

      <MaskInputEle
        mask={'999.999.999'}
        placeholder={'Enter Ip Address'}
      />

      <h1>
        Table Data
      </h1>
      <DataTable
        columns={[
          {
            'headerName': 'Colour',
            'isEditable': false,
            'key':'color',
          },

          {
            'headerName': 'Rank',
            'key':'num',
            'isEditable': false,
          },
        ]}

        gridDataService={getData}/>

    </>
  );
};

export default FormComponents;
