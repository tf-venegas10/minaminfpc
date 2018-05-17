import React, { Component } from 'react';
import { Tasks } from '../../api/methods';
 
// Task component - represents a single todo item
export default class H2H extends Component {

  constructor(props) {
    super(props);
    this.state = {
      teams: "",
    }
  }

  componentDidMount(){

    Meteor.call('tournaments.info',(err,res) => {
      if (err)      throw err;
     else  console.log(res);  
    });
     
   }
 
  render() {
    return (
       <div></div>
     );
   }
 }