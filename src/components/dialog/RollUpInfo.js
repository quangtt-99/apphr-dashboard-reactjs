import { Avatar, Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import { Cancel } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PAGE_SIZES } from 'src/constants/key';
import { fetchAssignment, setEmptyAssignment } from 'src/stores/actions/assignment';
import { deleteRollUp } from 'src/stores/actions/rollUp';
import QTable from '../table/Table';

const RollUpInfo = ({ t, isOpen, handleClose, profileCode, fullName, avatar, assignment, profileId }) => {
  const dispatch = useDispatch();
  const [isReload, setIsReload] = useState(false);
  const rows = useSelector((state) => state.assignment.assignment);
  const columnDef = [
    { name: 'type', title: t('label.type_roll_call'), align: 'left', width: '25%', wordWrapEnabled: true },
    { name: 'startTime', title: t('label.start_time'), align: 'left', width: '30%', wordWrapEnabled: true },
    { name: 'endTime', title: t('label.end_time'), align: 'left', width: '30%', wordWrapEnabled: true },
  ];
  const [paging, setPaging] = useState({
    currentPage: 0,
    pageSize: PAGE_SIZES.LEVEL_1,
    total: 0,
    loading: false,
    pageSizes: [PAGE_SIZES.LEVEL_1, PAGE_SIZES.LEVEL_2, PAGE_SIZES.LEVEL_3],
  });
  const onCurrentPageChange = (pageNumber) =>
    setPaging((prevState) => ({
      ...prevState,
      currentPage: pageNumber,
    }));
  const onPageSizeChange = (newPageSize) =>
    setPaging((prevState) => ({
      ...prevState,
      pageSize: newPageSize,
    }));
  const setLoading = (isLoading) => {
    setPaging((prevState) => ({
      ...prevState,
      loading: isLoading,
    }));
  };
  useEffect(() => {
    if (assignment?.id && isOpen) {
      dispatch(fetchAssignment(assignment.id, setLoading));
      setPaging((prevState) => ({
        ...prevState,
        total: rows?.rollUps?.length ?? 0,
      }));
    }
    return () => {
      dispatch(setEmptyAssignment());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paging.currentPage, paging.pageSize]);
  const deleteRow = async (rowId) => {
    dispatch(deleteRollUp(rowId, assignment.id, t('message.successful_delete')));
  };
  return (
    <Dialog open={isOpen} maxWidth="md" fullWidth disableBackdropClick={false}>
      <DialogTitle className={'dialog-title-background'}>
        <div className="d-flex flex-row justify-content-between align-items-center">
          <div style={{ fontSize: 24, color: 'black', fontWeight: 'bold' }}>{t('label.history_roll_call')}</div>
          <Cancel fontSize="large" onClick={(e) => handleClose(isReload)} role="button" />
        </div>
      </DialogTitle>
      <DialogContent>
        <div className="d-flex flex-row py-2 align-items-center">
          <Avatar alt="avatar" src={avatar} className="mr-3" />
          <div>
            <div>
              <div style={{ fontWeight: 'bold' }}>
                {t('label.employee_full_name')} : {fullName}
              </div>
            </div>
            <div>
              <div style={{ fontWeight: 'bold' }}>
                {t('label.employee_code')} : {profileCode}
              </div>
            </div>
          </div>
        </div>
        <div>
          <p className="mb-1">{t('label.shift_name') + ' : ' + assignment.shiftCode + ' - ' + assignment.shiftName}</p>
          <p>{t('label.from') + assignment.startCC + t('label.to') + assignment.endCC}</p>
        </div>
        <QTable
          t={t}
          columnDef={columnDef}
          data={rows?.rollUps ?? []}
          paging={paging}
          onCurrentPageChange={onCurrentPageChange}
          onPageSizeChange={onPageSizeChange}
          disableFilter={true}
          isPopUp={true}
          deleteRow={deleteRow}
          rollUpData={{
            profileId: profileId,
            assignmentId: assignment?.id,
            startCC: assignment.startCC,
            date: rows.startTime,
            setIsReload: setIsReload,
          }}
          editColumnWidth={'15%'}
          disableCreate={(rows.rollUps && rows.rollUps.length > 0) || assignment.status.includes('leave')}
        />
      </DialogContent>
    </Dialog>
  );
};

export default RollUpInfo;
