const { COLORS } = require('src/constants/theme');

export const backgroundColor = (value) => {
  let numOfAssignment = value.assignment.length;
  if (numOfAssignment === 0) return 'transparent';
  else if (numOfAssignment > 1) return COLORS.BACKGROUND_COLOR_MANY_ASSIGNMENT;
  else {
    return backgroundColorOfAssignment(value.assignment[0]);
  }
};
export const backgroundColorOfAssignment = (assignment) => {
  let status = assignment.status;
  if (status === 'normal') {
    let point = assignment.point;
    if (point === 0) return COLORS.BACKGROUND_ABSENT_ROLL_CALL;
    else if (point === 1) return COLORS.BACKGROUND_SUCCESS_ROLL_CALL;
    else return COLORS.BACKGROUND_LATE_ROLL_CALL;
  } else if (status === 'overtime') return COLORS.OVERTIME;
  else if (status === 'remote') return COLORS.REMOTE;
  else if (status === 'remote_overtime') return COLORS.OVERTIME_REMOTE;
  else if (status === 'leave_no_pay') return COLORS.BACKGROUND_LEAVE_NO_PAY;
  else if (status === 'leave_pay') return COLORS.BACKGROUND_LEAVE_PAY;
  else if (status === 'leave_policy') return COLORS.BACKGROUND_LEAVE_POLICY;
};
export const dotColor = (assignment) => {
  let status = assignment.status;
  if (status === 'normal') {
    let point = assignment.point;
    if (point === 0) return COLORS.ERROR;
    else if (point === 1) return COLORS.BORDER_SUCCESS_ROLL_CALL;
    else return COLORS.BORDER_LATE_ROLL_CALL;
  } else if (status === 'overtime') return COLORS.OVERTIME;
  else if (status === 'remote') return COLORS.REMOTE;
  else if (status === 'remote_overtime') return COLORS.OVERTIME_REMOTE;
  else if (status === 'leave_no_pay') return COLORS.BORDER_LEAVE_NO_PAY;
  else if (status === 'leave_pay') return COLORS.BORDER_LEAVE_PAY;
  else if (status === 'leave_policy') return COLORS.BORDER_LEAVE_POLICY;
  else return COLORS.ERROR;
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
  if (status === 'normal') {
    let point = assignment.point;
    if (point === 0) return COLORS.ERROR;
    else if (point === 1) return COLORS.BORDER_SUCCESS_ROLL_CALL;
    else return COLORS.BORDER_LATE_ROLL_CALL;
  } else if (status === 'overtime') return COLORS.BORDER_OVERTIME;
  else if (status === 'remote') return COLORS.REMOTE;
  else if (status === 'remote_overtime') return COLORS.OVERTIME_REMOTE;
  else if (status === 'leave_no_pay') return COLORS.BORDER_LEAVE_NO_PAY;
  else if (status === 'leave_pay') return COLORS.BORDER_LEAVE_PAY;
  else if (status === 'leave_policy') return COLORS.BORDER_LEAVE_POLICY;
};
export const backgroundColorHover = (value) => {
  let numOfAssignment = value.assignment.length;
  if (numOfAssignment === 1) return 'assignment-overtime';
  else return '';
};
