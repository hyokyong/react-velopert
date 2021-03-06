import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { MdAdd } from 'react-icons/md';
import { useTodoDispatch, useTodoNextId } from './TodoContext';

const CircleButton = styled.button`
  background: #38d9a9;
  &:hover {
    background: #63e6be;
  }

  /* 클릭했을때 */
  &:active {
    background: #20c997;
  }

  /* 다른거 가려야하니까 설정 */
  z-index: 5;

  cursor: pointer;
  width: 80px;
  height: 80px;
  display: block;
  align-items: center;
  justify-content: center;
  font-size: 60px;

  /* 가운데 맨 아래에 보여짐 */
  position: absolute;
  left: 50%;
  bottom: 0px;
  transform: translate(-50%, 50%); /* 이것을 통해 더 정확한 버튼의 위치를 찾아감! 아래 쪽 중앙! */

  color: white;
  border-radius: 50%;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;

  transition: 0.125s all ease-in; /*애니메이션*/

  ${props =>
    props.open &&
    css`
      background: #ff6b6b;
      &:hover {
        background: #ff8787;
      }
      &:active {
        background: #fa5252;
      }
      transform: translate(-50%, 50%) rotate(45deg); /*45도 돌리므로 +가 x처럼 보여지게 됨*/
    `}
`;

const InsertFormPositioner = styled.div`
  width: 100%;
  bottom: 0;
  left: 0;
  position: absolute;
`;

const InsertForm = styled.form`
  background: #f8f9fa;
  padding-left: 32px;
  padding-top: 32px;
  padding-right: 32px;
  padding-bottom: 72px;

  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  border-top: 1px solid #e9ecef;
`;

const Input = styled.input`
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  width: 100%;
  outline: none;
  font-size: 18px;
  box-sizing: border-box; /* 패딩 설정시 삐져나오지 않기 위해 설정을 따로 해줌*/
`;

function TodoCreate() {

    //열렸다가 닫혔다가 해야하기 때문에 상태관리가 필요함!
  const [open, setOpen] = useState(false);

  //input value
  const [value, setValue] = useState('');

  const dispatch = useTodoDispatch();
  const nextId = useTodoNextId();

  const onToggle = () => setOpen(!open); //기존값을 반전 시켜줌

  const onChange = e => setValue(e.target.value); //change value 얻어옴

  const onSubmit = e => {
    e.preventDefault(); // 새로고침 방지
    dispatch({
      type: 'CREATE',
      todo: {
        id: nextId.current,
        text: value,
        done: false
      }
    });
    setValue('');
    setOpen(false);
    nextId.current += 1;
  };

  return (
    <>
      {open && (
        <InsertFormPositioner>
          <InsertForm onSubmit={onSubmit}>
            <Input 
            autoFocus 
            placeholder="할 일을 입력 후, Enter 를 누르세요" 
            onChange={onChange}
            value={value}/>
          </InsertForm>
        </InsertFormPositioner>
      )}
      <CircleButton onClick={onToggle} open={open}>
        <MdAdd />
      </CircleButton>
    </>
  );
}

export default React.memo(TodoCreate);