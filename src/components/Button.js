import React from 'react';
import classNames from 'classnames';
import './components/Button.scss';

function Button({ children, size }) {

  //clasenamse를 사용해줌! Button size 형태
  return <button className={classNames('Button', size)}>{children}</button>;
}

//디폴트 값 미디움
Button.defaultProps = {
  size: 'medium'
};



export default Button;