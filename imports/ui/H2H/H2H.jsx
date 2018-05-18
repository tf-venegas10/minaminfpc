import React, { Component } from 'react';
import { Tasks } from '../../api/methods';

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
    }
  }

  componentDidMount() {
    Meteor.call('tournaments.info', (err, res) => {
      if (err) throw err;
      else {
        this.setState({
          teams: res.groups[0].teams,
          team1: res.groups[0].teams[9],
          team2: res.groups[0].teams[1],
        });
        console.log(this.state);
      }
    });
  }

  getH2H() {
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
    Meteor.call('teams.h2h', 6112, 6117, (err, res) => {
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
        });
        console.log(this.state);
      }
    });
  }

  render() {
    return (
      <div className="h2h">
        <div className="container container-2">
          <button type="submit" className="btn new-event-btn" onClick={this.getH2H.bind(this)}>Add</button>
        </div>
      </div>
    );
  }
}