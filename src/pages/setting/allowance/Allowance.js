import { CContainer } from '@coreui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QTable from 'src/components/table/Table';
import { ROUTE_PATH } from 'src/constants/key';
import { deleteAllowance, fetchAllowances } from 'src/stores/actions/allowance';
import PropTypes from 'prop-types';
const Allowance = ({ t }) => {
  const dispatch = useDispatch();
  const allowances = useSelector((state) => state.allowance.allowances);
  const columnDef = [
    { name: 'code', title: t('label.allowance_code'), align: 'left', width: '25%', wordWrapEnabled: true },
    { name: 'name', title: t('label.allowance_name'), align: 'left', width: '40%', wordWrapEnabled: true },
    { name: 'amount', title: t('label.allowance_amount'), align: 'left', width: '25%', wordWrapEnabled: true },
  ];
  useEffect(() => {
    dispatch(fetchAllowances());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteRow = async (rowId) => {
    dispatch(deleteAllowance(rowId, t('message.successful_delete')));
    dispatch(fetchAllowances());
  };

  return (
    <CContainer fluid className="c-main mb-3 px-4">
      <QTable t={t} columnDef={columnDef} data={allowances} route={ROUTE_PATH.ALLOWANCE + '/'} idxColumnsFilter={[0, 1]} deleteRow={deleteRow} />
    </CContainer>
  );
};
Allowance.propTypes = {
  t: PropTypes.func,
};
export default Allowance;