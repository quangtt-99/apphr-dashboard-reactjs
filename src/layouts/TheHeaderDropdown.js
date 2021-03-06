import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CImg } from '@coreui/react';
import { ExitToApp } from '@material-ui/icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { logout } from 'src/stores/actions/user';

const TheHeaderDropdown = ({ history }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  return (
    <CDropdown inNav className="c-header-nav-items" direction="down">
      <CDropdownToggle className="c-header-nav-link" caret={false} style={{ paddingLeft: 10 }}>
        <div className="c-avatar">
          <CImg src={'/avatars/6.jpg'} className="c-avatar-img" alt="admin@bootstrapmaster.com" />
        </div>
      </CDropdownToggle>
      <CDropdownMenu>
        {/* <CDropdownItem header tag="div" color="light" className="text-center">
          <strong>Account</strong>
        </CDropdownItem> */}
        {/* <CDropdownItem>
          <CIcon name="cil-bell" className="mfe-2" />
          Updates
          <CBadge color="info" className="mfs-auto">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-envelope-open" className="mfe-2" />
          Messages
          <CBadge color="success" className="mfs-auto">
            42
          </CBadge>
        </CDropdownItem> */}
        {/* <CDropdownItem>
          <CIcon name="cil-task" className="mfe-2" />
          Tasks
          <CBadge color="danger" className="mfs-auto">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-comment-square" className="mfe-2" />
          Comments
          <CBadge color="warning" className="mfs-auto">
            42
          </CBadge>
        </CDropdownItem> */}
        {/* <CDropdownItem header tag="div" color="light" className="text-center">
          <strong>Settings</strong>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-user" className="mfe-2" />
          Profile
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-settings" className="mfe-2" />
          Settings
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-credit-card" className="mfe-2" />
          Payments
          <CBadge color="secondary" className="mfs-auto">
            42
          </CBadge>
        </CDropdownItem> */}
        {/* <CDropdownItem>
          <CIcon name="cil-file" className="mfe-2" />
          Projects
          <CBadge color="primary" className="mfs-auto">
            42
          </CBadge>
        </CDropdownItem> */}
        {/* <CDropdownItem divider /> */}
        <CDropdownItem
          onClick={(e) => {
            dispatch(logout(history));
          }}
          className="d-flex flex-row justify-content-between"
        >
          <div>{t('title.logout')}</div>
          <ExitToApp style={{ color: 'red' }} />
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default TheHeaderDropdown;
