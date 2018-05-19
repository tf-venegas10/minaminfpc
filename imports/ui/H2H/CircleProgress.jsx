import React, { Component } from 'react';
import * as d3 from "d3";

export default class CircleProgress extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: "H",
            percent: 0.77,
            color: "#123456",
        }
    }

   componentDidMount() {
        const color = this.state.color;
        const radius = 100;
        const border = 20;
        const padding = 30;
        const startPercent = 0;
        const endPercent = this.props.percent;
        const twoPi = Math.PI * 2;
        let formatPercent = d3.format('.0%');
        let boxSize = (radius + padding) * 2;
        
        
        let count = Math.abs((endPercent - startPercent) / 0.01);
        let step = endPercent < startPercent ? -0.01 : 0.01;
        
        let arc = d3.arc()
            .startAngle(0)
            .innerRadius(radius)
            .outerRadius(radius - border);
        
        let parent = d3.select('div#circleP');
        
        let svg = parent.append('svg')
            .attr('width', boxSize)
            .attr('height', boxSize)
            .attr("class", "circ");
        
        let defs = svg.append('defs');
        
        let filter = defs.append('filter')
            .attr('id', 'blur');
        
        filter.append('feGaussianBlur')
            .attr('in', 'SourceGraphic')
            .attr('stdDeviation', '7');
        
        let g = svg.append('g')
            .attr('transform', 'translate(' + boxSize / 2 + ',' + boxSize / 2 + ')');
        
        let meter = g.append('g')
            .attr('class', 'progress-meter');
        
        meter.append('path')
            .attr('class', 'background')
            .attr('fill', '#ccc')
            .attr('fill-opacity', 0.5)
            .attr('d', arc.endAngle(twoPi));
        
        let foreground = meter.append('path')
            .attr('class', 'foreground')
            .attr('fill', color)
            .attr('fill-opacity', 1)
            .attr('stroke', color)
            .attr('stroke-width', 5)
            .attr('stroke-opacity', 1)
            .attr('filter', 'url(#blur)');
        
        let front = meter.append('path')
            .attr('class', 'foreground')
            .attr('fill', color)
            .attr('fill-opacity', 1);
        
        let numberText = meter.append('text')
            .attr('fill', '#132456')
            .attr('text-anchor', 'middle')
            .attr('dy', '.35em')
            .text(this.props.text);
        
        function updateProgress(progress) {
            foreground.attr('d', arc.endAngle(twoPi * progress));
            front.attr('d', arc.endAngle(twoPi * progress));
            // numberText.text(formatPercent(progress));
        }
        
        let progress = startPercent;
        
        (function loops() {
            updateProgress(progress);
        
            if (count > 0) {
                count--;
                progress += step;
                setTimeout(loops, 10);
            }
        })();
    }   

    render() {
        return (
            <div id="circleP"></div>
        );
    }
}