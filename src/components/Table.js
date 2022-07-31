import styled from "styled-components";

const StyledTable = styled.table`
  border: none;
  border-collapse: separate;
  td,
  th,
  tr {
    padding: 5px;
  }
  td {
    padding: 5px 10px;
  }
  tbody tr {
    :nth-of-type(even) {
      background-color: #dbd9d9;
      border: 1px solid;
    }
    :hover {
      background-color: #cbedf7;
    }
  }
  thead > tr {
    background-color: ${(props) => props.theme.primary.main};
    color: white;
    text-transform: capitalize;
  }
  caption {
    margin: 3px;
    font-weight: bold;
  }
`;

const TabelMarkup = ({ titles, data, handleClick, caption }) => (
  <StyledTable>
    <caption> {caption} </caption>
    <colgroup>
      {titles.map((title, index) => (
        <col key={index} />
      ))}
    </colgroup>
    <thead>
      <tr>
        {titles.map((title, index) => (
          <th key={index}> {title} </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.map((item, index) => (
        <tr key={index} onClick={() => handleClick(item.id)}>
          {titles.map((title, index) => (
            <td key={index}>
              {typeof item[title] == "boolean"
                ? item[title]
                  ? "Yes"
                  : "No"
                : item[title]}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </StyledTable>
);

const Table = ({ data, handleRowClick, instructions }) => {
  return Object.keys(data).length !== 0 ? (
    <TabelMarkup
      titles={Object.keys(data[0])}
      data={data}
      handleClick={handleRowClick ? handleRowClick : () => {}}
      caption={instructions ? instructions : ""}
    />
  ) : (
    "No data Pooulate"
  );
};
export default Table;
