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
  notification,
} from "antd";

import React, { useState } from "react";
import Navigation from "../../Navigation/Navigation";
import TopBarComponent from "../../TopBarComponent/TopBarComponent";
import { Link } from "react-router-dom";
import JobApplicationForm from "../JobApplicationForm/JobApplicationForm";
function Evaluation() {
  const { TabPane } = Tabs;
  const { Option } = Select;
  const { Text, Title } = Typography;

  const { Search } = Input;
  const onFinish = (values) => {
    // console.log("Form values:", values);
    addEvaluation(values);
  };
  const [evaluation, setEvaluation] = useState([]);
  const [searchToken, setSearchToken] = useState(null);
  const [interviewTakenBy, setInteviewTakenBy] = useState("");
  const [isTokenTaken, setIsTokenTaken] = useState(false);
  const [tabKey, setTabKey] = useState("1");
  const [userInformation, setUserInformation] = useState({});
  const addEvaluation = async (data) => {
    if (evaluation.length < 10 || interviewTakenBy == "") {
      notification.error({ message: "All fields are mandatory" });
      return;
    }
    const requestBody = {
      docId: userInformation?._id,
      evaluation,
      interviewedBy: interviewTakenBy,
    };
    console.log("requestbody", requestBody);

    try {
      const response = await fetch(
        `https://napi.prepseed.com/hightech/addEvaluation`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        notification.success({ message: responseData.message });
        setIsTokenTaken(false);
        setSearchToken(null);
        setInteviewTakenBy("");
        setUserInformation([]);
      } else {
        console.error("Error adding job application:", response.statusText);
      }
    } catch (error) {
      console.error("Request failed", error);
    }
  };
  const handleInputChange = (index, field, value, question) => {
    setEvaluation((prev) => {
      const updatedEvaluation = [...prev];
      if (!updatedEvaluation[index]) {
        updatedEvaluation[index] = {
          question: question,
          comment: "",
          //   marks: 0,
        };
      }
      updatedEvaluation[index][field] = value;
      console.log(updatedEvaluation);
      return updatedEvaluation;
    });
  };
  const handleSearch = async (value) => {
    console.log("User Input:", value);
    if (searchToken == null) {
      notification.error({ message: "Token number is required" });
      return;
    }
    const response = await fetch(
      `https://napi.prepseed.com/hightech/getDataFromToken?token=${searchToken}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (data.success) {
      setTabKey("1");
      setIsTokenTaken(true);
      setInteviewTakenBy("");
      setUserInformation(data.data);
      if (data.data?.evaluation) {
        setEvaluation(data.data?.evaluation);
        if (data.data?.interviewedBy) {
          setInteviewTakenBy(data.data?.interviewedBy);
        }
      }
    } else {
      setIsTokenTaken(false);
      setUserInformation({});
      setInteviewTakenBy("");
      setEvaluation([]);
      notification.error({ message: data?.message });
    }
  };
  const handleTabChange = (key) => {
    setTabKey(key); // Update the tabKey state to reflect the selected tab
  };

  return (
    <>
      <Navigation />
      <div style={{ width: "100%", backgroundColor: "#f0f2f5" }}>
        <TopBarComponent />
        <div className="PortalMainContainer">
          <div className="portalContainerHeader">
            <div className="CardHeaderContainer">
              <div>
                <h4>Job Application</h4>
              </div>
            </div>
            {/* <Button><Link to="/JobApplicationForm">Click</Link></Button> */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "20px",
              }}
            >
              <Search
                type="number"
                placeholder="Enter Token"
                value={searchToken}
                enterButton="Search"
                onSearch={handleSearch}
                style={{ maxWidth: "80%" }}
                onChange={(e) => {
                  setSearchToken(e.target.value);
                }}
              />
            </div>
            {isTokenTaken && (
              <div id="ApplicationTabsContainer">
                <Tabs
                  defaultActiveKey="1"
                  activeKey={tabKey}
                  onChange={handleTabChange}
                >
                  <TabPane tab="Info" key="1">
                    <JobApplicationForm data={userInformation} />
                  </TabPane>
                  <TabPane tab="Evaluation" key="2">
                    <Card>
                      <div
                        style={{
                          maxWidth: "1200px",
                          margin: "0 auto",
                          padding: "24px",
                          backgroundColor: "#fefefe",
                          borderRadius: "10px",
                          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                          border: "1px solid #e6e6e6",
                        }}
                      >
                        <Title
                          level={3}
                          style={{
                            textAlign: "center",
                            marginBottom: "24px",
                            color: "#4a4a4a",
                          }}
                        >
                          Candidate Evaluation Form
                        </Title>
                        <Form
                          onFinish={onFinish}
                          layout="vertical"
                          style={{
                            color: "#595959",
                          }}
                        >
                          {[
                            {
                              question:
                                "Was the candidate prepared for the interview?",
                              subQuestion:
                                "Researched company, dressed appropriately, arrived on time?",
                            },
                            {
                              question:
                                "Does their experience appear to match what's needed?",
                              subQuestion:
                                "Work experience, life experience, or volunteer work?",
                            },
                            {
                              question:
                                "Do they have some or all of the required credentials?",
                              subQuestion:
                                "For example, education, licenses, certifications?",
                            },
                            {
                              question: "How are their interpersonal skills?",
                              subQuestion:
                                "Friendly, smiling, outgoing, kind, fun, interactive?",
                            },
                            {
                              question:
                                "How good are their communication skills?",
                              subQuestion:
                                "Written skills, i.e. resume, application, as well as verbal skills?",
                            },
                            {
                              question:
                                "How well do their technical skills match the job requirements?",
                              subQuestion:
                                "Specific technical tools, approaches, examples?",
                            },
                            {
                              question:
                                "How well did they answer teamwork job-related questions?",
                              subQuestion:
                                "Likes working with others, good rapport?",
                            },
                            {
                              question:
                                "How well did they answer customer service-related questions?",
                              subQuestion:
                                "Customer focused, good listener, problem solver?",
                            },
                            {
                              question:
                                "How open did they appear to be to learning new things?",
                              subQuestion:
                                "Willing to learn, attend training, accept feedback?",
                            },
                            {
                              question:
                                "How interested did the candidate seem in getting the job?",
                              subQuestion:
                                "In the job, the pay, the hours, the work requirements?",
                            },
                          ].map(({ question, subQuestion }, index) => (
                            <Row
                              gutter={[24, 16]}
                              key={index}
                              style={{
                                marginBottom: "16px",
                              }}
                            >
                              {/* Question and Sub-Question Column */}
                              <Col xs={24} sm={24} md={8}>
                                <Text
                                  strong
                                  style={{
                                    color: "#333",
                                  }}
                                >
                                  {`${index + 1}. ${question}`}
                                </Text>
                                <Text
                                  type="secondary"
                                  style={{
                                    display: "block",
                                    color: "#7d7d7d",
                                    marginBottom: "8px",
                                  }}
                                >
                                  {subQuestion}
                                </Text>
                              </Col>

                              {/* Feedback Column */}
                              <Col xs={24} sm={24} md={12}>
                                <Form.Item
                                  //   name={`question_${index + 1}_feedback`}
                                  rules={[
                                    {
                                      required: true,
                                      message: "Please provide feedback.",
                                    },
                                  ]}
                                >
                                  {console.log(evaluation[index])}
                                  <Input.TextArea
                                    rows={2}
                                    placeholder="Enter your evaluation here..."
                                    style={{
                                      borderRadius: "8px",
                                      border: "1px solid #d9d9d9",
                                      padding: "10px",
                                      backgroundColor: "white",
                                      width: "100%",
                                    }}
                                    value={evaluation[index]?.comment}
                                    onChange={(e) =>
                                      handleInputChange(
                                        index,
                                        "comment",
                                        e.target.value,
                                        question
                                      )
                                    }
                                  />
                                </Form.Item>
                              </Col>

                              {/* Marks Column */}
                              <Col xs={24} sm={24} md={4}>
                                <Form.Item
                                  rules={[
                                    {
                                      required: true,
                                      message: "Please assign marks out of 10.",
                                    },
                                  ]}
                                >
                                  {/* <Input
                                    type="number"
									min={0}
									max={10}
                                    placeholder="Marks (0-10)"
                                    style={{
                                      width: "80%",
                                      borderRadius: "8px",
                                      padding: "6px",
                                      textAlign: "center",
                                    }}
                                    value={evaluation[index]?.marks}
                                    onChange={(e) => {
                                      // Ensure the value does not exceed 10
                                      if (
                                        e.target.value >= 0 &&
                                        e.targetvalue <= 10
                                      ) {
                                        handleInputChange(
                                          index,
                                          "marks",
                                          e.target.value,
                                          question
                                        );
                                      }
                                    }}
                                    onKeyDown={(e) => {
                                      const validKeys = [
                                        "Backspace", // Allow Backspace
                                        "ArrowLeft", // Allow Left Arrow
                                        "ArrowRight", // Allow Right Arrow
                                        "Delete", // Allow Delete
                                        "Tab", // Allow Tab
                                      ];

                                      if (
                                        !/^[0-9]$/.test(e.key) && // Allow only numeric keys
                                        !validKeys.includes(e.key) // Allow valid keys
                                      ) {
                                        e.preventDefault();
                                      }
                                    }}
                                  /> */}
                                  <Input
                                    type="text" // Use text to have more control over input
                                    placeholder="Marks (1-10)"
                                    style={{
                                      width: "80%",
                                      borderRadius: "8px",
                                      padding: "6px",
                                      textAlign: "center",
                                    }}
                                    value={evaluation[index]?.marks || ""}
                                    onChange={(e) => {
                                      const value = e.target.value;

                                      // Allow only numbers between 1 and 10
                                      if (/^(10|[1-9])?$/.test(value)) {
                                        handleInputChange(
                                          index,
                                          "marks",
                                          value,
                                          question
                                        );
                                      }
                                    }}
                                    onKeyDown={(e) => {
                                      const validKeys = [
                                        "Backspace", // Allow Backspace
                                        "ArrowLeft", // Allow Left Arrow
                                        "ArrowRight", // Allow Right Arrow
                                        "Delete", // Allow Delete
                                        "Tab", // Allow Tab
                                      ];

                                      // Block keys that aren't valid numbers or navigation keys
                                      if (
                                        !/^[0-9]$/.test(e.key) && // Allow only numeric keys
                                        !validKeys.includes(e.key) // Allow valid keys
                                      ) {
                                        e.preventDefault();
                                      }
                                    }}
                                    onBlur={(e) => {
                                      const value = Number(e.target.value);

                                      // Reset to an empty string if out of range
                                      if (value < 1 || value > 10) {
                                        handleInputChange(
                                          index,
                                          "marks",
                                          "",
                                          question
                                        );
                                      }
                                    }}
                                  />
                                </Form.Item>
                              </Col>
                            </Row>
                          ))}
                          <Form.Item
                            rules={[{ required: true }]}
                            label={<b>Interview Taken By :</b>}
                          >
                            <Input
                              type="text"
                              value={interviewTakenBy}
                              onChange={(e) => {
                                setInteviewTakenBy(e.target.value);
                              }}
                            />
                          </Form.Item>
                          <Form.Item>
                            <Row justify="center">
                              <Button
                                type="primary"
                                htmlType="submit"
                                style={{
                                  backgroundColor: "#1890ff",
                                  borderColor: "#1890ff",
                                  borderRadius: "6px",
                                  padding: "6px 24px",
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
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Evaluation;
