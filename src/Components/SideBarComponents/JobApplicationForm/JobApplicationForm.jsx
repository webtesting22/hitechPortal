import React from "react";
import {
    Card,
    Tabs,
    Button,
    Form,
    Select,

    Col,
    Typography,
    Input,
    InputNumber,
    Row,
} from 'antd';
import "./JobApplication.css"

const JobApplicationForm = () => {
    const { TabPane } = Tabs;
    const { Option } = Select;
    const { Text, Title } = Typography;
    const onFinish = values => {
        console.log('Form values:', values);
        addJobApplication(values)
    };
    const addJobApplication = async data => {
        const {
            department,
            position,
            fullName,
            contactNumber,
            currentLocation,
            permanentLocation,
            qualification,
            experience,
            reference,
            noticePeriod,
        } = data;

        const requestBody = {
            departement: department,
            position,
            fullName,
            contact: contactNumber,
            currentLocation,
            permanentLocation,
            latestQualification: qualification,
            totalExperiences: experience,
            reference,
            noticePeriod,
        };
        console.log("requestbody", requestBody);

        try {
            const response = await fetch(`http://localhost:4040/api/hightech/addJobApplication`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log('Job application added successfully:', responseData);
            } else {
                console.error('Error adding job application:', response.statusText);
            }
        } catch (error) {
            console.error('Request failed', error);
        }
    };
    return (
        <>
            <section id="JobApplicationForm">
                <div
                    className="ApplicationFormContainer"
                    style={{
                        // backgroundColor: '#f9f9f9',
                        borderRadius: '8px',
                        height: "100%"
                    }}
                >

                    <Form
                        onFinish={onFinish}
                        layout="vertical"
                        style={{
                            // maxWidth: '800px',
                            margin: '0 auto',
                            padding: '20px',
                            height: "100%",
                        }}
                    >
                        <div className="Formheader">
                            <div className="headerLogo">
                                <img src="/hitech_logo.png" alt="" />
                            </div>
                            <br />
                            <Title level={2} style={{ textAlign: 'center', color: '#0d2e61', marginBottom: "0px" }}>
                                Job Application Form
                            </Title>
                            <Text
                                style={{
                                    display: 'block',
                                    textAlign: 'center',
                                    marginBottom: '20px',
                                    // color: '#888',
                                }}
                            >
                                Please complete the form to apply for the position.
                            </Text>

                        </div>
                        <Row gutter={16}>
                            <Col lg={12} md={24} style={{ width: "100%" }}>
                                <Form.Item
                                    name="department"
                                    label="Which department are you applying for?"
                                    rules={[{ required: true, message: 'Please select a department' }]}
                                >
                                    <Select
                                        placeholder="Select Department"

                                        style={{
                                            width: '100%',
                                            // backgroundColor: '#f6f8fb',
                                            borderRadius: '4px',
                                            // border: '1px solid #d9d9d9',
                                        }}
                                    >
                                        <Option value="hr">HR</Option>
                                        <Option value="engineering">Engineering</Option>
                                        <Option value="marketing">Marketing</Option>
                                    </Select>
                                </Form.Item>
                            </Col>

                            <Col lg={12} md={24} style={{ width: "100%" }}>
                                <Form.Item
                                    name="position"
                                    label="What position are you applying for?"
                                    rules={[{ required: true, message: 'Please enter the position' }]}
                                >
                                    <Input
                                        placeholder="Enter position"
                                        style={{
                                            // padding: '8px 12px',
                                            // backgroundColor: '#f6f8fb',
                                            borderRadius: '4px',
                                            border: '1px solid #d9d9d9',
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col lg={12} md={24} style={{ width: "100%" }}>
                                <Form.Item
                                    name="fullName"
                                    label="What is your full name?"
                                    rules={[{ required: true, message: 'Please enter your full name' }]}
                                >
                                    <Input
                                        placeholder="Enter full name"
                                        style={{
                                            // padding: '8px 12px',
                                            // backgroundColor: '#f6f8fb',
                                            borderRadius: '4px',
                                            border: '1px solid #d9d9d9',
                                        }}
                                    />
                                </Form.Item>
                            </Col>

                            <Col lg={12} md={24} style={{ width: "100%" }}>
                                <Form.Item
                                    name="contactNumber"
                                    label="What is your contact number?"
                                    rules={[
                                        { required: true, message: 'Please enter your contact number' },
                                    ]}
                                >
                                    <Input
                                        placeholder="Enter contact number"
                                        style={{
                                            // padding: '8px 12px',
                                            // backgroundColor: '#f6f8fb',
                                            borderRadius: '4px',
                                            border: '1px solid #d9d9d9',
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col lg={12} md={24} style={{ width: "100%" }}>
                                <Form.Item
                                    name="currentLocation"
                                    label="Where are you currently located?"
                                    rules={[
                                        { required: true, message: 'Please enter your current location' },
                                    ]}
                                >
                                    <Input
                                        placeholder="Enter current location"
                                        style={{
                                            // padding: '8px 12px',
                                            // backgroundColor: '#f6f8fb',
                                            borderRadius: '4px',
                                            border: '1px solid #d9d9d9',
                                        }}
                                    />
                                </Form.Item>
                            </Col>

                            <Col lg={12} md={24} style={{ width: "100%" }}>
                                <Form.Item
                                    name="permanentLocation"
                                    label="What is your permanent location?"
                                    rules={[
                                        { required: true, message: 'Please enter your permanent location' },
                                    ]}
                                >
                                    <Input
                                        placeholder="Enter permanent location"
                                        style={{
                                            // padding: '8px 12px',
                                            // backgroundColor: '#f6f8fb',
                                            borderRadius: '4px',
                                            border: '1px solid #d9d9d9',
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col lg={12} md={24} style={{ width: "100%" }}>
                                <Form.Item
                                    name="qualification"
                                    label="What is your highest qualification?"
                                    rules={[
                                        { required: true, message: 'Please enter your qualification' },
                                    ]}
                                >
                                    <Input
                                        placeholder="Enter qualification"
                                        style={{
                                            // padding: '8px 12px',
                                            // backgroundColor: '#f6f8fb',
                                            borderRadius: '4px',
                                            border: '1px solid #d9d9d9',
                                        }}
                                    />
                                </Form.Item>
                            </Col>

                            <Col lg={12} md={24} style={{ width: "100%" }}>
                                <Form.Item
                                    name="experience"
                                    label="How many years of experience do you have?"
                                    rules={[{ required: true, message: 'Please enter your experience' }]}
                                >
                                    <InputNumber
                                        min={0}
                                        placeholder="Enter years of experience"
                                        style={{
                                            // padding: '8px 12px',
                                            width: '100%',
                                            // backgroundColor: '#f6f8fb',
                                            borderRadius: '4px',
                                            border: '1px solid #d9d9d9',
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col lg={12} md={24} style={{ width: "100%" }}>
                                <Form.Item
                                    name="reference"
                                    label="How did you hear about us? (e.g., friend, agency)"
                                    rules={[{ required: true, message: 'Please enter a reference' }]}
                                >
                                    <Input
                                        placeholder="Enter reference"
                                        style={{
                                            // padding: '8px 12px',
                                            // backgroundColor: '#f6f8fb',
                                            borderRadius: '4px',
                                            border: '1px solid #d9d9d9',
                                        }}
                                    />
                                </Form.Item>
                            </Col>

                            <Col lg={12} md={24} style={{ width: "100%" }}>
                                <Form.Item
                                    name="noticePeriod"
                                    label="What is your notice period?"
                                    rules={[
                                        { required: true, message: 'Please enter your notice period' },
                                    ]}
                                >
                                    <Input
                                        placeholder="Enter notice period"
                                        style={{
                                            // padding: '8px 12px',
                                            // backgroundColor: '#f6f8fb',
                                            borderRadius: '4px',
                                            border: '1px solid #d9d9d9',
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <div className="SubmitBtnContainer">
                            <Form.Item>
                                <Row justify="center">
                                    <Button type="primary" htmlType="submit">
                                        Submit Application
                                    </Button>
                                </Row>
                            </Form.Item>
                        </div>
                        <br /><br />
                    </Form>
                </div>
            </section>
        </>
    )
}
export default JobApplicationForm