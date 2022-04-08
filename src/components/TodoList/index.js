import {React, useState} from 'react';
import { Col, Row, Input, Button, Select, Tag } from 'antd';
import Todo from '../Todo';
import { useDispatch, useSelector } from 'react-redux';
// import { addTodo, searchFilterChange } from '../redux/actions';
import { v4 as uuidv4 } from 'uuid';
import {todosRemainingSelector} from '../redux/selectors';
import todoListSlice from './todoSlice';


export default function TodoList() {
  const [todo, setTodo] = useState("");
  const [priority, setPriority] = useState("Medium");
  
  // const newTodoList = useSelector(todoListSelector);
  const todosRemaining = useSelector(todosRemainingSelector);
  
  const handleInputChange = (e) => {
    setTodo(e.target.value);
  }
  const handlePriorityChange = (value) => {
    setPriority(value);
  }
  const dispatch = useDispatch();
  const handleAddBtnClick = () => {    // dispatch actions from UI
    dispatch(todoListSlice.actions.addTodo({
      id: uuidv4(),
      name: todo,
      completed: false,
      priority: priority
    }));
    setTodo('');
  }
  
  return (
    <Row style={{ height: 'calc(100% - 40px)' }}>
      <Col span={24} style={{ height: 'calc(100% - 40px)', overflowY: 'auto' }}>
        {/* <Todo name='Learn React' prioriry='High' />
        <Todo name='Learn Redux' prioriry='Medium' />
        <Todo name='Learn JavaScript' prioriry='Low' /> */}
        {
          todosRemaining.map(todo=> {
            return (
              <Todo
                key={todo.id}
                id={todo.id}
                name={todo.name}
                prioriry={todo.priority}
                completed={todo.completed}
              />
            )
          })
        }
      </Col>
      <Col span={24}>
        <Input.Group style={{ display: 'flex' }} compact>
          <Input value={todo} onChange={handleInputChange}/>
          <Select defaultValue="Medium" value={priority} onChange={handlePriorityChange}>
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
          <Button type='primary' onClick={handleAddBtnClick}>
            Add
          </Button>
        </Input.Group>
      </Col>
    </Row>
  );
}
