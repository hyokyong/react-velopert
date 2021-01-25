import React, { useReducer, createContext, useContext, useRef } from 'react';

//투두 객체
const initialTodos = [
  {
    id: 1,
    text: '프로젝트 생성하기',
    done: true
  },
  {
    id: 2,
    text: '컴포넌트 스타일링하기',
    done: true
  },
  {
    id: 3,
    text: 'Context 만들기',
    done: false
  },
  {
    id: 4,
    text: '기능 구현하기',
    done: false
  }
];

/*create, toggle, remove */
function todoReducer(state, action) {
  switch (action.type) {
    case 'CREATE':
      return state.concat(action.todo);
    case 'TOGGLE':
      return state.map(todo =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo
      );
    case 'REMOVE':
      return state.filter(todo => todo.id !== action.id);
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const TodoStateContext = createContext(); //state를 위한 컨텍스트
const TodoDispatchContext = createContext(); //dispatch를 위한 컨텍스트

const TodoNextIdContext = createContext(); //다음아이디를 관리하기 위하여 useRef를 사용함!


//하나의 컴포넌트
export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialTodos); //useReducer 사용함
  const nextId = useRef(5); //useRef 사용함

  console.log(state);

  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        <TodoNextIdContext.Provider value={nextId}>
          {children}
        </TodoNextIdContext.Provider>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

//커스텀 훅 만들기 useContext 이용함!
//이렇게 에러처리를 해주면 나중에 찾기 쉬움!
export function useTodoState() {
    const context = useContext(TodoStateContext);
    if (!context) {
      throw new Error('Cannot find TodoProvider');
    }
    return context;
  }
  
  export function useTodoDispatch() {
    const context = useContext(TodoDispatchContext);
    if (!context) {
      throw new Error('Cannot find TodoProvider');
    }
    return context;
  }
  
  export function useTodoNextId() {
    const context = useContext(TodoNextIdContext);
    if (!context) {
      throw new Error('Cannot find TodoProvider');
    }
    return context;
  }