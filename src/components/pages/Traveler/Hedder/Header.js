import React, { useState, useEffect } from "react";
import { Layout, Button, ConfigProvider } from 'antd';

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BulbOutlined,
} from '@ant-design/icons';

const { Header } = Layout;

function AppHeader() {
  const [user, setUser] = useState("");
  const [logStatus, setLogStatus] = useState(false);

  useEffect(() => {
    const lUser = JSON.parse(localStorage.getItem("user"));
    if (lUser) {
      setUser(lUser);
      setLogStatus(true);
    }
  }, []);

  // Function to handle logout
  const handleLogout = () => {
    // Implement your logout logic here
    // For example, you can clear user authentication state or redirect to a login page.
  }

  return (
    <Header style={{ padding: 0, background: "#ffffff" }}>
      <div style={{ float: 'right'}}>
      {user && logStatus && (
        <span style={{ marginRight: '16px', marginTop: "10px" , fontWeight:500 }}>
         {user.firstName} 
        </span>
      )}
      <Button onClick={handleLogout} style={{  marginTop: "15px",marginRight: '16px' }}>
        Logout
      </Button>
      </div>
      
    </Header>
  );
}

export default AppHeader;
