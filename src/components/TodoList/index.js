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
  
  const todosRemaining = useSelector(todosRemainingSelector);
  let todosCompleted = todosRemaining.filter(item => item.priority == 1);
  let todosIncompleted = todosRemaining.filter(item => item.priority == 0);

  todosCompleted.sort((a,b) => {
    if(a.name > b.name) {
      return 1;
    }
    if(a.name < b.name) {
      return -1;
    }
    return 0;
  });

  todosIncompleted.sort((a,b) => {
    if(a.name > b.name) {
      return 1;
    }
    if(a.name < b.name) {
      return -1;
    }
    return 0;
  });
  let newTodosRemaining = [...todosCompleted, ...todosIncompleted];
  const handleInputChange = (e) => {
    setTodo(e.target.value);
  }
  const dispatch = useDispatch();
  const handleAddBtnClick = () => {    
    // dispatch actions from UI
    dispatch(todoListSlice.actions.addTodo({
      id: uuidv4(),
      name: todo.trim(),
      completed: false,
      priority: 0
    }));
    setTodo('');
  }
  
  return (
    <Row style={{ height: 'calc(100% - 40px)' }}>
      <Col span={24} style={{ height: 'calc(100% - 40px)', overflowY: 'auto' }}>
        {
          newTodosRemaining.map((todo) => {
            return (
              <Todo
                key={todo.id}
                id={todo.id}
                name={todo.name}
                important={todo.priority}
                completed={todo.completed}
              />
            )
          })
        }
      </Col>
      <Col span={24}>
        <Input.Group style={{ display: 'flex', gap: '20px'}} compact>
          <Input value={todo} onChange={handleInputChange}/>
          <Button type='primary' onClick={handleAddBtnClick}>
            Add
          </Button>
        </Input.Group>
      </Col>
    </Row>
  );
}