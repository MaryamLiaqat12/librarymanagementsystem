import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { Button, FlexRow, Select } from "../../../components/CommonComponents";
import { Modal, DialogBox } from "../../../components/Modal";
import Spinner from "../../../components/spinner";

export default function LendDialog({ handleClose, show }) {
  const [member, SetMember] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [members, SetMembers] = useState(null);

  const sendComfirm = () => {
    if (member !== "") {
      handleClose(true, member);
    } else {
      alert("Please Select a Member");
    }
  };

  const sendCancle = () => handleClose(false, null);
  const membersFromReduxStore = useSelector((state) => state.members.value);

  useEffect(() => {
    setIsLoading(true);
    const response = membersFromReduxStore;
    SetMembers(response);
    setIsLoading(false);
  }, [membersFromReduxStore]);

  return (
    <Modal show={show}>
      <DialogBox>
        <h2>Lend Book</h2>
        <p>Select member to continue and comfirm</p>
        {!isLoading && members !== null ? (
          <>
            <Select
              id="member-select"
              onChange={(e) => SetMember(e.target.value)}
              value={member}
            >
              <option value="">-- Please Select a Member</option>
              {members.map((member, index) => (
                <option key={index} value={member.id}>
                  {member.firstName +
                    " " +
                    member.lastName}
                </option>
              ))}
            </Select>
            <FlexRow>
              <Button onClick={sendComfirm}>Comfirm</Button>
              <Button onClick={sendCancle} color="secondary">
                Cancle
              </Button>
            </FlexRow>
          </>
        ) : (
          <Spinner />
        )}
      </DialogBox>
    </Modal>
  );
}