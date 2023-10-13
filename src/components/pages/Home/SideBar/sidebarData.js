import React from 'react';
import {
  FaUserCircle,
  FaCalendar,
  FaUser,
  FaUsers,
  FaFile,
} from 'react-icons/fa';

export const items = [
  {
    label: 'Account',
    key: '1',
    icon: <FaUserCircle />,
    link: '/account',
  },
  {
    label: 'View Schedule',
    key: '2',
    icon: <FaCalendar />,
    link: '/viewSchedule',
  },
  {
    label: 'Train Management',
    key: 'sub1',
    icon: <FaUser />,
    children: [
      { label: 'New Schedules', key: '3', link: '/createTrain', icon: <FaUser />,
      },
      { label: 'Update Schedules', key: '4', link: '/add-product', icon: <FaUser />,
      },
    ],
  },
 
];
