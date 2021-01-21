import React, { createContext, useContext, useState } from 'react';

//2. value를 받아옴
const MyContext = createContext('defaltVlue'); //기본값 생성할때 createContent사용

//3. 여기서 보여주게됨
function Child () {
    const text = useContext(MyContext);
    return <div>안녕하세요? { text }</div>
}

function Parent ({ text }) {
    return <Child text={text}></Child>
}

function GrandParent ( {text}) {
    return <Parent text={text}></Parent>
}

function ContextSample() {
    const [value, setValue] = useState(true);

    return (
        //1. MyContext.Provider에서 설정해준 good을
    <MyContext.Provider value={ value ? 'GOOD' : 'BAD'}>
        <GrandParent></GrandParent>
        <button onClick={() => setValue(!value)}>CLICK ME</button>
    </MyContext.Provider>

    //결론: value가 바뀔때마다 컴포넌트를 타고타고 가는게 아니라! 바로 Child로 넘어가게됨
    )
}

export default ContextSample;