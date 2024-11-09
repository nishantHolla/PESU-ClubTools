import Select from "react-select";

const customStyles = {
  control: (provided) => ({
    ...provided,
    minWidth: "200px"
  }),
};

function Dropdown(props) {
  return <Select {...props} isSearchable={false} styles={customStyles} />;
}

export default Dropdown;
