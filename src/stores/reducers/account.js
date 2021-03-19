import { REDUX_STATE } from '../states';

const initialState = {
  accounts: [
    {
      id: 1,
      shortname: 'E01',
      name: 'Yasuo Ma kiếm',
      positionName: 'Front-End Junior',
      departmentName: 'IT APPHR Hồ Chí Minh Quận 1',
      branchName: 'APPHR Hồ Chí Minh Quận 1',
      username: 'tplus',
      creator: 'admin',
    },
    {
      id: 2,
      shortname: 'E02',
      name: 'Nguyễn Trọng Tr',
      positionName: 'Front-End Junior',
      departmentName: 'IT APPHR Hồ Chí Minh Quận 1',
      branchName: 'APPHR Hồ Chí Minh Quận 1',
      username: 'trplus',
      creator: 'datplus',
    },
    {
      id: 3,
      shortname: 'E03',
      name: 'Nguyễn Trọng Tru',
      positionName: 'Front-End Junior',
      departmentName: 'IT APPHR Hồ Chí Minh Quận 1',
      branchName: 'APPHR Hồ Chí Minh Quận 1',
      username: 'truplus',
      creator: 'datplus',
    },
    {
      id: 4,
      shortname: 'E04',
      name: 'Nguyễn Trọng Trun',
      positionName: 'Front-End Junior',
      departmentName: 'IT APPHR Hồ Chí Minh Quận 1',
      branchName: 'APPHR Hồ Chí Minh Quận 1',
      username: 'trunplus',
      creator: 'admin',
    },
    {
      id: 5,
      shortname: 'E05',
      name: 'Nguyễn Trọng Trung',
      positionName: 'Front-End Junior',
      departmentName: 'IT APPHR Hồ Chí Minh Quận 1',
      branchName: 'APPHR Hồ Chí Minh Quận 1',
      username: 'datplus',
      creator: 'admin',
    },
    {
      id: 6,
      shortname: 'E06',
      name: 'Nguyễn Trọng Đạt',
      positionName: 'Front-End Junior',
      departmentName: 'IT APPHR Hồ Chí Minh Quận 1',
      branchName: 'APPHR Hồ Chí Minh Quận 1',
      username: 'trungplus',
      creator: 'admin',
    },
    {
      id: 7,
      shortname: 'E07',
      name: 'Trần Thanh Q',
      positionName: 'Front-End Junior',
      departmentName: 'IT APPHR Hồ Chí Minh Quận 1',
      branchName: 'APPHR Hồ Chí Minh Quận 1',
      username: 'ttq',
      creator: 'admin',
    },
    {
      id: 8,
      shortname: 'E08',
      name: 'Trần Thanh Qu',
      positionName: 'Front-End Junior',
      departmentName: 'IT APPHR Hồ Chí Minh Quận 1',
      branchName: 'APPHR Hồ Chí Minh Quận 1',
      username: 'ttqu',
      creator: 'admin',
    },
    {
      id: 9,
      shortname: 'E09',
      name: 'Trần Thanh Qua',
      positionName: 'Front-End Junior',
      departmentName: 'IT APPHR Hồ Chí Minh Quận 1',
      branchName: 'APPHR Hồ Chí Minh Quận 1',
      username: 'ttqua',
      creator: 'admin',
    },
    {
      id: 10,
      shortname: 'E10',
      name: 'Trần Thanh Quan',
      positionName: 'Front-End Junior',
      departmentName: 'IT APPHR Hồ Chí Minh Quận 1',
      branchName: 'APPHR Hồ Chí Minh Quận 1',
      username: 'ttquan',
      creator: 'datplus',
    },
    {
      id: 11,
      shortname: 'E11',
      name: 'Trần Thanh Quang',
      positionName: 'Front-End Junior',
      departmentName: 'IT APPHR Hồ Chí Minh Quận 1',
      branchName: 'APPHR Hồ Chí Minh Quận 1',
      username: 'ttquang',
      creator: 'admin',
    },
  ],
  account: {
    permissions: [1, 2, 3, 4, 5, 13, 14, 20],
    username: '',
    password: '',
    role: '',
    coefficient: 0,
  },
  roles: [],
  profiles: [
    {
      id: 1,
      shortname: 'E01',
      name: 'Nguyễn Trọng T',
      phone: '0123456789',
      gender: 'Nam',
      email: 'ntt@gmail.com',
      positionName: 'Front-End Junior',
      departmentName: 'IT APPHR Hồ Chí Minh Quận 1',
      branchName: 'APPHR Hồ Chí Minh Quận 1',
      status: 'Intern',
    },
    {
      id: 2,
      shortname: 'E02',
      name: 'Nguyễn Trọng Tr',
      phone: '0123456789',
      gender: 'Nam',
      email: 'ntt@gmail.com',
      positionName: 'Front-End Junior',
      departmentName: 'IT APPHR Hồ Chí Minh Quận 1',
      branchName: 'APPHR Hồ Chí Minh Quận 1',
      status: 'Intern',
    },
    {
      id: 3,
      shortname: 'E03',
      name: 'Nguyễn Trọng Tru',
      phone: '0123456789',
      gender: 'Nam',
      email: 'ntt@gmail.com',
      positionName: 'Front-End Junior',
      departmentName: 'IT APPHR Hồ Chí Minh Quận 1',
      branchName: 'APPHR Hồ Chí Minh Quận 1',
      status: 'Intern',
    },
    {
      id: 4,
      shortname: 'E04',
      name: 'Nguyễn Trọng Trun',
      phone: '0123456789',
      gender: 'Nam',
      email: 'ntt@gmail.com',
      positionName: 'Front-End Junior',
      departmentName: 'IT APPHR Hồ Chí Minh Quận 1',
      branchName: 'APPHR Hồ Chí Minh Quận 1',
      status: 'Intern',
    },
    {
      id: 5,
      shortname: 'E05',
      name: 'Nguyễn Trọng Trung',
      phone: '0123456789',
      gender: 'Nam',
      email: 'ntt@gmail.com',
      positionName: 'Front-End Junior',
      departmentName: 'IT APPHR Hồ Chí Minh Quận 1',
      branchName: 'APPHR Hồ Chí Minh Quận 1',
      status: 'Intern',
    },
    {
      id: 6,
      shortname: 'E06',
      name: 'Nguyễn Trọng Đạt',
      phone: '0123456789',
      gender: 'Nam',
      email: 'ntd@gmail.com',
      positionName: 'Front-End Junior',
      departmentName: 'IT APPHR Hồ Chí Minh Quận 1',
      branchName: 'APPHR Hồ Chí Minh Quận 1',
      status: 'Fresher',
    },
    {
      id: 7,
      shortname: 'E07',
      name: 'Trần Thanh Q',
      phone: '0123456789',
      gender: 'Nam',
      email: 'ttt@gmail.com',
      positionName: 'Front-End Junior',
      departmentName: 'IT APPHR Hồ Chí Minh Quận 1',
      branchName: 'APPHR Hồ Chí Minh Quận 1',
      status: 'Intern',
    },
    {
      id: 8,
      shortname: 'E08',
      name: 'Trần Thanh Qu',
      phone: '0123456789',
      gender: 'Nam',
      email: 'ttt@gmail.com',
      positionName: 'Front-End Junior',
      departmentName: 'IT APPHR Hồ Chí Minh Quận 1',
      branchName: 'APPHR Hồ Chí Minh Quận 1',
      status: 'Junior',
    },
    {
      id: 10,
      shortname: 'E10',
      name: 'Trần Thanh Qua',
      phone: '0123456789',
      gender: 'Nam',
      email: 'ttt@gmail.com',
      positionName: 'Front-End Junior',
      departmentName: 'IT APPHR Hồ Chí Minh Quận 1',
      branchName: 'APPHR Hồ Chí Minh Quận 1',
      status: 'Intern',
    },
    {
      id: 12,
      shortname: 'E12',
      name: 'Trần Thanh Quan',
      phone: '0123456789',
      gender: 'Nam',
      email: 'ttt@gmail.com',
      positionName: 'Front-End Junior',
      departmentName: 'IT APPHR Hồ Chí Minh Quận 1',
      branchName: 'APPHR Hồ Chí Minh Quận 1',
      status: 'Intern',
    },
    {
      id: 14,
      shortname: 'E14',
      name: 'Trần Thanh Quang',
      phone: '0123456789',
      gender: 'Nam',
      email: 'ttt@gmail.com',
      positionName: 'Front-End Junior',
      departmentName: 'IT APPHR Hồ Chí Minh Quận 1',
      branchName: 'APPHR Hồ Chí Minh Quận 1',
      status: 'Intern',
    },
  ],
  profile: {},
  permissions: [
    {
      id: 1,
      name: 'Chi nhánh',
      group: 'branch',
      children: [
        {
          id: 1,
          name: 'Tạo chi nhánh',
          endpoint: 'api.branch',
          method: 'POST',
          service: 'TIMEKEEPING',
        },
        {
          id: 2,
          name: 'Danh sách chi nhánh',
          endpoint: 'api.branch',
          method: 'GET',
          service: 'TIMEKEEPING',
        },
        {
          id: 3,
          name: 'Chi tiết chi nhánh',
          endpoint: 'api.branch/{id}',
          method: 'GET',
          service: 'TIMEKEEPING',
        },
        {
          id: 4,
          name: 'Cập nhật chi nhánh',
          endpoint: 'api.branch/{id}',
          method: 'PUT',
          service: 'TIMEKEEPING',
        },
        {
          id: 5,
          name: 'Xóa chi nhánh',
          endpoint: 'api.branch/{id}',
          method: 'DELETE',
          service: 'TIMEKEEPING',
        },
      ],
    },
    {
      id: 2,
      name: 'Phòng ban',
      group: 'department',
      children: [
        {
          id: 6,
          name: 'Tạo phòng ban',
          endpoint: 'api.department',
          method: 'POST',
          service: 'TIMEKEEPING',
        },
        {
          id: 7,
          name: 'Danh sách phòng ban',
          endpoint: 'api.department',
          method: 'GET',
          service: 'TIMEKEEPING',
        },
        {
          id: 8,
          name: 'Chi tiết phòng ban',
          endpoint: 'api.department/{id}',
          method: 'GET',
          service: 'TIMEKEEPING',
        },
        {
          id: 9,
          name: 'Cập nhật phòng ban',
          endpoint: 'api.department/{id}',
          method: 'PUT',
          service: 'TIMEKEEPING',
        },
        {
          id: 10,
          name: 'Xóa phòng ban',
          endpoint: 'api.department/{id}',
          method: 'DELETE',
          service: 'TIMEKEEPING',
        },
      ],
    },
    {
      id: 3,
      name: 'Vị trí',
      group: 'position',
      children: [
        {
          id: 11,
          name: 'Tạo vị trí',
          endpoint: 'api.position',
          method: 'POST',
          service: 'TIMEKEEPING',
        },
        {
          id: 12,
          name: 'Danh sách vị trí',
          endpoint: 'api.position',
          method: 'GET',
          service: 'TIMEKEEPING',
        },
        {
          id: 13,
          name: 'Chi tiết vị trí',
          endpoint: 'api.position/{id}',
          method: 'GET',
          service: 'TIMEKEEPING',
        },
        {
          id: 14,
          name: 'Cập nhật vị trí',
          endpoint: 'api.position/{id}',
          method: 'PUT',
          service: 'TIMEKEEPING',
        },
        {
          id: 15,
          name: 'Xóa vị trí',
          endpoint: 'api.position/{id}',
          method: 'DELETE',
          service: 'TIMEKEEPING',
        },
      ],
    },
    {
      id: 4,
      name: 'Ca làm việc',
      group: 'shift',
      children: [
        {
          id: 16,
          name: 'Tạo ca làm việc',
          endpoint: 'api.shift',
          method: 'POST',
          service: 'TIMEKEEPING',
        },
        {
          id: 17,
          name: 'Danh sách ca làm việc',
          endpoint: 'api.shift',
          method: 'GET',
          service: 'TIMEKEEPING',
        },
        {
          id: 18,
          name: 'Chi tiết ca làm việc',
          endpoint: 'api.shift/{id}',
          method: 'GET',
          service: 'TIMEKEEPING',
        },
        {
          id: 19,
          name: 'Cập nhật ca làm việc',
          endpoint: 'api.shift/{id}',
          method: 'PUT',
          service: 'TIMEKEEPING',
        },
        {
          id: 20,
          name: 'Xóa ca làm việc',
          endpoint: 'api.shift/{id}',
          method: 'DELETE',
          service: 'TIMEKEEPING',
        },
      ],
    },
    {
      id: 5,
      name: 'Ngày nghỉ lễ',
      group: 'holiday',
      children: [
        {
          id: 5.1,
          name: 'Tạo ngày nghỉ lễ',
          endpoint: 'api.holiday',
          method: 'POST',
          service: 'TIMEKEEPING',
        },
        {
          id: 22,
          name: 'Danh sách ngày nghỉ lễ',
          endpoint: 'api.holiday',
          method: 'GET',
          service: 'TIMEKEEPING',
        },
        {
          id: 23,
          name: 'Chi tiết ngày nghỉ lễ',
          endpoint: 'api.holiday/{id}',
          method: 'GET',
          service: 'TIMEKEEPING',
        },
        {
          id: 24,
          name: 'Cập nhật ngày nghỉ lễ',
          endpoint: 'api.holiday/{id}',
          method: 'PUT',
          service: 'TIMEKEEPING',
        },
        {
          id: 25,
          name: 'Xóa ngày nghỉ lễ',
          endpoint: 'api.holiday/{id}',
          method: 'DELETE',
          service: 'TIMEKEEPING',
        },
      ],
    },
    {
      id: 6,
      name: 'Hồ sơ nhân viên',
      group: 'profile',
      children: [
        {
          id: 26,
          name: 'Tạo hồ sơ nhân viên',
          endpoint: 'api.profile',
          method: 'POST',
          service: 'USER',
        },
        {
          id: 6.2,
          name: 'Danh sách hồ sơ nhân viên',
          endpoint: 'api.profile',
          method: 'GET',
          service: 'USER',
        },
        {
          id: 27,
          name: 'Chi tiết hồ sơ nhân viên',
          endpoint: 'api.profile/{id}',
          method: 'GET',
          service: 'USER',
        },
        {
          id: 6.4,
          name: 'Cập nhật hồ sơ nhân viên',
          endpoint: 'api.profile/{id}',
          method: 'PUT',
          service: 'USER',
        },
        {
          id: 28,
          name: 'Xóa hồ sơ nhân viên',
          endpoint: 'api.profile/{id}',
          method: 'DELETE',
          service: 'USER',
        },
      ],
    },
    {
      id: 7,
      name: 'Tài khoản',
      group: 'user',
      children: [
        {
          id: 29,
          name: 'Tạo tài khoản',
          endpoint: 'api.user',
          method: 'POST',
          service: 'USER',
        },
        {
          id: 30,
          name: 'Danh sách tài khoản',
          endpoint: 'api.user',
          method: 'GET',
          service: 'USER',
        },
        {
          id: 31,
          name: 'Chi tiết tài khoản',
          endpoint: 'api.user/{id}',
          method: 'GET',
          service: 'USER',
        },
        {
          id: 32,
          name: 'Cập nhật tài khoản',
          endpoint: 'api.user/{id}',
          method: 'PUT',
          service: 'USER',
        },
        {
          id: 33,
          name: 'Xóa tài khoản',
          endpoint: 'api.user/{id}',
          method: 'DELETE',
          service: 'USER',
        },
      ],
    },
    {
      id: 8,
      name: 'Cấu hình',
      group: 'setting',
      children: [
        {
          id: 34,
          name: 'Cập nhật cấu hình chung',
          endpoint: 'api.setting/general-information',
          method: 'PUT',
          service: 'TIMEKEEPING',
        },
      ],
    },
    {
      id: 9,
      name: 'Phân quyên',
      group: 'role',
      children: [
        {
          id: 35,
          name: 'Tạo quyền',
          endpoint: 'api.role',
          method: 'POST',
          service: 'USER',
        },
        {
          id: 36,
          name: 'Danh sách quyền',
          endpoint: 'api.role',
          method: 'GET',
          service: 'USER',
        },
        {
          id: 37,
          name: 'Chi tiết quyền',
          endpoint: 'api.role/{id}',
          method: 'GET',
          service: 'USER',
        },
        {
          id: 38,
          name: 'Cập nhật quyền',
          endpoint: 'api.role',
          method: 'UPDATE',
          service: 'USER',
        },
        {
          id: 39,
          name: 'Xóa quyền',
          endpoint: 'api.role',
          method: 'DELETE',
          service: 'USER',
        },
      ],
    },
  ],
};

const accountReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REDUX_STATE.account.SET_ACCOUNTS:
      return { ...state, accounts: payload };
    case REDUX_STATE.account.SET_HOLIDAY:
      return { ...state, account: payload };
    case REDUX_STATE.account.DELETE_HOLIDAY:
      return {
        ...state,
        accounts: state.accounts.filter((b) => b.id !== payload.id),
      };
    case REDUX_STATE.account.EMPTY_ACCOUNT_VALUE:
      return {
        ...state,
        account: initialState.account,
      };
    case REDUX_STATE.account.EMPTY_PROFILE_VALUE:
      return {
        ...state,
        profile: initialState.profile,
      };
    case REDUX_STATE.account.GET_PROFILES:
      return {
        ...state,
        profiles: payload,
      };
    case REDUX_STATE.account.GET_PROFILE:
      return {
        ...state,
        profile: payload,
      };
    case REDUX_STATE.account.GET_ROLES:
      return {
        ...state,
        roles: payload,
      };
    default:
      return state;
  }
};

export default accountReducer;