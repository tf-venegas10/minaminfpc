import {
  Meteor
} from 'meteor/meteor';
import {
  Mongo
} from 'meteor/mongo';
import {
  check
} from 'meteor/check';
import {
  HTTP
} from 'meteor/http';

export const Tournament = new Mongo.Collection('tournament');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('tournaments', function tournamentPublication() {});

  Meteor.methods({
    'tournaments.info' () {
      try {
        let url = "http://api.sportradar.us/soccer-t3/am/en/tournaments/sr:tournament:241/info.json?api_key=95vqfkug68ytss77qbwskwta";
        let result = HTTP.get(url).data;
        return result;
      } catch (error) {
        console.log(error);
      }
    },
    'tournament.live_standings' () {
      try {
        let url = "http://api.sportradar.us/soccer-t3/am/en/tournaments/sr:tournament:241/live_standings.json?api_key=95vqfkug68ytss77qbwskwta";
        let result = HTTP.get(url).data;
        return result;
      } catch (error) {
        console.log(error);
      }
    },
    'tournament.leaders' () {
      try {
        let url = "http://api.sportradar.us/soccer-t3/am/en/tournaments/sr:tournament:241/leaders.json?api_key=95vqfkug68ytss77qbwskwta";
        let result = HTTP.get(url).data;
        return result;
      } catch (error) {
        console.log(error);
      }
    },
    'teams.h2h' (team1, team2) {
      if (team1 != team2) {
        try {
          let url = "http://api.sportradar.us/soccer-t3/am/en/teams/" + team1 + "/versus/" + team2 + "/matches.json?api_key=95vqfkug68ytss77qbwskwta";
          let result = HTTP.get(url).data;
          return result;
        } catch (error) {
          console.log(error);
        }
      }
    },
    'tournament.schedule' () {
      try {
        let url = "http://api.sportradar.us/soccer-t3/am/en/tournaments/sr:tournament:241/results.json?api_key=95vqfkug68ytss77qbwskwta";
        let result = HTTP.get(url).data;
        return result;
      } catch (error) {
        console.log(error);
      }
    },
    'tournament.team_profile' (team) {
      try {
        let url = "https://api.sportradar.us/soccer-t3/am/en/teams/" + team + "/profile.json?api_key=95vqfkug68ytss77qbwskwta";
        let result = HTTP.get(url).data;
        return result;
      } catch (error) {
        console.log(error);
      }
    },
    'tournament.team_statistics' (team) {
      try {
        let url = "https://api.sportradar.us/soccer-t3/am/en/tournaments/sr:tournament:241/teams/" + team + "/statistics.json?api_key=95vqfkug68ytss77qbwskwta";
        let result = HTTP.get(url).data;
        return result;
      } catch (error) {
        console.log(error);
      }
    },
  });

}