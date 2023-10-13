import React, { useState, useEffect } from 'react';
import { Breadcrumb, Layout, Divider, Row, Col, Form, Input, Select, Button, DatePicker, Table, TimePicker, InputNumber } from 'antd';
import dayjs from 'dayjs';
import Swal from 'sweetalert2';
import axios from 'axios';
import Sidebar from '../Home/SideBar/sidebar';
import AppHeader from '../Home/Hedder/Header';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

import trainSheduler from './trainSheduler.module.css';
import { EditFilled, DeleteFilled } from '@ant-design/icons';

import '../../Styles/common.css';
import { appURLs, webAPI } from '../../Enum/api';
import { railwayStations, trainList } from '../../Enum/constants';

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
const { Option } = Select;
const { Item } = Form;
const { Header, Content } = Layout;

function CreateSheddule(props) {



    const screenWidth = window.innerHeight;
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedShowTime, setSelectedShowTime] = useState(null);
    const [selectedTrain, setSelectedTrainName] = useState({});
    const [currentDate, setCurrentDate] = useState(null);
    const [fieldsSelected, setFieldsSelected] = useState(false);
    const [previousMovieRedcord, setPreviousMoviesRecord] = useState({})
    const [AllMovieShedulers, setAllMovieShedulars] = useState([]);

    const [AllTrains, setAllTrains] = useState([]);

    const [trainStatus, setTrainStatus] = useState(false);
    const [trainSelectStatus, setTrainSelectStatus] = useState(false);

    const [selectedFrom, setSelectedFrom] = useState(null);
    const [selectedTo, setSelectedTo] = useState(null);





    const movies = [
        { label: 'The Shawshank Redemption', value: 12345 },
        { label: 'The Godfather', value: 67890 },
        { label: 'The Dark Knight', value: 54321 },
        { label: 'Pulp Fiction', value: 98765 },
        { label: 'Schindler\'s List', value: 45678 },
        { label: 'Forrest Gump', value: 23456 },
        { label: 'The Lord of the Rings: The Return of the King', value: 78901 },
        { label: 'Inception', value: 34567 },
        { label: 'Fight Club', value: 87654 },
        { label: 'The Matrix', value: 32109 },
    ];


    const theaters = [
        { label: 'Theater A', value: 'Theater A' },
        { label: 'Theater B', value: 'Theater B' },
        { label: 'Theater C', value: 'Theater C' },
        { label: 'Theater D', value: 'Theater D' },
        { label: 'Theater E', value: 'Theater E' }
    ];






    const showtimes = [
        { label: '10:45 AM', value: '10:45 AM' },
        { label: '12:00 PM', value: '12:00 PM' },
        { label: '3:30 PM', value: '3:30 PM' },
    ];


    const [form] = Form.useForm();

    const onResetBtnClick = () => {
        form.resetFields();
        setFieldsSelected(false)
        setTrainStatus(false)
        setTrainSelectStatus(false)
        setSelectedTo(null)
        setSelectedFrom(null)
    };

    const onFinish = (values) => {
console.log("inside")
        let trainName = '';
        let trainId = '';

        if (trainStatus) {
            trainName = selectedTrain.label
            trainId = selectedTrain.value

        } else {

            trainName = values.TrainNameSub
            trainId = values.TrainIdSub

        }


        // Prepare the data to send to the server
        const formData = {
            trainName: trainName,
            id: trainId,
            description: trainName,
            isActive: true,
            schedules: [{
                id: "1",
                departureStation: values.From,
                arrivalStation: values.To,
                departureDate: values.StartEndDate[0].format(dateFormat),
                arrivalDate: values.StartEndDate[1].format(dateFormat),
                departureTime: values.DepartureTime,
                arrivalTime: values.ArrivalTime,
                price: values.price,
                availableSeats: values.passengerCount,
            }]


        };

        axios
            .post(appURLs.web + webAPI.insertTrainDetails,formData)
            .then((res) => {

                console.log("res", res)
                if(res.status == 200){
                    onResetBtnClick();
                    getAllTrainDetails();
                }
                

            })
            .catch((error) => {

                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Network Errorss',
                    showConfirmButton: false,
                    timer: 1500,
                });
            });

    };


    const getAllTrainDetails = () => {

        axios
            .get(`${appURLs.web}${webAPI.getAllTrainDetails}`)
            .then((res) => {

                console.log("res", res)
                setAllTrains(res.data)

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


    const handleCalenderChange = (value) => {
        if (value && value.length === 2) {
            const startDate = new Date(value[0]);
            const endDate = new Date(value[1]);
            const daysArray = [];
            let currentDate = startDate;

            while (currentDate <= endDate) {
                daysArray.push(currentDate.toISOString().split('T')[0]);
                currentDate.setDate(currentDate.getDate() + 1);
            }

            console.log("Selected days:", daysArray);

            // Check if any days in previousMovieRedcord date range are in daysArray
            if (
                previousMovieRedcord.StartDate &&
                previousMovieRedcord.EndDate
            ) {
                const previousStartDate = new Date(previousMovieRedcord.StartDate);
                const previousEndDate = new Date(previousMovieRedcord.EndDate);

                // Check if any day from previousMovieRedcord date range is in daysArray
                const overlappingDays = daysArray.filter((day) => {
                    const currentDate = new Date(day);
                    return (
                        currentDate >= previousStartDate &&
                        currentDate <= previousEndDate
                    );
                });

                if (overlappingDays.length > 0) {
                    // Show an alert because there are overlapping days
                    Swal.fire({
                        icon: 'warning',
                        title: 'Overlap Warning',
                        text: 'The selected date range overlaps with previous movie schedule!',
                    });
                    form.setFieldsValue({ StartEndDate: [] });
                }
            }
        } else {
            console.log("No date range selected");
        }
    };


    const handleCategoryChange = (value) => {
        setSelectedFrom(value);
        checkFieldsSelected();
    };



    const handleTrainNameChange = (value) => {
        console.log(value)
        const selectedTrain = trainList.find(train => train.value === value);
        console.log(selectedTrain)

        setTrainStatus(true)
        setSelectedTrainName(selectedTrain);
        checkFieldsSelected();
    };

    const handleTrainName = (value) => {
        setTrainSelectStatus(true)
    }

    const handleTrainId = (value) => {
        setTrainSelectStatus(true)
    }

    const handleShowTimeChange = (value) => {
        setSelectedTo(value);
        checkFieldsSelected();
    };
    const getMovieSheduleByTimeAndTheater = () => {

        const formData = {
            TheaterName: selectedCategory,
            ShowTime: selectedShowTime
        }

        axios.post('http://localhost:3013/admin/getMovieSheduleByTimeAndTheater', formData)
            .then((res) => {
                if (res.data.status === 2100) {
                    setPreviousMoviesRecord(res.data.data)
                }
            })
            .catch((error) => {
                console.error("Error", error);

                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Network Error',
                    showConfirmButton: false,
                    timer: 1500,
                    width: 10
                });
            });

    }

    const onEditBtnClick = (record) => {




    }


    const onDeleteSelectedItem = (record) => {
        console.log("record", record);
        // Confirm the deletion with a modal or use any other confirmation method you prefer
        Swal.fire({
            title: 'Delete Item',
            text: 'Are you sure you want to delete this item?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                // Delete the item from the server using axios
                axios
                    .delete(`http://localhost:3013/admin/deleteMovieShedularDetails/${record._id}`)
                    .then((res) => {
                        if (res.data.status) {
                            // Remove the deleted item from the selected items list


                            // Optionally, you can also update the table data by fetching it again from the server
                            getAllTrainDetails();

                            // Show a success message
                            Swal.fire(
                                'Deleted!',
                                'The item has been deleted.',
                                'success'
                            );
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Error',
                                text: 'Failed to delete the item.',
                            });
                        }
                    })
                    .catch((error) => {
                        console.error('Error', error);
                        Swal.fire({
                            icon: 'error',
                            title: 'Network Error',
                            text: 'Failed to delete the item.',
                        });
                    });
            }
        });
    };



    const columns = [
        {
            title: 'Train Name',
            dataIndex: 'trainName',
            key: 'trainName',
            width: '35%',
            ellipsis: true,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            width: '20%',
            ellipsis: true,
        },
        {
            title: 'Status',
            dataIndex: 'isActive',
            key: 'isActive',
            width: '25%',
            ellipsis: true,
            render: (isActive) => {
                // Conditionally render icons based on the isActive value
                return isActive ? (
                    <FaCheckCircle color="#52c41a" />
                ) : (
                    <FaTimesCircle color="#eb2f96" />
                );
            },
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            width: '20%',
            render: (_, record) => (
                <div style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button
                            onClick={() => onEditBtnClick(record)}
                            type="primary"
                            icon={<EditFilled />}
                            size="default"
                            style={{
                                backgroundColor: '#f9f9f9',
                                color: 'var(--theme-color)',
                                border: '1px solid rgba(0, 0, 0, 0.23)',
                                marginRight: '10px',
                            }}
                        />
                        <Button
                            onClick={() => onDeleteSelectedItem(record)}
                            type="danger"
                            icon={<DeleteFilled />}
                            size="default"
                            style={{
                                backgroundColor: '#f9f9f9',
                                color: 'var(--theme-color)',
                                border: '1px solid rgba(0, 0, 0, 0.23)',
                            }}
                        />
                    </div>
                </div>
            ),
        },
    ];

    // useEffect(() => {
    //     setPreviousMoviesRecord({})
    //     checkFieldsSelected();
    //     getMovieSheduleByTimeAndTheater();
    // }, [selectedCategory, selectedTrain, selectedShowTime]);

    const checkFieldsSelected = () => {
        // Check if all three fields are selected
        console.log(selectedCategory, selectedTrain, selectedShowTime)
        if (selectedCategory !== null && selectedTrain !== null && selectedShowTime !== null) {
            setFieldsSelected(true);
        } else {
            setFieldsSelected(false);
        }
    };

    useEffect(() => {

        getAllTrainDetails();
    }, []);

    return (
        <Layout>
            <Sidebar />
            <Layout className="site-layout" style={{ marginLeft: 200 }}>
                <AppHeader />
                <div style={{
                    margin: '5px 16px',
                    overflow: 'initial',
                }}>
                    <Breadcrumb style={{ margin: '10px 0' }}>
                        <Breadcrumb.Item>Train</Breadcrumb.Item>
                        <Breadcrumb.Item>Shedule</Breadcrumb.Item>
                        <Breadcrumb.Item>Add</Breadcrumb.Item>
                    </Breadcrumb>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} lg={12}>
                            <Content
                                className="common-cotent-container"
                                style={{
                                    background: "white",
                                }}
                            >
                                <Divider orientation="left" orientationMargin="0">Add Train</Divider>
                                <Form
                                    form={form}
                                    onFinish={onFinish}
                                    labelCol={{ span: 24 }}
                                    wrapperCol={{ span: 24 }}
                                    layout="vertical"
                                >
                                    <Item
                                        label="Select Train Name"
                                        name="TrainName"
                                        rules={[{ required: true, message: 'Please enter the train name' }]}
                                    >
                                        <Select
                                            showSearch
                                            placeholder="Search to Select"
                                            optionFilterProp="children"
                                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                            filterSort={(optionA, optionB) =>
                                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                            }
                                            options={trainList}
                                            onChange={handleTrainNameChange}
                                            disabled={trainSelectStatus}
                                        />
                                    </Item>
                                    <Row gutter={16}>
                                        <Col lg={12} xs={24}>
                                            <Item
                                                label="Enter Train Name"
                                                name="TrainNameSub"
                                                rules={trainStatus ? [] : [{ required: true, message: 'Please select train name' }]}

                                            >
                                                <Input disabled={trainStatus} onChange={handleTrainName} />
                                            </Item>
                                        </Col>
                                        <Col lg={12} xs={24}>
                                            <Item
                                                label="Enter Train ID"
                                                name="TrainIdSub"
                                                rules={trainStatus ? [] : [{ required: true, message: 'Please select train Id' }]}
                                            >
                                                <Input disabled={trainStatus} onChange={handleTrainId} />
                                            </Item>
                                        </Col>
                                    </Row>


                                    <Row gutter={16}>
                                        <Col lg={12} xs={24}>
                                            <Item
                                                label="From"
                                                name="From"
                                                rules={[{ required: true, message: 'Please select deputure station' }]}
                                            >
                                                <Select
                                                    showSearch
                                                    placeholder="Search to Select"
                                                    optionFilterProp="children"
                                                    options={railwayStations.map(station => ({
                                                        label: station.label,
                                                        value: station.value,
                                                        disabled: station.value === selectedTo, // Disable if it matches the selected "To"
                                                    }))}
                                                    onChange={handleCategoryChange}
                                                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                                    filterSort={(optionA, optionB) =>
                                                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                                    }
                                                />
                                            </Item>
                                        </Col>
                                        <Col lg={12} xs={24}>
                                            <Item
                                                label="To"
                                                name="To"
                                                rules={[{ required: true, message: 'Please select arrival station' }]}
                                            >
                                                <Select
                                                    showSearch
                                                    placeholder="Search to Select"
                                                    optionFilterProp="children"
                                                    options={railwayStations.map(station => ({
                                                        label: station.label,
                                                        value: station.value,
                                                        disabled: station.value === selectedFrom, // Disable if it matches the selected "From"
                                                    }))}
                                                    onChange={handleShowTimeChange}
                                                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                                    filterSort={(optionA, optionB) =>
                                                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                                    }
                                                />
                                            </Item>
                                        </Col>
                                    </Row>

                                    <Row gutter={16}>
                                        <Col lg={24} xs={24}>
                                            <Item
                                                label="Start Date - End Date"
                                                name="StartEndDate"
                                                rules={[
                                                    { required: true, message: 'Please select Start Date and End Date' },
                                                ]}
                                            >
                                                <RangePicker
                                                    style={{ width: "100%" }}

                                                    disabledDate={(current) => {
                                                        // Disable dates before the current date
                                                        const currentDate = dayjs().startOf('day');
                                                        if (current < currentDate) {
                                                            return true;
                                                        }
                                                        // Add another range of disabled dates
                                                        const disabledStartDate = dayjs(previousMovieRedcord.StartDate); // Replace with your desired start date
                                                        const disabledEndDate = dayjs(previousMovieRedcord.EndDate);   // Replace with your desired end date
                                                        return current >= disabledStartDate && current <= disabledEndDate;
                                                    }}
                                                    onChange={handleCalenderChange}
                                                    format={dateFormat}
                                                />
                                            </Item>
                                        </Col>
                                    </Row>

                                    <Row gutter={16}>
                                        <Col lg={12} xs={24}>
                                            <Item
                                                label="Departure Time"
                                                name="DepartureTime"
                                                rules={[{ required: true, message: 'Please select departure time' }]}
                                            >
                                                <TimePicker
                                                    format="HH:mm"
                                                    style={{ width: "100%" }}
                                                // onChange={onDepartureTimeChange}
                                                />
                                            </Item>
                                        </Col>
                                        <Col lg={12} xs={24}>
                                            <Item
                                                label="Arrival Time"
                                                name="ArrivalTime"
                                                rules={[{ required: true, message: 'Please select arrival time' }]}
                                            >
                                                <TimePicker
                                                    format="HH:mm"
                                                    style={{ width: "100%" }}
                                                // onChange={onArrivalTimeChange}
                                                />
                                            </Item>
                                        </Col>
                                    </Row>

                                    <Row gutter={16}>
                                        <Col lg={12} xs={24}>
                                            <Item
                                                label="Enter Ticket price"
                                                name="price"
                                                rules={[
                                                    { required: true, message: 'Please enter train ticket price' },
                                                    {
                                                        type: 'number',
                                                        message: 'Please enter a valid number for ticket price',
                                                    },
                                                ]}
                                            >
                                                <InputNumber style={{ width: '100%' }} />
                                            </Item>
                                        </Col>
                                        <Col lg={12} xs={24}>
                                            <Item
                                                label="Enter passenger count"
                                                name="passengerCount"
                                                rules={[
                                                    { required: true, message: 'Please enter passenger count' },
                                                    {
                                                        type: 'number',
                                                        message: 'Please enter a valid number for passenger count',
                                                    },
                                                ]}
                                            >
                                                <InputNumber style={{ width: '100%' }} />
                                            </Item>
                                        </Col>
                                    </Row>


                                    <Row>
                                        <Col span={24}>
                                            <Button type="primary" htmlType="submit" className="common-save-btn common-btn-color" style={{ marginTop: '16px' }}>
                                                <span style={{ fontWeight: '600' }}>SAVE</span>
                                            </Button>
                                            <Button type="default" onClick={onResetBtnClick} style={{
                                                marginLeft: '8px',
                                                backgroundColor: props.isDarkMode ? 'var(--cancel-btn-bg-dark)' : 'var(--cancel-btn-bg-light)',
                                                color: props.isDarkMode ? 'var( --cancel-btn-color-dark)' : 'var(--cancel-btn-color-light)'
                                            }}>
                                                <span style={{ fontWeight: '700' }}>RESET</span>
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Content>
                        </Col>
                        <Col xs={24} lg={12}>
                            <Content
                                className="common-cotent-container"
                                style={{
                                    background: "white",
                                }}
                            >
                                <Divider orientation="left" orientationMargin="0">All Schedules</Divider>


                                <Table columns={columns} dataSource={AllTrains}

                                    pagination={{
                                        pageSize: 10,
                                    }}
                                    scroll={{
                                        y: screenWidth > 960 ? 600 : 300,
                                        x: screenWidth > 960 ? false : true
                                    }}

                                    className={`${trainSheduler.customtable}`} />

                            </Content>
                        </Col>
                    </Row>
                </div>
            </Layout>
        </Layout>
    );
}

export default CreateSheddule;
