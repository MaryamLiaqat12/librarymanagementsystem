import React, { useState } from "react";
import styled from "styled-components";

export const TabsContainer = styled.div`
  overflow: hidden;
  height: 100%;
  max-width: 80%;
  min-width: 80%;
  margin: 0px 10vh;
`;

const TabButtonContainer = styled.div`
  display: flex;
  > * {
    flex: 1 1 0;
    max-width: 10em;
  }
`;

export const Tab = styled.button`
  color: ${(props) => (props.active ? "white" : "black")};
  border: ${(props) => (props.active ? "none" : "1px solid black")};
  border-bottom: none;
  outline: none;
  cursor: pointer;
  possion: relative;
  padding: 8px 10px;
  background-color: ${(props) => (props.active ? "#29b6f6" : "white")};
  font-size: 1rem;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  margin: 0px 5px 0px 0px;
  :hover {
    background-color: ${(props) =>
      props.active ? props.theme.primary.dark : "#00eeff"};
  }
`;

export const TabContents = styled.div`
  min-height: 80vh;
  border: 5px solid ${(props) => props.theme.primary.main};
  border-top: 10px solid ${(props) => props.theme.primary.main};
  border-radius: 15px;
  border-top-left-radius: 0px;
  padding: 1rem 2rem;
`;

export const Content = styled.div`
  display: ${(props) => (props.active ? "" : "none")};
`;

export default function Tabs(props) {
  const { contents } = props;

  const [active, setActive] = useState(0);

  function handleTabClick(event) {
    const Index = parseInt(event.target.id, 0);
    if (Index !== active) {
      setActive(Index);
    }
  }

  return (
    <TabsContainer>
      <TabButtonContainer>
        {contents.map((contents, index) => (
          <Tab
            id={index}
            onClick={handleTabClick}
            active={active === index}
            key={index}
          >
            {contents.title}
          </Tab>
        ))}
      </TabButtonContainer>
      <TabContents>
        {contents.map((contents, index) => (
          <Content active={active === index} key={index}>
            {contents.elements}
          </Content>
        ))}
      </TabContents>
    </TabsContainer>
  );
}
