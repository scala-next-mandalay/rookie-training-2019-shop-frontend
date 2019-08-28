import React from 'react'
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Parent from '../Parent';
import { act } from 'react-dom/test-utils';
import Login from '../Login';
/*global expect*/
/*global jest*/
/*global MouseEvent*/

let container;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.outerHTML = '<body></body>';
  container = null;
});

let fetchUser =[]; 
const fetchAuthedUser = jest.fn(() => {
  fetchUser =[{id:1,email:"lawoon@gmail.com"},{id:2,email :"aye@gmail.com"}]
});

const user ={id:1,email:"lawoon@gmail.com"}

describe("Login component", () => {
  it('matches the snapshot', () => {
    const LoginSnapshot = renderer.create(
      <Parent><Login fetchAuthedUser={fetchAuthedUser} user={user}/></Parent>
    ).toJSON();
    expect(LoginSnapshot).toMatchSnapshot();
  });
})
