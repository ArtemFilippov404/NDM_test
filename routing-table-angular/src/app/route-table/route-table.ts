import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { routesData } from '../routes.data';
import { Route } from '../route.model';
import { compareIP, compareString } from '../utils/sort.util';

@Component({
  selector: 'app-route-table',
  imports: [ CommonModule ],
  standalone: true,
  templateUrl: './route-table.html',
  styleUrl: './route-table.css'
})
export class RouteTable {
  private sortColumnSubject = new BehaviorSubject<string | null>(null);
  private sortDirectionSubject = new BehaviorSubject<'asc' | 'desc'>('asc');

  sortColumn$ = this.sortColumnSubject.asObservable();
  sortDirection$ = this.sortDirectionSubject.asObservable();

  routes: Route[] = routesData;

  sort(column: string): void {
    if (this.sortColumnSubject.value === column) {
      this.sortDirectionSubject.next(this.sortDirectionSubject.value === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortColumnSubject.next(column);
      this.sortDirectionSubject.next('asc');
    }

    this.sortColumn$.subscribe(col => {
      if (!col) return;
      this.routes.sort((a, b) => {
        let result: number;

        switch (column) {
          case 'address':
            result = compareIP(a.address.split('/')[0], b.address.split('/')[0]);
            break;
          case 'gateway':
            result = compareIP(a.gateway, b.gateway);
            break;
          case 'interface':
            result = compareString(a.interface, b.interface);
            break;
          default:
            result = 0;
        }

        return this.sortDirectionSubject.value === 'asc' ? result : -result;
      });
    });
  }
}
