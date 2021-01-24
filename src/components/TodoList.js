import React from 'react';
import styled from 'styled-components';

const TodoListBlock = styled.div`
  flex: 1; /* todotemplate에 flex를 사용해줬기때문에 자신이 꽉 차지하게됨!!!!! */
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto; /* 스크롤바 설정 */
  background: gray; /* 사이즈 조정이 잘 되고 있는지 확인하기 위한 임시 스타일 */
`;

function TodoList() {
  return <TodoListBlock>TodoList</TodoListBlock>;
}

export default TodoList;