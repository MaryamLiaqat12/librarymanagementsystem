import styled from "styled-components";
import { Container } from "./CommonComponents";

const Label = styled.label `
  font-size: 0.75em;
  margin-bottom: 0.3em;
  display: block;
`;

const StyledInput = styled.input `
  padding: 0.3em;
  border: 2px solid ${(props) => props.theme.primary.main};
  border-radius: 3px;
  margin-bottom: 0.2em;
  width: 100%;
  box-sizing: border-box;
`;

const StyledSelectInput = styled.select `
  padding: 0.3em;
  border: 2px solid ${(props) => props.theme.primary.main};
  border-radius: 3px;
  margin-bottom: 0.2em;
  width: 100%;
  box-sizing: border-box;
  background: white;
`;

const InputFieldContainer = styled(Container)
`
  padding: 0.5em;
`;

export default function Input({ label, value, onChange, ...rest }) {
    return ( <
        InputFieldContainer alingnItems = "flex-start" >
        <
        Label > { label } < /Label> <
        StyledInput value = { value }
        onChange = { onChange } {...rest }
        /> <
        /InputFieldContainer>
    );
}

export function Select({ label, value, onChange, ...rest }) {
    return ( <
        InputFieldContainer alingnItems = "flex-start" >
        <
        Label > { label } < /Label> <
        StyledSelectInput value = { value }
        onChange = { onChange } {...rest }
        /> <
        /InputFieldContainer>
    );
}