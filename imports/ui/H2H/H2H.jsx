import React, { Component } from 'react';
import { Tasks } from '../../api/methods';
import CircleProgress from "./CircleProgress";
import team_logos from "../Home/Logos";
import AutoS from "./AutoS";

export default class H2H extends Component {

  constructor(props) {
    super(props);
    this.state = {
      teams: [],
      team1: null,
      team2: null,
      total_matches: 0,
      team1_data: {},
      team2_data: {},
      done: false,
    }
  }

  componentDidMount() {
    Meteor.call('tournaments.info', (err, res) => {
      if (err) throw err;
      else {
        this.setState({
          teams: res.groups[0].teams,
        });
      }
    });
  }

  setTeam1(team) {
    this.setState({
      team1: team,
      done: false,
    });
  }

  setTeam2(team) {
    this.setState({
      team2: team,
      done: false,
    });
  }

  renderTeams1() {
    let list = this.state.teams;
    let id = "";
    if (list.length > 0) {
      return <AutoS events={list} setTeam={this.setTeam1.bind(this)} />
    }
  }

  renderTeams2() {
    let list = this.state.teams;
    let id = "";
    if (list.length > 0) {
      return <AutoS events={list} setTeam={this.setTeam2.bind(this)} />
    }
  }

  getH2H() {
    if (!(this.state.team1 && this.state.team2)) {
      alert("Debe seleccionar ambos equipos.");
    }
    else if (this.state.team1 === this.state.team2) {
      alert("Debe seleccionar dos equipos diferentes.");
    }
    else {
      let results = [];
      let total = 0;
      let homeT = "";
      let awayT = "";
      let t1 = {
        away_goals: 0,
        home_goals: 0,
        total_goals: 0,
        away_against: 0,
        home_against: 0,
        total_against: 0,
        wins: 0,
        loss: 0,
        draw: 0
      };
      let t2 = {
        away_goals: 0,
        home_goals: 0,
        total_goals: 0,
        away_against: 0,
        home_against: 0,
        total_against: 0,
        wins: 0,
        loss: 0,
        draw: 0
      };
      Meteor.call('teams.h2h', this.state.team1.id, this.state.team2.id, (err, res) => {
        if (err) throw err;
        else {
          results = res.last_meetings.results;
          total = results.length;
          results.map((t, i) => {
            homeT = t.sport_event.competitors[0].id;
            awayT = t.sport_event.competitors[1].id;
            if (homeT === this.state.team1.id) {
              t1.home_goals += t.sport_event_status.home_score;
              t1.total_goals += t.sport_event_status.home_score;
              t2.away_goals += t.sport_event_status.away_score;
              t2.total_goals += t.sport_event_status.away_score;
              t1.home_against += t.sport_event_status.away_score;
              t1.total_against += t.sport_event_status.away_score;
              t2.away_against += t.sport_event_status.home_score;
              t2.total_against += t.sport_event_status.home_score;
            }
            else {
              t2.home_goals += t.sport_event_status.home_score;
              t2.total_goals += t.sport_event_status.home_score;
              t1.away_goals += t.sport_event_status.away_score;
              t1.total_goals += t.sport_event_status.away_score;
              t2.home_against += t.sport_event_status.away_score;
              t2.total_against += t.sport_event_status.away_score;
              t1.away_against += t.sport_event_status.home_score;
              t1.total_against += t.sport_event_status.home_score;
            }
            if (t.sport_event_status.winner_id) {
              if (this.state.team1.id === t.sport_event_status.winner_id) {
                t1.wins += 1;
                t2.loss += 1;
              }
              else {
                t2.wins += 1;
                t1.loss += 1;
              }
            }
            else {
              t1.draw += 1;
              t2.draw += 1;
            }
          });
          this.setState({
            total_matches: total,
            team1_data: t1,
            team2_data: t2,
            show: true,
            done: true,
          });
        }
      });
    }
  }

  renderData() {
    let t1 = "W-" + this.state.team1_data.wins;
    let t2 = "D-" + this.state.team1_data.draw;
    let t3 = "L-" + this.state.team1_data.loss;
    let t4 = "G-" + this.state.team1_data.total_goals;
    let t5 = "W-" + this.state.team2_data.wins;
    let t6 = "D-" + this.state.team2_data.draw;
    let t7 = "L-" + this.state.team2_data.loss;
    let t8 = "G-" + this.state.team2_data.total_goals;
    let p1 = this.state.team1_data.wins / this.state.total_matches;
    let p2 = this.state.team1_data.draw / this.state.total_matches;;
    let p3 = this.state.team1_data.loss / this.state.total_matches;;
    let p4 = this.state.team1_data.total_goals / (this.state.team1_data.total_goals + this.state.team1_data.total_against);
    let p5 = this.state.team2_data.wins / this.state.total_matches;
    let p6 = this.state.team2_data.draw / this.state.total_matches;;
    let p7 = this.state.team2_data.loss / this.state.total_matches;;
    let p8 = this.state.team2_data.total_goals / (this.state.team2_data.total_goals + this.state.team2_data.total_against);
    return (
      <div>
        <h2>{this.state.team1.name}</h2>
        <div className="row">
          <div className="col-3"><CircleProgress percent={p1} text={t1} /></div>
          <div className="col-3"><CircleProgress percent={p2} text={t2} /></div>
          <div className="col-3"><CircleProgress percent={p3} text={t3} /></div>
          <div className="col-3"><CircleProgress percent={p4} text={t4} /></div>
        </div>
        <h2>{this.state.team2.name}</h2>
        <div className="row">
          <div className="col-3"><CircleProgress percent={p5} text={t5} /></div>
          <div className="col-3"><CircleProgress percent={p6} text={t6} /></div>
          <div className="col-3"><CircleProgress percent={p7} text={t7} /></div>
          <div className="col-3"><CircleProgress percent={p8} text={t8} /></div>
        </div>
      </div>
    );
  }

  render() {
    let show = (this.state.team1 && this.state.team2) && (this.state.team1 !== this.state.team2);
    let circles = "";
    if (show && !this.state.done) this.getH2H();
    if (show && this.state.done) circles = this.renderData();
    return (
      <div className="h2h">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6">{this.renderTeams1()}</div>
            <div className="col-sm-6">{this.renderTeams2()}</div>
          </div>
          <div>{circles}</div>
        </div>
      </div>
    );
  }
}