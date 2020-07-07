import { Injectable } from '@angular/core';
//import PouchDB from 'pouchdb';
//import moment from 'moment';
//PouchDB.plugin(require('pouchdb-upsert'));

@Injectable({
  providedIn: 'root'
})
export class ActivityTrackerService {
  db: any;
  remote: any;

  constructor() { 
    //console.log(PouchDB);
    //this.db = new PouchDB('crm_activitytracker');
    this.remote = 'http://admin:correr@localhost:5984/crm_activitytracker';

    //To know more about options, visit pouchdb.com
    let options = {
      live: true,
      retry: true,
      continuous: true,
      auto_compaction: true
    };

    //this.db.sync(this.remote, options);
  }

  saveActivity(data) {
    /*data.activityDateTime = moment().format();
    data.activity ='Dashboard';
    data._id = (moment().unix()).toString();
    this.db.put(data).then((resp) => {
      console.log(resp);
      return resp;
    })
     .catch((e) => {
       console.log(e);
       return e;
     });*/
   }
}
