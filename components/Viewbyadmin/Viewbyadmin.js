import axios from "axios";
import React, { Component } from "react";
import ComplaintA from "./ComplaintA/ComplaintA";
import Header from "./Header/Header";

class Viewbyadmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      complaints: [
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

      search: {
        category: 0,
      },
    };
  }

  responseHandler = (res) => {
    console.log(res);
  };

  sendReplyHandler = (id, event) => {
    // send axios post request and then update the this.state.complaints
    if (event.keyCode === 13) {
      //send axios post request
      console.log(event.target.value);
      console.log(id);
      let reply = {
        id: id,
        reply: event.target.value,
      };
      axios
        .post(URL + "/update", reply)
        .then(
          () =>
            function updatestate() {
              var today = new Date();
              var dd = String(today.getDate()).padStart(2, "0");
              var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
              var yyyy = today.getFullYear();

              today = mm + "/" + dd + "/" + yyyy;
              let complaints = [...this.state.complaints];
              console.log(complaints, today);
              var c;
              for (let i = 0; i < complaints.length; i++) {
                if (complaints[i].id == id) {
                  complaints[i].replies.push({
                    date: today,
                    msg: event.target.value,
                  });
                  break;
                }
              }

              this.setState({
                complaints: [...complaints],
              });
              event.target.value = "";
            }
        )
        .catch((err) => console.error(err));
    }
  };

  markClosedHandler = (id) => {
    // send post request and mark as closed
    let reply = {
      id: id,
      status: false,
    };
    axios
      .post(URL + "/update", reply)
      .then(
        () =>
          function updatestate() {
            let complaints = [...this.state.complaints];
            console.log(complaints);
            var c;
            for (let i = 0; i < complaints.length; i++) {
              if (complaints[i].id == id) {
                complaints[i].status = false;
                break;
              }
            }

            this.setState({
              complaints: [...complaints],
            });
          }
      )
      .catch((err) => console.error(err));
  };

  searchHandler = (event) => {
    if (event.keyCode === 13) {
      axios
        .get(URL + "search/", {
          params: {
            category: this.state.search.category,
            searchString: event.target.value,
          },
        })
        .then(
          (res) =>
            function updatestate(res) {
              // [TODO update response as an object]
              // i m assuming res is the new complaints list
              this.setState({
                complaints: [...res.complaints],
              });
            }
        )
        .catch((err) => console.error(err));
    }
  };

  changeCategory = (event) => {
    var newsearch = { category: event.target.value };
    this.setState({
      search: newsearch,
    });
    console.log(this.state.search);
  };

  componentDidMount() {
    // axios.get(URL+'/adminview', {
    //     params: {
    //         username: this.props.location.state.username
    //     }
    // }).then(res => this.responseHandler(res))
    // .catch(err => console.error(err));
    console.log(this.state.complaints);
  }

  render() {
    return (
      <div>
        <Header
          search={this.state.search}
          searchHandler={this.searchHandler}
          changeCategory={this.changeCategory}
        />
        <ComplaintA
          complaints={this.state.complaints}
          sendReplyHandler={this.sendReplyHandler}
          markClosedHandler={this.markClosedHandler}
        />
      </div>
    );
  }
}

export default Viewbyadmin;
