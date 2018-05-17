import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Tasks } from '../../api/tasks.js';
 
// Task component - represents a single todo item
export default class Home extends Component {

  componentDidMount(){

   Meteor.call('tournaments.info',(err,res) => {
     if (err)      throw err;
    else{      
     console.log(res);    
    }
   });
    
  }

 render() {
   return (
      <div></div>
    );
  }
}