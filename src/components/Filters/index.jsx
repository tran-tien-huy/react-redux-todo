import { Col, Row, Input, Typography, Radio, Checkbox } from 'antd';
import {useState} from 'react';
import { useDispatch } from 'react-redux';
// import { searchFilterChange, statusFilterChange, prioritiesFilterChange } from '../redux/actions';
import filtersSlice from './filterSlice';
const { Search } = Input;

export default function Filters() {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState(1);
  const [checked, setChecked] = useState(0);

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
    dispatch(filtersSlice.actions.searchFilterChange(e.target.value));
  }

  const handleFilterStatusChange = (e) => {
    setFilterStatus(e.target.value);
    dispatch(filtersSlice.actions.statusFilterChange(e.target.value))
  }
  const toggleCheckbox = () => {
    setChecked(1-checked);
    dispatch(filtersSlice.actions.prioritiesFilterChange(1-checked))
  }
  return (
    <Row justify='center'>
      <Col span={24}>
        <Typography.Paragraph
          style={{ fontWeight: 'bold', marginBottom: 3, marginTop: 10 }}
        >
          Search
        </Typography.Paragraph>
        <Search placeholder='input search text' value={searchText} onChange={handleSearchTextChange}/>
      </Col>
      <Col sm={24}>
        <Typography.Paragraph
          style={{ fontWeight: 'bold', marginBottom: 3, marginTop: 10 }}
        >
          Filter By Status
        </Typography.Paragraph>
        <Radio.Group value={filterStatus} onChange={handleFilterStatusChange}>
          <Radio value={1} checked='true'>All</Radio>
          <Radio value={2}>Completed</Radio>
          <Radio value={3}>To do</Radio>
        </Radio.Group>

      </Col>
      <Col sm={24}>
        <Typography.Paragraph
          style={{ fontWeight: 'bold', marginBottom: 3, marginTop: 10 }}
        >
          Filter By Important
        </Typography.Paragraph>
        <Checkbox
            checked={checked == 1 ? true: false}
            onChange={toggleCheckbox}
          >
            Important
          </Checkbox>
      </Col>
    </Row>
  );
}
