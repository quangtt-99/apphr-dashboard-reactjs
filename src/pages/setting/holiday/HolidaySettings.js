import { CContainer } from '@coreui/react';
import { Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import CommonTextInput from 'src/components/input/CommonTextInput';
import BasicLoader from 'src/components/loader/BasicLoader';
import FormHeader from 'src/components/text/FormHeader';
import { ROUTE_PATH } from 'src/constants/key';
import { SettingHolidayLimitSchema } from 'src/schema/formSchema';
import { changeActions } from 'src/stores/actions/header';

//TODO: translate

const HolidaySettings = ({ t, location, match, history }) => {
  const params = match.params;
  const holidayInfoForm = useRef();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [initialValues, setInitialValues] = useState({
    type: '',
    total: '',
  });

  const getHolidayInfo = () => {
    setInitialValues({
      type: 'Nghỉ có phép',
      total: '12',
    });
  };

  useEffect(() => {
    if (params?.id) getHolidayInfo();
    const actions = [
      {
        type: 'primary',
        name: 'Tạo mới',
        callback: () => history.push(ROUTE_PATH.SHIFT_CREATE),
      },
    ];
    dispatch(changeActions(actions));
  }, []);

  // const getOnSubmitInForm = (event) => holidayInfoForm.current.handleSubmit(event);

  return (
    <CContainer fluid className="c-main mb-3 px-4">
      {isLoading ? (
        <BasicLoader isVisible={isLoading} radius={10} />
      ) : (
        <div className="m-auto">
          <div className="shadow bg-white rounded p-4 container col-md-7">
            <Formik
              innerRef={holidayInfoForm}
              enableReinitialize
              initialValues={initialValues}
              validationSchema={SettingHolidayLimitSchema}
              onSubmit={(values) => console.log(values)}
            >
              {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                <form>
                  <FormHeader text="Thêm ngày nghỉ lễ" />
                  <div className="row">
                    <CommonTextInput
                      containerClassName={'form-group col-lg-12'}
                      value={values.type}
                      onBlur={handleBlur('type')}
                      onChange={handleChange('type')}
                      inputID={'type'}
                      labelText={'Loại đề xuất'}
                      inputType={'text'}
                      inputClassName={'form-control'}
                      isDisable={true}
                    />
                    <CommonTextInput
                      containerClassName={'form-group col-lg-12'}
                      value={values.total}
                      onBlur={handleBlur('total')}
                      onChange={handleChange('total')}
                      inputID={'total'}
                      labelText={'Tổng số ngày tối đa'}
                      inputType={'number'}
                      placeholder={'Nhập tổng số ngày tối đa'}
                      inputClassName={'form-control'}
                      isRequiredField
                      isTouched={touched.total}
                      isError={errors.total && touched.total}
                      errorMessage={errors.total}
                    />
                  </div>
                </form>
              )}
            </Formik>
          </div>
          ;
        </div>
      )}
    </CContainer>
  );
};

export default HolidaySettings;
