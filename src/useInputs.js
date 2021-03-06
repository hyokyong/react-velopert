import { useState, useCallback } from 'react';

//커스텀 훅 만들기 (use~~으로 이름 지으면 됨)
//useState를 사용했음
function useInputs(initialForm) { //initialForm - input에서 관리할 초기값
  const [form, setForm] = useState(initialForm);
  // change
  const onChange = useCallback(e => {
    const { name, value } = e.target;
    setForm(form => ({ ...form, [name]: value }));
  }, []);

  
  //
  //폼 초기화 함수
  const reset = useCallback(() => setForm(initialForm), [initialForm]);

  //세가지 값을 반환!
  return [form, onChange, reset];
}

export default useInputs;

