import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ROUTE_PATH } from 'src/constants/key';
import { fetchBranches } from 'src/stores/actions/branch';
import { fetchDepartment, resetDepartment, updateDepartment } from 'src/stores/actions/department';
import DepartmentItemBody from './DepartmentItemBody';

const EditDepartment = ({ t, location, match, history }) => {
  const departmentRef = useRef();
  const dispatch = useDispatch();
  const branches = useSelector((state) => state.branch.branches);
  const department = useSelector((state) => state.department.department);

  useEffect(() => {
    dispatch(fetchBranches());
    dispatch(fetchDepartment({ id: match.params.id }));
    return () => {
      dispatch(resetDepartment());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitForm = (values) => {
    const form = values;
    form.branchId = parseInt(form.branchId);

    dispatch(updateDepartment(form, t('message.successful_update')));
  };
  const buttons = [
    {
      type: 'button',
      className: `btn btn-primary mr-4`,
      onClick: (e) => {
        history.push(ROUTE_PATH.DEPARTMENT);
      },
      name: t('label.back'),
      position: 'left',
    },
    {
      type: 'reset',
      className: `btn btn-primary mr-4`,
      onClick: (e) => {
        departmentRef.current.handleReset(e);
      },
      name: t('label.reset'),
    },
    {
      type: 'button',
      className: `btn btn-primary`,
      onClick: (e) => {
        departmentRef.current.handleSubmit(e);
      },
      name: t('label.update'),
    },
  ];
  return (
    <DepartmentItemBody t={t} departmentRef={departmentRef} department={department} branches={branches} submitForm={submitForm} buttons={buttons} />
  );
};

export default EditDepartment;
