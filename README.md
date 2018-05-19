# Minuto a Minuto FPC (Fútbol Profesional Colombiano)
Minuto a Minuto FPC es una aplicación web que permite visualizar diferentes estadísticos del fútbol profesional colombiano. Algunos datos que la aplicación muestra son:
* Tabla de la liga actual (fase todos contra todos). Se puede filtrar por paridos de visitante, partidos de local y partidos totales.
* Tabla de goleadores, asistencias, tarjetas y autogoles.
* Selección de equipos y visualización de la posición del equipo seleccionado en las últimas temporadas.
* Información genérica de jugadaros de cada equipo.
* Comparativo entre equipos en términos de partidos ganados, perdidos, empatados, goles anotados y goles recibidos.
* Consolidado de cada jornada de la liga en curso (o última liga en caso de que ya se haya acabado).

# Desarrollo
Para trabajar sobre la aplicación se deben seguir varios 5 pasos. 
1. Colar el repositorio:
   ```$ git clone https://github.com/jc-bustamante143/minaminfpc.git```
1. Se debe tener instalado [Meteor.js](https://www.meteor.com/install). 
2. Se debe solicitar una llave a [Sportradar](https://developer.sportradar.com/).
3. Luego de obtener la llave, se debe asignar como variable de entorno. 
  ```$ export SPORTRADAR_API_KEY=<YOUR_KEY>```
4. Instalar las dependecias de Node.
  ```$ meteor npm install```

Para agregar nuevas dependencias de Node: ```$ meteor npm install --save <dependency_name>```
Para agregar paquetes de Meteor: ```$ meteor add <package_name>```

Finalmente para correr la aplicación desde un servidor local (desde la carpeta del proyecto):
  ```$ meteor```

# Demo
[Minuto a Minuto FPC](http://minutoaminutofpc.herokuapp.com/)
