import React from 'react'
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import renderer from 'react-test-renderer';
import ForgotPassword from '../auth/ForgotPassword';
import Parent from '../Parent';

/*global jest*/
/*global expect*/
/*global MouseEvent*/
/*global Event*/

let container;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.outerHTML = '<body></body>';
  container = null;
});



const valueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
let authState = "forgotPassword";
const changeAuthState = jest.fn((signIn) => {
  authState = signIn;
});

const loading = false;
const error = "Forgot password ";
let email = "";
const forgotPassword = jest.fn((email) => {
  email = email;
});

describe("ForgotPassword component snapshot", () => {
  it('matches the snapshot', () => {
    const ForgotPasswordSnapshot = renderer.create(
    <Parent>
      <ForgotPassword
        authState={authState}
        changeAuthState={changeAuthState}
        loading={loading}
        error={error}
        email={email}
        forgotPassword={forgotPassword}
      />
     </Parent>

    ).toJSON();
    expect(ForgotPasswordSnapshot).toMatchSnapshot();

  });

})


describe("Testing ForgotPassword", () => {
  it('Testing textfied and  Send Code button with no data', () => {
    act(() => {
      ReactDOM.render(  
          <Parent>
        <ForgotPassword
        authState={authState}
        changeAuthState={changeAuthState}
        loading={loading}
        error={error}
        email={email}
        forgotPassword={forgotPassword}
      /></Parent>, container);
    });
    
    //With no input data
    const inputArr = document.querySelectorAll('input');
     act(() => {
      valueSetter.call(inputArr[0], '');
      inputArr[0].dispatchEvent(new Event('change', { bubbles: true }));
    });
    
    const buttonArr1 = document.querySelectorAll('button');
    act(() => {
      buttonArr1[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));

    });
     expect(forgotPassword).toHaveBeenCalledWith("");
     
     //With  input data 
    const inputArr1 = document.querySelectorAll('input');
    act(() => {
      valueSetter.call(inputArr1[0], 'a@gmail.com');
      inputArr1[0].dispatchEvent(new Event('change', { bubbles: true }));
    });
    expect(inputArr1[0].value).toBe('a@gmail.com');
    
    const buttonArr = document.querySelectorAll('button');
    act(() => {
      buttonArr[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(forgotPassword).toHaveBeenCalledWith("a@gmail.com");
    
    const linkArr = document.querySelectorAll('a');
    act(() => {
      linkArr[1].dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(changeAuthState).toHaveBeenCalledWith("signIn");
  
  })

})