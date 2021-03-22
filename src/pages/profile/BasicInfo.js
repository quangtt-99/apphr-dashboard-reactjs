import { CContainer } from '@coreui/react';
import { Formik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CommonCheckbox from 'src/components/checkox/CommonCheckbox';
import CommonSelectInput from 'src/components/input/CommonSelectInput';
import CommonTextInput from 'src/components/input/CommonTextInput';
import FormHeader from 'src/components/text/FormHeader';
import Label from 'src/components/text/Label';
import { fetchBranches } from 'src/stores/actions/branch';
import { fetchDepartments } from 'src/stores/actions/department';
import { fetchProvinces } from 'src/stores/actions/location';
import { fetchPositions } from 'src/stores/actions/position';

const BasicInfo = ({ isCreate, profile }) => {
  const provinces = useSelector((state) => state.location.provinces);
  const branches = useSelector((state) => state.branch.branches);
  // const roles = useSelector((state) => state.role.roles);
  const positions = useSelector((state) => state.position.positions);
  const departments = useSelector((state) => state.department.departments);
  const dispatch = useDispatch();
  const employeeInfo = {
    name: profile.fullname,
    code: profile.shortname,
    phone: profile.phone,
    email: profile.email,
    birthday: profile.dateOfBirth.split('T')[0],
    gender: profile.gender === 'male' ? 1 : 0,
    id: profile.cmnd,
    have_id: profile.cmnd ? true : false,
    id_date: '',
    id_place: '',
    have_passport: profile.passport ? true : false,
    passport: profile.passport,
    passport_start: '',
    passport_end: '',
    passport_place: '',
    department: profile.departmentId,
    position: profile.positionId,
    role: profile.roleId,
    branch: profile.branchId,
    manager: '',
  };

  useEffect(() => {
    dispatch(fetchProvinces());
    dispatch(fetchBranches());
  }, []);
  const genders = [
    { id: 0, name: 'Nam' },
    { id: 1, name: 'Nữ' },
  ];
  return (
    <CContainer fluid className="c-main mb-3 px-4">
      <div className="m-auto">
        <div className="shadow bg-white rounded p-4">
          <FormHeader text="Thông tin cơ bản" />
          <Formik initialValues={employeeInfo}>
            {({ values, errors, touched, handleBlur, handleChange }) => (
              <form>
                <div className="row">
                  <div className="col-2">
                    <img src="https://api.time.com/wp-content/uploads/2014/07/301386_full1.jpg?w=800&quality=85" alt="Ảnh đại diện" height="200px" />
                  </div>
                  <div className="col-10">
                    <div className="row">
                      <CommonTextInput
                        containerClassName={'form-group col-lg-6'}
                        value={values.code}
                        onBlur={handleBlur('code')}
                        onChange={handleChange('code')}
                        inputID={'code'}
                        labelText={'Mã nhân viên'}
                        inputType={'text'}
                        placeholder={'Nhập mã nhân viên'}
                        inputClassName={'form-control'}
                        isRequiredField
                        isTouched={touched.code}
                        isError={errors.code && touched.code}
                        errorMessage={errors.code}
                      />
                      <CommonTextInput
                        containerClassName={'form-group col-lg-6'}
                        value={values.name}
                        onBlur={handleBlur('name')}
                        onChange={handleChange('name')}
                        inputID={'name'}
                        labelText={'Tên nhân viên'}
                        inputType={'text'}
                        placeholder={'Nhập tên nhân viên'}
                        inputClassName={'form-control'}
                        isRequiredField
                        isTouched={touched.name}
                        isError={errors.name && touched.name}
                        errorMessage={errors.name}
                      />
                    </div>
                    <div className="row">
                      <CommonTextInput
                        containerClassName={'form-group col-lg-6'}
                        value={values.phone}
                        onBlur={handleBlur('phone')}
                        onChange={handleChange('phone')}
                        inputID={'phone'}
                        labelText={'Số điện thoại'}
                        inputType={'text'}
                        placeholder={'Nhập số điện thoại'}
                        inputClassName={'form-control'}
                        isRequiredField
                        isTouched={touched.phone}
                        isError={errors.phone && touched.phone}
                        errorMessage={errors.phone}
                      />
                      <CommonTextInput
                        containerClassName={'form-group col-lg-6'}
                        value={values.email}
                        onBlur={handleBlur('email')}
                        onChange={handleChange('email')}
                        inputID={'email'}
                        labelText={'Email'}
                        inputType={'email'}
                        placeholder={'Nhập email'}
                        inputClassName={'form-control'}
                        isRequiredField
                        isTouched={touched.email}
                        isError={errors.email && touched.email}
                        errorMessage={errors.email}
                      />
                    </div>
                    <div className="row">
                      <CommonTextInput
                        containerClassName={'form-group col-lg-6'}
                        value={values.birthday}
                        onBlur={handleBlur('birthday')}
                        onChange={handleChange('birthday')}
                        inputID={'birthday'}
                        labelText={'Ngày sinh'}
                        inputType={'date'}
                        placeholder={'Chọn ngày sinh'}
                        inputClassName={'form-control'}
                        isRequiredField
                        isTouched={touched.birthday}
                        isError={errors.birthday && touched.birthday}
                        errorMessage={errors.birthday}
                      />
                      <CommonSelectInput
                        containerClassName={'form-group col-lg-6'}
                        value={values.gender}
                        onBlur={handleBlur('gender')}
                        onChange={handleChange('gender')}
                        inputID={'gender'}
                        labelText={'Giới tính'}
                        selectClassName={'form-control'}
                        isRequiredField
                        isTouched={touched.gender}
                        isError={errors.gender && touched.gender}
                        errorMessage={errors.gender}
                        lstSelectOptions={genders}
                        placeholder={'Chọn giới tính'}
                      />
                    </div>
                    <Label text="Chứng minh thư / Hộ chiếu" labelID="checkbox-id-password" className="py-2" />
                    <div className="row" role="group" aria-labelledby="checkbox-id-password"></div>
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="pl-12">
                          <CommonCheckbox
                            label={'CMND/CCCD'}
                            value={values.have_id}
                            onBlur={handleBlur('have_id')}
                            onChange={handleChange('have_id')}
                          />
                        </div>
                        {values.have_id && (
                          <>
                            <CommonTextInput
                              containerClassName={'form-group'}
                              value={values.id}
                              onBlur={handleBlur('id')}
                              onChange={handleChange('id')}
                              inputID={'id'}
                              labelText={'Số CMND/CCCD'}
                              inputType={'text'}
                              placeholder={'Nhập số CMND/CCCD'}
                              inputClassName={'form-control'}
                            />
                            <CommonTextInput
                              containerClassName={'form-group'}
                              value={values.id_date}
                              onBlur={handleBlur('id_date')}
                              onChange={handleChange('id_date')}
                              inputID={'id_date'}
                              labelText={'Ngày cấp'}
                              inputType={'date'}
                              placeholder={'Chọn ngày cấp'}
                              inputClassName={'form-control'}
                            />
                            <CommonSelectInput
                              containerClassName={'form-group'}
                              value={values.id_place}
                              onBlur={handleBlur('id_place')}
                              onChange={handleChange('id_place')}
                              inputID={'id_place'}
                              labelText={'Nơi cấp'}
                              selectClassName={'form-control'}
                              placeholder={'Chọn tỉnh/thành phố'}
                              lstSelectOptions={provinces}
                            />
                          </>
                        )}
                      </div>
                      <div className="col-lg-6">
                        <div className="pl-2">
                          <CommonCheckbox
                            label={'Hộ chiếu'}
                            value={values.have_passport}
                            onBlur={handleBlur('have_passport')}
                            onChange={handleChange('have_passport')}
                          />
                        </div>
                        {values.have_passport && (
                          <>
                            <CommonTextInput
                              containerClassName={'form-group'}
                              value={values.passport}
                              onBlur={handleBlur('passport')}
                              onChange={handleChange('passport')}
                              inputID={'passport'}
                              labelText={'Hộ chiếu'}
                              inputType={'text'}
                              placeholder={'Nhập hộ chiếu'}
                              inputClassName={'form-control'}
                            />
                            <div className="row">
                              <CommonTextInput
                                containerClassName={'form-group col-6'}
                                value={values.passport_start}
                                onBlur={handleBlur('passport_start')}
                                onChange={handleChange('passport_start')}
                                inputID={'passport_start'}
                                labelText={'Ngày cấp'}
                                inputType={'date'}
                                placeholder={'Chọn ngày'}
                                inputClassName={'form-control'}
                              />
                              <CommonTextInput
                                containerClassName={'form-group col-6'}
                                value={values.passport_end}
                                onBlur={handleBlur('passport_end')}
                                onChange={handleChange('passport_end')}
                                inputID={'passport_end'}
                                labelText={'Ngày hết hạn'}
                                inputType={'date'}
                                placeholder={'Chọn ngày'}
                                inputClassName={'form-control'}
                              />
                            </div>
                            <CommonSelectInput
                              containerClassName={'form-group'}
                              value={values.passport_place}
                              onBlur={handleBlur('passport_place')}
                              onChange={handleChange('passport_place')}
                              inputID={'passport_place'}
                              labelText={'Nơi cấp'}
                              selectClassName={'form-control'}
                              placeholder={'Chọn tỉnh/thành phố'}
                              lstSelectOptions={provinces}
                            />
                          </>
                        )}
                      </div>
                    </div>
                    <div className="row">
                      <CommonSelectInput
                        containerClassName={'form-group col-6'}
                        value={values.branch}
                        onBlur={handleBlur('branch')}
                        onChange={(e) => {
                          dispatch(fetchDepartments({ branchId: e.target.value }));
                          handleChange('branch')(e);
                        }}
                        inputID={'branch'}
                        labelText={'Chi nhánh'}
                        selectClassName={'form-control'}
                        placeholder={'Chọn chi nhánh'}
                        lstSelectOptions={branches}
                      />
                      <CommonSelectInput
                        containerClassName={'form-group col-6'}
                        value={values.department}
                        onBlur={handleBlur('department')}
                        onChange={(e) => {
                          dispatch(fetchPositions({ departmentId: e.target.value }));
                          handleChange('department')(e);
                        }}
                        inputID={'department'}
                        labelText={'Phòng ban'}
                        selectClassName={'form-control'}
                        placeholder={'Chọn phòng ban'}
                        lstSelectOptions={departments}
                      />
                      <CommonSelectInput
                        containerClassName={'form-group col-6'}
                        value={values.position}
                        onBlur={handleBlur('position')}
                        onChange={handleChange('position')}
                        inputID={'position'}
                        labelText={'Vị trí'}
                        selectClassName={'form-control'}
                        placeholder={'Chọn vị trí làm việc'}
                        lstSelectOptions={positions}
                      />
                      <CommonTextInput
                        containerClassName={'form-group col-6'}
                        value={values.manager}
                        onBlur={handleBlur('manager')}
                        onChange={handleChange('manager')}
                        inputID={'manager'}
                        labelText={'Quản lý trực tiếp'}
                        inputType={'text'}
                        placeholder={'Quản lý trước tiếp'}
                        inputClassName={'form-control'}
                      />
                    </div>
                  </div>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </CContainer>
  );
};
export default BasicInfo;
