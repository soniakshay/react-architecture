import { Cell, Column, Table2, EditableCell, ColumnHeaderCell2, Utils } from '@blueprintjs/table';
import React, { useEffect, useState } from 'react';
import { Menu, MenuItem } from '@blueprintjs/core';
import { orderBy } from 'lodash';
import { v4 as uuidv4 } from 'uuid';

export const DataTable = () => {

  // @ts-ignore
  const [tableData, setTableData]  = useState<[]>([]);
  const [columnConfig, setColumnConfig] = useState<[]>([]);
  const [token, setToken] = useState(uuidv4());

  const ieRefresh = () => {
    setToken(null);
    setTimeout(() => {
      setToken(uuidv4());
    }, 10);
  };
  useEffect(() => {
    // @ts-ignore
    setTableData([
      {
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

    ]);

    setColumnConfig([
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
    ]);
  }, []);




  const cellRenderer = ({ value }) => (
    <Cell>{value}</Cell>
  );

  const editableCell = ({ value }) => (

    <EditableCell
      value={value}
      onConfirm={() => {

      }}
    />
  );
  const menuRender = ({ key }) => {
    const sortAsc = ({ key }: string) => {
      const cloneTableData = orderBy(tableData, key, ['asc']);
      setTableData([...cloneTableData]);
    };
    const sortDesc = ({ key }) => {
      const cloneTableData = orderBy(tableData, key, ['desc']);
      setTableData([...cloneTableData]);
    };
    return (
      <Menu>
        <MenuItem icon="sort-asc" onClick={() =>  sortAsc({ key })} text="Sort Asc" />
        <MenuItem icon="sort-desc" onClick={() =>  sortDesc({ key })} text="Sort Desc" />
      </Menu>
    );
  };
  const columnHeaderCellRenderer = ({ headerName, key   }) => {
    return  <ColumnHeaderCell2 name={headerName}  menuRenderer={() => menuRender({ key })} />;
  };

  const handleRowsReordered = (oldIndex: number, newIndex: number, length: number) => {
    if (oldIndex === newIndex) {
      return;
    }
    const columns: any = Utils.reorderArray(columnConfig, oldIndex, newIndex, length);
    setColumnConfig([...columns]);
    ieRefresh();
  };

  return (
    <Table2 numRows={tableData.length}
            enableFocusedCell={true}
            enableColumnReordering={true}
            enableColumnResizing={false}
            enableRowReordering={true}
            enableRowResizing={false}
            onColumnsReordered={handleRowsReordered}
            enableMultipleSelection={true}>
      {
        token && columnConfig.map(({ key, isEditable = false, headerName }) => {
          return (

            <Column name={key}

                    columnHeaderCellRenderer={() => {
                      return  columnHeaderCellRenderer({ headerName: headerName || key, key: key });
                    }}
                    cellRenderer={(rowIndex) => {

                      return isEditable ?  editableCell({ value: tableData[rowIndex][key] }) :   cellRenderer({ value: tableData[rowIndex][key] });
                    }} />

          );
        })
      }
    </Table2>
  );
};
