import React from 'react';
import {
  FaChartPie,
  FaDesktop,
  FaUser,
  FaUserFriends,
  FaFile,
} from 'react-icons/fa';

export const items = [
  {
    label: 'Account',
    key: '1',
    icon: <FaChartPie />,
    link: '/account',
  },
  {
    label: 'Product',
    key: '2',
    icon: <FaDesktop />,
    link: '/product',
  },
  {
    label: 'Ticket Booking',
    key: 'sub1',
    icon: <FaUser />,
    children: [
      { label: 'Add Booking', key: '3', link: '/addBooking', icon: <FaUser />,
      },
     
    ],
  },
 
];
