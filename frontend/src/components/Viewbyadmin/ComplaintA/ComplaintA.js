import React, { Component } from "react";
import Reply from "../../Reply/Reply";
import Complaint from "../../Complaint/Complaint";
import styles from "./ComplaintA.module.css";
import { StylesProvider } from "@material-ui/core";
class ComplaintA extends Component {
  constructor(props) {
    super(props);
    this.state = {
      complaints: [...this.props.complaints],
    };
  }

  render() {
    console.log(this.state.complaints);
    const comp = this.state.complaints.map((cmpln) => (
      <div className={styles.ComplaintA}>
        <div className={styles.ComplaintAFlex}>
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
        </div>
        <div className={styles.ComplaintAFlex}>
          <div>
            <input
              onKeyDown={(event) =>
                this.props.sendReplyHandler(cmpln.id, event)
              }
            />
          </div>
          <div>
            <button
              onClick={(event) => this.props.markClosedHandler(cmpln.id, event)}
            >
              {" "}
              Mark as Closed{" "}
            </button>
          </div>
        </div>
      </div>
    ));

    return (
      <div>
        {comp}
      </div>
    );
  }
}

export default ComplaintA;
