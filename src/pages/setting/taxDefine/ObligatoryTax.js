import { CContainer } from '@coreui/react';
import React from 'react';
import QTable from 'src/components/table/Table';

const ObligatoryTax = ({ t, location, history }) => {
  const columnDef = [
    { name: 'id', title: t('label.id'), align: 'left', width: '20%', wordWrapEnabled: true },
    { name: 'name', title: t('label.name_tax'), align: 'left', width: '50%', wordWrapEnabled: true },
    { name: 'value', title: t('label.percentage_tax'), align: 'left', width: '30%', wordWrapEnabled: true },
  ];
  const taxes = [
    { id: 1, name: 'Bảo hiểm xã hội', value: '8%' },
    { id: 2, name: 'Bảo hiểm y tế', value: '1.5%' },
    { id: 3, name: 'Bảo hiểm thất nghiệp', value: '1%' },
  ];

  return (
    <CContainer fluid className="c-main mb-3 px-4">
      <QTable t={t} columnDef={columnDef} data={taxes} disableEditColum={true} disableToolBar={true} disableFilter={true} notPaging={true} />
    </CContainer>
  );
};
export default ObligatoryTax;