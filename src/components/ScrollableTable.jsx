// src/components/ScrollableTable.js
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./ScrollableTable.css";
import { FaCheck } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import axios from "axios";
import { GrFormView } from "react-icons/gr";
import { RiDownloadFill } from "react-icons/ri";

const ScrollableTable = () => {
  const [data, setData] = useState([]);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const [username, setusername] = useState("");
  // const [useremail,setuseremail]=useState("")
  // const [useraddress,setuseaddress]=useState("")
  const [isedit, setedit] = useState(false);
  const [savedata, setsavedata] = useState(false);
  const [resdata, setresdata] = useState([]);

  useEffect(() => {
    console.log("table22");
    axios
      .get(`https://scrollbackend.onrender.com/scroll/`)
      .then((response) => {
        console.log(response.data);
        setresdata(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const openModal = (image) => {
    setModalImage(image);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setModalImage("");
  };

  const save = async (newData) => {
    console.log(newData, "rowrowrow");
    let id = newData._id;

    try {
      const response = await axios.put(
        `https://scrollbackend.onrender.com/scroll/edit/${id}`,
        newData
      );
      console.log(response.data, "response");
    } catch (error) {
      console.error("Error updating data:", error);
    }
    setsavedata(true);
    setedit(true);
  };

  // const handleInputChange = (e, rowId, field) => {
  //   const value = e.target.value;
  //   setresdata((prevData) =>
  //     prevData.map((row) =>
  //       row.id === rowId ? { ...row, [field]: value } : row
  //     )
  //   );
  // };

  const handleInputChange = (e, rowId, field) => {
    const value = e.target.value;
    console.log(
      `Updating row with id ${rowId}, field ${field} to value ${value}`
    );
    setresdata((prevData) =>
      prevData.map((row) =>
        row._id === rowId ? { ...row, [field]: value } : row
      )
    );
  };

  const edit = async (newData) => {
    let id = newData._id;

    try {
      const response = await axios.put(
        `https://scrollbackend.onrender.com/scroll/isactive/${id}`,
        { ...newData, isActive: isedit }
      );
      console.log(response.data, "response");
    } catch (error) {
      console.error("Error updating data:", error);
    }
    isedit ? setedit(false) : setedit(true);
    axios
      .get(`https://scrollbackend.onrender.com/scroll/`)
      .then((response) => {
        console.log(response.data);
        setresdata(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  // https://scrollbackend.onrender.com/
  return (
    <div className="scrollable-table-container">
      <div className="fixed-columns">
        <table className="fixed-table">
          <thead>
            <tr>
              <th>Agent</th>
              <th>Agent Phone Number</th>
              <th>Date of Lead Created</th>
              <th>Lead Source</th>
            </tr>
          </thead>
          <tbody>
            {resdata.map((row) => (
              <tr key={row.id}>
                <td>{row.Agent}</td>
                <td>{row.AgentPhone}</td>
                <td>{row.CreateLead}</td>
                <td>{row.LeadSource}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="scrollable-columns">
        <table className="scrollable-table">
          <thead>
            <tr>
              <th className="col1">Buyer full Name</th>
              <th className="col2">Email Id</th>
              <th className="col3">Address</th>
              <th className="col4">Passport</th>
              <th className="col5">Passport Expire</th>
              <th className="col6">Nationality</th>
              <th className="col7">UAE Resident</th>
              <th className="col8">Emirates ID</th>
              <th className="col9">Emirates Expire</th>
              <th className="col10">Seller Full Name</th>
              <th className="col11">EOI/Token Date</th>
              <th className="col12">Date of closure</th>
              <th className="col13">Date of booking</th>
              <th className="col14">Expected handover Date</th>
              <th className="col15">Property Type</th>
              <th className="col16">Developer</th>
              <th className="col17">View</th>
            </tr>
          </thead>
          <tbody>
            {resdata.map((row) => (
              <tr key={row._id}>
                <td>
                  <input
                    style={row.isActive ? {} : { cursor: "not-allowed" }}
                    disabled={!row.isActive ? true : false}
                    type="text"
                    value={row.Name || ""}
                    onChange={(e) => handleInputChange(e, row._id, "Name")}
                    placeholder="enter your name"
                  />
                </td>
                <td>
                  <input
                    style={row.isActive ? {} : { cursor: "not-allowed" }}
                    disabled={!row.isActive ? true : false}
                    type="text"
                    value={row.email || ""}
                    placeholder="enter your email"
                    onChange={(e) => handleInputChange(e, row._id, "email")}
                  />
                </td>
                <td>
                  <input
                    style={row.isActive ? {} : { cursor: "not-allowed" }}
                    disabled={!row.isActive ? true : false}
                    type="text"
                    value={row.address || ""}
                    placeholder="enter your address"
                    onChange={(e) => handleInputChange(e, row._id, "address")}
                  />
                </td>

                <td>
                  <input
                    style={row.isActive ? {} : { cursor: "not-allowed" }}
                    disabled={!row.isActive ? true : false}
                    type="text"
                    value={row.passport || ""}
                    placeholder="enter your passport"
                    onChange={(e) => handleInputChange(e, row._id, "passport")}
                  />
                </td>
                <td>
                  <input
                    style={row.isActive ? {} : { cursor: "not-allowed" }}
                    disabled={row.isActive ? true : false}
                    type="date"
                    value={row.Date || ""}
                    placeholder="enter your date"
                    onChange={(e) => handleInputChange(e, row._id, "Date")}
                  />
                </td>
                <td>
                  <input
                    style={row.isActive ? {} : { cursor: "not-allowed" }}
                    disabled={row.isActive ? true : false}
                    type="text"
                    value={row.nationality || ""}
                    placeholder="enter your nationality"
                    onChange={(e) =>
                      handleInputChange(e, row._id, "nationality")
                    }
                  />
                </td>
                <td>
                  <input
                    style={row.isActive ? {} : { cursor: "not-allowed" }}
                    disabled={row.isActive ? true : false}
                    type="text"
                    value={row.uaeResident || ""}
                    placeholder="enter your uaeResident"
                    onChange={(e) =>
                      handleInputChange(e, row._id, "uaeResident")
                    }
                  />
                </td>
                <td>{row.col10}</td>
                <td>{row.col11}</td>
                <td>{row.col12}</td>
                <td>
                  <input
                    style={row.isActive ? {} : { cursor: "not-allowed" }}
                    disabled={row.isActive ? true : false}
                    type="date"
                    value={row.token || ""}
                    placeholder="enter your token"
                    onChange={(e) => handleInputChange(e, row._id, "token")}
                  />
                </td>
                <td>
                  <input
                    style={row.isActive ? {} : { cursor: "not-allowed" }}
                    disabled={row.isActive ? true : false}
                    type="date"
                    value={row.closure || ""}
                    placeholder="enter your closure"
                    onChange={(e) => handleInputChange(e, row._id, "closure")}
                  />
                </td>
                <td>
                  <input
                    style={row.isActive ? {} : { cursor: "not-allowed" }}
                    disabled={row.isActive ? true : false}
                    type="date"
                    value={row.booking || ""}
                    placeholder="enter your booking"
                    onChange={(e) => handleInputChange(e, row._id, "booking")}
                  />
                </td>
                <td className="icon-container">
                  <FaCheck onClick={() => save(row)} />
                  <GrFormView />
                  <RiDownloadFill />
                </td>
                <td>{row.col17}</td>
                <td>{row.col18}</td>
                <td>
                  <button onClick={() => openModal(row.image)}> Image</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="fixed-columns">
        <table className="fixed-table">
          <thead>
            <tr>
              <th>Column 5</th>
              {/* <th>Column 6</th> */}
            </tr>
          </thead>
          <tbody>
            {resdata.map((row) => (
              <tr key={row.id}>
                <td>
                  <CiEdit onClick={(e) => edit(row)} />{" "}
                  <FaCheck onClick={() => save(row)} />
                </td>
                {/* <td>{row.col6}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Image Modal"
      >
        <img src={modalImage} alt="Modal Content" />
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};

export default ScrollableTable;
