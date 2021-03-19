import { Getter, Plugin, Template, TemplateConnector, TemplatePlaceholder } from '@devexpress/dx-react-core';
import {
  DataTypeProvider,
  EditingState,
  IntegratedFiltering,
  IntegratedPaging,
  IntegratedSelection,
  PagingState,
  SelectionState,
  SortingState,
} from '@devexpress/dx-react-grid';
import { GridExporter } from '@devexpress/dx-react-grid-export';
import {
  ColumnChooser,
  DragDropProvider,
  ExportPanel,
  Grid,
  PagingPanel,
  Table,
  TableColumnReordering,
  TableColumnVisibility,
  TableFixedColumns,
  TableHeaderRow,
  Toolbar,
} from '@devexpress/dx-react-grid-material-ui';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import saveAs from 'file-saver';
import { Formik } from 'formik';
import React, { useCallback, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import WarningAlertDialog from 'src/components/dialog/WarningAlertDialog';
import CommonSelectInput from 'src/components/input/CommonSelectInput';
import CommonTextInput from 'src/components/input/CommonTextInput';
import classNames from 'classnames';

/*
  Params:
    columnDef:  ,
    data: ,
    route: ,
    idxColumnsFilter,
    deleteRowFunc,
*/

const styles = (theme) => ({
  dialog: {
    width: 'calc(100% - 16px)',
  },
  inputRoot: {
    width: '100%',
  },
  selectMenu: {
    position: 'absolute !important',
  },
  tableStriped: {
    '& tbody tr:nth-of-type(odd)': {
      backgroundColor: '#fafafa',
    },
  },
  customToolbar: {
    float: 'left',
    display: 'inline-flex',
  },
});

const TableComponentBase = ({ classes, ...restProps }) => <Table.Table {...restProps} className={classes.tableStriped} />;

export const TableComponent = withStyles(styles, {
  name: 'TableComponent',
})(TableComponentBase);

const ToolbarRootBase = ({ classes, className, ...restProps }) => (
  <Toolbar.Root className={classNames(className, classes.customToolbar)} {...restProps} />
);
const ToolbarRoot = withStyles(styles)(ToolbarRootBase);
const filteringColumnExtensions = [
  {
    columnName: 'saleDate',
    predicate: (value, filter, row) => {
      if (!filter.value.length) return true;
      if (filter && filter.operation === 'month') {
        const month = parseInt(value.split('-')[1], 10);
        return month === parseInt(filter.value, 10);
      }
      return IntegratedFiltering.defaultPredicate(value, filter, row);
    },
  },
];

const DateFormatter = ({ value }) => (value ? value.split('T')[0].replace(/(\d{4})-(\d{2})-(\d{2})/, '$3.$2.$1') : '');

const DateTypeProvider = (props) => <DataTypeProvider formatterComponent={DateFormatter} {...props} />;

const MultiValuesFormatter = ({ value }) => {
  return value.map((val, idx) => <Chip label={val} key={idx} className="mx-1 my-1 px-0 py-0" color="primary" variant="outlined" />);
};
const MultiValuesTypeProvider = (props) => <DataTypeProvider formatterComponent={MultiValuesFormatter} {...props} />;

const AddRowPanel = ({ route, disableCreate }) => {
  return (
    <Plugin name="AddRowPanel" dependencies={[{ name: 'Toolbar' }]}>
      <Template name="toolbarContent">
        <TemplatePlaceholder />
        {
          <IconButton disabled={disableCreate} className="py-0 px-0">
            <Link to={`${route}create`} className="px-0 py-0">
              <AddCircleOutlineIcon color={disableCreate ? 'disabled' : 'primary'} />
            </Link>
          </IconButton>
        }
      </Template>
    </Plugin>
  );
};

const CustomTableEditColumn = ({ route, deleteRow, disableDelete, disableEdit }) => {
  const [openWarning, setOpenWarning] = useState(false);
  const [deletingRowID, setDeletingRowID] = useState(-1);
  const handleConfirm = (e) => {
    if (Number.isInteger(deletingRowID)) {
      deleteRow(deletingRowID);
    }
    setOpenWarning(!openWarning);
  };
  const handleCancel = () => {
    setOpenWarning(!openWarning);
  };
  return (
    <Plugin>
      <WarningAlertDialog
        isVisible={openWarning}
        title={'Xóa hàng'}
        titleConfirm={'Đồng ý'}
        handleConfirm={handleConfirm}
        titleCancel={'Từ chối'}
        handleCancel={handleCancel}
        warningMessage={'Bạn có muốn xóa hàng này?'}
      />
      <Getter
        name="tableColumns"
        computed={({ tableColumns }) => {
          tableColumns.splice(0, 0, {
            key: 'behavior' + route,
            type: 'behavior',
            width: !disableEdit ? '10%' : '0%',
            align: 'center',
          });
          return tableColumns;
        }}
      />
      <Template
        name="tableCell"
        predicate={({ tableColumn, tableRow }) => tableColumn.type === 'behavior' && tableRow.type === Table.ROW_TYPE && !disableEdit}
      >
        {(params) => (
          <TemplateConnector>
            {(getters, { deleteRows, commitDeletedRows }) => (
              <TableCell className="px-0 py-0">
                <Link to={`${route}${params.tableRow.rowId}`}>
                  <IconButton disabled={disableEdit}>
                    <EditIcon />
                  </IconButton>
                </Link>
                <IconButton
                  disabled={disableDelete}
                  onClick={() => {
                    setDeletingRowID(params.tableRow.rowId);
                    setOpenWarning(!openWarning);
                  }}
                  title="Delete row"
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            )}
          </TemplateConnector>
        )}
      </Template>
    </Plugin>
  );
};

const QTable = (props) => {
  const { columnDef, data, route, idxColumnsFilter, dateCols, multiValuesCols, deleteRow, disableCreate, disableDelete, disableEdit } = props;
  const exporterRef = useRef(null);

  const startExport = useCallback(() => {
    exporterRef.current.exportGrid();
  }, [exporterRef]);

  const [defaultHiddenColumnNames] = useState([]);
  let dateColumns = Array.isArray(dateCols) ? dateCols.map((idx) => columnDef[idx].name) : [''];
  let multiValuesColumns = Array.isArray(multiValuesCols) ? multiValuesCols.map((idx) => columnDef[idx].name) : [''];
  const [state, setState] = useState({
    columns: columnDef,
    selection: [],
    currentPage: 0,
    pageSize: 5,
    pageSizes: [5, 10, 15],
    editingRowIds: [],
  });
  const [rowChanges, setRowChanges] = useState({});

  const [columnOrder, setColumnOrder] = useState(columnDef.map((col) => col.name));

  const colHeight = columnDef.length < 6 ? Math.floor((0.8 / (columnDef.length - 1)) * 100) : 15;
  const tableColumnExtensions = columnDef.map((col, idx) => {
    return {
      columnName: col.name,
      align: 'left',
      width: colHeight + '%',
      wordWrapEnabled: true,
    };
  });
  tableColumnExtensions[0]['width'] = 10 + '%';

  const columnsFilter = idxColumnsFilter.map((idx) => ({
    id: idx,
    name: columnDef[idx].title,
  }));
  const filterTypes = [
    { id: 1, name: 'Bao gồm' },
    { id: 2, name: 'Chính xác' },
    { id: 3, name: 'Không bao gồm' },
  ];
  const filterValues = {
    columnsFilter: columnsFilter[0],
    filterTypes: filterTypes[0],
    textFilter: '',
  };
  const onSave = (workbook) => {
    workbook.xlsx.writeBuffer().then((buffer) => {
      saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'DataGrid.xlsx');
    });
  };

  return (
    <div>
      <Paper>
        <div className="m-auto">
          <div className="rounded p-4 container col-md-12">
            <Formik enableReinitialize initialValues={filterValues}>
              {({ values, errors, touched, handleChange, handleSubmit, handleBlur }) => (
                <form autoComplete="off">
                  <div className="row">
                    <CommonSelectInput
                      containerClassName={'form-group col-lg-3'}
                      value={values.columnsFilter}
                      onBlur={handleBlur('columnsFilter')}
                      onChange={handleChange('columnsFilter')}
                      labelText={'Cột để lọc'}
                      selectClassName={'form-control'}
                      lstSelectOptions={columnsFilter}
                      placeholder={'Chọn cột cần lọc'}
                    />
                    <CommonSelectInput
                      containerClassName={'form-group col-lg-3'}
                      value={values.filterTypes}
                      onBlur={handleBlur('filterTypes')}
                      onChange={handleChange('filterTypes')}
                      labelText={'Tùy chọn lọc'}
                      placeholder={'Chọn kiểu lọc'}
                      selectClassName={'form-control'}
                      lstSelectOptions={filterTypes}
                    />
                    <CommonTextInput
                      containerClassName={'form-group col-lg-3'}
                      value={values.textFilter}
                      onBlur={handleBlur('textFilter')}
                      onChange={handleChange('textFilter')}
                      labelText={'Từ khóa'}
                      inputType={'text'}
                      placeholder={'Nhập từ khóa'}
                      inputClassName={'form-control'}
                    />
                    <div className="d-flex align-items-end form-group col-lg-3">
                      <button type="button" className="align-bottom btn btn-primary">
                        Primary
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>

        <Grid rows={data} columns={state.columns} getRowId={(row) => row.id}>
          <DateTypeProvider for={dateColumns} />
          <MultiValuesTypeProvider for={multiValuesColumns} />
          <EditingState editingRowIds={state.editingRowIds} rowChanges={rowChanges} onRowChangesChange={setRowChanges} addedRows={[]} />
          <PagingState
            currentPage={state.currentPage}
            onCurrentPageChange={(PageNumber) =>
              setState((prevState) => ({
                ...prevState,
                currentPage: PageNumber,
              }))
            }
            pageSize={state.pageSize}
            onPageSizeChange={(newPageSize) =>
              setState((prevState) => ({
                ...prevState,
                pageSize: newPageSize,
              }))
            }
          />
          <SelectionState
            selection={state.selection}
            onSelectionChange={(selection) =>
              setState((prevState) => ({
                ...prevState,
                selection: selection,
              }))
            }
          />
          <IntegratedPaging />
          <IntegratedSelection />
          <SortingState
            defaultSorting={[
              {
                columnName: columnDef && columnDef[0].name,
                direction: 'asc',
              },
            ]}
          />
          <IntegratedFiltering columnExtensions={filteringColumnExtensions} />
          <DragDropProvider />
          <Table key={route} columnExtensions={tableColumnExtensions} tableComponent={TableComponent} />
          <TableColumnReordering order={columnOrder} onOrderChange={setColumnOrder} />
          <TableHeaderRow showSortingControls />
          <TableColumnVisibility defaultHiddenColumnNames={defaultHiddenColumnNames} />
          <Toolbar rootComponent={ToolbarRoot} />
          <ExportPanel startExport={startExport} color={'primary'} />
          <AddRowPanel route={route} disableCreate={disableCreate} />
          <ColumnChooser />
          <TableFixedColumns />
          <CustomTableEditColumn route={route} deleteRow={deleteRow} disableDelete={disableDelete} disableEdit={disableEdit} />
          {/* <TableSelection showSelectAll /> */}
          <PagingPanel pageSizes={state.pageSizes} />
        </Grid>
        <GridExporter ref={exporterRef} rows={data} columns={state.columns} onSave={onSave} />
      </Paper>
    </div>
  );
};
export default QTable;
