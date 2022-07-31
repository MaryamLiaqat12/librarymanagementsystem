import React, { useState } from "react";

import {
  Button,
  Container,
  FlexRow,
} from "../../../components/CommonComponents";
import { Modal, DialogBox } from "../../../components/Modal";

import Input, { Select } from "../../../components/Input";

export default function AddEditBookDialog({
  isEdit = false,
  handleClose,
  show,
  data,
}) {
  const [nic, setNic] = useState(isEdit && data && data.nic ? data.nic : "");
  const [firstName, setFirstName] = useState(
    isEdit && data && data.firstName ? data.firstName : ""
  );
  
  const [lastName, setLastName] = useState(
    isEdit && data && data.lastName ? data.lastName : ""
  );

  const ClearInput = () => {
    if (!isEdit) {
      setFirstName("");
      setLastName("");
    }
  };

  const sendDone = () => {
    if (
      firstName !== "" &&
      lastName !== "" 
    ) {
      ClearInput();
      handleClose(true, {
        firstName,
        lastName,
      });
    } else if (firstName === "") {
      window.alert(
        `Please enter a First Name to ${isEdit ? "edit" : "add"} Member`
      );
     };
    }
  const sendCancel = () => {
    !isEdit && ClearInput();
    handleClose(false, null);
  };

  return (
    <Modal show={show}>
      <DialogBox>
        <h2>{isEdit ? "Edit" : "Add"} Member</h2>
        <p>{isEdit ? "Edit" : "Enter"} the below details of the Member</p>
        <Container alignItems="center" disableFullWidth>
         <Input
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            type="text"
            id="firstName"
            name="firstName"
            required
            minLength="1"
          />
          <Input
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            type="text"
            id="lastName"
            name="lastName"
            required
            minLength="1"
          />
        </Container>
        <FlexRow>
          <Button onClick={sendDone}>Done</Button>
          <Button onClick={sendCancel} color="secondary">
            Cancel
          </Button>
        </FlexRow>
      </DialogBox>
    </Modal>
  );
}
