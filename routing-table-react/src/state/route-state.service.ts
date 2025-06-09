import { BehaviorSubject } from 'rxjs';
import { Route } from '../models/Route';
import { compareIP, compareString } from '../utils/sort.util';

export class RouteStateService {
  private routesSubject = new BehaviorSubject<Route[]>([]);
  private sortColumnSubject = new BehaviorSubject<string | null>(null);
  private sortDirectionSubject = new BehaviorSubject<'asc' | 'desc'>('asc');

  routes$ = this.routesSubject.asObservable();
  sortColumn$ = this.sortColumnSubject.asObservable();
  sortDirection$ = this.sortDirectionSubject.asObservable();

  constructor(initialRoutes: Route[]) {
    this.routesSubject.next(initialRoutes);
  }

  sort(column: string): void {
    const currentColumn = this.sortColumnSubject.value;
    const currentDirection = this.sortDirectionSubject.value;

    let direction = currentDirection;

    if (currentColumn === column) {
      direction = direction === 'asc' ? 'desc' : 'asc';
    } else {
      direction = 'asc';
    }

    this.sortColumnSubject.next(column);
    this.sortDirectionSubject.next(direction);

    const sortedRoutes = [...this.routesSubject.value].sort((a, b) => {
      let result = 0;

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
      }

      return direction === 'asc' ? result : -result;
    });

    this.routesSubject.next(sortedRoutes);
  }
}