import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { Cancel } from '@material-ui/icons';
import { Formik } from 'formik';
import React from 'react';
import { NewRollUpSchema } from 'src/schema/formSchema';
import { renderButtons } from 'src/utils/formUtils';
import CommonTextInput from '../input/CommonTextInput';

const NewRollUp = ({ isOpen, handleConfirm, handleCancel, t, startCC }) => {
  const newRollUp = {
    startTime: startCC,
    endTime: '',
  };
  return (
    <div>
      <Dialog open={isOpen} onClose={handleCancel} aria-labelledby="form-dialog-title" maxWidth="sm" fullWidth>
        <DialogContent>
          <Formik
            initialValues={newRollUp}
            validationSchema={NewRollUpSchema}
            enableReinitialize
            onSubmit={(values) => {
              handleConfirm(values);
            }}
          >
            {(props) => {
              return (
                <form className="p-0 m-0">
                  <div className="d-flex flex-row justify-content-between align-items-center">
                    <h5>{t('label.new_roll_up')}</h5>
                    <Cancel fontSize="large" onClick={handleCancel} role="button" style={{ color: '#969696' }} />
                  </div>

                  <hr className="mt-1" />
                  <div className="row">
                    <CommonTextInput
                      containerClassName={'form-group col-xl-6'}
                      value={props.values.startTime}
                      onBlur={props.handleBlur('startTime')}
                      onChange={props.handleChange('startTime')}
                      inputID={'startTime'}
                      labelText={t('label.check_in_time')}
                      inputType={'Time'}
                      inputClassName={'form-control'}
                      isRequiredField
                      isDisable
                    />
                    <CommonTextInput
                      containerClassName={'form-group col-xl-6'}
                      value={props.values.endTime}
                      onBlur={props.handleBlur('endTime')}
                      onChange={props.handleChange('endTime')}
                      inputID={'endTime'}
                      labelText={t('label.check_out_time')}
                      inputType={'Time'}
                      inputClassName={'form-control'}
                      isRequiredField
                      isTouched={props.touched.endTime}
                      isError={props.errors.endTime && props.touched.endTime}
                      errorMessage={t(props.errors.endTime)}
                      minTime={props.values.startTime}
                    />
                  </div>
                  <hr className="mt-1" />
                  {renderButtons([
                    {
                      type: 'button',
                      className: `btn btn-primary px-4 ml-2`,
                      onClick: (e) => {
                        props.handleSubmit();
                      },
                      name: t('label.update'),
                    },
                  ])}
                  <br />
                </form>
              );
            }}
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NewRollUp;
