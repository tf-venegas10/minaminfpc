import React, { Component } from 'react';
import { Tasks } from '../../api/methods';
import Dropdown from "react-dropdown";

export default class Schedule extends Component {

  constructor(props) {
    super(props);
    this.state = {
      results: [],
      no_played: [],
      load: false,
      view: "Seleccione..."
    }
  }

  componentDidMount() {
    Meteor.call('tournament.results', (err, res) => {
      if (err) throw err;
      else {
        this.setState({
          results: res.results,
        });
        setTimeout(this.getSchedule.bind(this), 1100)
      }
    });
  }

  getSchedule() {
    Meteor.call('tournament.schedule', (err, res) => {
      if (err) throw err;
      else {
        let list = res.sport_events;
        let doneList = [];
        list.map((t, i) => {
          if (t.status === "not_started") doneList.push(t);
        })
        this.setState({
          no_played: doneList,
          load: true,
        });
      }
    });
  }

  formatDate(date) {
    let monthNames = [
      "Enero", "Febrero", "Marzo",
      "Abril", "Mayo", "Junio", "Julio",
      "Agosto", "Septiembre", "Octubre",
      "Noviembre", "Diciembre"
    ];

    let day = date.getDate();
    let monthIndex = date.getMonth();
    let year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getUTCMinutes();
    if (minutes < 10) minutes = "0" + minutes;

    return day + " " + monthNames[monthIndex] + " " + year + " - " + hours + ":" + minutes;
  }

  renderTable() {
    let toRender = this.state.results;
    let filtered = [];
    if (toRender.length > 0 && this.state.view != "Seleccione...") {
      toRender.forEach((t) => {
        let match = {
          id: "",
          jornada: "",
          home: "",
          away: "",
          ciudad: "",
          fecha: "",
          estadio: "",
          resultado: "",
        }
        let matchday = t.sport_event.tournament_round.type;
        let jornada = matchday === "cup" ? t.sport_event.tournament_round.name : "Jornada " + t.sport_event.tournament_round.number;
        if (matchday !== "cup" && jornada === this.state.view && t.sport_event_status.status !== "postponed") {
          match.jornada = jornada;
          match.home = t.sport_event.competitors[0];
          match.away = t.sport_event.competitors[1];
          match.ciudad = t.sport_event.venue.city_name;
          match.estadio = t.sport_event.venue.name;
          let nuevaFecha = new Date(t.sport_event.scheduled);
          match.fecha = this.formatDate(nuevaFecha);
          match.id = t.sport_event.id;
          match.resultado = t.sport_event_status.home_score + "-" + t.sport_event_status.away_score;
          filtered.push(match);
        }
        else if (matchday === "cup" && this.state.view === "Play-Offs" && t.sport_event_status.status !== "postponed") {
          match.jornada = jornada;
          match.home = t.sport_event.competitors[0];
          match.away = t.sport_event.competitors[1];
          match.ciudad = t.sport_event.venue.city_name;
          match.estadio = t.sport_event.venue.name;
          let nuevaFecha = new Date(t.sport_event.scheduled);
          match.fecha = this.formatDate(nuevaFecha);
          match.id = t.sport_event.id;
          match.resultado = t.sport_event_status.home_score + "-" + t.sport_event_status.away_score;
          filtered.push(match);
        }
      }
      );
    }

    return filtered.map((t) =>
      <tr key={t.id} >
        <td>{t.jornada}</td>
        <td><img className="table-logo" src={team_logos.logos[t.home.id].src} alt={team_logos.logos[t.home.id].alt} />{t.home.name}  -  {t.away.name}<img className="table-logo" src={team_logos.logos[t.away.id].src} alt={team_logos.logos[t.away.id].alt} /></td>
        <td>{t.ciudad}, {t.estadio}</td>
        <td>{t.fecha}</td>
        <td>{t.resultado}</td>
      </tr>
    );
  }

  renderTableHeader() {
    return (
      <thead>
        <tr>
          <th>Jornada</th>
          <th>Partido</th>
          <th>Ciudad</th>
          <th>Fecha</th>
          <th>Resultado</th>
        </tr>
      </thead>
    );
  }

  renderEmpty() {
    return (
      <tr >
        <td> - </td>
        <td> - </td>
        <td> - </td>
        <td> - </td>
        <td> - </td>
      </tr>
    );
  }

  getDDOptions() {
    let f = [];
    return f
  }

  _onSelect(opt) {
    this.setState({ view: opt.value });
  }


  render() {

    let body = this.state.load ? this.renderTable() : this.renderEmpty();
    const options = ["Seleccione...",
      "Jornada 1", "Jornada 2", "Jornada 3", "Jornada 4", "Jornada 5", "Jornada 6",
      "Jornada 7", "Jornada 8", "Jornada 9", "Jornada 10", "Jornada 11", "Jornada 12",
      "Jornada 13", "Jornada 14", "Jornada 15", "Jornada 16", "Jornada 17", "Jornada 18",
      "Jornada 19", "Play-Offs"];
    let defaultOption = options[0];

    return (
      <div>
        <h6>Jornada</h6>
        <Dropdown options={options} onChange={this._onSelect.bind(this)} value={defaultOption} placeholder={defaultOption} />
        <div className="row">
          <div className="col-md-12">
            <table className="home-table table" >
              {this.renderTableHeader()}
              <tbody>
                {body}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}