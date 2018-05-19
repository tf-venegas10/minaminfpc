import React, { Component } from 'react';

import TeamList from "./Teams/TeamList";
import "../../client/main.css";

export default class About extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  renderTable() {
    return TeamList.teams.map((t, i) =>
      <tr key={t.id}>
        <td>{i + 1}</td>
        <td> <img className="table-logo" src={t.src} alt={t.alt} /> {" "} </td>
        <td> {t.alt} </td>
        <td> <a href={t.src} >{t.src}</a> </td>
      </tr>
    );
  }

  render() {
    let currenti = TeamList.teams.length + 1;
    return (
      <div className="container">
        <div className="row">
          <h1>&copy; Imagenes utilizadas</h1>
          <table className="table table table table-striped table-bordered table-hover table-sm">
            <thead>
              <tr>
                <th>No.</th>
                <th>Imagen</th>
                <th>Descripcion</th>
                <th>Link</th>
              </tr>
            </thead>
            <tbody>
              {this.renderTable()}
              <tr>
                <td>{++currenti}</td>
                <td> <img className="table-logo" src="http://3.bp.blogspot.com/-KvPBz5ndCZ4/UpLH85RypSI/AAAAAAAAAUU/Isr_jn9rOGw/s1600/fpc.png" alt="Logo del Fútbol Profesional Colombiano" /> </td>
                <td> Logo del Fútbol Profesional Colombiano </td>
                <td> <a href="http://3.bp.blogspot.com/-KvPBz5ndCZ4/UpLH85RypSI/AAAAAAAAAUU/Isr_jn9rOGw/s1600/fpc.png" >http://3.bp.blogspot.com/-KvPBz5ndCZ4/UpLH85RypSI/AAAAAAAAAUU/Isr_jn9rOGw/s1600/fpc.png</a> </td>
              </tr>
              <tr>
                <td>{++currenti}</td>
                <td> <img className="table-logo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4qNhQB78UWwGSsplXdu8TZ2inla-v4JddXd1aybl1-YZUv3P9" alt="Tarjeta Amarilla" /> </td>
                <td> Tarjeta Amarilla </td>
                <td> <a href="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4qNhQB78UWwGSsplXdu8TZ2inla-v4JddXd1aybl1-YZUv3P9" >https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4qNhQB78UWwGSsplXdu8TZ2inla-v4JddXd1aybl1-YZUv3P9</a> </td>
              </tr>
              <tr>
                <td>{++currenti}</td>
                <td> <img className="table-logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Red_card.svg/2000px-Red_card.svg.png" alt="Tarjeta Roja" /> </td>
                <td> Tarjeta Roja </td>
                <td> <a href="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Red_card.svg/2000px-Red_card.svg.png" >https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Red_card.svg/2000px-Red_card.svg.png</a> </td>
              </tr>
              <tr>
                <td>{++currenti}</td>
                <td> <img className="table-logo" src="https://cdn3.volusion.com/tjyvc.unaha/v/vspfiles/photos/15B503-2.jpg?1516824794" alt="Tarjeta Doble amarilla" /> </td>
                <td> Tarjeta Doble Amarilla </td>
                <td> <a href="https://cdn3.volusion.com/tjyvc.unaha/v/vspfiles/photos/15B503-2.jpg?1516824794" >https://cdn3.volusion.com/tjyvc.unaha/v/vspfiles/photos/15B503-2.jpg?1516824794</a> </td>
              </tr>
            </tbody>
          </table>
      </div>
      </div>
    );
  }
};