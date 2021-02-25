//Selector de elementos por pagina

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 100,
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

    <div style={{float:"left"}}>
      <FormControl className={classes.formControl}>
        <InputLabel id="selectPageLabel" style={{fontSize:"13.33px",  fontFamily:"Quicksand"}}>Nº of entries</InputLabel>
        <Select
          labelId="selectPage"
          id="selectPage"
          value={pag}
          onChange={handleChange}
          style={{fontSize:"13.33px", fontFamily:"Quicksand"}}
        >
          <MenuItem value={8} style={{fontSize:"13.33px", fontFamily:"Quicksand"}}>8</MenuItem>
          <MenuItem value={25} style={{fontSize:"13.33px", fontFamily:"Quicksand"}}>25</MenuItem>
          <MenuItem value={50} style={{fontSize:"13.33px", fontFamily:"Quicksand"}}>50</MenuItem>
          <MenuItem value={100} style={{fontSize:"13.33px", fontFamily:"Quicksand"}}>100</MenuItem>
        </Select>
      </FormControl>
    </div>
    );
};

export default SelectPag;