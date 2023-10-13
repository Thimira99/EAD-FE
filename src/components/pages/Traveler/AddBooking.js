import React, { useEffect, useState, useHistory } from 'react';
import { Layout, Card, Row, Col, Divider, Button, Input, DatePicker, InputNumber, Select, Form } from 'antd';
import Sidebar from '../Traveler/SideBar/sidebar';
import AppHeader from '../Traveler/Hedder/Header';
import Swal from 'sweetalert2';
import { appURLs, webAPI } from '../../Enum/api';
import axios from 'axios';
import { railwayStations, trainList } from '../../Enum/constants';

const { Content, Footer } = Layout;
const { Option } = Select;

function TrainBooking() {
    const now = new Date(); // Get the current date and time
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // Extract the current date
    const [user, setUser] = useState({});
    const [logStatus, setLogStatus] = useState(false);

    useEffect(() => {
        const lUser = JSON.parse(localStorage.getItem('user'));
        if (lUser) {
            setUser(lUser);
            setLogStatus(true);
        }
    }, []);

    const [nicNumber, setNicNumber] = useState('');
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [passengerCount, setPassengerCount] = useState(1);
    const [selectedFrom, setSelectedFrom] = useState(null);
    const [selectedTo, setSelectedTo] = useState(null);

    const handleCategoryChange = (value) => {
        setSelectedFrom(value);
        checkFieldsSelected();
    };
    const handleShowTimeChange = (value) => {
        setSelectedTo(value);
        checkFieldsSelected();
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleBookTrain = () => {
    

        const data = {
            id: now.getTime().toString(), // Generate a unique ID using the current time
            nationalIdentificationCard: user.nationalIdentificationCard,
            name: user.nationalIdentificationCard,
            email: user.nationalIdentificationCard,
            contactNumber: user.nationalIdentificationCard,
            bookingDate: today, // Set the booking date to today's date
            reservationDate: selectedDate,
            noOfReservations: passengerCount,
            destination: selectedTo
        };
        

        axios
            .post(`${appURLs.web}${webAPI.insertBookingDetails}`, data)
            .then((res) => {
                Swal.fire('Booking Successful!', 'Your train has been booked.', 'success');
            })
            .catch((error) => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Booking Error',
                    text: 'There was an error while booking the train.',
                    showConfirmButton: false,
                    timer: 1500,
                });
            });
    };

    return (
        <Layout>
            <Sidebar />
            <Layout className="site-layout" style={{ marginLeft: 200 }}>
                <AppHeader />
                <div style={{ margin: '20px 16px', overflow: 'initial' }}>
                    <Row justify="center">
                        <Col xs={24} lg={12}>
                            <Card title="Train Booking">
                                <Divider>Booking Details</Divider>
                                <Form
                                    layout="vertical" // Set the form layout to 'vertical'
                                    initialValues={{ passengerCount: 1 }} // Set initial form values
                                    onFinish={handleBookTrain} // Handle form submission
                                >
                                    <Form.Item label="NIC Number">
                                        <Input
                                            placeholder="Enter NIC Number"
                                            value={user.nationalIdentificationCard}
                                            disabled
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        label="From"
                                        name="from"
                                    >
                                        <Select
                                            showSearch
                                            placeholder="Search to Select"
                                            optionFilterProp="children"
                                            options={railwayStations.map(station => ({
                                                label: station.label,
                                                value: station.value,
                                                disabled: station.value === selectedTo,
                                            }))}
                                            onChange={handleCategoryChange}
                                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                            filterSort={(optionA, optionB) =>
                                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                            }
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        label="To"
                                        name="to"
                                    >
                                        <Select
                                            showSearch
                                            placeholder="Search to Select"
                                            optionFilterProp="children"
                                            options={railwayStations.map(station => ({
                                                label: station.label,
                                                value: station.value,
                                                disabled: station.value === selectedFrom,
                                            }))}
                                            onChange={handleShowTimeChange}
                                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                            filterSort={(optionA, optionB) =>
                                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                            }
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        label="Select Date"
                                        name="selectedDate"
                                    >
                                        <DatePicker

                                            placeholder="Select Date"
                                            onChange={handleDateChange}
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        label="Number of Passengers"
                                        name="passengerCount"
                                    >
                                        <InputNumber
                                            placeholder="Enter Number of Passengers"
                                        />
                                    </Form.Item>

                                    <Form.Item>
                                        <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'center' }}>
                                            <Button type="primary" htmlType="submit">
                                                Book Train
                                            </Button>
                                        </div>
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

export default TrainBooking;
