import { CContainer } from '@coreui/react';
import { Switch } from '@material-ui/core';
import { Add, AddCircle } from '@material-ui/icons';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@material-ui/icons/IndeterminateCheckBoxOutlined';
import { Field, FieldArray, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIconButton from 'src/components/button/DeleteIconButton';
import AutoSubmitToken from 'src/components/form/AutoSubmitToken';
import CommonUploadFileButton from 'src/components/input/CommonUploadFileButton';
import Label from 'src/components/text/Label';
import { REDUX_STATE } from 'src/stores/states';
import { joinClassName } from 'src/utils/stringUtils';
import AddIcon from '@material-ui/icons/Add';
import { useEffect } from 'react';
import { fetchBranches, fetchContracts, fetchWagesByType, fetchAllowances, createContract } from 'src/stores/actions/contract';
import { fetchAccount, fetchProfiles } from 'src/stores/actions/account';
import { JobTimelineSchema } from 'src/schema/formSchema';
import CommonTextInput from 'src/components/input/CommonTextInput';
import CommonSelectInput from 'src/components/input/CommonSelectInput';
import { getCurrentDate } from 'src/utils/datetimeUtils';

const JobTimelineInfo = ({ t, profileId }) => {
  const dispatch = useDispatch();
  let branches = useSelector((state) => state.contract.branches);
  let wages = useSelector((state) => state.contract.wages);
  const jobTimelineInfo = {
    contractInfo: useSelector((state) => state.contract.contracts),
  };
  const allowances = useSelector((state) => state.contract.allowances);

  const paymentType = [
    { id: '', name: 'Chọn hình thức chi trả' },
    { id: 'one_time', name: 'Chi trả một lần' },
    { id: 'by_hour', name: 'Chi trả theo giờ' },
    { id: 'by_month', name: 'Chi trả theo tháng' },
    { id: 'by_date', name: 'Chi trả theo ngày công' },
  ];
  const typeWord = [
    { id: 'office', name: 'Văn phòng' },
    { id: 'out_door', name: 'Làm việc ngoài trời' },
  ];
  const personalIncomeTaxType = [
    { id: 'more_3_month', name: 'Cư trú có hợp đồng lao động 3 tháng trở lên' },
    { id: 'non_resident', name: 'Cá nhân không cư trú' },
    { id: 'no_tax', name: 'Không tính thuế' },
    { id: 'less_3_month', name: 'Hợp đồng lao động dưới 3 tháng' },
  ];

  const type = [
    { id: 'partTime', name: 'Bán thời gian' },
    { id: 'fullTime', name: 'Toàn thời gian' },
    { id: 'season', name: 'Thời vụ' },
  ];

  useEffect(() => {
    dispatch(fetchContracts({ profileId: parseInt(profileId) }));
    dispatch(fetchBranches());
    dispatch(fetchAllowances());
  }, []);
  return (
    <CContainer fluid className="c-main mb-3 px-4">
      <div className="m-auto">
        <div className="shadow bg-white rounded px-4 py-4">
          <Formik
            initialValues={jobTimelineInfo}
            enableReinitialize
            validationSchema={JobTimelineSchema}
            onSubmit={(values) => {
              // console.log('JobTimeline ', values);
              dispatch({
                type: REDUX_STATE.contract.SET_CONTRACTS,
                payload: values.contractInfo,
              });
            }}
          >
            {({
              values,
              handleBlur,
              handleSubmit,
              handleChange,
              errors,
              touched,
              setTouched,
              setFieldTouched,
              setValues,
              setFieldValue,
              validateForm,
            }) => (
              <form>
                <FieldArray
                  name="contractInfo"
                  render={({ insert, remove, push, replace }) => (
                    <div>
                      {values.contractInfo &&
                        values.contractInfo.length > 0 &&
                        values.contractInfo.map((friend, index) => {
                          const changeMinimizeButton = () => {
                            replace(index, {
                              ...values.contractInfo[index],
                              isMinimize: !values.contractInfo[index].isMinimize,
                            });
                          };
                          return (
                            <div key={index} className={joinClassName([`${index !== 0 ? 'pt-5' : ''}`])}>
                              <div className={'d-flex flex-row justify-content-between'}>
                                <div style={{ fontSize: 18, fontWeight: 'bold' }} className="d-flex">
                                  <div className="pt-1" role="button">
                                    {values.contractInfo[index].isMinimize ? (
                                      <AddBoxOutlinedIcon className="pb-1" onClick={(e) => changeMinimizeButton()} />
                                    ) : (
                                      <IndeterminateCheckBoxOutlinedIcon className="pb-1" onClick={(e) => changeMinimizeButton()} />
                                    )}
                                  </div>
                                  <Switch
                                    checked={values.contractInfo[index].isOpen}
                                    name={`contractInfo.${index}.isOpen`}
                                    onChange={(e) => {
                                      setFieldValue(`contractInfo.${index}.isOpen`, e.target.checked);
                                    }}
                                  />
                                  {values.contractInfo[index].code}
                                </div>
                                <div>
                                  {values.contractInfo[index].id === null && (
                                    <div role="button" className="d-inline pb-1">
                                      <AddIcon
                                        className="d-inline"
                                        onClick={async () => {
                                          let a = await validateForm();
                                          a = a.contractInfo;
                                          if (!Array.isArray(a)) return;
                                          let err_fields = Object.keys(a[index]);
                                          err_fields &&
                                            err_fields.length &&
                                            err_fields.forEach((val) => setFieldTouched(`contractInfo.${index}.${val}`, true));

                                          let data = values.contractInfo[index];
                                          data['branchName'] = branches.filter((br) => br.id === data.branchId)[0]?.branch;
                                          console.log(data);
                                          // dispatch(createContract(data));
                                        }}
                                        style={{ color: 'blue' }}
                                      />
                                    </div>
                                  )}
                                  <DeleteIconButton onClick={() => remove(index)} />
                                </div>
                              </div>
                              <hr className="mt-1" />

                              {!values.contractInfo[index].isMinimize && (
                                <>
                                  <div className="row">
                                    <CommonTextInput
                                      containerClassName={'form-group col-lg-4'}
                                      value={values?.contractInfo[index]?.code ?? ''}
                                      onBlur={handleBlur(`contractInfo.${index}.code`)}
                                      onChange={handleChange(`contractInfo.${index}.code`)}
                                      inputID={`contractInfo.${index}.code`}
                                      labelText={t('label.contract_type')}
                                      inputType={'text'}
                                      placeholder={t('placeholder.enter_contract_code')}
                                      inputClassName={'form-control'}
                                      isRequiredField
                                      isTouched={touched && touched.contractInfo && touched.contractInfo[index]?.code}
                                      isError={
                                        errors &&
                                        errors.contractInfo &&
                                        errors.contractInfo[index]?.code &&
                                        touched &&
                                        touched.contractInfo &&
                                        touched.contractInfo[index]?.code
                                      }
                                      errorMessage={t(errors && errors.contractInfo && errors.contractInfo[index]?.code)}
                                    />
                                    <CommonSelectInput
                                      containerClassName={'form-group col-lg-4'}
                                      value={values?.contractInfo[index]?.type ?? ''}
                                      onBlur={handleBlur(`contractInfo.${index}.type`)}
                                      onChange={handleChange(`contractInfo.${index}.type`)}
                                      inputID={`contractInfo.${index}.type`}
                                      labelText={t('label.contract_type')}
                                      selectClassName={'form-control'}
                                      placeholder={t('placeholder.select_contract_type')}
                                      isRequiredField
                                      isTouched={touched && touched.contractInfo && touched.contractInfo[index]?.type}
                                      isError={
                                        errors &&
                                        errors.contractInfo &&
                                        errors.contractInfo[index]?.type &&
                                        touched &&
                                        touched.contractInfo &&
                                        touched.contractInfo[index]?.type
                                      }
                                      errorMessage={t(errors && errors.contractInfo && errors.contractInfo[index]?.type)}
                                      lstSelectOptions={type}
                                    />
                                    <CommonSelectInput
                                      containerClassName={'form-group col-lg-4'}
                                      value={values?.contractInfo[index]?.typeTax ?? ''}
                                      onBlur={handleBlur(`contractInfo.${index}.typeTax`)}
                                      onChange={handleChange(`contractInfo.${index}.typeTax`)}
                                      inputID={`contractInfo.${index}.typeTax`}
                                      labelText={t('label.personal_income_tax_type')}
                                      selectClassName={'form-control'}
                                      placeholder={t('placeholder.select_contract_type_tax')}
                                      isRequiredField
                                      isTouched={touched && touched.contractInfo && touched.contractInfo[index]?.typeTax}
                                      isError={
                                        errors &&
                                        errors.contractInfo &&
                                        errors.contractInfo[index]?.typeTax &&
                                        touched &&
                                        touched.contractInfo &&
                                        touched.contractInfo[index]?.typeTax
                                      }
                                      errorMessage={t(errors && errors.contractInfo && errors.contractInfo[index]?.typeTax)}
                                      lstSelectOptions={personalIncomeTaxType}
                                    />
                                  </div>
                                  <div className="row">
                                    <CommonSelectInput
                                      containerClassName={'form-group col-lg-4'}
                                      value={values?.contractInfo[index]?.typeWord ?? ''}
                                      onBlur={handleBlur(`contractInfo.${index}.typeWord`)}
                                      onChange={handleChange(`contractInfo.${index}.typeWord`)}
                                      inputID={`contractInfo.${index}.typeWord`}
                                      labelText={t('label.job_type')}
                                      selectClassName={'form-control'}
                                      placeholder={t('placeholder.select_contract_type_work')}
                                      isRequiredField
                                      isTouched={touched && touched.contractInfo && touched.contractInfo[index]?.typeWord}
                                      isError={
                                        errors &&
                                        errors.contractInfo &&
                                        errors.contractInfo[index]?.typeWord &&
                                        touched &&
                                        touched.contractInfo &&
                                        touched.contractInfo[index]?.typeWord
                                      }
                                      errorMessage={t(errors && errors.contractInfo && errors.contractInfo[index]?.typeWord)}
                                      lstSelectOptions={typeWord}
                                    />

                                    <div className="form-group col-lg-4">
                                      <Label text={t('label.trial_period')} />
                                      <div className="input-group">
                                        <input
                                          type="number"
                                          className={'form-control'}
                                          rows={5}
                                          name={`contractInfo.${index}.probTime`}
                                          onChange={(e) => handleChange(`contractInfo.${index}.probTime`)(e)}
                                          value={values.contractInfo[index].probTime}
                                        />
                                        <span className="input-group-text" id="basic-addon2">
                                          {t('label.day')}
                                        </span>
                                      </div>
                                      {errors &&
                                        errors.contractInfo &&
                                        errors.contractInfo[index]?.probTime &&
                                        touched &&
                                        touched.contractInfo &&
                                        touched.contractInfo[index]?.probTime &&
                                        t(errors && errors.contractInfo && errors.contractInfo[index]?.probTime) && (
                                          <div>
                                            <small className={'text-danger'}>
                                              {' '}
                                              {t(errors && errors.contractInfo && errors.contractInfo[index]?.probTime)}
                                            </small>
                                          </div>
                                        )}
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="form-group col-lg-4">
                                      <Label text={t('label.signature_date')} required />
                                      <input
                                        type="date"
                                        onChange={(e) => handleChange(`contractInfo.${index}.handleDate`)(e)}
                                        className={'form-control'}
                                        rows={5}
                                        name={`contractInfo.${index}.handleDate`}
                                        value={values.contractInfo[index].handleDate}
                                        max={getCurrentDate()}
                                      />
                                    </div>
                                    <div className="form-group col-lg-4">
                                      <Label text={t('label.effective_date')} required />
                                      <input
                                        type="date"
                                        className={'form-control'}
                                        rows={5}
                                        name={`contractInfo.${index}.validDate`}
                                        onChange={(e) => handleChange(`contractInfo.${index}.validDate`)(e)}
                                        value={values.contractInfo[index].validDate}
                                      />
                                    </div>
                                    <div className="form-group col-lg-4">
                                      <Label text={t('label.expiration_date')} />
                                      <input
                                        type="date"
                                        className={'form-control'}
                                        rows={5}
                                        name={`contractInfo.${index}.expiredDate`}
                                        onChange={(e) => handleChange(`contractInfo.${index}.expiredDate`)(e)}
                                        value={values.contractInfo[index].expiredDate}
                                      />
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="form-group col-lg-4">
                                      <Label text={t('label.job_place')} />
                                      <Field className={'form-control'} name={`contractInfo.${index}.branchId`} component="select">
                                        {branches.map((ch, idx) => (
                                          <option key={idx} value={ch.id}>
                                            {ch.name}
                                          </option>
                                        ))}
                                      </Field>
                                    </div>
                                    <div className="form-group col-lg-4">
                                      <Label text={t('label.job_start_date')} />
                                      <input
                                        type="date"
                                        className={'form-control'}
                                        rows={5}
                                        name={`contractInfo.${index}.startWork`}
                                        onChange={(e) => handleChange(`contractInfo.${index}.startWork`)(e)}
                                        value={values.contractInfo[index].startWork}
                                      />
                                    </div>
                                  </div>
                                  <h5 className="px-3">{t('label.gross_salary')}</h5>
                                  <hr className="mt-1" />
                                  <div className="row">
                                    <div className="form-group col-lg-4">
                                      <Label text={t('label.payment_method')} required />
                                      <Field
                                        className={'form-control'}
                                        name={`contractInfo.${index}.paymentType`}
                                        component="select"
                                        onChange={(e) => {
                                          if (e.target.value !== '') {
                                            dispatch(fetchWagesByType({ type: e.target.value }));
                                            handleChange(`contractInfo.${index}.paymentType`)(e);
                                          } else setFieldValue(`contractInfo.${index}.wageId`, 0);
                                        }}
                                      >
                                        {paymentType.map((ch, idx) => (
                                          <option key={idx} value={ch.id}>
                                            {ch.name}
                                          </option>
                                        ))}
                                      </Field>
                                    </div>
                                    <div className="form-group col-lg-4">
                                      <Label text={t('label.salary_group')} required />
                                      <Field
                                        className={'form-control'}
                                        name={`contractInfo.${index}.wageId`}
                                        component="select"
                                        onChange={(e) => {
                                          let thisWage = wages.filter((s) => s.id === parseInt(e.target.value));
                                          setFieldValue(`contractInfo.${index}.amount`, thisWage[0].amount);
                                          handleChange(`contractInfo.${index}.wageId`)(e);
                                        }}
                                      >
                                        {wages.map((ch, idx) => (
                                          <option key={idx} value={ch.id}>
                                            {ch.name}
                                          </option>
                                        ))}
                                      </Field>
                                    </div>
                                    <div className="form-group col-lg-4">
                                      <Label text={t('label.salary_level')} />
                                      <Field
                                        className={'form-control'}
                                        name={`contractInfo.${index}.amount`}
                                        placeholder={t('placeholder.enter_salary_level')}
                                        type="number"
                                        disabled
                                      />
                                    </div>
                                  </div>
                                  <h5 className="px-3">{t('label.allowance')}</h5>
                                  <hr className="mt-2" />
                                  <FieldArray
                                    name={`contractInfo.${index}.allowance`}
                                    render={({ insert, remove, push, replace }) => (
                                      <div>
                                        {values.contractInfo[index].allowance &&
                                          values.contractInfo[index].allowance.length > 0 &&
                                          values.contractInfo[index].allowance.map((allowance, allowanceIdx) => {
                                            return (
                                              <div key={`allowance${allowanceIdx}`}>
                                                <div className="row">
                                                  <div className="form-group col-lg-4">
                                                    <Label text={t('label.allowance')} required />
                                                    <Field
                                                      className={'form-control'}
                                                      name={`contractInfo.${index}.allowance.${allowanceIdx}.name`}
                                                      component="select"
                                                      placeholder={t('label.select_allowance_type')}
                                                      onChange={(e) => {
                                                        let thisSubsidizes = allowances.filter((s) => s.id === parseInt(e.target.value));
                                                        // console.log(thisSubsidizes);
                                                        if (thisSubsidizes && thisSubsidizes.length > 0)
                                                          setFieldValue(
                                                            `contractInfo.${index}.allowance.${allowanceIdx}.amount`,
                                                            thisSubsidizes[0].amount,
                                                          );
                                                        handleChange(`contractInfo.${index}.allowance.${allowanceIdx}.name`)(e);
                                                      }}
                                                    >
                                                      {allowances.map((ch, idx) => (
                                                        <option key={idx} value={ch.id}>
                                                          {ch.name}
                                                        </option>
                                                      ))}
                                                    </Field>
                                                  </div>
                                                  <div className="form-group col-lg-4">
                                                    <Label text={t('label.salary_group')} required />
                                                    <Field
                                                      className={'form-control'}
                                                      name={`contractInfo.${index}.allowance.${allowanceIdx}.amount`}
                                                      placeholder={t('placeholder.pension')}
                                                      type="number"
                                                      disabled
                                                    />
                                                  </div>
                                                  <div className="form-group d-flex align-items-end">
                                                    <DeleteIconButton onClick={() => remove(allowanceIdx)} />
                                                  </div>
                                                </div>
                                              </div>
                                            );
                                          })}
                                        <div className="d-flex justify-content-start mb-4">
                                          <button type="button" className="btn btn-primary" onClick={() => push({ name: 0, amount: 0 })}>
                                            <AddCircle /> {t('label.add_allowance')}
                                          </button>
                                        </div>
                                      </div>
                                    )}
                                  />
                                  <hr className="mt-1" />

                                  <CommonUploadFileButton
                                    name={`contractInfo.${index}.files`}
                                    containerClassName="mt-3 "
                                    buttonClassName="btn btn-primary"
                                    value={values.contractInfo[index].files}
                                  />
                                </>
                              )}
                            </div>
                          );
                        })}
                      <div className="pt-4 d-flex justify-content-center">
                        <button
                          type="button"
                          style={{ border: 'dotted 0.5px black' }}
                          className="px-5 py-1 bg-white"
                          onClick={() => {
                            push({
                              id: null,
                              isMinimize: false,
                              isOpen: false,
                              code: '',
                              type: '',
                              typeTax: '',
                              signee: '',
                              typeWord: 0,
                              probTime: 0,
                              handleDate: '',
                              validDate: '',
                              expiredDate: '',
                              branchId: 0,
                              startWork: '',
                              paymentType: '',
                              wageId: 0,
                              amount: 0,
                              allowance: [],
                            });
                          }}
                        >
                          <Add /> {t('label.add')}
                        </button>
                      </div>
                    </div>
                  )}
                />
                <AutoSubmitToken />
              </form>
            )}
          </Formik>
        </div>
      </div>
    </CContainer>
  );
};

export default JobTimelineInfo;
