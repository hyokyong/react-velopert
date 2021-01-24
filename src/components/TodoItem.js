import React from 'react';
import styled, { css } from 'styled-components';
import { MdDone, MdDelete } from 'react-icons/md';

const CheckCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  border: 1px solid #ced4da;
  font-size: 24px;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-right: 20px;
  cursor: pointer;

  /*done을 넘겨줍니다*/
  ${props =>
    props.done &&
    css`
      border: 1px solid #38d9a9;
      color: #38d9a9;
    `}
`;

const Text = styled.div`
  flex: 1; /* 자신이 차지하는 모든 영역 */
  font-size: 21px;
  color: #495057;
  ${props =>
    props.done &&
    css`
      color: #ced4da;
    `}
`;

const Remove = styled.div`

    /* 중앙 정렬 */ 
  display: flex;
  align-items: center;
  justify-content: center;

  color: #dee2e6;
  font-size: 24px;
  cursor: pointer;

  &:hover {
    color: #ff6b6b;
  }
  display: none;
`;

const TodoItemBlock = styled.div`
  display: flex;
  align-items: center; /*세로 정렬*/
  padding-top: 12px;
  padding-bottom: 12px;

  &:hover {
    ${Remove} { /* remove 컴포넌트 바로 선택!!!! */
      display: initial;
    }
  }
`;




//프롭스로 3가지 받아옴!
function TodoItem({ id, done, text }) {
  return (
    <TodoItemBlock>
      <CheckCircle done={done}>{done && <MdDone />}</CheckCircle>
      <Text done={done}>{text}</Text>
      <Remove>
        <MdDelete />
      </Remove>
    </TodoItemBlock>
  );
}

export default TodoItem;