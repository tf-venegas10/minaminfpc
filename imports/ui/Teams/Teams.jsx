import React, { Component } from 'react';
import * as d3 from "d3";

import TeamList from "./TeamList";

// Task component - represents a single todo item
export default class Teams extends Component {
  constructor(props) {
    super(props);
    this.margin = {top: 40, right: 40, bottom: 40, left: 40};
    this.state = {
      profile: {},
    };
  }

  componentDidMount() {
    Meteor.call('tournament.live_standings',(err,res) => {
      if (err) throw err;
      this.setState ({
        profile: res,
      }); 
    });

    const svg = d3.select(this.svg);

    this.width = svg.attr("width") - this.margin.left - this.margin.right,
    this.height = svg.attr("height") - this.margin.top - this.margin.bottom;

    this.formatValue = d3.format(",d");

    this.x = d3.scaleLinear()
          .range([0, this.width]);

    this.g = svg.append("g")
        .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

    this.update(TeamList.teams);
  }

  update(data) {
    this.x.domain(d3.extent(data, function(d) { return d.titles; }));

    var simulation = d3.forceSimulation(data)
        .force("x", d3.forceX((d) => { return this.x(d.titles); }).strength(5))
        .force("y", d3.forceY(this.height / 2))
        .force("collide", d3.forceCollide(4))
        .stop();

    for (var i = 0; i < 120; ++i) simulation.tick();

    this.g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + this.height + ")")
        .call(d3.axisBottom(this.x).ticks(20, ".0s"));

    var cell = this.g.append("g")
        .attr("class", "cells")
      .selectAll("g").data(d3.voronoi()
          .extent([[-this.margin.left, -this.margin.top], [this.width + this.margin.right, this.height + this.margin.top]])
          .x(function(d) { return d.x; })
          .y(function(d) { return d.y; })
        .polygons(data)).enter().append("g");

    cell.append("circle")
        .attr("r", function(d) {return d.data.titles + 20})
        .attr("cx", function(d) { return d.data.x; })
        .attr("cy", function(d) { return d.data.y; });

    cell.append("path")
        .attr("d", function(d) { return "M" + d.join("L") + "Z"; });

    cell.append("title")
        .text((d) => { return d.data.id + "\n" + this.formatValue(d.data.titles); });
  }

  render() {
    return (
      <div className="teams container">
        <svg width="1000" height="100" ref={(svg) => this.svg = svg} ></svg>
      </div>
    );
  }
}