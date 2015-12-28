import {Component} from 'angular2/core';
//import {RouteConfig, RouterLink, RouterOutlet } from 'angular2/router';
import {ROUTER_DIRECTIVES, Router, RouteConfig, RouterOutlet, Location, Instruction, RouterLink} from 'angular2/router';
// import {Http} from 'angular2/http';
// import {FORM_PROVIDERS} from 'angular2/common';

import {BugListComponent} from './bug/bug-list.component';
import {BugDetailComponent} from './bug/bug-detail.component';

interface Hero {
    id: number;
    name: string;
}

@Component({
    selector:     'my-app',
    templateUrl:  `app/app.component.html`,
    directives:   [RouterOutlet, RouterLink, BugListComponent],
    providers:    []
})
@RouteConfig([
  {path:'/bugs',          as: 'BugList',       component: BugListComponent},
  {path:'/bug/:id',       as: 'BugDetail',     component: BugDetailComponent}
])
export class AppComponent {
    public title = 'Tour of Heroes';
    public hero: Hero = {
        id: 1,
        name: 'Windstorm'
    };
}
