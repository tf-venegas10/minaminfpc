import React, { Component } from 'react';
import { Tasks } from '../../api/methods';

 
// Task component - represents a single todo item
export default class Schedule extends Component {

  componentDidMount(){
    Meteor.call('tournament.schedule', (err, res) => {
      if (err) throw err;
      else {
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