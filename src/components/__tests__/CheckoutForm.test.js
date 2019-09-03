import React from 'react'
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import renderer from 'react-test-renderer';
import CheckoutForm from '../CheckoutForm';
import { BrowserRouter as Router } from 'react-router-dom';
import Parent from '../Parent';
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

const history = { push: jest.fn('') };
 //console.log("history",history.length)
const cart = [{ id: 1, name: "a", quantity: 1, price: 1000 },
  { id: 2, name: "b", quantity: 1, price: 1000 }];
let setRequest=null;
const setRequestParams = jest.fn((form) => {
    setRequest ={...form};
});

const requestParams = {
        first_name: "",
        last_name: "",
        address1: "",
        address2: "",
        country: "",
        state: "",
        city: ""
}

const valueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;





describe("CheckoutForm component", () => {
  it('matches the snapshot', () => {
    const CheckoutFormSnapshot = renderer.create(
    <Parent>
        <CheckoutForm cart={cart} totalPrice={2000} totalQuantity={2} history={history}/>
    </Parent>).toJSON();
    expect(CheckoutFormSnapshot).toMatchSnapshot();
  });
});


describe("testing CheckoutForm ", () => {

  it('testing textfield handelchange and click comfirm button', () => {
     act(() => {
      ReactDOM.render((<Parent>
          <CheckoutForm cart={cart} totalPrice={2000} totalQuantity={2}  history={history} requestParams={requestParams} setRequestParams={setRequestParams} />
      </Parent>), container);
    });
 
    const inputArr = document.querySelectorAll('input');
    act(() => {
      valueSetter.call(inputArr[0], "khin Lawoon");
      inputArr[0].dispatchEvent(new Event('change', { bubbles: true }));
    });
    act(() => {
      valueSetter.call(inputArr[1], "Pyae");
      inputArr[1].dispatchEvent(new Event('change', { bubbles: true }));
    });
    act(() => {
      valueSetter.call(inputArr[2], "ye mon taung");
      inputArr[2].dispatchEvent(new Event('change', { bubbles: true }));
    });
    act(() => {
      valueSetter.call(inputArr[3], "mandalay");
      inputArr[3].dispatchEvent(new Event('change', { bubbles: true }));
    });
    act(() => {
      valueSetter.call(inputArr[4], "myanmar");
      inputArr[4].dispatchEvent(new Event('change', { bubbles: true }));
    });
    act(() => {
      valueSetter.call(inputArr[5], "mandalay");
      inputArr[5].dispatchEvent(new Event('change', { bubbles: true }));
    });
    act(() => {
      valueSetter.call(inputArr[6], "mandalay");
      inputArr[6].dispatchEvent(new Event('change', { bubbles: true }));
    });
   
    expect(inputArr[0].value).toBe("khin Lawoon");
    expect(inputArr[1].value).toBe("Pyae");
    expect(inputArr[2].value).toBe("ye mon taung");
    expect(inputArr[3].value).toBe("mandalay");
    expect(inputArr[4].value).toBe("myanmar");
    expect(inputArr[5].value).toBe("mandalay");
    expect(inputArr[6].value).toBe("mandalay");

    const buttonArray = document.querySelectorAll('button');
  
    act(() => {
    buttonArray[2].dispatchEvent(new Event('click', { bubbles: true }))
    });
    expect(buttonArray[2].textContent.toUpperCase()).toBe("SHOPPING")
   
 
   
    act(() => {
      buttonArray[3].dispatchEvent(new Event('click', { bubbles: true }))
    });
    expect(buttonArray[3].textContent.toUpperCase()).toBe("CONFIRM")
    expect(setRequestParams).toHaveBeenCalled();
 

 });
 it('testing history push link of shopping', () => {
  const history = { push: jest.fn("") };
  act(() => {
   ReactDOM.render((<Parent>
       <CheckoutForm cart={cart} totalPrice={2000} totalQuantity={2}  history={history} requestParams={requestParams} setRequestParams={setRequestParams} />
   </Parent>), container);
 });

 const button=document.querySelectorAll('button');  
  //console.log(container.outerHTML)
 //expect(button[2].textContent).toBe("Shopping")
 // expect( history.push ).toBe( '/' );
 // expect(history.push.mock.calls[0]).toEqual(['/']);
 //expect(button[2].getAttribute("href")).toBe("/")
})
})
    
    
   



