import React, { useState } from "react";
import CropStyle from "./Style";
import { Button, Form } from "react-bootstrap";
import { DatePicker } from "antd";
import moment from "moment/moment";

const SelectedCropModal = ({ selectedCrop, setMySelectedCrop, setSowingInput, handleCloseModal }) => {
    const [formInput, setFormInput] = useState()
    console.log("formInput--->", formInput)

    const handleAddCrop = (e) => {
        e.preventDefault()
        setSowingInput(formInput)
        setMySelectedCrop(prev => [...prev, {
            img: selectedCrop?.img,
            title: selectedCrop?.title
        }])
        handleCloseModal()
    }

    const handleChangeInput = (name, val) => {
        setFormInput((prev) => ({
            ...prev,
            [name]: val
        }))
    }

    const handleChangeDate = (date) => {
        handleChangeInput("sowing_Date", moment(date.$d).format('YYYY-MM-DD'));
    };
    
  return (
    <CropStyle>
      <div className="selected_crop_modal_body">
        <p>Selected Crop:</p>
        <div className="selected_crop_img">
          <img
            src={selectedCrop?.img}
            width={50}
            height={100}
            alt="SelectedCrop"
          />
          <p className="crop_item_title">{selectedCrop?.title}</p>
        </div>

        <Form onSubmit={(e) => handleAddCrop(e)}>
          <Form.Group
            controlId="formBasicPassword"
            className="sowing_input_fields"
          >
            <Form.Label>Sowing Date</Form.Label>
            <DatePicker
             name="sowing_Date"
             onChange={handleChangeDate}
             required
            />
          </Form.Group>
          <br />
          <Form.Group
            controlId="formBasicPassword"
            className="sowing_input_fields"
          >
            <Form.Label>What is the area of your farm?</Form.Label>
            <Form.Control type="number" name="acre" placeholder="Acre" onChange={(e) => handleChangeInput(e.target.name, e.target.value)} required />
          </Form.Group>
          <br />
          <Form.Group
            controlId="formBasicPassword"
            className="sowing_input_fields"
          >
            <Form.Label>Enter the Survey Number</Form.Label>
            <Form.Control type="text" name="survey" placeholder="Survey Number" onChange={(e) => handleChangeInput(e.target.name, e.target.value)} required />
          </Form.Group>
          <br />
          <div className="add_crop_button">
            <Button type="submit">Add Crop</Button>
          </div>
        </Form>
      </div>
    </CropStyle>
  );
};

export default SelectedCropModal;
