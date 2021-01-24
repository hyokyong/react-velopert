import React from 'react';
import styled from 'styled-components';
import TodoItem from './TodoItem';

const TodoListBlock = styled.div`
  flex: 1; /* todotemplate에 flex를 사용해줬기때문에 자신이 꽉 차지하게됨!!!!! */
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto; /* 스크롤바 설정 */
`;

function TodoList() {
  return (
    <TodoListBlock>
        <TodoItem text="프로젝트 생성하기1" done={true}></TodoItem>
        <TodoItem text="프로젝트 생성하기2" done={true}></TodoItem>
        <TodoItem text="프로젝트 생성하기3" done={true}></TodoItem>
        <TodoItem text="프로젝트 생성하기4" done={false}></TodoItem>
        <TodoItem text="프로젝트 생성하기5" done={false}></TodoItem>
    </TodoListBlock>
  )
}

export default TodoList;