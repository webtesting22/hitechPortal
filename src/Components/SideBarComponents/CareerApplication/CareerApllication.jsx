import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { Col, Card, Row, Spin, Alert, Button, Modal, Collapse, Select, Input, AutoComplete, Space } from "antd";
import TopBarComponent from "../../TopBarComponent/TopBarComponent";
import Navigation from "../../Navigation/Navigation";
import * as XLSX from "xlsx";
import "./style.css";
const { Panel } = Collapse;
const { Option } = Select;
const { Search } = Input;
const { Meta } = Card;
const CareerApplication = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [autoCompleteOptions, setAutoCompleteOptions] = useState([]);
  const [releventExp, setReleventExp] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState('');
  const handleOpenModal = (relevantExperience) => {
    const formattedExperience = relevantExperience
      .map(exp =>
        Object.entries(exp)
          .map(([key, value]) => `${key}: ${value}`)
          .join(', ')
      )
      .join('; ');

    setSelectedExperience(formattedExperience || 'N/A');
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedExperience('');
  };

  // Step 2: Handle form submission and store the form data in state
  const handleFinish = (values) => {
    console.log("Form Data:", values);
    setFormData(values); // Store form data in state
  };
  const uniquePositions = [...new Set(data.map((application) => application.positionAppliedFor))];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://napi.prepseed.com/hightech/getApplication');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        setData(result.applicatons);
        setFilteredData(result.applicatons);

        const relevantExpValues = result.applicatons.map(e => {
          // Extract key-value pairs from each relevantExperience object
          const keyValuePairs = e.relevantExperience
            .map(exp => {
              return Object.entries(exp)
                .map(([key, value]) => `${key}:${value}`)
                .join(', '); // Join all pairs with commas
            })
            .join('; '); // Separate different experiences with a semicolon

          console.log("Formatted Key-Value Pairs:", keyValuePairs);
          return keyValuePairs;
        });

        // Update state with the computed values
        console.log("Relevant Experience Values:", relevantExpValues);
        setReleventExp(relevantExpValues);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);


  const handlePositionChange = (value) => {
    // setSelectedPosition(value);
    if (value) {
      const filtered = data.filter(application => application.positionAppliedFor === value);
      setFilteredData(filtered);
    } else {
      setFilteredData(data); // Show all data if no position is selected
    }
  };
  const handleSearch = (value) => {
    setSearchQuery(value);
    const lowerCaseQuery = value.toLowerCase();

    if (lowerCaseQuery) {
      const filtered = data.filter(application =>
        (application.name && application.name.toLowerCase().includes(lowerCaseQuery)) ||
        (application.positionAppliedFor && application.positionAppliedFor.toLowerCase().includes(lowerCaseQuery)) ||
        (application.currentLocation && application.currentLocation.toLowerCase().includes(lowerCaseQuery)) ||
        (application.departmentAppliedFor && application.departmentAppliedFor.toLowerCase().includes(lowerCaseQuery)) ||
        (application.skill && application.skill.toLowerCase().includes(lowerCaseQuery))
      );
      setFilteredData(filtered);

      // Set auto-complete options
      const suggestions = data
        .map(app => app.name)
        .filter(name => name && name.toLowerCase().includes(lowerCaseQuery))
        .slice(0, 5); // Limiting to 5 suggestions for brevity

      setAutoCompleteOptions(suggestions.map(name => ({ value: name })));
    } else {
      setFilteredData(data); // Show all data if the search query is empty
      setAutoCompleteOptions([]);
    }
  };


  const handleSelectSuggestion = (value) => {
    setSearchQuery(value);
    const filtered = data.filter(application => application.name === value);
    setFilteredData(filtered);
  };
  console.log("🔴🔴🔴🔴", filteredData)

  const downloadFile = (url, fileName) => {
    fetch(url)
      .then(response => response.blob())
      .then(blob => {
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
      });
  };


  const downloadExcel = () => {
    // Step 1: Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Step 2: Convert your data into a worksheet
    const worksheet = XLSX.utils.json_to_sheet(filteredData);

    // Step 3: Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "CareerApplications");

    // Step 4: Write the workbook to a file
    XLSX.writeFile(workbook, "CareerApplications.xlsx");
  };

  const columns = [
    {
      title: 'S.NO.',
      key: '_id',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'DATE OF APPLICATION',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: text => new Date(text).toLocaleDateString(),
    },
    {
      title: 'Department Applied For',
      dataIndex: 'departmentAppliedFor',
      key: 'departmentAppliedFor',
    },
    {
      title: 'Position Applied For',
      dataIndex: 'positionAppliedFor',
      key: 'positionAppliedFor',
    },
    {
      title: 'Skill',
      dataIndex: 'skill',
      key: 'skill',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'DOB',
      dataIndex: 'dob',
      key: 'dob',
      render: text => new Date(text).toLocaleDateString(),
    },
    {
      title: 'Contact Number',
      dataIndex: 'contactNumber',
      key: 'contactNumber',
    },
    {
      title: 'Alternate Number',
      dataIndex: 'alternateContactNumber',
      key: 'alternateContactNumber',
    },
    {
      title: 'Email ID',
      dataIndex: 'emailId',
      key: 'emailId',
    },
    {
      title: 'Qualification',
      dataIndex: 'qualification',
      key: 'qualification',
    },
    {
      title: 'Current Company Name',
      dataIndex: 'currentCompanyName',
      key: 'currentCompanyName',
    },
    {
      title: 'Current Company Designation',
      dataIndex: 'currentDesignation',
      key: 'currentDesignation',
    },
    {
      title: 'Total Experience',
      dataIndex: 'totalExperience',
      key: 'totalExperience',
    },
    {
      title: 'Relevant Experience',
      key: 'relevantExperience',
      render: (text, record) => {
        // Format the relevant experience
        const formattedExperience = record.relevantExperience
          .map(exp =>
            Object.entries(exp)
              .map(([key, value]) => `${key}: ${value}`)
              .join(', ')
          )
          .join('; ');

        // If there's no relevant experience, return a dash
        if (!formattedExperience || formattedExperience === 'N/A') {
          return <span>-</span>;
        }

        // If relevant experience exists, return a clickable link
        return (
          <a onClick={() => handleOpenModal(record.relevantExperience)}>
            View
          </a>
        );
      },
    },
    {
      title: 'Current Job Location',
      dataIndex: 'currentLocation',
      key: 'currentLocation',
    },
    {
      title: 'Home Location',
      dataIndex: 'home',
      key: 'home',
    },
    {
      title: 'Current CTC (Per Annum)',
      dataIndex: 'currentCTC',
      key: 'currentCTC',
    },
    {
      title: 'Expected CTC (Per Annum)',
      dataIndex: 'expectedCTC',
      key: 'expectedCTC',
    },
    {
      title: 'Notice Period (Days)',
      dataIndex: 'noticePeriod',
      key: 'noticePeriod',
    },
    {
      title: 'Reference',
      dataIndex: 'reference',
      key: 'reference',
    },
    {
      title: 'Remarks',
      dataIndex: 'remarks',
      key: 'remarks',
    },
    {
      title: 'CV Open Option/Link',
      key: 'cv',
      render: (text, record) => {
        const { name, resume, photo } = record;
        return (
          <Space size="middle">
            <a
              onClick={() => downloadFile(resume, `${name}_resume.pdf`)}
              href="#!"
              rel="noopener noreferrer"
            >
              View&nbsp;Resume
            </a>
            <a
              onClick={() => downloadFile(photo, `${name}_photo.jpg`)}
              href="#!"
              rel="noopener noreferrer"
            >
              View&nbsp;Photo
            </a>
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <Navigation />
      <div style={{ width: "100%", backgroundColor: "#f0f2f5" }} id="RightSide">
        <TopBarComponent />
        <div className="PortalMainContainer" >
          <div>
            <div className="portalContainerHeader">
              <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "20px" }}>Career Application</h2>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: "end" }} id="headerSelect">
                <AutoComplete
                  value={searchQuery}
                  options={autoCompleteOptions}
                  onSearch={handleSearch}
                  onSelect={handleSelectSuggestion}
                  style={{ marginBottom: 16, width: '200px' }}
                  placeholder="Search Applications"
                  allowClear
                />
                <Select
                  placeholder="Select Position"
                  onChange={handlePositionChange}
                  allowClear
                  style={{ marginBottom: 16, width: '200px' }}
                >
                  {uniquePositions.map((position) => (
                    <Option key={position} value={position}>
                      {position}
                    </Option>
                  ))}
                </Select>
                <Button type="primary" onClick={downloadExcel}>Download as Excel</Button>
              </div>
            </div>
<br />
            <Row gutter={24}>
              {/* {filteredData.map((application) => {
                // Convert and format the application date
                const date = new Date(application.createdAt);
                const istDate = new Date(date.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
                const formattedDate = istDate.toLocaleDateString('en-GB').replace(/\//g, '-');


                const dobDate = new Date(application.dob);
                const istDob = new Date(dobDate.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
                const formattedDob = istDob.toLocaleDateString('en-GB').replace(/\//g, '-');
                return ( */}
              <Col span={24}>
                <div style={{ width: "100%", overflow: "auto" }}>
                  <Table columns={columns} dataSource={filteredData} rowKey="_id" />
                  <Modal
                    title="Relevant Experience"
                    visible={isModalVisible}
                    onOk={handleCloseModal}
                    onCancel={handleCloseModal}
                    footer={null}
                  >
                    <br />
                    <p>{selectedExperience}</p>
                  </Modal>
                </div>

              </Col>
              {/* );
              })} */}

            </Row>

          </div>
          {/* <Table dataSource={dataSource} columns={columns} /> */}
        </div>
      </div>
    </>
  );
};
export default CareerApplication;
