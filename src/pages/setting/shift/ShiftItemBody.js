import { CContainer } from '@coreui/react';
import { Field, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import CommonMultiSelectInput from 'src/components/input/CommonMultiSelectInput';
import CommonSelectInput from 'src/components/input/CommonSelectInput';
import CommonTextInput from 'src/components/input/CommonTextInput';
import Label from 'src/components/text/Label';
import { createNewShift, updateShift } from 'src/stores/actions/shift';
import { convertTimeWithSecond, enCodeChecked } from './shiftFunctionUtil';

const ShiftItemBody = ({ shiftRef, shift, validationSchema, branches, isUpdate }) => {
  const DAYS = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];
  const typeCC = [
    { id: 'WIFI', name: 'WIFI' },
    { id: 'QR_CODE', name: 'QR_CODE' },
  ];
  const dispatch = useDispatch();
  return (
    <CContainer fluid className="c-main mb-3 px-4">
      <div className="m-auto">
        <div className="shadow bg-white rounded p-4 container col-md-7">
          <Formik
            innerRef={shiftRef}
            enableReinitialize
            initialValues={shift.shift ?? shift}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              let form = values;

              form.operateLoop = enCodeChecked(form.operateLoop);
              form.startCC = convertTimeWithSecond(form.startCC);
              form.endCC = convertTimeWithSecond(form.endCC);
              if (isUpdate) dispatch(updateShift(form));
              else dispatch(createNewShift(form));
            }}
          >
            {({ values, errors, touched, handleChange, setValues, handleBlur }) => (
              <form autoComplete="off">
                <div className="row">
                  <CommonTextInput
                    containerClassName={'form-group col-lg-12'}
                    value={values.shortname}
                    onBlur={handleBlur('shortname')}
                    onChange={handleChange('shortname')}
                    inputID={'shortname'}
                    labelText={'Mã ca làm'}
                    inputType={'text'}
                    placeholder={'Nhập mã ca làm'}
                    inputClassName={'form-control'}
                    isRequiredField
                    isTouched={touched.shortname}
                    isError={errors.shortname && touched.shortname}
                    errorMessage={errors.shortname}
                  />
                </div>
                <div className="row">
                  <CommonTextInput
                    containerClassName={'form-group col-lg-12'}
                    value={values.name}
                    onBlur={handleBlur('name')}
                    onChange={handleChange('name')}
                    inputID={'name'}
                    labelText={'Tên ca làm'}
                    inputType={'text'}
                    placeholder={'Nhập tên ca làm'}
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
                    value={values.startCC}
                    onBlur={handleBlur('startCC')}
                    onChange={handleChange('startCC')}
                    inputID={'startCC'}
                    labelText={'Giờ check-in'}
                    inputType={'Time'}
                    inputClassName={'form-control'}
                    isRequiredField
                    isTouched={touched.startCC}
                    isError={errors.startCC && touched.startCC}
                    errorMessage={errors.startCC}
                  />
                  <CommonTextInput
                    containerClassName={'form-group col-lg-6'}
                    value={values.endCC}
                    onBlur={handleBlur('endCC')}
                    onChange={handleChange('endCC')}
                    inputID={'endCC'}
                    labelText={'Giờ check-out'}
                    inputType={'Time'}
                    inputClassName={'form-control'}
                    isRequiredField
                    isTouched={touched.endCC}
                    isError={errors.endCC && touched.endCC}
                    errorMessage={errors.endCC}
                    minTime={values.startCC}
                  />
                </div>
                <div className="row">
                  <CommonTextInput
                    containerClassName={'form-group col-lg-12'}
                    value={values.coefficient}
                    onBlur={handleBlur('coefficient')}
                    onChange={handleChange('coefficient')}
                    inputID={'coefficient'}
                    labelText={'Hệ số giờ làm'}
                    inputType={'number'}
                    inputClassName={'form-control'}
                    isRequiredField
                    isTouched={touched.coefficient}
                    isError={errors.coefficient && touched.coefficient}
                    errorMessage={errors.coefficient}
                  />
                </div>
                <div className="row">
                  <div className="form-group col-lg-12">
                    <Label text="Thời gian hoạt động của ca làm" required={true} />
                    <div role="group" className="d-flex flex-row flex-wrap justify-content-around">
                      {DAYS.map((day, index) => (
                        <label key={index}>
                          <Field type="checkbox" name="operateLoop" value={index + ''} />
                          &nbsp;{day}
                        </label>
                      ))}
                    </div>
                    {touched.operateLoop && errors.operateLoop && (
                      <div>
                        <small className={'text-danger'}>{errors.operateLoop}</small>
                      </div>
                    )}
                  </div>
                </div>

                <div className="row">
                  <div className="form-group col-lg-12">
                    <Label text="Chi nhánh" required={true} />
                    <div className="d-flex flex-row flex-wrap justify-content-between border">
                      <CommonMultiSelectInput
                        values={values.branchIds}
                        onChangeValues={handleChange('branchIds')}
                        listValues={branches}
                        setValues={setValues}
                        placeholder={'Chọn chi nhánh'}
                      />
                    </div>
                    {touched.branchIds && errors.branchIds && (
                      <div>
                        <small className={'text-danger'}>{errors.branchIds}</small>
                      </div>
                    )}
                  </div>
                </div>

                <div className="row">
                  <CommonSelectInput
                    containerClassName={'form-group col-lg-12'}
                    value={values.typeCC}
                    onBlur={handleBlur('typeCC')}
                    onChange={handleChange('typeCC')}
                    inputID={'typeCC'}
                    labelText={'Hình thức điểm danh'}
                    selectClassName={'form-control'}
                    isRequiredField
                    isTouched={touched.typeCC}
                    isError={errors.typeCC && touched.typeCC}
                    errorMessage={errors.typeCC}
                    lstSelectOptions={typeCC}
                    placeholder={'Chọn hình thức điểm danh'}
                  />
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </CContainer>
  );
};

export default ShiftItemBody;
