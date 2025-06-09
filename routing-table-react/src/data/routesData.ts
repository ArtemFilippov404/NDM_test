import { Route } from '../models/Route';

export const routesData: Route[] = [
    {
    uuid: '1',
    address: '0.0.0.0/0',
    mask: '0.0.0.0',
    gateway: '193.0.174.1',
    interface: 'Подключение Ethernet',
  },
  {
    uuid: '2',
    address: '10.1.30.0/24',
    mask: '255.255.255.0',
    gateway: '0.0.0.0',
    interface: 'Гостевая сеть',
  },
  {
    uuid: '3',
    address: '192.168.1.0/24',
    mask: '255.255.255.0',
    gateway: '0.0.0.0',
    interface: 'Домашняя сеть',
  },
  {
    uuid: '4',
    address: '193.0.174.0/24',
    mask: '255.255.255.0',
    gateway: '0.0.0.0',
    interface: 'Подключение Ethernet',
  },
  {
    uuid: '5',
    address: '193.0.175.0/25',
    mask: '255.255.255.128',
    gateway: '193.0.174.10',
    interface: 'Подключение Ethernet',
  },
  {
    uuid: '6',
    address: '193.0.175.22/32',
    mask: '255.255.255.255',
    gateway: '193.0.174.1',
    interface: 'Подключение Ethernet',
  },
  {
    uuid: '7',
    address: '192.168.2.0/24',
    mask: '255.255.255.0',
    gateway: '0.0.0.0',
    interface: 'Виртуальная сеть',
  },
  {
    uuid: '8',
    address: '10.0.0.0/8',
    mask: '255.0.0.0',
    gateway: '193.0.174.1',
    interface: 'Локальная сеть',
  },
];