import React, { useRef, useReducer, useMemo, useCallback, createContext } from 'react';
import produce from 'immer';
import UserList from './UserList';
import CreateUser from './CreateUser';
import useInputs from './useInputs'

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는중...');
  return users.filter(user => user.active).length;
}

//app 컴포넌트에서 사용할 초기 상태를 app컴포넌트 밖에! 선언함
const initialState = {
  // inputs: {
  //   username: '',
  //   email: ''
  // },
  users: [
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com',
      active: true
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com',
      active: false
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com',
      active: false
    }
  ]
};

//reducer 함수 app밖에 있음
function reducer(state, action) {
  switch (action.type) {
    //onchange와 관련 있음
    // case 'CHANGE_INPUT':
    //   return {
    //     ...state,
    //     inputs: {
    //       ...state.inputs,
    //       [action.name]: action.value
    //     }
    //   };
      //oncreate
    case 'CREATE_USER':

      //immer사용
      return produce(state, draft => {
        draft.users.push(action.user);
      });

      //기존
      // return {
      //   inputs: initialState.inputs,
      //   users: state.users.concat(action.user)
      // };
      //ontoggle
    case 'TOGGLE_USER':

      //immer사용
      return produce(state, draft => {
        const user = draft.users.find(user => user.id === action.id);
        user.active = !user.active;
      });

      //기존
      // return {
      //   ...state,
      //   users: state.users.map(user =>
      //     user.id === action.id ? { ...user, active: !user.active } : user
      //   )
      // };
    case 'REMOVE_USER':

    //immer사용
      return produce(state, draft => {
        const index = draft.users.findIndex(user => user.id === action.id);
        draft.users.splice(index, 1);
      });

      //기존
      // return {
      //   ...state,
      //   users: state.users.filter(user => user.id !== action.id)
      // };
    default:
      return state;
  }
}

// UserDispatch 라는 이름으로 내보내줍니다.
export const UserDispatch = React.createContext(null);

function App() {
  //state-상태, dispatch- 액션을 발생시킨다는 뜻
  const [state, dispatch] = useReducer(reducer, initialState);

  //useInput 에서 가지고 옴!
  const [form, onChange, reset] = useInputs({
    username: '',
    email: ''
  });
  const { username, email } = form;


  const nextId = useRef(4); //현재 4개의 값이 있으니까 4로 설정

  //비구조 할당으로 추출해줌
  const { users } = state;
  // const { username, email } = state.inputs;

  //usercallback 미리 써줌
  //
  // const onChange = useCallback(e => {
  //   const { name, value } = e.target;
  //   //디스패치 사용!
  //   dispatch({
  //     type: 'CHANGE_INPUT',
  //     name,
  //     value
  //   });
  // }, []);

  const onCreate = useCallback(() => {
    dispatch({
      type: 'CREATE_USER',
      user: {
        id: nextId.current,
        username, //위에서 받아온거 넣어줌
        email //위에서 받아온거 넣어줌
      }
    });
    nextId.current += 1;
    reset();
  }, [username, email, reset]); //여기에 꼭 써줘야함

  //활성 사용자 수 세기
  const count = useMemo(() => countActiveUsers(users), [users]);
  return (
    //context사용하여 value값 바로보내기!!
    <UserDispatch.Provider value={dispatch}>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList
       users={users} 
       />
      <div>활성사용자 수 : {count}</div>
    </UserDispatch.Provider>
  );
}

export default App;
