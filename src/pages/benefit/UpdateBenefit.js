import { CContainer } from '@coreui/react';
import { CircularProgress } from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';
import { FieldArray, Formik, getIn } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIconButton from 'src/components/button/DeleteIconButton';
import WarningAlertDialog from 'src/components/dialog/WarningAlertDialog';
import CommonSelectInput from 'src/components/input/CommonSelectInput';
import CommonTextInput from 'src/components/input/CommonTextInput';
import Label from 'src/components/text/Label';
import { PERMISSION, ROUTE_PATH } from 'src/constants/key';
import { UpdateBenefitsSchema } from 'src/schema/formSchema';
import { fetchAllowances } from 'src/stores/actions/contract';
import { fetchWageHistory, updateWageHistory } from 'src/stores/actions/wageHistories';
import { formatDate } from 'src/utils/datetimeUtils';
import { renderButtons } from 'src/utils/formUtils';

const UpdateBenefit = ({ t, history, match }) => {
  const permissionIds = JSON.parse(localStorage.getItem('permissionIds'));
  const dispatch = useDispatch();
  let allowances = useSelector((state) => state.contract.allowances);
  let wageHistoryId = +match?.params?.id;
  const [loading, isLoading] = useState(false);
  const paymentType = [
    { id: 'by_hour', name: t('label.by_hour') },
    { id: 'by_month', name: t('label.by_month') },
  ];
  const status = [
    { id: 'active', name: t('label.active') },
    { id: 'inactive', name: t('label.inactive') },
  ];
  let benefit = useSelector((state) => state.wageHistory.wageHistory);
  useEffect(() => {
    if (permissionIds.includes(PERMISSION.GET_WAGE_HISTORY)) {
      dispatch(fetchAllowances());
      dispatch(fetchWageHistory(wageHistoryId, isLoading));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const update = (form) => {
    let thisWage = form.wages.filter((s) => s.id === parseInt(form.wageId));
    if (thisWage.length > 0) form.wage = thisWage[0];
    if (form.amount === '') delete form.amount;
    dispatch(updateWageHistory(form, t('message.successful_update')));
  };

  const BodyItem = ({
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    index,
    setFieldValue,
    validateForm,
    setFieldTouched,
    handleReset,
    setTouched,
    handleSubmit,
  }) => {
    return (
      <>
        <h5>{t('label.payroll')}</h5>
        <div style={{ fontSize: 14 }}>
          {values?.expiredDate
            ? t('label.from') + formatDate(values.startDate) + t('label.to') + formatDate(values.expiredDate)
            : t('label.from') + formatDate(values.startDate)}
        </div>
        <hr className="mt-1" />
        <div className="row">
          <CommonTextInput
            containerClassName={'form-group col-lg-4'}
            value={values?.profileName ?? ''}
            labelText={t('label.profileId')}
            inputType={'text'}
            inputClassName={'form-control'}
            isDisable
          />
          <CommonTextInput
            containerClassName={'form-group col-lg-4'}
            value={values?.contractName ?? ''}
            labelText={t('label.contract')}
            inputType={'text'}
            inputClassName={'form-control'}
            isDisable
          />
          <div className="form-group col-xl-4">
            <Label text={t('label.benefit_code')} required />
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
                placeholder={t('placeholder.enter_benefit_code')}
              />
            </div>
          </div>
          {values?.wageId ? (
            <>
              <CommonSelectInput
                containerClassName={'form-group col-lg-4'}
                value={values?.type ?? ''}
                onBlur={handleBlur(`type`)}
                onChange={async (e) => {
                  handleChange(`type`)(e);
                }}
                inputID={`type`}
                labelText={t('label.payment_method')}
                selectClassName={'form-control'}
                placeholder={t('placeholder.select_contract_payment_method')}
                isRequiredField
                isTouched={getIn(touched, `type`)}
                isError={getIn(errors, `type`) && getIn(touched, `type`)}
                errorMessage={t(getIn(errors, `type`))}
                lstSelectOptions={paymentType}
              />
              <CommonSelectInput
                containerClassName={'form-group col-lg-4'}
                value={values?.wageId ?? ''}
                onBlur={handleBlur(`wageId`)}
                onChange={(e) => {
                  let thisWage = values.wages.filter((s) => s.id === parseInt(e.target.value));
                  if (thisWage.length > 0) {
                    setFieldValue(`amount`, thisWage[0].amount);
                  } else setFieldValue(`amount`, '');
                  handleChange(`wageId`)(e);
                }}
                inputID={`wageId`}
                labelText={t('label.salary_group')}
                selectClassName={'form-control'}
                placeholder={t('placeholder.select_contract_payment_method')}
                isRequiredField
                isTouched={getIn(touched, `wageId`)}
                isError={getIn(errors, `wageId`) && getIn(touched, `wageId`)}
                errorMessage={t(getIn(errors, `wageId`))}
                lstSelectOptions={values.wages}
              />
              <CommonTextInput
                containerClassName={'form-group col-lg-4'}
                value={values?.amount ?? ''}
                onBlur={handleBlur(`wage.amount`)}
                onChange={handleChange(`wage.amount`)}
                inputID={`wage.amount`}
                labelText={t('label.salary_level')}
                inputType={'number'}
                inputClassName={'form-control'}
                placeholder={t('placeholder.enter_salary_level')}
                isDisable
              />
              <CommonTextInput
                containerClassName={'form-group col-lg-4'}
                value={values?.startDate ?? ''}
                onBlur={handleBlur(`startDate`)}
                onChange={handleChange(`startDate`)}
                inputID={`startDate`}
                labelText={t('label.signature_date')}
                inputType={'date'}
                inputClassName={'form-control'}
                isRequiredField
                isTouched={getIn(touched, `startDate`)}
                isError={getIn(errors, `startDate`) && getIn(touched, `startDate`)}
                errorMessage={t(getIn(errors, `startDate`))}
              />
              <CommonTextInput
                containerClassName={'form-group col-lg-4'}
                value={values?.expiredDate ?? ''}
                onBlur={handleBlur(`expiredDate`)}
                onChange={handleChange(`expiredDate`)}
                inputID={`expiredDate`}
                labelText={t('label.expiration_date')}
                inputType={'date'}
                inputClassName={'form-control'}
              />
            </>
          ) : (
            <>
              <CommonTextInput
                containerClassName={'form-group col-lg-4'}
                value={values?.amount ?? ''}
                onBlur={handleBlur(`amount`)}
                onChange={handleChange(`amount`)}
                inputID={`amount`}
                isRequiredField
                labelText={t('label.salary_level')}
                inputType={'number'}
                inputClassName={'form-control'}
                placeholder={t('placeholder.enter_salary_level')}
              />
              <CommonTextInput
                containerClassName={'form-group col-lg-4'}
                value={values?.startDate ?? ''}
                onBlur={handleBlur(`startDate`)}
                onChange={handleChange(`startDate`)}
                inputID={`startDate`}
                labelText={t('label.signature_date')}
                inputType={'date'}
                inputClassName={'form-control'}
                isRequiredField
                isTouched={getIn(touched, `startDate`)}
                isError={getIn(errors, `startDate`) && getIn(touched, `startDate`)}
                errorMessage={t(getIn(errors, `startDate`))}
              />
            </>
          )}
          <CommonSelectInput
            containerClassName={'form-group col-lg-4'}
            value={values?.status ?? ''}
            onBlur={handleBlur(`status`)}
            onChange={(e) => {
              handleChange(`status`)(e);
            }}
            inputID={`status`}
            labelText={t('label.status')}
            selectClassName={'form-control'}
            placeholder={t('placeholder.select_benefit_status')}
            isTouched={getIn(touched, `status`)}
            isRequiredField
            isError={getIn(errors, `status`) && getIn(touched, `status`)}
            errorMessage={t(getIn(errors, `status`))}
            lstSelectOptions={status}
          />
        </div>
        <h5 className="px-3">{t('label.allowance')}</h5>
        <hr className="mt-2" />
        <FieldArray
          name={`allowances`}
          render={({ insert, remove, push, replace }) => (
            <div>
              {values.allowances &&
                values.allowances.length > 0 &&
                values.allowances.map((allowance, allowanceIdx) => {
                  return (
                    <div key={`allowance${allowanceIdx}`}>
                      <div className="row">
                        <CommonSelectInput
                          containerClassName={'form-group col-lg-4'}
                          value={allowance?.id ?? ''}
                          onBlur={handleBlur(`allowances.${allowanceIdx}.id`)}
                          onChange={(e) => {
                            let thisSubsidizes = allowances.filter((s) => s.id === parseInt(e.target.value));
                            if (thisSubsidizes && thisSubsidizes.length > 0)
                              setFieldValue(`allowances.${allowanceIdx}.amount`, thisSubsidizes[0].amount);
                            handleChange(`allowances.${allowanceIdx}.id`)(e);
                          }}
                          inputID={`allowances.${allowanceIdx}.id`}
                          labelText={t('label.allowance')}
                          selectClassName={'form-control'}
                          placeholder={t('placeholder.select_allowance_type')}
                          isRequiredField
                          isTouched={getIn(touched, `allowances.${allowanceIdx}.id`)}
                          isError={getIn(touched, `allowances.${allowanceIdx}.id`) && getIn(errors, `allowances.${allowanceIdx}.id`)}
                          errorMessage={t(getIn(errors, `allowances.${allowanceIdx}.id`))}
                          lstSelectOptions={allowances}
                        />
                        <CommonTextInput
                          containerClassName={'form-group col-lg-4'}
                          value={allowance?.amount ?? ''}
                          onBlur={handleBlur(`allowances.${allowanceIdx}.amount`)}
                          onChange={handleChange(`allowances.${allowanceIdx}.amount`)}
                          inputID={`allowances.${allowanceIdx}.amount`}
                          labelText={t('label.allowance_level')}
                          inputType={'number'}
                          inputClassName={'form-control'}
                          placeholder={t('placeholder.pension')}
                          isDisable
                        />

                        <div className="pl-2" hidden={!permissionIds.includes(PERMISSION.CREATE_WAGE_HISTORY)}>
                          <DeleteIconButton onClick={() => remove(allowanceIdx)} />
                        </div>
                      </div>
                    </div>
                  );
                })}

              <div className="d-flex justify-content-start mb-4">
                <button
                  hidden={!permissionIds.includes(PERMISSION.CREATE_WAGE_HISTORY)}
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    push({ name: '', amount: 0 });
                  }}
                >
                  <AddCircle /> {t('label.add_allowance')}
                </button>
              </div>
            </div>
          )}
        />
        <hr className="mt-1" />
        {renderButtons(
          permissionIds.includes(PERMISSION.CREATE_WAGE_HISTORY)
            ? [
                //Create
                {
                  type: 'button',
                  className: `btn btn-primary mr-4`,
                  onClick: (e) => {
                    history.push(ROUTE_PATH.NAV_BENEFIT);
                  },
                  name: t('label.back'),
                  position: 'left',
                },
                {
                  type: 'button',
                  className: `btn btn-primary px-4 ml-2`,
                  onClick: (e) => {
                    handleReset();
                  },
                  name: t('label.reset'),
                },
                {
                  type: 'button',
                  className: `btn btn-primary px-4 ml-2`,
                  onClick: (e) => {
                    handleSubmit(e);
                  },
                  name: t('label.update'),
                },
              ]
            : [],
        )}
      </>
    );
  };
  const editWageRef = useRef();
  const preStatus = benefit?.status;
  const [openWarning, setOpenWarning] = useState(false);
  const handleConfirmWarning = (e) => {
    update(editWageRef.current.values);
    setOpenWarning(!openWarning);
  };
  const handleCancelWarning = () => {
    setOpenWarning(!openWarning);
  };
  return (
    <>
      <CContainer fluid className="c-main m-auto p-4">
        <div className="m-auto">
          {loading ? (
            <div className="text-center">
              <CircularProgress />
            </div>
          ) : (
            <div>
              {permissionIds.includes(PERMISSION.LIST_CONTRACT) && (
                <Formik
                  innerRef={editWageRef}
                  initialValues={benefit}
                  validationSchema={UpdateBenefitsSchema}
                  enableReinitialize
                  onSubmit={(values) => {
                    if (values.status !== preStatus) setOpenWarning(true);
                    else update(values);
                  }}
                >
                  {(props) => {
                    return (
                      <form className="p-0 m-0">
                        <div className="shadow bg-white rounded mx-4 p-4 mb-4">
                          <div>
                            <BodyItem {...props} />
                            {openWarning && (
                              <WarningAlertDialog
                                isVisible={openWarning}
                                title={t('title.update_active_wage')}
                                titleConfirm={t('label.agree')}
                                handleConfirm={handleConfirmWarning}
                                titleCancel={t('label.decline')}
                                handleCancel={handleCancelWarning}
                                warningMessage={t('message.update_active_wage_warning_message')}
                              />
                            )}
                          </div>
                        </div>
                      </form>
                    );
                  }}
                </Formik>
              )}
            </div>
          )}
        </div>
      </CContainer>
    </>
  );
};

export default UpdateBenefit;
