import { CContainer } from '@coreui/react';
import { CircularProgress } from '@material-ui/core';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CommonMultipleTextInput from 'src/components/input/CommonMultipleTextInput';
import CommonSelectInput from 'src/components/input/CommonSelectInput';
import CommonTextInput from 'src/components/input/CommonTextInput';
import FormHeader from 'src/components/text/FormHeader';
import Label from 'src/components/text/Label';
import { PROFILE_TABS, REQUEST_TABS, ROUTE_PATH } from 'src/constants/key';
import { setSubTabName, setTabName } from 'src/stores/actions/profile';
import { approveOvertimeRequest, fetchOvertimeRequest, rejectOvertimeRequest, setEmptyOverTimeRequest } from 'src/stores/actions/request';
import { renderButtons } from 'src/utils/formUtils';

const OvertimeForm = ({ t, history, match }) => {
  const dispatch = useDispatch();

  const status = [
    { id: 'new', name: t('label.new') },
    { id: 'approve', name: t('label.approve') },
    { id: 'reject', name: t('label.reject') },
  ];
  const overtimeRequest = useSelector((state) => state.request.overtimeForm);
  const [loading, setLoading] = useState(false);
  const basicInfo = {};
  const requestId = match?.params?.id;
  const fullyButtons = [
    {
      type: 'button',
      className: `btn btn-primary mr-4`,

      onClick: (e) => {
        history.push(ROUTE_PATH.OVERTIME);
      },
      name: t('label.back'),
      position: 'left',
    },
    {
      type: 'button',
      className: `btn btn-danger mr-4`,
      onClick: (e) => {
        dispatch(rejectOvertimeRequest(requestId, t('label.deny_success')));
      },
      name: t('label.deny'),
    },
    {
      type: 'button',
      className: `btn btn-success`,
      onClick: (e) => {
        dispatch(approveOvertimeRequest(requestId, t('label.accept_success')));
      },
      name: t('label.accept'),
    },
  ];
  const handledButtons = [
    {
      type: 'button',
      className: `btn btn-primary mr-4`,

      onClick: (e) => {
        history.push(ROUTE_PATH.OVERTIME);
      },
      name: t('label.back'),
      position: 'left',
    },
  ];
  useEffect(() => {
    if (match.path.includes('profile') && match.path.includes('overtime.id=')) {
      dispatch(setTabName(PROFILE_TABS.REQUEST));
      dispatch(setSubTabName(REQUEST_TABS.OVERTIME_REQUEST));
    }
    if (requestId) dispatch(fetchOvertimeRequest(requestId, setLoading));
    return () => {
      dispatch(setEmptyOverTimeRequest());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <CContainer fluid className="c-main mb-3 px-4">
      <div className="m-auto">
        {loading ? (
          <div className="text-center">
            <CircularProgress />
          </div>
        ) : (
          <div className="row">
            <div className="shadow bg-white rounded p-4 container col-xl-6">
              <Formik
                //            innerRef={branchRef}
                enableReinitialize
                initialValues={overtimeRequest}
                // validationSchema={LeaveFormSchema}
                onSubmit={(values) => {}}
              >
                {({ values, errors, touched, handleChange, handleSubmit, handleBlur }) => (
                  <form autoComplete="off">
                    <FormHeader text={t('label.overtime_info')} />
                    <div className="row">
                      <div className="form-group col-xl-12">
                        <Label text={t('label.code')} required />
                        <div className="input-group">
                          <input
                            type="text"
                            className={'form-control col-12'}
                            rows={5}
                            onBlur={handleBlur('code')}
                            name={`code`}
                            onChange={(e) => handleChange(`code`)(e)}
                            value={values.code ?? ''}
                            disabled
                            placeholder={t('placeholder.enter_overtime_code')}
                          />
                        </div>
                        {errors.code && touched.code && t(errors.code) ? (
                          <div>
                            <small className={'text-danger'}>{t(errors.code)}</small>
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                      <CommonTextInput
                        containerClassName={'form-group col-xl-12'}
                        value={values.createdAt ?? ''}
                        onBlur={handleBlur('createdAt')}
                        onChange={handleChange('createdAt')}
                        inputID={'createdAt'}
                        labelText={t('label.sent_date')}
                        inputType={'datetime-local'}
                        inputClassName={'form-control'}
                        isDisable
                        isRequiredField
                      />
                      <CommonTextInput
                        containerClassName={'form-group col-xl-12'}
                        value={values.assignment ?? ''}
                        onBlur={handleBlur('assignment')}
                        onChange={handleChange('assignment')}
                        inputID={'assignment'}
                        labelText={t('label.assignment_overtime')}
                        inputType={'text'}
                        inputClassName={'form-control'}
                        isDisable
                        isRequiredField
                      />
                    </div>

                    <div className="row">
                      <CommonSelectInput
                        containerClassName={'form-group col-xl-12'}
                        value={values.status ?? ''}
                        onBlur={handleBlur('status')}
                        onChange={handleChange('status')}
                        inputID={'status'}
                        labelText={t('label.status')}
                        selectClassName={'form-control'}
                        isRequiredField
                        isDisable
                        lstSelectOptions={status}
                      />

                      <CommonTextInput
                        containerClassName={'form-group col-xl-12'}
                        value={values.handler ?? ''}
                        onBlur={handleBlur('handler')}
                        onChange={handleChange('handler')}
                        inputID={'handler'}
                        labelText={t('label.handler')}
                        inputType={'text'}
                        inputClassName={'form-control'}
                        isDisable
                        isHide={values.handler ? false : true}
                        isRequiredField
                      />
                      <CommonTextInput
                        containerClassName={'form-group col-xl-12'}
                        value={values.handleDate ?? ''}
                        onBlur={handleBlur('handleDate')}
                        onChange={handleChange('handleDate')}
                        inputID={'handleDate'}
                        labelText={t('label.handleDate')}
                        inputType={'datetime-local'}
                        placeholder={t('placeholder.handleDate')}
                        inputClassName={'form-control'}
                        isHide={values.handler ? false : true}
                        isDisable
                        isRequiredField
                      />
                    </div>
                    <div className="row">
                      <CommonMultipleTextInput
                        containerClassName={'form-group col-lg-12'}
                        value={values.note ?? ''}
                        onBlur={handleBlur(`note`)}
                        onChange={handleChange(`note`)}
                        labelText={t('label.note')}
                        inputClassName={'form-control'}
                        placeholder={t('placeholder.enter_note')}
                        rows={10}
                      />
                    </div>

                    <div style={{ position: 'absolute', bottom: 20, width: '94%' }}>
                      {values.status === 'new' ? renderButtons(fullyButtons) : renderButtons(handledButtons)}
                    </div>
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
        )}
      </div>
    </CContainer>
  );
};

export default OvertimeForm;
