import { AlarmAdd, AttachMoney, BluetoothAudio, Cancel, CheckCircle, Gavel, MoneyOff, Schedule } from '@material-ui/icons';

const { COLORS } = require('src/constants/theme');

export const backgroundColor = (value) => {
  let numOfAssignment = value.assignment.length;
  if (numOfAssignment === 0) return 'transparent';
  else if (numOfAssignment > 1) return COLORS.BACKGROUND_COLOR_MANY_ASSIGNMENT;
  else {
    return backgroundColorOfAssignment(value.assignment[0]);
  }
};
// export const backgroundColorOfAssignment = (assignment) => {
//   let status = assignment.status;
//   if (status === 'normal') {
//     let point = assignment.point;
//     if (point === 0) return COLORS.BACKGROUND_ABSENT_ROLL_CALL;
//     else if (point === 1) return COLORS.BACKGROUND_SUCCESS_ROLL_CALL;
//     else return COLORS.BACKGROUND_LATE_ROLL_CALL;
//   } else if (status === 'overtime') return COLORS.BACKGROUND_OVERTIME;
//   else if (status === 'remote') return COLORS.BACKGROUND_REMOTE;
//   else if (status === 'remote_overtime') return COLORS.BACKGROUND_REMOTE_OVERTIME;
//   else if (status === 'leave_no_pay') return COLORS.BACKGROUND_LEAVE_NO_PAY;
//   else if (status === 'leave_pay') return COLORS.BACKGROUND_LEAVE_PAY;
//   else if (status === 'policy') return COLORS.BACKGROUND_LEAVE_POLICY;
// };
export const backgroundColorOfAssignment = (assignment) => {
  let status = assignment.status;
  if (status === 'normal') return COLORS.BACKGROUND_NORMAL;
  else return COLORS.BACKGROUND_REQUEST;
};
// export const dotColor = (assignment) => {
//   let status = assignment.status;
//   if (status === 'normal') {
//     let point = assignment.point;
//     if (point === 0) return COLORS.ERROR;
//     else if (point === 1) return COLORS.BORDER_SUCCESS_ROLL_CALL;
//     else return COLORS.BORDER_LATE_ROLL_CALL;
//   } else if (status === 'overtime') return COLORS.BORDER_OVERTIME;
//   else if (status === 'remote') return COLORS.BORDER_REMOTE;
//   else if (status === 'remote_overtime') return COLORS.BORDER_REMOTE_OVERTIME;
//   else if (status === 'leave_no_pay') return COLORS.BORDER_LEAVE_NO_PAY;
//   else if (status === 'leave_pay') return COLORS.BORDER_LEAVE_PAY;
//   else if (status === 'policy') return COLORS.BORDER_LEAVE_POLICY;
//   else return COLORS.ERROR;
// };
export const dotColor = (assignment) => {
  let status = assignment.status;
  if (status === 'normal') return COLORS.BORDER_NORMAL;
  else return COLORS.BORDER_REQUEST;
};
export const borderColor = (value) => {
  let numOfAssignment = value.assignment.length;
  if (numOfAssignment === 0) return 'transparent';
  else if (numOfAssignment > 1) return COLORS.MANY_ASSIGNMENT;
  else {
    return borderColorOfAssignment(value.assignment[0]);
  }
};
export const borderColorOfAssignment = (assignment) => {
  let status = assignment.status;
  if (status === 'normal') return COLORS.BORDER_NORMAL;
  else return COLORS.BORDER_REQUEST;
};
export const backgroundColorHover = (value) => {
  let numOfAssignment = value.assignment.length;
  if (numOfAssignment > 1) return 'assignment-multi';
  else if (numOfAssignment === 1) return borderHoverOfAssignment(value.assignment[0]);
  else return '';
};
export const borderHoverOfAssignment = (assignment) => {
  let status = assignment.status;
  if (status === 'normal') return 'assignment-normal';
  else return 'assignment-request';
};

export const renderIcon = (assignment) => {
  let status = assignment.status;
  switch (status) {
    case 'normal': {
      let point = assignment.point;
      if (point === 0) return <Cancel style={{ color: COLORS.ERROR }} />;
      else if (point === 1) return <CheckCircle style={{ color: COLORS.SUCCESS }} />;
      else return <Schedule style={{ color: COLORS.LATE }} />;
    }
    case 'leave_no_pay':
      return <MoneyOff style={{ color: COLORS.ERROR }} />;
    case 'leave_pay':
      return <AttachMoney style={{ color: COLORS.SUCCESS }} />;
    case 'policy':
      return <Gavel style={{ color: COLORS.SUCCESS }} />;
    case 'remote':
      return <BluetoothAudio style={{ color: COLORS.SUCCESS }} />;
    case 'overtime':
      return <AlarmAdd style={{ color: COLORS.SUCCESS }} />;
    case 'remote_overtime':
      return <AlarmAdd style={{ color: COLORS.SUCCESS }} />;
    default: {
    }
  }
};
