import React, { Component } from 'react';
import * as d3 from "d3";

import TeamList from "./TeamList";
import team_logos from "../Home/Logos";

import "../../../client/main.css";

// Task component - represents a single todo item
export default class Teams extends Component {
  constructor(props) {
    super(props);
    this.margin = {top: 40, right: 40, bottom: 40, left: 40};
    this.state = {
      selected: false,
      profile: {},
      svg: false,
    };
  }

  componentDidMount() {
    if (!TeamList.teams || TeamList.teams.length !== 21) return;

    var click = this.onClickTeam.bind(this);

    var canvas = d3.select("#network"),
          width = canvas.attr("width"),
          height = canvas.attr("height"),
          ctx = canvas.node().getContext("2d"),
          simulation = d3.forceSimulation()
            .force("x", d3.forceX(width / 2))
            .force("y", d3.forceY(height / 2))
            .force("collide", d3.forceCollide(60))
            .force("charge", d3.forceManyBody().strength(-500))
            .on("tick", update);

    simulation.nodes(TeamList.teams);

    canvas
      .call(d3.drag()
        .container(canvas.node())
        .subject(dragsubject)
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

    function update () {
      ctx.clearRect(0, 0, width, height);

      ctx.strokeStyle = "#aaa";
      ctx.beginPath();
      drawLinks();
      ctx.stroke();

      ctx.beginPath();
      TeamList.teams.forEach(drawNode);
      ctx.fill();
    }

    function dragsubject() {
      return simulation.find(d3.event.x, d3.event.y);
    }

    function clickTeam(id) {
      click(id);
    }

    function dragstarted() {
      if(!d3.event.active) simulation.alphaTarget(0.3).restart();
      d3.event.subject.fx = d3.event.subject.x;
      d3.event.subject.fy = d3.event.subject.y;
      clickTeam(d3.event.subject.id);
    }

    function dragged() {
      d3.event.subject.fx = d3.event.x;
      d3.event.subject.fy = d3.event.y;
    }

    function dragended() {
      if(!d3.event.active) simulation.alphaTarget(0);
      d3.event.subject.fx = null;
      d3.event.subject.fy = null;
    }

    function drawNode(d) {
      let r = 1;
      if (d.id !== "vamos millos") {
        r = 3*d.titles + 50;
        let img = new Image();
        img.src = d.src;
        img.alt = d.alt;
        ctx.moveTo(d.x, d.y);
        ctx.drawImage(img, d.x - r/2, d.y - r/2, r, r*1.3); 
      }
    }

    function drawLinks() {
      TeamList.teams.forEach((d) => {
        ctx.moveTo(TeamList.teams[0].x, TeamList.teams[0].y);
        ctx.lineTo(d.x, d.y);
      })
    }
  }

  onClickTeam(t) {
    if (t === "vamos millos") return;
    Meteor.call('tournament.team_profile', t, (err,res) => {
      if (err) throw err;
      this.setState ({
        selected: true,
        profile: res,
      }); 
    });
  }

  renderInfo() {
    return (
      <div>
        <div className="row">
          <h1>Información</h1>
        </div>
        <div className="row" >
          <div className="col-md-4">
            <img className="info-img" src={team_logos.logos[this.state.profile.team.id].src} alt={team_logos.logos[this.state.profile.team.id].alt}/>
          </div>
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-12">
                <h3>{this.state.profile.team.name}</h3>
              </div>
            </div>
            <div className="row">
              <table>
                <tbody>
                  <tr>
                    <td className="text-center table-cell bold-text" style={{background: "#" + team_logos.logos[this.state.profile.team.id].color, color: "#" + team_logos.logos[this.state.profile.team.id].secondary_color}} >Ciudad</td>
                    <td className="text-center table-cell bold-text" style={{background: "#" + team_logos.logos[this.state.profile.team.id].color, color: "#" + team_logos.logos[this.state.profile.team.id].secondary_color}} >{this.state.profile.venue.city_name}</td>
                  </tr>
                  <tr>
                    <td className="text-center table-cell bold-text" style={{background: "#" + team_logos.logos[this.state.profile.team.id].color, color: "#" + team_logos.logos[this.state.profile.team.id].secondary_color}}>Estadio</td>
                    <td className="text-center table-cell bold-text" style={{background: "#" + team_logos.logos[this.state.profile.team.id].color, color: "#" + team_logos.logos[this.state.profile.team.id].secondary_color}}>{this.state.profile.venue.name}</td>
                  </tr>
                  <tr>
                    <td className="text-center table-cell bold-text" style={{background: "#" + team_logos.logos[this.state.profile.team.id].color, color: "#" + team_logos.logos[this.state.profile.team.id].secondary_color}}>Estrellas</td>
                    <td className="text-center table-cell bold-text" style={{background: "#" + team_logos.logos[this.state.profile.team.id].color, color: "#" + team_logos.logos[this.state.profile.team.id].secondary_color}}>{team_logos.logos[this.state.profile.team.id].titles}</td>
                  </tr>
                  <tr>
                    <td className="text-center table-cell bold-text" style={{background: "#" + team_logos.logos[this.state.profile.team.id].color, color: "#" + team_logos.logos[this.state.profile.team.id].secondary_color}}>Director Técnico</td>
                    <td className="text-center table-cell bold-text" style={{background: "#" + team_logos.logos[this.state.profile.team.id].color, color: "#" + team_logos.logos[this.state.profile.team.id].secondary_color}}>{this.state.profile.manager.name} ({this.state.profile.manager.country_code})</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderPosHistory() {
    const data = this.state.profile.statistics.seasons.filter((s) => s.name.startsWith("Copa Mustang") || s.name.startsWith("Liga Postobon") || s.name.startsWith("Primera A") || s.name.startsWith("Primera B") || s.name.startsWith("Torneo Postobon"));
    var svg = d3.select(this.svg),
      margin = {top: 20, right: 20, bottom: 150, left: 40},
      width = +svg.attr("width") - margin.left - margin.right,
      height = +svg.attr("height") - margin.top - margin.bottom;

    svg.selectAll("*").remove();

    var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
        y = d3.scaleLinear().rangeRound([1, height]);

    var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      x.domain(data.map(function(d) { return d.name; }));
      y.domain([1, 20]);

      g.append("g")
          .attr("class", "axis axis--x")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x));

      g.selectAll("text")
          .attr("transform", "rotate(-45) translate(-45)");

      g.append("g")
          .attr("class", "axis axis--y")
          .call(d3.axisLeft(y).ticks(20))
        .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", "0.71em")
          .attr("text-anchor", "end")
          .text("Posicion");

      var strokeColor = team_logos.logos[this.state.profile.team.id].color === "fff" ? "000" : "fff";

      g.selectAll(".bar")
        .data(data)
        .enter().append("rect")
          .attr("class", "bar")
          .attr("x", function(d) { return x(d.name); })
          .attr("y", function(d) { return y(d.statistics.group_position); })
          .attr("width", x.bandwidth())
          .attr("height", function(d) { return height - y(d.statistics.group_position); })
          .style("fill", team_logos.logos[this.state.profile.team.id].color)
          .style("stroke", strokeColor);
  }
  
  renderPlayers() {
    
  }

  render() {
    const header = this.state.selected ? <h1>Has seleccionado {this.state.profile.team.name}</h1> : <h1>Selecciona tu equipo favorito</h1>
    const info = this.state.selected ? this.renderInfo() : <div></div>;
    let players = <div></div>;
    let svgHeader = <h2>Posición en las últimas temporadas</h2>;
    if (!this.state.svg) {
      svgHeader = <div></div>;
      d3.select(this.svg).selectAll("*").remove();
      players = this.renderPlayers();
    }
    if (this.state.selected) this.renderPosHistory();
    return (
      <div className="teams container-fluid">
        <div className="col-md-6">
          <div className="row">{header}</div>
          <div className="row" >
            <canvas  id="network" width="700" height="700" ref={(canvas) => this.canvas = canvas} ></canvas>
          </div>
        </div>
        <div className="col-md-6">
          {info}
          <div className="row">
            <div className="col-md-12">
              <svg 
                width="700" 
                height="400" 
                ref={(svg) => this.svg = svg} 
              ></svg>
            </div>
          </div>
        </div>
      </div>
    );
  }
}