import styled from "styled-components";

import Spinner from "../components/spinner";
import { Button } from "../components/CommonComponents";
import { DASHBOARD } from "../shared/routes";
import { Link } from 'react-router-dom';

const ErrorContainer = styled.div`
  width: 70vh;
  margin: 20px;
  border: 5px solid ${(props) => props.theme.primary.main};
`;

const Error = styled.h1`
  text-align: center;
  margin: 0.67em 0 0.67em 0;
`;

const ErrorDescription = styled.h3`
  text-align: center;
  margin-top: 1em;
  margin-bottom: 1em;
`;

const Red = styled.span`
  color: Red;
`;
const Hr = styled.hr`
  width: 90%;
  color: ${(props) => props.theme.primary.main};
  border: 1px solid ${(props) => props.theme.primary.main};
  margin-top: 0.5em;
  margin-bottom: 0.5em;
`;

const Error404 = () => {
  return (
    <center>
      <Spinner msg="Searching..." />
      <ErrorContainer>
        <Error>
          <Red>404</Red> Error
        </Error>
        <Hr />
        <ErrorDescription>
          You're in <Red> wrong Book shelf </Red>. So you searched Content isn't
          there. <br /> You can find it in <Red> another location.. </Red>
        </ErrorDescription>
      </ErrorContainer>
      Valid Pages Link :
      <Link to={DASHBOARD}>
        <Button padding="10px 15px">DASHBOARD</Button>
      </Link>
    </center>
  );
};

export default Error404;
