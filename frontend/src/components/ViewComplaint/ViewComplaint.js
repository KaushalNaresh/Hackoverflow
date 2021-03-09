import react, { Component } from "react";
import Complaint from "../Complaint/Complaint";
import styles from "./ViewComplaint.module.css";
import { Link } from "react-router-dom";
import axios from "axios";

class ViewComplaint extends Component {
  constructor(props) {
    super(props);
    this.state = {
      complaintsHistory: [
        {
          id: 1,
          date: "12/12/12",
          message: "spomethinf vhvj jbjb ubnknlmlk jbbnkn",
          status: true,
          replies: [
            {
              date: "12/12/12",
              msg: "the issue has been rsolved",
            },
            {
              date: "23/12/12",
              msg: "I am closing the issue",
            },
          ],
          hasreplied: true,
        },
        {
          id: 2,
          date: "12/12/12",
          message: "spomethinf",
          status: false,
          replies: [],
          hasreplied: false,
        },
      ],
    };
  }

  componentDidMount() {
    // axios.get(URL+"/viewcomplain", {
    //     params:{
    //         email: this.props.location.state.emailid
    //     }
    // }).then((res) => this.setState({
    //     complaintsHistory: [...res]
    // })).catch(err => console.error(err));
    console.log(this.state.complaintsHistory);
  }

  render() {
    const complaints = this.state.complaintsHistory.map((cmpln) => (
      <Complaint
        key={cmpln.id}
        id={cmpln.id}
        date={cmpln.date}
        message={cmpln.message}
        status={cmpln.status}
        replies={cmpln.replies} // map in a manner as <p> with date
        hasreplied={cmpln.hasreplied}
        location={cmpln.location}
        pincode={cmpln.pincode}
      />
    ));

    return (
      <div className={styles.ViewComplaint}>
        <div className={styles.Header}>
          <h1> {this.props.location.state.emailid} </h1>
          <Link
          style={{ color: '#FFF' }}
            to={{
              pathname: "/register",
              state: { emailid: this.props.location.state.emailid },
            }}
          >
            {" "}
            Click here to Register Complaint{" "}
          </Link>
          <h1> Complaints History </h1>
        </div>
        {complaints}
      </div>
    );
  }
}

export default ViewComplaint;
