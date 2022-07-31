import React, { useState } from "react";
import { IoAddSharp } from "react-icons/io5";

import Table from "../../../components/Table";
import {
  FluidContainer,
  Button,
  Container,
} from "../../../components/CommonComponents";

import Book from "./Book";
import AddEditBookDialog from "./AddEditBookDialog";
import { addBook } from "../../../api/bookAPI";
import { addBook as addBookStore } from "../../../Store/booksSlice";
import { useDispatch } from "react-redux";

const Books = ({ catalog }) => {
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [showAddBookDialog, setShowAddBookDialog] = useState(false);

  const dispatch = useDispatch();
  if (!catalog) {
    catalog = [
      {
        id: "1",
        bookName: "Harry Potter",
        author: "J. K. Rowling",
        borrowedBy:"Maryam",
        borrowedDate: "3/10/2020",
        returndate: "4/10/2021",
      },
      {
        id: "2",
        bookName: "Invisible Man",
        author: "Charles Dickens",
        borrowedBy:"Ayesha",
        borrowedDate: "4/5/2021",
        returndate: "5/8/2022",
      },
      {
        id: "3",
        bookName: "Ethical Hacking ",
        author: "fghdjs",
        borrowedBy: "Jaweria",
        borrowedDate: "6/7/2010",
        returndate: "9/12/2009",
      },
    ];
  }

  const handleTabRowClick = (id) => {
    setSelectedBookId(id);

  };

  const handleBookViewBackClick = () => {
    setSelectedBookId(null);
  };

  const handleAddBook = (confirmed, data) => {
    if (confirmed) {
      addBook(data)
        .then((response) => {
          if (!response.error) {
            dispatch(addBookStore(response.data));
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {});
    }
    setShowAddBookDialog(false);
  };

  return selectedBookId === null ? (
    <>
      <FluidContainer>
        <Container
          flexDirection="row"
          justifyContent="flex-end"
          alignItems="flex-start"
        >
          <Button
            rounded
            onClick={() => {
              setShowAddBookDialog(true);
            }}
          >
            <IoAddSharp />
          </Button>
        </Container>
        <Table
          data={catalog}
          handleRowClick={handleTabRowClick}
        />
      </FluidContainer>
      <AddEditBookDialog show={showAddBookDialog} handleClose={handleAddBook} />
    </>
  ) : (
    <Book id={selectedBookId} handleBackClick={handleBookViewBackClick} />
  );
};

export default Books;