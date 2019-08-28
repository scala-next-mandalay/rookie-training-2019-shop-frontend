import React from 'react'
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Parent from '../Parent';
import { act } from 'react-dom/test-utils';
import Item from '../Item';
/*global expect*/
/*global jest*/
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

let row = [{ id: 1, name: "ver" ,price:4000 ,image: 'pic1' },
            { id: 2, name: "mer" ,price:3000 ,image: 'pic2' }];

let item=null;
const addCartItem = jest.fn((cartrow) => {
   item=cartrow;
});
// const valueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;

describe("Item component", () => {
  it('matches the snapshot', () => {
    const ItemSnapshot = renderer.create(
      <Parent><Item 
      addCartItem={addCartItem} 
      row={row}
     /></Parent>
    ).toJSON();
    expect(ItemSnapshot).toMatchSnapshot();
  });
});

describe("Testing Item  Component", () => {
 it('testing Item add to cart button', () => {
  const row = [{ id: 1, name: "ver" ,price:4000 ,image: 'pic1' },
            { id: 2, name: "mer" ,price:3000 ,image: 'pic2' }];

let item=null;
const addCartItem = jest.fn((cartrow) => {
   item=cartrow;
});
    act(() => {
      ReactDOM.render((
        
        <Parent>
         <Item 
          addCartItem={addCartItem} 
          row={row}/>
        </Parent>
  
      ), container);
   
    });
    const buttonArr=container.querySelectorAll('button');
    act(()=>{
       buttonArr[0].dispatchEvent(new Event('click', { bubbles: true }));
    });
    expect(addCartItem).toHaveBeenCalled();
          
  
    });
});