import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Route } from '../models/Route';
import { RouteStateService } from '../state/route-state.service';
import { routesData } from '../data/routesData';

const service = new RouteStateService(routesData);

export const RouteTable: React.FC = () => {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    const sub = service.routes$.subscribe(setRoutes);
    const colSub = service.sortColumn$.subscribe(setSortColumn);
    const dirSub = service.sortDirection$.subscribe(setSortDirection);

    return () => {
      sub.unsubscribe();
      colSub.unsubscribe();
      dirSub.unsubscribe();
    };
  }, []);

  const handleSort = (column: string) => {
    service.sort(column);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell onClick={() => handleSort('address')}>
                Адрес назначения
                <span className='sort-icon'>
                    {sortColumn === 'address' && (sortDirection === 'asc' ? ' ↑' : ' ↓')}
                </span>
              </TableCell>
              <TableCell onClick={() => handleSort('gateway')}>
                Шлюз
                <span className='sort-icon'>
                    {sortColumn === 'gateway' && (sortDirection === 'asc' ? ' ↑' : ' ↓')}
                </span>
              </TableCell>
              <TableCell onClick={() => handleSort('interface')}>
                Интерфейс
                <span className='sort-icon'>
                    {sortColumn === 'interface' && (sortDirection === 'asc' ? ' ↑' : ' ↓')}
                </span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {routes.map((route) => (
              <TableRow key={route.uuid}>
                <TableCell>{route.address}</TableCell>
                <TableCell>{route.gateway}</TableCell>
                <TableCell>{route.interface}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};