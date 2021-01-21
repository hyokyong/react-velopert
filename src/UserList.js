import React, { useContext } from 'react';
import { UserDispatch } from './App'

function User({ user }) {
    const { username, email, id, active } = user;
    const dispatch = useContext(UserDispatch);
    return (
      <div>
         <b
        style={{
          cursor: 'pointer',
          color: user.active ? 'green' : 'black'
        }}
        onClick={() => dispatch({
            type: 'TOGGLE_USER',
            id
        })}
      >{username}</b> 
      <span>({email})</span>
        <button onClick={() => dispatch({
            type: 'REMOVE_USER',
            id
        })}>삭제</button>
      </div>
    );
    //앞에 ()를 빼면 렌더링 시점에 렌더링 되니까 꼬 ㄱ써줌
  }

function UserList({ users }) {
      return (
          <div>
              {
                  //map을 사용하여 특정 배열을 컴포넌트 객체로 바꿔줌!
                  users.map(
                      user => (<User 
                                user={user}
                                key={user.id}
                                />) //키를 꼭 넣어주어야함 id값으로! 안그럼 콘솔에러남
                  )
              }
          </div>
      )
}

export default UserList;



//useREF로 관리하는것은 값이 바뀌어도 컴포넌트가 리렌더링 되지 않음!!!!!
//컴포넌트가 리렌더링 될때매다 기억하고 싶은 값을 관리할때 사용!
//주로 settimeout, setInterval, scroll위치 등등
