import React from 'react'
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import renderer from 'react-test-renderer';
import Parent from '../Parent';
import TitleBar from '../TitleBar';
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
})


const valueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
const showIcon = true;
const showNav = true;
const showMenu = true;
let handleDrawerToggle=jest.fn(()=>{
  
});
const fetchAuthedUser=jest.fn(()=>{
  let user=[{id:1,email:"a@gmail.com"}]
})
let signIn=jest.fn(()=>{
  let auth=true;
})
let signOut=jest.fn(()=>{
  let auth=false;
})
   const cart=[{ id: 1, name: "a", quantity: 1, price: 1000, subTotal: 1000 },
             { id: 2, name: "b", quantity: 1, price: 1000, subTotal: 1000 }]

describe("Titlebar component", () => {
  
  it('matches the snapshot', () => {
    const TitlebarSnapshot= renderer.create(
      <Parent>
        <TitleBar cart={cart} 
        totalQuantity={2} showMenu={showMenu} showNav={showNav}
        showIcon={showIcon} fetchAuthedUser={fetchAuthedUser}/>
      </Parent>
    ).toJSON();
    expect(TitlebarSnapshot).toMatchSnapshot();

  });
  

});

describe("Testing TitalBar",()=>{
  it('category list and shopping icon',()=>{
    act(()=>{
      ReactDOM.render((
        <Parent>
         <TitleBar cart={cart} 
          totalQuantity={2} showMenu={showMenu} showNav={showNav}
         showIcon={showIcon} fetchAuthedUser={fetchAuthedUser}/>
        </Parent>
        ),container);
    })
   
    const buttonArr = container.querySelectorAll('button');
   
    // console.log("buttonArr",buttonArr.length)
    // console.log("buttonArr",buttonArr[0].textContent)
    // console.log("buttonArr",buttonArr[1].textContent)
    // console.log("buttonArr",buttonArr[2].textContent)
     act(()=>{
      buttonArr[0].dispatchEvent(new MouseEvent('click',{bubbles:true}))
    })
     act(()=>{
      buttonArr[1].dispatchEvent(new MouseEvent('click',{bubbles:true}))
    })
    act(()=>{
      buttonArr[2].dispatchEvent(new MouseEvent('click',{bubbles:true}))
    })

    
 
 
    
    
    
  })
})