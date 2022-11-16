import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import BarChartIcon from '@mui/icons-material/BarChart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export const SidebarData = [
    {
        title: 'Home',
        path: '/home',
        icon: <HomeIcon />,
        className: 'nav-text',
    },
    {
        title: 'Charts',
        path: '/charts',
        icon: <BarChartIcon />,
        className: 'nav-text',
    },
    {
        title: 'About',
        path: '/about',
        icon: <AccountCircleIcon />,
        className: 'nav-text',
    },
]
