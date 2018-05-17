import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Tasks } from '../../api/methods';
 
// Task component - represents a single todo item
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "tabla",
      table: [],
      away: [],
      home: [],
    } 
  }

  componentDidMount(){
   Meteor.call('tournament.live_standings',(err,res) => {
     if (err) throw err;
     this.setState ({
       table: res.standings[0].groups[0].team_standings,
       away: res.standings[2].groups[0].team_standings,
       home: res.standings[1].groups[0].team_standings,
     }); 
   });   
  }

 render() {
   return (
      <div className="home container"></div>
    );
  }
}