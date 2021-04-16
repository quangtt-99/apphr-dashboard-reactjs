import { CContainer } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QTable from 'src/components/table/Table';
import { ROUTE_PATH } from 'src/constants/key';
import { fetchAccounts, deleteAccount } from 'src/stores/actions/account';

const Account = ({ t, location, history }) => {
  const columnDefOfAccounts = [
    { name: 'username', title: t('label.username'), align: 'left', width: '20%', wordWrapEnabled: true },
    { name: 'email', title: t('label.email'), align: 'left', width: '20%', wordWrapEnabled: true },
    { name: 'phone', title: t('label.phone_number'), align: 'left', width: '15%', wordWrapEnabled: true },
    { name: 'role', title: t('label.role'), align: 'left', width: '15%', wordWrapEnabled: true },
    { name: 'profileId', title: t('label.profile'), align: 'left', width: '15%', wordWrapEnabled: true },
  ];
  const dispatch = useDispatch();
  const accounts = useSelector((state) => state.account.accounts);
  const [paging, setPaging] = useState({
    currentPage: 0,
    pageSize: 5,
    total: 0,
    pageSizes: [5, 10, 15],
  });
  const onCurrentPageChange = (pageNumber) => {
    setPaging((prevState) => ({
      ...prevState,
      currentPage: pageNumber,
    }));
  };
  const onPageSizeChange = (newPageSize) =>
    setPaging((prevState) => ({
      ...prevState,
      pageSize: newPageSize,
    }));
  const onTotalChange = (total) =>
    setPaging((prevState) => ({
      ...prevState,
      total: total,
    }));
  useEffect(() => {
    dispatch(
      fetchAccounts(
        {
          page: paging.currentPage,
          perpage: paging.pageSize,
        },
        onTotalChange,
      ),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paging.currentPage, paging.pageSize]);

  const deleteRow = async (rowId) => {
    dispatch(deleteAccount(rowId, t('message.successful_delete')));
    dispatch(fetchAccounts());
  };
  return (
    <CContainer fluid className="c-main mb-3 px-4">
      <QTable
        t={t}
        columnDef={columnDefOfAccounts}
        data={accounts}
        route={ROUTE_PATH.ACCOUNT + '/'}
        idxColumnsFilter={[0]}
        deleteRow={deleteRow}
        linkCols={[{ name: 'profileId', route: `${ROUTE_PATH.PROFILE}/` }]}
        onCurrentPageChange={onCurrentPageChange}
        onPageSizeChange={onPageSizeChange}
        paging={paging}
      />
    </CContainer>
  );
};

export default Account;
