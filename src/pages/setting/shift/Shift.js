import { CContainer } from '@coreui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QTable from 'src/components/table/Table';
import { ROUTE_PATH } from 'src/constants/key';
import { deleteShift, fetchShifts } from 'src/stores/actions/shift';

const Shifts = ({ t, location, history }) => {
  const columnDef = [
    { name: 'shortname', title: 'Mã ca làm' },
    { name: 'name', title: 'Tên ca làm' },
    { name: 'startCC', title: 'Giờ Check-in' },
    { name: 'endCC', title: 'Giờ Check-out' },
    { name: 'coefficient', title: 'Hệ số giờ làm' },
  ];
  const dispatch = useDispatch();
  const shifts = useSelector((state) => state.shift.shifts);

  useEffect(() => {
    dispatch(
      fetchShifts({
        page: 0,
        perpage: 1000,
      }),
    );
  }, []); // eslint-disable-next-line

  const deleteRow = (rowID) => {
    dispatch(deleteShift({ id: rowID }));
  };

  return (
    <CContainer fluid className="c-main mb-3 px-4">
      <QTable columnDef={columnDef} data={shifts} route={ROUTE_PATH.SHIFT + '/'} idxColumnsFilter={[0, 1]} deleteRow={deleteRow} />
    </CContainer>
  );
};
export default Shifts;
