import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const SelectPag = (props) => {
    const classes = useStyles();
    const [pag, setPag] = React.useState('');

    const handleChange = (event) => {
      setPag(event.target.value);
      props.onChange(event.target.value)
    };
    
    return(
    <FormControl className={classes.formControl}>
      <InputLabel id="selectPageLabel">Nº of entries</InputLabel>
      <Select
        labelId="selectPage"
        id="selectPage"
        value={pag}
        onChange={handleChange}
      >
        <MenuItem value={6}>6</MenuItem>
        <MenuItem value={25}>25</MenuItem>
        <MenuItem value={50}>50</MenuItem>
        <MenuItem value={100}>100</MenuItem>
      </Select>
    </FormControl>
    );
};

export default SelectPag;