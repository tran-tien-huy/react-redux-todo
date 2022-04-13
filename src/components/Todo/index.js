import { 
  Col, Row, Tag, Checkbox, Input, Button, Space
} from 'antd';
import { useState } from 'react';
import { useDispatch} from 'react-redux';
import todoListSlice from '../TodoList/todoSlice';
import {
  StarFilled,
  EditOutlined,
  CloseCircleOutlined
} from '@ant-design/icons';



const delTodoAction = todoListSlice.actions.delTodo;
const editTodoAction = todoListSlice.actions.editTodo;
const toggleTodoPriorityAction = todoListSlice.actions.toggleTodoPriority;
const toggleTodoStatusAction = todoListSlice.actions.toggleTodoStatus;

export default function Todo({ name, id, important, completed}) {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(completed);
  const [update, setUpdate] = useState(false);

  const [todo, setTodo] = useState(name);
  const [priority, setPriority] = useState(important);
  console.log(`priority: ${priority}`);
  // hide/show edit form input
  const toggleEdit = () => {
    setUpdate(!update);
  }
  
  // handleInput text update
  const handleInputUpdate = (e) => {
    setTodo(e.target.value);
  }

  const handleEditBtnClick = () => {
    let payload = {
      type: 'edit',
      id: id,
      name: todo,
      completed: false,
      priority: priority
    }
    dispatch(editTodoAction(payload))
    setUpdate(false);
  }
  const handleDelBtnClick = () => {
    dispatch(delTodoAction(id));
  }
  
  // handleInput priority update
  const handlePriorityUpdate = () => {
    setPriority(!priority);
    dispatch(toggleTodoPriorityAction(id));

  }

  const toggleCheckbox = () => {
    setChecked(!checked);
    let payload = {
      type: 'setComplete',
      id: id,
    };
    dispatch(toggleTodoStatusAction(id));
  };

  return (
    <Row
      justify='space-between'
      align='center'
      style={{
        marginBottom: 3
      }}
    >
      {
        update ? (
          <Col span={24}>
            <Input.Group style={{ display: 'flex' }} compact>
              <Input value={todo} onChange={handleInputUpdate}/>              
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
              span={20}
              className='flex-v--center d-flex-wrap'
            >
              <Checkbox
                checked={checked}
                style={{...(checked ? { opacity: 0.5, textDecoration: 'line-through' } : {})}}
                onChange={toggleCheckbox}
              >
                {name}
              </Checkbox>
            </Col>
            <Col span={4} className='flex--center'>
              <Space size="small">
                <StarFilled
                  className= {
                    `todo__action-icon todo__btn cursor-pointer
                    ${priority ? `todo__btn-priority--yellow` : `todo__btn-priority`}`
                  }
                  onClick={handlePriorityUpdate}
                />
                <EditOutlined
                  className='todo__action-icon todo__btn todo__btn-edit cursor-pointer'
                  onClick={toggleEdit}
                />
                <CloseCircleOutlined
                  className='todo__action-icon todo__btn todo__btn-close cursor-pointer'
                  onClick={handleDelBtnClick}
                />
              </Space>
            </Col>
          </>
        )
      }
    </Row>
  );
}