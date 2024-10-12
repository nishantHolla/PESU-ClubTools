import Select from "react-select";

function Dropdown(props) {
  return <Select {...props} isSearchable={false} />;
}

export default Dropdown;
