import React, { useEffect, useState } from "react";
import { IoReturnUpBack } from "react-icons/io5";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import {
  Button,
  Container,
  ContainerInline,
  FlexRow,
} from "../../../components/CommonComponents";
import Spinner from "../../../components/spinner";
import ComfirmationDialog from "../../../components/ComfirmationDialog";
import AddEditMemberDialog from "./AddEditMemberDialog";

import { deleteMember, editMember } from "../../../api/memberAPI";
import memberCover from "../../../shared/memberCover.png";
import {
  updatedMembers,
  deleteMember as deleteMemberStore,
} from "../../../Store/membersSlice";

const ContainerInlineTextAlignLeft = styled(ContainerInline)`
  align-items: flex-start;
  flex: 2;
`;

const ContainerInlineBox = styled(ContainerInline)`
  border: 5px solid ${(props) => props.theme.primary.dark};
  border-radius: 1em;
  margin-right: 30px;
  :hover {
    background: ${(props) => props.theme.primary.light};
  }
`;

const H1 = styled.h1`
  text-align: center;
  line-height: 2.3rem;
  margin: 10px auto;
`;

const H2 = styled.h2`
  text-align: center;
  margin: 10px auto;
`;

const H4 = styled.h4`
  text-align: center;
  margin: 0px auto;
`;

const H5 = styled.p`
  line-height: 1.5rem;
  font-size: 1rem;
  possition: inline;
`;

const Member = ({ id, handleBackClick }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteComfirmation, setShowDeleteComfirmation] = useState(false);
  const [showEditComfirmation, setShowEditComfirmation] = useState(false);
  const [MemberborrowedBook, SetMemberborrowedBook] = useState(null);

  const dispatch = useDispatch();

  // Select Redux Store Data
  const members = useSelector((state) => state.members.value);
  const member = members.find((element) => element.id === id);
  const books = useSelector((state) => state.books.value);

  const MemberId = member.id;

  const handleDelete = (comfirmation) => {
    if (comfirmation) {
      deleteMember(member.id)
        .then((response) => {
          if (!response.error) {
            handleBackClick();
            dispatch(deleteMemberStore(response.data));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setShowDeleteComfirmation(false);
  };

  const handleEdit = (comfirmation, data) => {
    if (comfirmation) {
      editMember(MemberId, data)
        .then((response) => {
          if (!response.error) {
            dispatch(updatedMembers(response.data));
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    setShowEditComfirmation(false);
  };

  // Check selected Member borrowed any Book?
  useEffect(() => {
    const borrowedBookDetails = books.find(
      (item) => item.burrowedMemberId === MemberId
    );
    if (borrowedBookDetails) {
      SetMemberborrowedBook(borrowedBookDetails);
    } else {
      SetMemberborrowedBook(null);
    }
  }, [books]);

  // Get Book Borrowed Member Full Name
  var MemberFullName =
    member.firstName + " " + member.lastName;

  return (
    <>
      <Container>
        <Button size="1.4" onClick={handleBackClick}>
          <IoReturnUpBack />
        </Button>
        {!isLoading && member !== null ? (
          <>
            <FlexRow width="100%">
              <ContainerInlineBox>
                <img
                  src={memberCover}
                  alt="Member Cover"
                  style={{
                    width: "200px",
                    alignItem: "right",
                    margin: "auto",
                  }}
                />
                <H1>{MemberFullName}</H1>
                
                <H2>{`Member ID : ${member.id}`}</H2>

                <FlexRow padding="1em" margin="auto">
                  <Button
                    onClick={() => {
                      setShowEditComfirmation(true);
                    }}
                  >
                    Edit
                  </Button>
                  {MemberborrowedBook === null ? (
                    <Button
                      color="danger"
                      onClick={() => {
                        setShowDeleteComfirmation(true);
                      }}
                    >
                      Delete
                    </Button>
                  ) : (
                    ""
                  )}
                </FlexRow>
              </ContainerInlineBox>

              <ContainerInlineTextAlignLeft>
                
                {MemberborrowedBook === null ? (
                  ""
                ) : (
                  <>
                    <br />
                    <br />

                    <H2>
                      <u>Borrowed Book Details</u>
                    </H2>
                    <H5>
                      Book : <b>{MemberborrowedBook.title}</b>
                    </H5>
                    <H5>
                      by <b>{MemberborrowedBook.author}</b>
                    </H5>
                    <H5>
                      Borrowed Date: <b> {MemberborrowedBook.burrowedDate}</b>
                    </H5>
                  </>
                )}
              </ContainerInlineTextAlignLeft>
            </FlexRow>
          </>
        ) : (
          <Spinner />
        )}
      </Container>

      <ComfirmationDialog
        handleClose={handleDelete}
        show={showDeleteComfirmation}
        headerText="Comfirm Member Deletion"
        detailText="Are you sure you want to delete this member? This action can't be undone"
      />

      <AddEditMemberDialog
        handleClose={handleEdit}
        show={showEditComfirmation}
        data={member}
        isEdit="true"
      />
    </>
  );
};

export default Member;
