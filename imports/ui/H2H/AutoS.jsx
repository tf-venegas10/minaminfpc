import React, { Component } from 'react';
import { Tasks } from '../../api/methods';
import CircleProgress from "./CircleProgress";
import Autosuggest from "react-autosuggest";

export default class AutoS extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: "",
      suggestions: [],
    }
  }

  escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  getSuggestions(value) {
    const escapedValue = this.escapeRegexCharacters(value.trim());

    if (escapedValue === "") {
      return [];
    }

    const regex = new RegExp('^' + escapedValue, 'i');
    const suggestions = this.props.events.filter(event => regex.test(event.name));

    if (suggestions.length === 0) {
      return [
        { isAddNew: true }
      ];
    }
    return suggestions;
  }

  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    });
  };

  getSuggestionValue = suggestion => {
    if (suggestion.isAddNew) {
      return this.state.value;
    }
    return suggestion.name;
  };

  renderSuggestion = suggestion => {
    if (suggestion.isAddNew) {
      return (
        <span>
          No results for <strong>{this.state.value}</strong>
        </span>
      );
    }

    return suggestion.name;
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  onSuggestionSelected = (event, { suggestion }) => {
    event.preventDefault();
    if (suggestion.isAddNew) alert("No existe el equipo " + this.state.value + ".");
    else {
      let eventName = this.getSuggestionValue(suggestion);
      let event = {};
      for (let i = 0; i < this.props.events.length; i++) {
        if (this.props.events[i].name === eventName) {
          event = this.props.events[i];
          break;
        }
      }
      if (event.name === eventName) {
        this.props.setTeam(event);
      }
    }
  };

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Busca tu equipo.",
      value,
      onChange: this.onChange
    };
    let show = (this.state.team1 && this.state.team2);
    let circles = show ? this.renderData() : "";
    return (
      <div className="asug">
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={this.getSuggestionValue}
            renderSuggestion={this.renderSuggestion}
            onSuggestionSelected={this.onSuggestionSelected}
            inputProps={inputProps}
          />
      </div>
    );
  }
}