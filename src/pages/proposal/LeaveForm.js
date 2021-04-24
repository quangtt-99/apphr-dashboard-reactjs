import { CContainer } from '@coreui/react';
import Label from 'src/components/text/Label';
import { Formik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import CommonMultipleTextInput from 'src/components/input/CommonMultipleTextInput';
import CommonMultiSelectInput from 'src/components/input/CommonMultiSelectInput';
import CommonSelectInput from 'src/components/input/CommonSelectInput';
import CommonTextInput from 'src/components/input/CommonTextInput';
import { fetchDistricts, fetchWards } from 'src/stores/actions/location';
import { REDUX_STATE } from 'src/stores/states';
import { renderButtons } from 'src/utils/formUtils';
import FormHeader from 'src/components/text/FormHeader';
import { setSubTabName, setTabName } from 'src/stores/actions/profile';

const LeaveForm = ({ t, history, match }) => {
  const dispatch = useDispatch();
  const type = [
    { id: 'no_pay', name: t('label.not_have_salary') },
    { id: 'pay', name: t('label.have_salary') },
  ];
  const leaveRequest = {};
  const assigments = [];
  const basicInfo = {};
  const buttons = [
    {
      type: 'button',
      className: `btn btn-primary mr-4`,

      onClick: (e) => {},
      name: t('label.back'),
      position: 'left',
    },
    {
      type: 'button',
      className: `btn btn-danger mr-4`,
      onClick: (e) => {},
      name: t('label.deny'),
    },
    {
      type: 'button',
      className: `btn btn-success`,
      onClick: (e) => {},
      name: t('label.accept'),
    },
  ];
  useEffect(() => {
    if (match.path.includes('profile') && match.path.includes('leave.id=')) {
      dispatch(setTabName(1));
      dispatch(setSubTabName(1));
    }
  });
  return (
    <CContainer fluid className="c-main mb-3 px-4">
      <div className="m-auto">
        <div className="row">
          <div className="shadow bg-white rounded p-4 container col-xl-6">
            <Formik
              //            innerRef={branchRef}
              enableReinitialize
              initialValues={leaveRequest}
              // validationSchema={LeaveFormSchema}
              onSubmit={(values) => {
                console.log(values);
              }}
            >
              {({ values, errors, touched, handleChange, handleSubmit, handleBlur }) => (
                <form autoComplete="off">
                  <FormHeader text={t('label.leave_info')} />
                  <div className="row">
                    <CommonSelectInput
                      containerClassName={'form-group col-xl-12'}
                      value={values.type}
                      onBlur={handleBlur('type')}
                      onChange={handleChange('type')}
                      inputID={'type'}
                      labelText={t('label.leave_type')}
                      selectClassName={'form-control'}
                      isRequiredField
                      isDisable
                      lstSelectOptions={type}
                    />
                    <CommonTextInput
                      containerClassName={'form-group col-xl-12'}
                      value={values.createdAt}
                      onBlur={handleBlur('createdAt')}
                      onChange={handleChange('createdAt')}
                      inputID={'createdAt'}
                      labelText={t('label.sent_date')}
                      inputType={'datetime-local'}
                      inputClassName={'form-control'}
                      isDisable
                      isRequiredField
                    />
                  </div>
                  <div className="row">
                    <div className="form-group col-xl-12">
                      <Label text={t('label.assignment_requests')} required={true} />
                      <CommonMultiSelectInput
                        values={values.assigmentIds}
                        listValues={assigments}
                        onChangeValues={(e) => {
                          handleChange('assigmentIds')(e);
                        }}
                      />
                    </div>
                  </div>
                  <div className="row" hidden={values.status}>
                    <CommonTextInput
                      containerClassName={'form-group col-xl-12'}
                      value={values.status}
                      onBlur={handleBlur('status')}
                      onChange={handleChange('status')}
                      inputID={'status'}
                      labelText={t('label.status')}
                      inputType={'text'}
                      inputClassName={'form-control'}
                      isDisable
                      isRequiredField
                    />
                    <CommonTextInput
                      containerClassName={'form-group col-xl-12'}
                      value={values.handler}
                      onBlur={handleBlur('handler')}
                      onChange={handleChange('handler')}
                      inputID={'handler'}
                      labelText={t('label.handler')}
                      inputType={'text'}
                      inputClassName={'form-control'}
                      isDisable
                      isRequiredField
                    />
                    <CommonTextInput
                      containerClassName={'form-group col-xl-12'}
                      value={values.handleDate}
                      onBlur={handleBlur('handleDate')}
                      onChange={handleChange('handleDate')}
                      inputID={'handleDate'}
                      labelText={t('label.handleDate')}
                      inputType={'datetime-local'}
                      placeholder={t('placeholder.handleDate')}
                      inputClassName={'form-control'}
                      isDisable
                      isRequiredField
                    />
                  </div>
                  <div className="row">
                    <CommonMultipleTextInput
                      containerClassName={'form-group col-lg-12'}
                      value={values.note}
                      onBlur={handleBlur(`note`)}
                      onChange={handleChange(`note`)}
                      labelText={t('label.note')}
                      inputClassName={'form-control'}
                      placeholder={t('placeholder.enter_note')}
                    />
                  </div>
                  {renderButtons(buttons)}
                </form>
              )}
            </Formik>
          </div>
          <div className="pl-4 container col-xl-5">
            <div className="row shadow bg-white rounded p-4 container col-xl-12">
              <Formik
                //            innerRef={branchRef}
                enableReinitialize
                initialValues={basicInfo}
                // validationSchema={LeaveFormSchema}
                onSubmit={(values) => {
                  console.log(values);
                }}
              >
                {({ values, errors, touched, handleChange, handleSubmit, handleBlur }) => (
                  <form autoComplete="off">
                    <FormHeader text={t('label.basic_info')} />

                    <div className="row">
                      <CommonTextInput
                        containerClassName={'form-group col-lg-6'}
                        value={values.code ?? ''}
                        onBlur={handleBlur('code')}
                        onChange={handleChange('code')}
                        inputID={'code'}
                        labelText={t('label.employee_code')}
                        inputType={'text'}
                        inputClassName={'form-control'}
                        isDisable
                      />
                      <CommonTextInput
                        containerClassName={'form-group col-lg-6'}
                        value={values.fullname ?? ''}
                        onBlur={handleBlur('fullname')}
                        onChange={handleChange('fullname')}
                        inputID={'fullname'}
                        labelText={t('label.employee_first_name')}
                        inputType={'text'}
                        inputClassName={'form-control'}
                        isDisable
                      />
                    </div>
                    <div className="row">
                      <CommonTextInput
                        containerClassName={'form-group col-lg-6'}
                        value={values.phone ?? ''}
                        onBlur={handleBlur('phone')}
                        onChange={handleChange('phone')}
                        inputID={'phone'}
                        labelText={t('label.phone_number')}
                        inputType={'text'}
                        inputClassName={'form-control'}
                        isDisable
                      />
                      <CommonTextInput
                        containerClassName={'form-group col-lg-6'}
                        value={values.email ?? ''}
                        onBlur={handleBlur('email')}
                        onChange={handleChange('email')}
                        inputID={'email'}
                        labelText={t('label.email')}
                        inputType={'email'}
                        inputClassName={'form-control'}
                        isDisable
                      />
                      <CommonTextInput
                        containerClassName={'form-group col-lg-6'}
                        value={values.branch ?? ''}
                        onBlur={handleBlur('branch')}
                        onChange={handleChange('branch')}
                        inputID={'branch'}
                        labelText={t('label.branch')}
                        inputType={'text'}
                        inputClassName={'form-control'}
                        isDisable
                      />
                      <CommonTextInput
                        containerClassName={'form-group col-lg-6'}
                        value={values.department ?? ''}
                        onBlur={handleBlur('department')}
                        onChange={handleChange('department')}
                        inputID={'department'}
                        labelText={t('label.department')}
                        inputType={'text'}
                        inputClassName={'form-control'}
                        isDisable
                      />
                    </div>

                    <div className="row">
                      <CommonTextInput
                        containerClassName={'form-group col-lg-6'}
                        value={values.position ?? ''}
                        onBlur={handleBlur('position')}
                        onChange={handleChange('position')}
                        inputID={'position'}
                        labelText={t('label.position')}
                        inputType={'text'}
                        inputClassName={'form-control'}
                        isDisable
                      />
                    </div>
                  </form>
                )}
              </Formik>
            </div>

            <div className=" row shadow bg-white rounded mt-4 p-4 container col-xl-12">
              <Formik
                //            innerRef={branchRef}
                enableReinitialize
                initialValues={basicInfo}
                // validationSchema={LeaveFormSchema}
                onSubmit={(values) => {
                  console.log(values);
                }}
              >
                {({ values, errors, touched, handleChange, handleSubmit, handleBlur }) => (
                  <form autoComplete="off">
                    <FormHeader text={t('label.statistics')} />

                    <div className="row">
                      <CommonTextInput
                        containerClassName={'form-group col-lg-6'}
                        value={values.numOfWorkDay ?? ''}
                        onBlur={handleBlur('numOfWorkDay')}
                        onChange={handleChange('numOfWorkDay')}
                        inputID={'numOfWorkDay'}
                        labelText={t('label.num_of_work_day')}
                        inputType={'number'}
                        inputClassName={'form-control'}
                        isDisable
                      />
                      <CommonTextInput
                        containerClassName={'form-group col-lg-6'}
                        value={values.numOfDayOff ?? ''}
                        onBlur={handleBlur('numOfDayOff')}
                        onChange={handleChange('numOfDayOff')}
                        inputID={'numOfDayOff'}
                        labelText={t('label.number_of_day_off')}
                        inputType={'number'}
                        inputClassName={'form-control'}
                        isDisable
                      />
                    </div>
                    <div className="row">
                      <CommonTextInput
                        containerClassName={'form-group col-lg-6'}
                        value={values.numOfRemote ?? ''}
                        onBlur={handleBlur('numOfRemote')}
                        onChange={handleChange('numOfRemote')}
                        inputID={'numOfRemote'}
                        labelText={t('label.number_of_remote')}
                        inputType={'number'}
                        inputClassName={'form-control'}
                        isDisable
                      />

                      <div className="form-group col-xl-6">
                        <Label text={t('label.total_delay_time')} />
                        <div className="input-group">
                          <input
                            disabled
                            type="number"
                            className={'form-control'}
                            rows={10}
                            name={`totalDelayTime`}
                            onChange={(e) => handleChange(`totalDelayTime`)(e)}
                            value={values.totalDelayTime}
                          />
                          <span className="input-group-text" id="basic-addon2">
                            {t('label.minutes')}
                          </span>
                        </div>
                      </div>
                      <div className="form-group col-xl-12">
                        <Label text={t('label.average_work_time')} />
                        <div className="input-group">
                          <input
                            disabled
                            type="number"
                            className={'form-control'}
                            rows={10}
                            name={`averageWorkTime`}
                            onChange={(e) => handleChange(`averageWorkTime`)(e)}
                            value={values.averageWorkTime}
                          />
                          <span className="input-group-text" id="basic-addon2">
                            {t('label.hours')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </CContainer>
  );
};

export default LeaveForm;