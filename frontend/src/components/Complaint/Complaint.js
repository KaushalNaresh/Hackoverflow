import React, { Component } from 'react';
import styles from './Complaint.module.css';
import Reply from '../Reply/Reply';
import {
    Typography,
    Paper,
    Link,
    Grid,
    Button,
    CssBaseline,
    RadioGroup,
    FormLabel,
    MenuItem,
    FormGroup,
    FormControl,
    FormControlLabel,
  } from "@material-ui/core";

const Complaint = (props) => {
    var rep = (props.replies.map(rep => 
                <Reply 
                    date= {rep.date}
                    msg = {rep.msg}/>   ));

    console.log(props.status);
    const reply = props.hasreplied ? rep : null;
    const color = props.status ? "green" : "red";
    return (
        <div className={styles.Complaint} styles={{ backgroundColor: color}}> 
            <div className={styles.ComplaintFlex}> <b> Complaint ID: </b> {props.id}</div>
            <div className={styles.ComplaintFlex}> <b> Complaint Date: </b> {props.date }</div>
            <div className={styles.ComplaintFlex}> <b> Location: </b>{ props.location}</div>
            <div className={styles.ComplaintFlex}> <b> Pincode: </b>{ props.pincode}</div>
            <div className={styles.ComplaintFlex}> <b> Description: </b>{ props.message}</div>
            <div className={styles.ComplaintFlex}> <b> Status: </b>{ props.status ? "Active":"Closed"}</div>
            {reply}
        </div>
    );
}

export default Complaint;