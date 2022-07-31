import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Tabs from "../../components/Tabs";
import Spinner from "../../components/spinner";

import Books from "./Books/index";
import Members from "./Members/index";

import { setBooks } from "../../Store/booksSlice";
import { getBooks } from "../../api/bookAPI";
import { setMembers } from "../../Store/membersSlice";
import { getMembers } from "../../api/memberAPI";

const Dashboard = () => {
    const [isLoading, setIsLoading] = useState(false);

    const booksFromRedux = useSelector((state) => state.books.value);
    const membersFromRedux = useSelector((state) => state.members.value);
    const dispatch = useDispatch();

    useEffect(() => {
        setIsLoading(true);
        getBooks()
            .then((response) => {
                if (!response.error) {
                    dispatch(setBooks(response.data));
                }
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
        // dispatch(setMembers(getMembers()));
    }, [dispatch]);

    useEffect(() => {
        setIsLoading(true);
        getMembers()
            .then((response) => {
                if (!response.error) {
                    dispatch(setMembers(response.data));
                }
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [dispatch]);

    const contents = [{
            title: "Books",
            elements: < Books catalog = { booksFromRedux }
            />,
        },
        {
            title: "Students",
            elements: < Members catalog = { membersFromRedux }
            />,
        },
    ];
    return < Tabs contents = { contents }
    />;
};

export default Dashboard;