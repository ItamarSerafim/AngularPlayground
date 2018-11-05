import { Injectable } from '@angular/core';
import { DexieService } from '../core/dexie.service';
import { Link } from '../core/site-navigation/link.service';
import { Dexie } from 'dexie';
//TODO resolve this import
// import { ChecklistItem } from '../checklist/checklist-item.service';

import seedLinks from './seed-links';
import seedCheckListItems from './seed-checklist-items';
import usersSeed from './users/users';
import User from './users/userModel';

@Injectable({
  providedIn: 'root'
})
export class LoadSeedDataService {
  linksTable: Dexie.Table<Link, number>;
  // checkListItemTable: Dexie.Table<ChecklistItem, number>;
  usersTable: Dexie.Table<User, number>;
  private mustReload: Boolean;

  constructor(private dbService: DexieService) {
    // Dexie.exists('AppDB').then( result => (this.mustReload = result)); // Dexie is undefined
    this.linksTable = dbService.table<Link>('links');
    // this.checkListItemTable = dbService.table<ChecklistItem>('checklistItems');
    this.usersTable = dbService.table<User>('users');

  }

  // TODO: Change this to get data from asstes folder via http
  createSeedData(): Promise<any> {
    let linksPromise, checkListItemsPromise, usersPromise;
    this.linksTable.hook('creating', function (primKey, obj, trans) {
      if ( typeof obj.order !== 'number' ) { obj.order = 999999; }
      obj.createdDate = new Date();
      obj.lastUpdateDate = obj.createdDate;
    });

    // I think this line has no use 'cause it ill never be used
    this.linksTable.hook('updating', function (newObj, primKey, obj, trans) {
      if ( typeof newObj['order'] !== 'number' ) { newObj['order'] = 999999; }
      newObj['lastUpdateDate'] = new Date();
    });

    this.linksTable.count().then(nItems => {
      if (nItems < 1) {
        linksPromise = this.linksTable.bulkAdd(seedLinks.map(item => {
          return {
            'title': item.title,
            'description': item.description,
            'path': item.path,
            'disable': Boolean(item.disable),
            'expanded': Boolean(item.expanded),
            'icon': item.icon,
            'iconUrl': item.iconUrl,
            'order': Number(item.order),
            'createdDate': new Date(item.createdDate),
            'id': Number(item.id),
            'lastUpdateDate': new Date(item.lastUpdateDate),
            showAt: item.showAt
        } ;
      }));

        // console.log('Must reload application');
        // alert('Reload in 2 seconds...');
        const firstRunWithoutLinks = localStorage.getItem('firstRunWithoutLinks');
        if ( !firstRunWithoutLinks) {
          localStorage.setItem('firstRunWithoutLinks', 'true');
          setTimeout( () =>  location.reload(), 2000);
        }
      } else {
        linksPromise = Promise.resolve(true);
      }

    });

    // this.checkListItemTable.hook('creating', function (primKey, obj, trans) {
    //   if ( typeof obj['order'] !== 'number' ) { obj['order'] = 999999; }
    //   obj['createdDate'] = new Date();
    // });

    // this.checkListItemTable.hook('updating', function (newObj, primKey, obj, trans) {
    //   if ( typeof newObj['order'] !== 'number' ) { newObj['order'] = 999999; }
    //   newObj['lastUpdateDate'] = new Date();
    // });

    // this.checkListItemTable.count().then(nItems => {
    //   if (nItems < 1) {
    //     checkListItemsPromise = this.checkListItemTable.bulkAdd(seedCheckListItems);
    //   } else {
    //     checkListItemsPromise = Promise.resolve(true);
    //   }
    // });


    // Users ---------------------:>
    const capitalized = (str = ''): string => {
      if (str.length < 2 ) { return str.substr(0, 1).toUpperCase(); }
      return str.substr(0, 1).toUpperCase() + str.substr(1);
    };

    this.usersTable.hook('creating', function (primKey, obj, trans) {
      obj.registeredDate = new Date();
      // obj.lastUpdateDate = obj.createdDate; Users should never be updated?
    });
    this.usersTable.count().then( nUsers => {

      if (nUsers < 1) {
        const users = usersSeed.map<User>(item => {
          const username = item.name.first + capitalized(item.name.last);
          return {
            username: username,
            firstName: capitalized(item.name.first),
            lastName: capitalized(item.name.last),
            email: item.email
          };
        });
        usersPromise = this.usersTable.bulkAdd(users);
      } else {
        usersPromise = Promise.resolve(true);
      }
    });

    const reload = x => this.mustReload && window.location.reload();
    const allPromises = Promise.all([linksPromise,
      // checkListItemsPromise
    ])
    .then( reload ).catch(reload); // Couldn't find "finally" method :O
    return allPromises;
  }

  downloadDataBase() {
    this.dbService.tables.forEach(table => {
      table.toArray().then(response => {
        this.saveTableAsJSONFile(JSON.stringify(response, null, 3), table.name);
      });
    });
  }

  // TODO: Ask user to set download configs at (chrome://settings/content/automaticDownloads).
  private saveTableAsJSONFile(textToWrite, tableName): void {
    const textFileAsBlob = new Blob([textToWrite], { type: 'text/plain' });
    const fileNameToSaveAs = `${tableName}-json-backup-${new Date().getTime()}.json`;

    const downloadLink = document.createElement('a');
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = 'Download File';
    if (window['webkitURL'] != null) {
      // Chrome allows the link to be clicked
      // without actually adding it to the DOM.
      downloadLink.href = window['webkitURL'].createObjectURL(textFileAsBlob);
    } else {
      // Firefox requires the link to be added to the DOM
      // before it can be clicked.
      downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
      downloadLink.onclick = function(event) {
        document.body.removeChild(<HTMLElement>event.target);
      };
      downloadLink.style.display = 'none';
      document.body.appendChild(downloadLink);
    }

    downloadLink.click();
  }
}
