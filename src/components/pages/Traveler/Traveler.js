import React, { useEffect, useState } from 'react';
import { Layout, Card, Row, Col, Descriptions, Divider, Button } from 'antd';
import Sidebar from '../Traveler/SideBar/sidebar';
import AppHeader from '../Traveler/Hedder/Header';
import { Link, useHistory } from "react-router-dom";
import Swal from 'sweetalert2';
import { appURLs, webAPI } from '../../Enum/api';
import axios from 'axios';

const { Content, Footer } = Layout;

function Traveler() {
  const history = useHistory();
  const [user, setUser] = useState({});
  const [logStatus, setLogStatus] = useState(false);

  useEffect(() => {
    const lUser = JSON.parse(localStorage.getItem("user"));
    if (lUser) {
      setUser(lUser);
      setLogStatus(true);
    }
  }, []);

  const handleUpdate = () => {
    history.push(`/updateTravelAccount`);
  };

  const handleDelete = () => {
   
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',

    }).then((result) => {
        if (result.isConfirmed) {

          axios
          .delete(`${appURLs.web}${webAPI.deleteAcountById}${user.id}`)
          .then((res) => {       
    
            Swal.fire(' Deleted!', 'Your Account has been deleted.', 'success');
            history.push(`/mainLogin`);
    
          })
          .catch((error) => {
    
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Network Error',
              showConfirmButton: false,
              timer: 1500,
            });
          });


        }
    })

  };

  return (
    <Layout>
      <Sidebar />
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <AppHeader />
        <div style={{ margin: '5px 16px', overflow: 'initial' }}>
          <Row justify="center">
            <Col xs={24} lg={12}>
              <Card title="User Profile">
                <Divider>Details</Divider>
                <Descriptions column={1} bordered>
                  <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
                  <Descriptions.Item label="First Name">{user.firstName}</Descriptions.Item>
                  <Descriptions.Item label="Last Name">{user.lastName}</Descriptions.Item>
                  <Descriptions.Item label="National ID Card">{user.nationalIdentificationCard}</Descriptions.Item>
                  <Descriptions.Item label="Role">{user.role}</Descriptions.Item>
                </Descriptions>
                <div style={{ float: "right", marginTop: '15px', display: 'flex', alignItems: 'center' }}>
                  <Button type="primary" style={{ marginRight: '10px', backgroundColor: '#1890ff', borderColor: '#1890ff' }} onClick={handleUpdate}>Update</Button>
                  <Button type="danger" style={{ backgroundColor: '#ff4d4f', borderColor: '#ff4d4f' }} onClick={handleDelete}>Delete</Button>
                </div>


              </Card>
            </Col>
          </Row>
        </div>
        <Footer style={{ textAlign: 'center' }}>
          #sukithadhamsara ©2023 Created by SDD
        </Footer>
      </Layout>
    </Layout>
  );
}

export default Traveler;
