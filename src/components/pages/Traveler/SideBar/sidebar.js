
import React, { useState } from 'react';


import { Layout, Menu, Button, theme } from 'antd';


import SidebarMenu from './SidebarMenu ';


const { Header, Sider, Content } = Layout;

function Sidebar({collapsed, onCollapse ,isDarkMode}) {

   
  
    

    return (
        <Sider trigger={null} collapsible collapsed={collapsed} 
        style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            bottom: 0,
            transition: 'width 0.3s ease',
            scrollbarwidth: "thin",
            scrollbarcolor: "#ccc #fff",
            background: '#001529',
          }}>
  
          <div className="demo-logo-vertical">
  
            {/* Add your image here */}
            <img
              style={{ width: '-webkit-fill-available' }}
              src="https://res.cloudinary.com/colouration/image/upload/v1697216818/Sri_Lanka_Railway_logo_puhsbf.png" alt="Logo" className="logo" />
          </div>
          <SidebarMenu isDarkMode={isDarkMode}/>
        </Sider>
    );
}

export default Sidebar;