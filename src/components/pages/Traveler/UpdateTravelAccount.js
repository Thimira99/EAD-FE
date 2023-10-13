import React, { useEffect, useState } from 'react';
import { Layout, Card, Row, Col, Descriptions, Divider, Button, Form, Input } from 'antd';
import Sidebar from '../Traveler/SideBar/sidebar';
import AppHeader from '../Traveler/Hedder/Header';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { appURLs, webAPI } from '../../Enum/api';
import axios from 'axios';

const { Content, Footer } = Layout;

function UpdateTravelAccount() {
    const history = useHistory();
    const [user, setUser] = useState({});
    const [logStatus, setLogStatus] = useState(false);
    const [form] = Form.useForm(); // Create a form instance

    useEffect(() => {
        const lUser = JSON.parse(localStorage.getItem("user"));
        if (lUser) {
            setUser(lUser);
            setLogStatus(true);

            // Set initial form values using form.setFieldsValue()
            form.setFieldsValue({
                newFirstName: lUser.firstName,
                newLastName: lUser.lastName,
                newNationalIdentificationCard: lUser.nationalIdentificationCard,
                email: lUser.email,

            });
        }
    }, [form]); // Make sure to include form as a dependency



    function getAccountById(id) {

        axios
            .get(`${appURLs.web}${webAPI.getAccountById}${id}`)
            .then((res) => {

                if (res.status === 200) {

                    localStorage.setItem("user", JSON.stringify(res.data));
                    history.push(`/traveler`);

                }


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


    const handleUpdate = (values) => {
        const updateData = {
            id: user.id,
            nationalIdentificationCard: values.newNationalIdentificationCard,
            firstName: values.newFirstName,
            lastName: values.newLastName,
            email: values.email, // Use the updated email value
            isActive: user.isActive,
            role: user.role,
        };


        if (!values.newPassword) {
            updateData.password = user.password;
            axios
                .put(`${appURLs.web}${webAPI.updateAccountData}${user.id}`, updateData)
                .then((res) => {
                    getAccountById(values.newNationalIdentificationCard);

                    Swal.fire( ' Updated!', 'Your Account has been updated.', 'success');

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

        } else {

            if (values.newPassword && values.currentPassword === user.password) {

                updateData.password = values.newPassword;
                // Send the updateData to your API endpoint
                axios
                    .put(`${appURLs.web}${webAPI.updateAccountData}${user.id}`, updateData)
                    .then((res) => {
                        console.log(res)

                        Swal.fire(' Updated!', 'Your Profile has been updated.', 'success');


                        getAccountById(values.newNationalIdentificationCard);


                    })
                    .catch((error) => {
                        console.error('Error', error);
                        Swal.fire({
                            position: 'top-end',
                            icon: 'error',
                            title: 'Network Error',
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    });

            } else {

                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Current password not matched',

                    showConfirmButton: false,
                    timer: 1500,
                });
            }



        }


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
                                <Divider>Update</Divider>
                                <Form
                                    labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 18 }}
                                    onFinish={handleUpdate}
                                    form={form} // Pass the form instance to the Form component
                                >
                                    <Form.Item label="New First Name" name="newFirstName">
                                        <Input />
                                    </Form.Item>
                                    <Form.Item label="New Last Name" name="newLastName">
                                        <Input />
                                    </Form.Item>
                                    <Form.Item label="NIC Number" name="newNationalIdentificationCard">
                                        <Input />
                                    </Form.Item>
                                    <Form.Item label="Email" name="email">
                                        <Input />
                                    </Form.Item>
                                    <Form.Item label="Current Password" name="currentPassword">
                                        <Input.Password />
                                    </Form.Item>
                                    <Form.Item label="New Password" name="newPassword">
                                        <Input.Password />
                                    </Form.Item>
                                    <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
                                        <Button type="primary" htmlType="submit">
                                            Update
                                        </Button>
                                    </Form.Item>
                                </Form>
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

export default UpdateTravelAccount;
