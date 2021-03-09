import { Button, Menu, MenuItem } from "@material-ui/core";
import React from "react";
import styles from "./Header.module.css";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';


const Header = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const [value, setValue] = React.useState('id');

  const handleChange = (event) => {
      console.log(event.target.value);
    setValue(event.target.value);
    props.changeCategory(event);
  };
  return (
    <div className={styles.Header}>
      <h1> Complaints </h1>
      {/* <Button
        aria-controls="fade-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        {props.search.category}
      </Button>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={props.changeCategory}>ID</MenuItem>
        <MenuItem onClick={props.changeCategory}>Date</MenuItem>
        <MenuItem onClick={props.changeCategory}>Location</MenuItem>
        <MenuItem onClick={props.changeCategory}>Name</MenuItem>
      </Menu> */}
      <FormControl component="fieldset">
        {/* <FormLabel component="legend">Gender</FormLabel> */}
        <RadioGroup
          aria-label="searchby"
          name="searchby"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel value="id" control={<Radio />} label="ID" />
          <FormControlLabel value="date" control={<Radio />} label="Date" />
          <FormControlLabel value="pincode" control={<Radio />} label="Pincode" />
          
        </RadioGroup>
      </FormControl>
      <input onKeyDown={props.searchHandler} />
    </div>
  );
};

export default Header;
