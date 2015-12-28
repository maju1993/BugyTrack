import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS, ROUTER_BINDINGS} from 'angular2/router';

import {AppComponent} from './app.component';

bootstrap(AppComponent, [
  ROUTER_PROVIDERS,
  ROUTER_BINDINGS
  //LOCATION_STRATEGY,
]);
