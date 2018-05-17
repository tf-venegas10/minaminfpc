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
    else  console.log(res);  
   });
    
  }

 render() {
   return (
      <div></div>
    );
  }
}