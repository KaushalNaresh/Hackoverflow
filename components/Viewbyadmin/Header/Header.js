import { Button, Menu, MenuItem } from "@material-ui/core";
import React from "react";

const Header = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <h1> Complaints </h1>
      <Button
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
      </Menu>
      <input onKeyDown={props.searchHandler} />
    </div>
  );
};

export default Header;
