import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeActions } from 'src/stores/actions/header';
import { updateAccount, fetchAccount, fetchRoles } from 'src/stores/actions/account';
import AccountItemBody from './AccountItemBody';

//TODO: translate

const UpdateAccount = ({ t, location, history }) => {
  const accountInfoForm = useRef();
  const dispatch = useDispatch();
  const account = useSelector((state) => state.account.account);
  const permissions = useSelector((state) => state.account.permissions);
  const roles = useSelector((state) => state.account.roles);
  useEffect(() => {
    //    dispatch(fetchAccount());
    dispatch(fetchRoles());
  }, []);

  const submitForm = (values) => {
    let form = values;
    delete form.id;
    console.log(form);
    //dispatch(updateAccount(form, history));
  };

  const buttons = [
    {
      type: 'button',
      className: `btn btn-primary mr-4`,
      onClick: (e) => {
        history.push('/account');
      },
      name: 'Quay lại',
    },
    {
      type: 'reset',
      className: `btn btn-primary mr-4`,
      onClick: (e) => {
        accountInfoForm.current.handleReset(e);
      },
      name: 'Reset',
    },
    {
      type: 'button',
      className: `btn btn-primary`,
      onClick: (e) => {
        accountInfoForm.current.handleSubmit(e);
      },
      name: 'Cập nhật',
    },
  ];

  return (
    <AccountItemBody
      accountRef={accountInfoForm}
      account={account}
      buttons={buttons}
      submitForm={submitForm}
      permissions={permissions}
      roles={roles}
    />
  );
};

export default UpdateAccount;
