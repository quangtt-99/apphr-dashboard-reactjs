import { CContainer } from '@coreui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QTable from 'src/components/table/Table';
import { ROUTE_PATH } from 'src/constants/key';
import { deletePosition, fetchPositions } from 'src/stores/actions/position';

const Position = ({ t, location, history }) => {
  const columnDef = [
    { name: 'code', title: t('label.position_code'), align: 'left', width: '15%', wordWrapEnabled: true },
    { name: 'name', title: t('label.position_name'), align: 'left', width: '25%', wordWrapEnabled: true },
    { name: 'branchName', title: t('label.branch'), align: 'left', width: '25%', wordWrapEnabled: true },
    { name: 'departmentName', title: t('label.department'), align: 'left', width: '25%', wordWrapEnabled: true },
  ];
  const dispatch = useDispatch();
  const positions = useSelector((state) => state.position.positions);

  useEffect(() => {
    dispatch(fetchPositions());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteRow = async (rowId) => {
    dispatch(deletePosition({ id: rowId }, t('message.successful_delete')));
    dispatch(fetchPositions());
  };

  return (
    <CContainer fluid className="c-main mb-3 px-4">
      <QTable
        columnDef={columnDef}
        data={positions.map((p) => {
          p.branchName = p.branch?.name;
          p.departmentName = p.department?.name;
          return p;
        })}
        t={t}
        route={ROUTE_PATH.POSITION + '/'}
        idxColumnsFilter={[0, 2]}
        deleteRow={deleteRow}
      />
    </CContainer>
  );
};
export default Position;
