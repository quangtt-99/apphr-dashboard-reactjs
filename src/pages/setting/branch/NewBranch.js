import { CAlert } from '@coreui/react';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SettingBranchInfoSchema } from 'src/schema/formSchema';
import { createBranch, setEmptyBranch } from 'src/stores/actions/branch';
import { fetchDistricts, fetchProvinces, fetchWards } from 'src/stores/actions/location';
import BranchItemBody from './BranchItemBody';

//TODO: translate

const NewBranchPage = ({ t, location, history }) => {
  const branchInfoForm = useRef();
  const dispatch = useDispatch();
  const branch = useSelector((state) => state.branch.branch);
  const provinces = useSelector((state) => state.location.provinces);
  const districts = useSelector((state) => state.location.districts);
  const wards = useSelector((state) => state.location.wards);

  useEffect(() => {
    dispatch(setEmptyBranch());
    dispatch(fetchProvinces());
    return () => {
      dispatch(setEmptyBranch());
    };
  }, []);

  useEffect(() => {
    if (branch.provinceId) {
      dispatch(fetchDistricts({ provinceId: branch.provinceId }));
    }
    if (branch.districtId) {
      dispatch(fetchWards({ districtId: branch.districtId }));
    }
  }, [branch.provinceId, branch.districtId]);

  const submitForm = (values) => {
    let form = values;
    form.provinceId = parseInt(form.provinceId);
    form.districtId = parseInt(form.districtId);
    form.wardId = parseInt(form.wardId);
    console.log(form);
    // Call API CREATE
    delete form.id;
    dispatch(createBranch(form, history));
  };
  const buttons = [
    {
      type: 'button',
      className: `btn btn-primary mr-4`,
      onClick: (e) => {
        history.push('/setting/branch');
      },
      name: 'Quay lại',
    },
    {
      type: 'button',
      className: `btn btn-primary`,
      onClick: (e) => {
        branchInfoForm.current.handleSubmit(e);
      },
      name: 'Tạo mới',
    },
  ];

  return (
    <BranchItemBody
      branchRef={branchInfoForm}
      branch={branch}
      validationSchema={SettingBranchInfoSchema}
      provinces={provinces}
      districts={districts}
      wards={wards}
      buttons={buttons}
      submitForm={submitForm}
    />
  );
};

export default NewBranchPage;
