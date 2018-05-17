import { Meteor} from 'meteor/meteor';
import { Mongo} from 'meteor/mongo';
import { check} from 'meteor/check';
import { HTTP} from 'meteor/http';

export const Tournament = new Mongo.Collection('tournament');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('tournaments', function tournamentPublication() {});

  Meteor.methods({
    'tournaments.info' () {
      try {
        let result = HTTP.get('http://api.sportradar.us/soccer-t3/am/en/tournaments/sr:tournament:241/info.json?api_key=95vqfkug68ytss77qbwskwta').data;
        return result;
      } catch (error) {
        console.log(error);
      }
    }
  });

}