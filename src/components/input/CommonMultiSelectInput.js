import Chip from '@material-ui/core/Chip';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 4;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(id, values, theme) {
  if (values)
    return {
      fontWeight: values.indexOf(id) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
    };
}

export default function CommonMultiSelectInput({ values = [], onChangeValues, listValues, placeholder, setValues, key, isDisable }) {
  values = [...new Set(values)];
  const classes = useStyles();
  const theme = useTheme();

  let hash = listValues.reduce((acc, val) => {
    acc[val.id] = val;
    return acc;
  }, {});

  return (
    <FormControl className={classes.formControl} style={{ width: '100%' }}>
      <Select
        disabled={isDisable}
        labelId="demo-mutiple-chip-label"
        className="border-bottom"
        multiple
        key={key}
        displayEmpty={true}
        disableUnderline
        value={values}
        onChange={onChangeValues}
        input={<Input id="select-multiple-chip" />}
        renderValue={(selected) => {
          return selected.length === 0 || listValues.length === 0 ? (
            <em>{placeholder}</em>
          ) : (
            <div className={classes.chips}>
              {selected.map((value, index) => {
                return <Chip key={index} label={hash[value].name} className={classes.chip} color="primary" variant="outlined" />;
              })}
            </div>
          );
        }}
        MenuProps={MenuProps}
      >
        {listValues.map((val) => (
          <MenuItem key={val.id} value={val.id} label={val.name} style={getStyles(val.id, values, theme)}>
            {val.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
