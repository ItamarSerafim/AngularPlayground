import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { LoadSeedDataService } from './app/seed-data/load-seed-data.service';
import { DexieService } from './app/core/dexie.service';

if (environment.production) {
  enableProdMode();
}



const loadSeedDataService = new LoadSeedDataService(new DexieService());

platformBrowserDynamic().bootstrapModule(AppModule)
  .then(() => loadSeedDataService.createSeedData())
  .catch(err => console.log('Error building application:\t', err));
