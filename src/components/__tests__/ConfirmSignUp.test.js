import React from 'react'
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import renderer from 'react-test-renderer';
import ConfirmSignUp from '../auth/ConfirmSignUp';
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
let authState="confirmSignUp" ;
const changeAuthState = jest.fn(()=>{
  authState ="Signup";
});

const loading =false;
const error = "Please enter confirmation code";
const email = "a@gmail.com";
const confirmSignUp = jest.fn((email,comfirmationCode) =>{
  let cod = comfirmationCode;

});

describe("ConfirmSingup component snapshot", () => {
  it('matches the snapshot', () => {
    const ConfirmSingupSnapshot = renderer.create(
        <Parent>
        <ConfirmSignUp 
        authState={authState}
        changeAuthState={changeAuthState}
        loading={loading}
        error={error}
        email={email}
        confirmSignUp = {confirmSignUp}
        />
        </Parent>

    ).toJSON();
    expect(ConfirmSingupSnapshot).toMatchSnapshot();

  });

});



describe("Testing ConfirmSingup with user input text field", () => {
  it('Testing textfied and confirm button with data', () => {
    act(() => {
      ReactDOM.render(  
    <Parent>
      <ConfirmSignUp 
        authState={authState}
        changeAuthState={changeAuthState}
        loading={loading}
        error={error}
        email={email}
        confirmSignUp = {confirmSignUp}
        /></Parent>, container);
      
    });
    const inputArr = document.querySelectorAll('input');
    act(() => {
      valueSetter.call(inputArr[0], '1234');
      inputArr[0].dispatchEvent(new Event('change', { bubbles: true }));
    });
    expect(inputArr[0].value).toBe('1234');

    const buttonArr = document.querySelectorAll('button');
    act(() => {
      buttonArr[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(confirmSignUp).toHaveBeenCalledWith("a@gmail.com","1234");

    act(() => {
      valueSetter.call(inputArr[0], '');
      inputArr[0].dispatchEvent(new Event('change', { bubbles: true }));
    });
    

    const buttonArr1 = document.querySelectorAll('button');
    act(() => {
      buttonArr1[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));

    });
    expect(confirmSignUp).toHaveBeenCalledWith("a@gmail.com","");

   });

})