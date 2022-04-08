import { 
  Col, Row, Tag, Checkbox, Input, Button, Select 
} from 'antd';
import { useState } from 'react';
import { useDispatch} from 'react-redux';
import todoListSlice from '../TodoList/todoSlice';
import {
  EditOutlined,
  CloseCircleOutlined
} from '@ant-design/icons';
const priorityColorMapping = {
  High: 'red',
  Medium: 'blue',
  Low: 'gray',
};

const toggleTodoStatusAction = todoListSlice.actions.toggleTodoStatus;
// const delTodoAction = todoListSlice.actions.delTodo;

export default function Todo({ name, id, prioriry, completed}) {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(completed);
  const [update, setUpdate] = useState(false);

  const [todo, setTodo] = useState(name);
  const [priority, setPriority] = useState(prioriry);

  // hide/show edit form input
  const toggleEdit = () => {
    setUpdate(!update);
  }
  
  // handleInput text update
  const handleInputUpdate = (e) => {
    setTodo(e.target.value);
  }

  // handleInput priority update
  const handlePriorityUpdate = (value) => {
    setPriority(value);
  }

  const toggleCheckbox = () => {
    setChecked(!checked);
    dispatch(toggleTodoStatusAction(id));
  };

  const handleEditBtnClick = () => {
    dispatch(todoListSlice.actions.editTodo({
        id: id,
        name: todo,
        completed: false,
        priority: priority
    }))
    setUpdate(false);
  }
  return (
    <Row
      justify='space-between'
      align='center'
      style={{
        marginBottom: 3,
        ...(checked ? { opacity: 0.5, textDecoration: 'line-through' } : {}),
      }}
    >
      {
        update ? (
          <Col span={24}>
            <Input.Group style={{ display: 'flex' }} compact>
              <Input value={todo} onChange={handleInputUpdate}/>
              <Select defaultValue="Medium" value={priority} onChange={handlePriorityUpdate}>
                <Select.Option value='High' label='High'>
                  <Tag color='red'>High</Tag>
                </Select.Option>
                <Select.Option value='Medium' label='Medium'>
                  <Tag color='blue'>Medium</Tag>
                </Select.Option>
                <Select.Option value='Low' label='Low'>
                  <Tag color='gray'>Low</Tag>
                </Select.Option>
              </Select>
              <Button type='primary' onClick={handleEditBtnClick}>
                Edit
              </Button>
            </Input.Group>
          </Col>
        ) 
        : 
        (
          <>
            <Col
              span={17}
              style = {{
                display: "flex",
                alignItems: "center"
              }}
            >
              <Checkbox checked={checked} onChange={toggleCheckbox}>
                {name}
              </Checkbox>
            </Col>
            <Col span={7}>
              <Row
                align='center'
              >
                <Col span={12}>
                  <Tag
                  color={priorityColorMapping[prioriry]} 
                  style={{
                    margin: 0,
                    padding: "5px 10px",
                    display: "flex",
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                  >
                  {prioriry}
                  </Tag>
                </Col>
                <Col
                  span={6}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer"
                  }}
                >
                  <EditOutlined 
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onClick={completed ? null : toggleEdit}
                  />
                </Col>
                <Col
                  span={6}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer"
                  }}
                >
                  <CloseCircleOutlined
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onClick={() => dispatch(todoListSlice.actions.delTodo(id))}
                  />
                </Col>
              </Row>
            </Col>
          </>
        )
      }
    </Row>
  );
}
