import React, { Component } from 'react';
import { Accounts } from 'meteor/accounts-base';
import { withTracker } from "meteor/react-meteor-data";
import PropTypes from "prop-types";

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      username: "",
      team: "",
    };
  }

  static contextTypes = {
    router: PropTypes.object
  }

  handleChangeName(e) {
    this.setState({ name: e.target.value });
  }

  handleChangeEmail(e) {
    this.setState({ email: e.target.value });
  }

  handleChangePass(e) {
    this.setState({ password: e.target.value });
  }

  handleChangeUsern(e) {
    this.setState({ username: e.target.value });
  }

  handleCreateUser(event) {
    event.preventDefault();
    let options = {
      profile: { name: this.state.name, equipo: this.state.team },
      password: this.state.password,
      username: this.state.username,
      email: this.state.email
    }
    Accounts.createUser(options, (err) => {
      if (err) alert(err);
      else this.context.router.history.push("/");
    });
  }


  handleLoginUser(event) {
    event.preventDefault();
    Meteor.loginWithPassword(this.state.username, this.state.password, (err) => {
      if (err) alert(err);
      else this.context.router.history.push("/");
    });
  }

  handleLogoutUser(event) {
    event.preventDefault();
    Meteor.logout((err) => {
      if (err) alert(err);
    });
  }

  renderCreate() {
    return (
      <div>
        <h2>Regístrate</h2>
        <p>Si no tienes una cuenta, créala aquí.</p>
        <form>
          <div className="form-group row">
            <label className="col-2 col-form-label roboto">Name</label>
            <div className="col-10">
              <input className="form-control" type="text" placeholder="Name" id="create-Name-input" onChange={this.handleChangeName.bind(this)} />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-2 col-form-label roboto">Email</label>
            <div className="col-10">
              <input className="form-control" type="text" placeholder="Email" id="create-Email-input" onChange={this.handleChangeEmail.bind(this)} />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-2 col-form-label roboto">Username</label>
            <div className="col-10">
              <input className="form-control" type="text" placeholder="Username" id="create-Username-input" onChange={this.handleChangeUsern.bind(this)} />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-2 col-form-label roboto">Password</label>
            <div className="col-10">
              <input className="form-control" type="password" placeholder="Password" id="create-Password-input" onChange={this.handleChangePass.bind(this)} />
            </div>
          </div>
          <div className="row justify-content-center align-self-center">
            <button type="submit" className="btn new-event-btn" onClick={this.handleCreateUser.bind(this)}>Create</button>
          </div>
        </form>
      </div>);
  }

  renderLogin() {
    return (
      <div>
        <h2>Ingresa</h2>
        <p>Si ya tienes una cuenta, ingresa con tu usuario y contraseña</p>
        <form>
          <div className="form-group row">
            <label className="col-2 col-form-label roboto">Username</label>
            <div className="col-10">
              <input className="form-control" type="text" placeholder="Username" id="login-Username-input" onChange={this.handleChangeUsern.bind(this)} />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-2 col-form-label roboto">Password</label>
            <div className="col-10">
              <input className="form-control" type="password" placeholder="Password" id="login-Password-input" onChange={this.handleChangePass.bind(this)} />
            </div>
          </div>
          <div className="row justify-content-center align-self-center">
            <button type="submit" className="btn new-event-btn" onClick={this.handleLoginUser.bind(this)}>Login</button>
          </div>
        </form>
      </div>);
  }

  renderLogout() {
    return (
      <div className="row justify-content-center align-self-center">
        <button type="submit" className="btn new-event-btn" onClick={this.handleLogoutUser.bind(this)}>Logout</button>
      </div>);
  }

  renderOptions() {
    return (
      <div className="row justify-content-center align-self-center">
        <button type="submit" className="btn new-event-btn" onClick={this.enableLogin.bind(this)}>Login</button>
        <button type="submit" className="btn new-event-btn" onClick={this.enableCreate.bind(this)}>Create New User</button>
      </div>
    );
  }

  render() {
    let show = this.props.currentUser ? this.renderLogout() : (
      <div className="row"><div className="col-sm-6">{this.renderLogin()}</div><div className="col-sm-6">{this.renderCreate()}</div></div>)
    return (<div className="container-fluid" id="login" >{show}</div>);
  }
};

export default withTracker(() => {
  return {
    currentUser: Meteor.user(),
  };
})(Login);