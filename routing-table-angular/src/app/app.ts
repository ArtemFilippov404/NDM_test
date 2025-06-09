import { Component } from '@angular/core';
import { RouteTable } from './route-table/route-table';

@Component({
  selector: 'app-root',
  imports: [RouteTable],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'routing-table-angular';
}
