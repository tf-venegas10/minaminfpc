import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Tasks } from '../../api/methods';
 
import team_logos from "./Logos";
// Task component - represents a single todo item
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "total",
      total: [],
      away: [],
      home: [],
    } 
  }

  componentDidMount(){
    Meteor.call('tournament.live_standings',(err,res) => {
      if (err) throw err;
      this.setState ({
        total: res.standings[0].groups[0].team_standings,
        away: res.standings[2].groups[0].team_standings,
        home: res.standings[1].groups[0].team_standings,
      }); 
    });
  }

  renderTable() {
    let toRender = [];
    if (this.state.view === "total") toRender = this.state.total;
    else if (this.state.view === "away") toRender = this.state.away;
    else toRender = this.state.home;
    return  toRender.map((e,i) => 
      <tr key={e.team.id} >
        <td>{e.rank}</td>
        <td><img className="table-logo" src={team_logos.logos[e.team.id].src} alt={team_logos.logos[e.team.id].alt}/>  {e.team.name}</td>
        <td>{e.points}</td>
        <td>{e.played}</td>
        <td>{e.win}</td>
        <td>{e.draw}</td>
        <td>{e.loss}</td>
        <td>{e.goals_for}</td>
        <td>{e.goals_against}</td>
        <td>{e.goal_diff}</td>
      </tr>
    );
  }

  renderTableHeader() {
    return (
      <thead>
        <tr>
          <th>Pos.</th>
          <th>Equipo</th>
          <th>Puntos</th>
          <th>PJ</th>
          <th>PG</th>
          <th>PE</th>
          <th>PP</th>
          <th>GF</th>
          <th>GC</th>
          <th>Dif.</th>
        </tr>
      </thead>
    );
  }

 render() {
   return (
      <div className="home container">
        <h3 className="centerAlign">Tabla</h3>
        <table className="home-table table" >
          {this.renderTableHeader()}
          <tbody>
            {this.renderTable()}
          </tbody>
        </table>
      </div>
    );
  }
}