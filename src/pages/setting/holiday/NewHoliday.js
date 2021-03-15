import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SettingHolidayInfoSchema } from 'src/schema/formSchema';
import { changeActions } from 'src/stores/actions/header';
import { setEmptyHoliday } from 'src/stores/actions/holiday';
import HolidayItemBody from './HolidayItemBody';

//TODO: translate

const NewHolidayPage = ({ t, location, history }) => {
  const holidayInfoForm = useRef();
  const dispatch = useDispatch();
  const holiday = useSelector((state) => state.holiday.holiday);

  useEffect(() => {
    dispatch(setEmptyHoliday());
    const actions = [
      {
        type: 'primary',
        name: 'Tạo ngày nghỉ',
        callback: handleSubmit,
      },
    ];
    dispatch(changeActions(actions));
    return () => {
      dispatch(changeActions([]));
    };
  }, []);

  const handleSubmit = (event) => {
    holidayInfoForm.current.handleSubmit(event);
  };

  return <HolidayItemBody holidayRef={holidayInfoForm} holiday={holiday} validationSchema={SettingHolidayInfoSchema} isUpdate={false} />;
};

export default NewHolidayPage;
