import { Cell, Column, Table2, EditableCell, ColumnHeaderCell2, Utils } from '@blueprintjs/table';
import React, { useEffect, useMemo, useState } from 'react';
import { Menu, MenuItem } from '@blueprintjs/core';
import { orderBy } from 'lodash';
import { v4 as uuidv4 } from 'uuid';



interface ColumnConfigObject {
  headerName: string,
  isEditable: boolean,
  key: string
}

interface DataTableProps {
  gridDataService:(queryData: any) => Promise<any>;
  columns: Array<ColumnConfigObject>
}
export const DataTable = ({ gridDataService, columns } : DataTableProps) => {

  // @ts-ignore
  const [tableData, setTableData]  = useState<[]>([]);
  const [columnConfig, setColumnConfig] = useState(columns);
  const [token, setToken] = useState(uuidv4());




  const setGridData = async () => {
    try {
      const response: any =  await gridDataService({});
      if (response && response.length) {
        // @ts-ignore
        setTableData([...response]);

      } else {
        // @ts-ignore
        setTableData([...response]);

      }

    } catch   {
      setTableData([]);
    } finally {
    }
  };


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
      const cloneTableData : any = orderBy(tableData, key, ['asc']);
      setTableData([...cloneTableData]);
    };
    const sortDesc = ({ key }) => {
      const cloneTableData: any = orderBy(tableData, key, ['desc']);
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
    const reArrangeColumns: any = Utils.reorderArray(columnConfig, oldIndex, newIndex, length);
    setColumnConfig([...reArrangeColumns]);
    setToken(uuidv4());
  };
  useEffect(() => {
    setColumnConfig(columns);

    (async  () => {
      await setGridData();
    })();
  }, []);



  const renderTable = useMemo(() => {
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
            columnConfig.map(({ key, isEditable = false, headerName }) => {
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
  }, [tableData, token]);

  return (
    <>
      {renderTable}

        </>
  );
};
