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


import React from 'react';
import Navigation from '../../Navigation/Navigation';
import TopBarComponent from '../../TopBarComponent/TopBarComponent';
function Evaluation() {
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
			departement:department,
			position,
			fullName,
			contact:contactNumber,
			currentLocation,
			permanentLocation,
			latestQualification:qualification,
			totalExperiences:experience,
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

	return (<>
          <Navigation />
      <div style={{ width: "100%", backgroundColor: "#f0f2f5" }}>
        <TopBarComponent />
        <div className="PortalMainContainer">
          <div className="portalContainerHeader">
        
			<Tabs defaultActiveKey="1">
				<TabPane tab="Info" key="1">
					<Card>
						{/*  */}

						<div
							style={{
								backgroundColor: '#f9f9f9',
								padding: '30px',
								borderRadius: '8px',
							}}
						>
							<Form
								onFinish={onFinish}
								layout="vertical"
								style={{
									maxWidth: '800px',
									margin: '0 auto',
									padding: '20px',
									backgroundColor: '#ffffff',
									borderRadius: '8px',
									boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
								}}
							>
								<Title level={2} style={{ textAlign: 'center', color: '#6B7AA1' }}>
									Job Application Form
								</Title>
								<Text
									style={{
										display: 'block',
										textAlign: 'center',
										marginBottom: '20px',
										color: '#888',
									}}
								>
									Please complete the form to apply for the position.
								</Text>

								<Row gutter={16}>
									<Col span={12}>
										<Form.Item
											name="department"
											label="Which department are you applying for?"
											rules={[{ required: true, message: 'Please select a department' }]}
										>
											<Select
												placeholder="Select Department"
												style={{
													width: '100%',
													backgroundColor: '#f6f8fb',
													borderRadius: '4px',
													border: '1px solid #d9d9d9',
												}}
											>
												<Option value="hr">HR</Option>
												<Option value="engineering">Engineering</Option>
												<Option value="marketing">Marketing</Option>
											</Select>
										</Form.Item>
									</Col>

									<Col span={12}>
										<Form.Item
											name="position"
											label="What position are you applying for?"
											rules={[{ required: true, message: 'Please enter the position' }]}
										>
											<Input
												placeholder="Enter position"
												style={{
													padding: '8px 12px',
													backgroundColor: '#f6f8fb',
													borderRadius: '4px',
													border: '1px solid #d9d9d9',
												}}
											/>
										</Form.Item>
									</Col>
								</Row>

								<Row gutter={16}>
									<Col span={12}>
										<Form.Item
											name="fullName"
											label="What is your full name?"
											rules={[{ required: true, message: 'Please enter your full name' }]}
										>
											<Input
												placeholder="Enter full name"
												style={{
													padding: '8px 12px',
													backgroundColor: '#f6f8fb',
													borderRadius: '4px',
													border: '1px solid #d9d9d9',
												}}
											/>
										</Form.Item>
									</Col>

									<Col span={12}>
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
													padding: '8px 12px',
													backgroundColor: '#f6f8fb',
													borderRadius: '4px',
													border: '1px solid #d9d9d9',
												}}
											/>
										</Form.Item>
									</Col>
								</Row>

								<Row gutter={16}>
									<Col span={12}>
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
													padding: '8px 12px',
													backgroundColor: '#f6f8fb',
													borderRadius: '4px',
													border: '1px solid #d9d9d9',
												}}
											/>
										</Form.Item>
									</Col>

									<Col span={12}>
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
													padding: '8px 12px',
													backgroundColor: '#f6f8fb',
													borderRadius: '4px',
													border: '1px solid #d9d9d9',
												}}
											/>
										</Form.Item>
									</Col>
								</Row>

								<Row gutter={16}>
									<Col span={12}>
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
													padding: '8px 12px',
													backgroundColor: '#f6f8fb',
													borderRadius: '4px',
													border: '1px solid #d9d9d9',
												}}
											/>
										</Form.Item>
									</Col>

									<Col span={12}>
										<Form.Item
											name="experience"
											label="How many years of experience do you have?"
											rules={[{ required: true, message: 'Please enter your experience' }]}
										>
											<InputNumber
												min={0}
												placeholder="Enter years of experience"
												style={{
													padding: '8px 12px',
													width: '100%',
													backgroundColor: '#f6f8fb',
													borderRadius: '4px',
													border: '1px solid #d9d9d9',
												}}
											/>
										</Form.Item>
									</Col>
								</Row>

								<Row gutter={16}>
									<Col span={12}>
										<Form.Item
											name="reference"
											label="How did you hear about us? (e.g., friend, agency)"
											rules={[{ required: true, message: 'Please enter a reference' }]}
										>
											<Input
												placeholder="Enter reference"
												style={{
													padding: '8px 12px',
													backgroundColor: '#f6f8fb',
													borderRadius: '4px',
													border: '1px solid #d9d9d9',
												}}
											/>
										</Form.Item>
									</Col>

									<Col span={12}>
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
													padding: '8px 12px',
													backgroundColor: '#f6f8fb',
													borderRadius: '4px',
													border: '1px solid #d9d9d9',
												}}
											/>
										</Form.Item>
									</Col>
								</Row>

								<Form.Item>
									<Row justify="center">
										<Button type="primary" htmlType="submit">
											Submit Application
										</Button>
									</Row>
								</Form.Item>
							</Form>
						</div>
					</Card>
				</TabPane>
				<TabPane tab="Evaluation" key="2">
					<Card>
						<div
							style={{
								maxWidth: '1200px',
								margin: '0 auto',
								padding: '24px',
								backgroundColor: '#fefefe',
								borderRadius: '10px',
								boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
								border: '1px solid #e6e6e6',
							}}
						>
							<Title
								level={3}
								style={{
									textAlign: 'center',
									marginBottom: '24px',
									color: '#4a4a4a',
								}}
							>
								Candidate Evaluation Form
							</Title>
							<Form
								onFinish={onFinish}
								layout="vertical"
								style={{
									color: '#595959',
								}}
							>
								{[
									{
										question: 'Was the candidate prepared for the interview?',
										subQuestion:
											'Researched company, dressed appropriately, arrived on time?',
									},
									{
										question: "Does their experience appear to match what's needed?",
										subQuestion: 'Work experience, life experience, or volunteer work?',
									},
									{
										question: 'Do they have some or all of the required credentials?',
										subQuestion: 'For example, education, licenses, certifications?',
									},
									{
										question: 'How are their interpersonal skills?',
										subQuestion: 'Friendly, smiling, outgoing, kind, fun, interactive?',
									},
									{
										question: 'How good are their communication skills?',
										subQuestion:
											'Written skills, i.e. resume, application, as well as verbal skills?',
									},
									{
										question:
											'How well do their technical skills match the job requirements?',
										subQuestion: 'Specific technical tools, approaches, examples?',
									},
									{
										question: 'How well did they answer teamwork job-related questions?',
										subQuestion: 'Likes working with others, good rapport?',
									},
									{
										question:
											'How well did they answer customer service-related questions?',
										subQuestion: 'Customer focused, good listener, problem solver?',
									},
									{
										question: 'How open did they appear to be to learning new things?',
										subQuestion: 'Willing to learn, attend training, accept feedback?',
									},
									{
										question: 'How interested did the candidate seem in getting the job?',
										subQuestion: 'In the job, the pay, the hours, the work requirements?',
									},
								].map(({ question, subQuestion }, index) => (
									<Row
										gutter={[24, 16]}
										key={index}
										style={{
											marginBottom: '16px',
										}}
									>
										{/* Question and Sub-Question Column */}
										<Col xs={24} sm={24} md={8}>
											<Text
												strong
												style={{
													color: '#333',
												}}
											>
												{`${index + 1}. ${question}`}
											</Text>
											<Text
												type="secondary"
												style={{
													display: 'block',
													color: '#7d7d7d',
													marginBottom: '8px',
												}}
											>
												{subQuestion}
											</Text>
										</Col>

										{/* Feedback Column */}
										<Col xs={24} sm={24} md={12}>
											<Form.Item
												name={`question_${index + 1}_feedback`}
												rules={[
													{
														required: true,
														message: 'Please provide feedback.',
													},
												]}
											>
												<Input.TextArea
													rows={2}
													placeholder="Enter your evaluation here..."
													style={{
														borderRadius: '8px',
														border: '1px solid #d9d9d9',
														padding: '10px',
														backgroundColor: '#f9f9f9',
														width: '100%',
													}}
												/>
											</Form.Item>
										</Col>

										{/* Marks Column */}
										<Col xs={24} sm={24} md={4}>
											<Form.Item
												name={`question_${index + 1}_marks`}
												rules={[
													{
														required: true,
														message: 'Please assign marks out of 10.',
													},
												]}
											>
												<InputNumber
													min={0}
													max={10}
													placeholder="Marks (0-10)"
													style={{
														width: '80%', // Decreased width here
														borderRadius: '8px',
														padding: '6px',
														textAlign: 'center',
													}}
												/>
											</Form.Item>
										</Col>
									</Row>
								))}
								<Form.Item>
									<Row justify="center">
										<Button
											type="primary"
											htmlType="submit"
											style={{
												backgroundColor: '#1890ff',
												borderColor: '#1890ff',
												borderRadius: '6px',
												padding: '6px 24px',
											}}
										>
											Submit Evaluation
										</Button>
									</Row>
								</Form.Item>
							</Form>
						</div>
					</Card>
				</TabPane>
			</Tabs>
		
          </div>

        </div>

      </div>
    </>
		
	);
}

export default Evaluation;
