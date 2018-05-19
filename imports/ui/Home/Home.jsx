import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Tasks } from '../../api/methods';
import Dropdown from "react-dropdown";

import 'react-dropdown/style.css' 
import team_logos from "./Logos";

import "../../../client/main.css";
// Task component - represents a single todo item
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      main_view: "table",
      view: "total",
      total: [],
      away: [],
      home: [],
      call_leaders: true,
      top_scorers: [],
      assists: [],
      cards: [],
      own_goals: [],
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
    if (this.state.main_view === "table") {
      let toRender = [];
      if (this.state.view === "total") toRender = this.state.total;
      else if (this.state.view === "away") toRender = this.state.away;
      else toRender = this.state.home;
      return  toRender.map((t) => 
        <tr key={t.team.id} >
          <td>{t.rank}</td>
          <td><img className="table-logo" src={team_logos.logos[t.team.id].src} alt={team_logos.logos[t.team.id].alt}/>  {t.team.name}</td>
          <td>{t.points}</td>
          <td>{t.played}</td>
          <td>{t.win}</td>
          <td>{t.draw}</td>
          <td>{t.loss}</td>
          <td>{t.goals_for}</td>
          <td>{t.goals_against}</td>
          <td>{t.goal_diff}</td>
        </tr>
      );
    } else if (this.state.main_view === "top_scorers") {
      if (this.state.call_leaders) {
        Meteor.call("tournament.leaders", (err, res) => {
          if (err) throw err;
          this.setState({
            call_leaders: false,
            top_scorers: res.top_goals,
            assists: res.top_assists,
            cards: res.top_cards,
            own_goals: res.top_own_goals,
          });
        });
      }
      let list = this.state.top_scorers.filter((ts, i) => i < 20);
      return list.map((ts, i) =>
        <tr key={ts.player.id}>
          <td>{ts.rank}</td>
          <td><img className="table-logo" src={team_logos.logos[ts.team.id].src} alt={team_logos.logos[ts.team.id].alt}/> {ts.player.name} </td>
          <td>{ts.goals}</td>
        </tr> 
      );
    } else if (this.state.main_view === "assists") {
      if (this.state.call_leaders) {
        Meteor.call("tournament.leaders", (err, res) => {
          if (err) throw err;
          this.setState({
            call_leaders: false,
            top_scorers: res.top_goals,
            assists: res.top_assists,
            cards: res.top_cards,
            own_goals: res.top_own_goals,
          });
        });
      }
      let list = this.state.assists.filter((a, i) => i < 20);
      return list.map((a) =>
        <tr key={a.player.id}>
          <td>{a.rank}</td>
          <td><img className="table-logo" src={team_logos.logos[a.team.id].src} alt={team_logos.logos[a.team.id].alt}/> {a.player.name} </td>
          <td>{a.assists}</td>
        </tr> 
      ); 
    } else if (this.state.main_view === "cards") {
      if (this.state.call_leaders) {
        Meteor.call("tournament.leaders", (err, res) => {
          if (err) throw err;
          this.setState({
            call_leaders: false,
            top_scorers: res.top_goals,
            assists: res.top_assists,
            cards: res.top_cards,
            own_goals: res.top_own_goals,
          });
        });
      }
      let list = this.state.cards.filter((c, i) => i < 20);
      return list.map((c) =>
        <tr key={c.player.id}>
          <td>{c.rank}</td>
          <td><img className="table-logo" src={team_logos.logos[c.team.id].src} alt={team_logos.logos[c.team.id].alt}/> {c.player.name} </td>
          <td>{c.yellow_cards}</td>
          <td>{c.red_cards}</td>
          <td>{c.yellow_red_cards}</td>
        </tr> 
      ); 
    } else if (this.state.main_view === "own_goals") {
      if (this.state.call_leaders) {
        Meteor.call("tournament.leaders", (err, res) => {
          if (err) throw err;
          this.setState({
            call_leaders: false,
            top_scorers: res.top_goals,
            assists: res.top_assists,
            cards: res.top_cards,
            own_goals: res.top_own_goals,
          });
        });
      }
      let list = this.state.own_goals.filter((og, i) => i < 20);
      return list.map((og) =>
        <tr key={og.player.id}>
          <td>{og.rank}</td>
          <td><img className="table-logo" src={team_logos.logos[og.team.id].src} alt={team_logos.logos[og.team.id].alt}/> {og.player.name} </td>
          <td>{og.own_goals}</td>
        </tr> 
      ); 
    }
  }

  renderTableHeader() {
    if (this.state.main_view === "table")
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
    else if (this.state.main_view === "top_scorers")
      return (
        <thead>
          <tr>
            <th>Ranking</th>
            <th>Jugador</th>
            <th>Goles</th>
          </tr>
        </thead>
      );
    else if (this.state.main_view === "assists")
      return (
        <thead>
          <tr>
            <th>Ranking</th>
            <th>Jugador</th>
            <th>Asistencias</th>
          </tr>
        </thead>
      );
    else if (this.state.main_view === "cards")
      return (
        <thead>
          <tr>
            <th>Ranking</th>
            <th>Jugador</th>
            <th><img className="table-logo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4qNhQB78UWwGSsplXdu8TZ2inla-v4JddXd1aybl1-YZUv3P9" alt="Tarjeta amarilla"/>Tarjetas Amarillas</th>
            <th><img className="table-logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Red_card.svg/2000px-Red_card.svg.png" alt="Tarjeta roja"/>Tarjetas Rojas</th>
            <th><img className="table-logo" src="https://cdn3.volusion.com/tjyvc.unaha/v/vspfiles/photos/15B503-2.jpg?1516824794" alt="Tarjeta roja amarilla"/>Doble Amarilla</th>
          </tr>
        </thead>
      );
      else if (this.state.main_view === "own_goals")
        return (
          <thead>
            <tr>
              <th>Ranking</th>
              <th>Jugador</th>
              <th>Autogoles</th>
            </tr>
          </thead>
        );
      else return <thead></thead>;
  }

  _onSelect(opt) {
    if (opt.value === "Total") this.setState({view: "total"});
    else if (opt.value === "Local") this.setState({view: "home"});
    else this.setState({view: "away"});
  }

  onClickTable() {
    this.setState({main_view: "table"});
  }

  onClickPlayoffs() {
    this.setState({main_view: "playoffs"});
  }

  onClickTopScorers() {
    this.setState({main_view: "top_scorers"});
  }

  onClickAssists() {
    this.setState({main_view: "assists"});
  }
  onClickCards() {
    this.setState({main_view: "cards"});
  }
  onClickOwnGoals() {
    this.setState({main_view: "own_goals"});
  }

  render() {
    const options = ["Total", "Local", "Visitante"];
    let defaultOption = "";

    if (this.state.view === "total") defaultOption = options[0];
    else if (this.state.view === "home") defaultOption = options[1]
    else defaultOption = options[2];

    const drpdwn = this.state.main_view === "table" ? <div className="col-md-4"><h4>Local/Visitante:</h4><Dropdown options={options} onChange={this._onSelect.bind(this)} value={defaultOption} placeholder={defaultOption} /></div> : "";

    return (
      <div className="home container">
        <div className="row">
          <div className="col-md-8">
            <button type="button" className="btn btn-link table-options" onClick={this.onClickTable.bind(this)} >Tabla</button>
            <button type="button" className="btn btn-link table-options" onClick={this.onClickTopScorers.bind(this)}>Goleadores</button>
            <button type="button" className="btn btn-link table-options" onClick={this.onClickAssists.bind(this)}>Asistencias</button>
            <button type="button" className="btn btn-link table-options" onClick={this.onClickCards.bind(this)}>Tarjetas</button>
            <button type="button" className="btn btn-link table-options" onClick={this.onClickOwnGoals.bind(this)}>Autogoles</button>
          </div>
          {drpdwn}
        </div>
        <div className="row le_tabla">
          <div className="col-md-12">
            <table className="home-table table table table-striped table-bordered table-hover table-sm" >
              {this.renderTableHeader()}
              <tbody>
                {this.renderTable()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}