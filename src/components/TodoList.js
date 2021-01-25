import React from 'react';
import styled from 'styled-components';
import TodoItem from './TodoItem';
import { useTodoState } from './TodoContext';

const TodoListBlock = styled.div`
  flex: 1; /* todotemplate에 flex를 사용해줬기때문에 자신이 꽉 차지하게됨!!!!! */
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto; /* 스크롤바 설정 */
`;

function TodoList() {
    const todos = useTodoState();

  return (
    <TodoListBlock>
    {todos.map(todo => (
      <TodoItem
        key={todo.id}
        id={todo.id}
        text={todo.text}
        done={todo.done}
      />
    ))}
  </TodoListBlock>
  )
}

export default TodoList;