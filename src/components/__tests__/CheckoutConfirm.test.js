import React from 'react'
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import CheckoutConfirm from '../CheckoutConfirm';
import { Provider } from 'react-redux'
import Parent from '../Parent';
import store from '../../store';
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



const valueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
const requestParams = {
  first_name: "khin",
  last_name: "lawoon",
  address1: "23 street",
  address2: "CMTZ",
  country: "myanmar",
  state: "mandalay",
  city: "mandalay",
  total_price: 50000
}

const postResultObj = {
  id: 5,
  total_price: 50000
}

const history = { push: jest.fn() };
const postOrder =jest.fn(() => {
    
});
describe("Confirm Order component", () => {
  it('matches the snapshot', () => {
    const CheckoutConfirmSnapshotWithPostObj = renderer.create(
      
        <Parent>
          <CheckoutConfirm
            requestParams={requestParams}
            postResultObj={postResultObj}
            totalQuantity={5}
          />
        </Parent>
    ).toJSON();
    expect(CheckoutConfirmSnapshotWithPostObj).toMatchSnapshot();
  });
  it('matches the snapshot', () => {
    const CheckoutConfirmSnapshot = renderer.create(
      <Parent>
          <CheckoutConfirm
            requestParams={requestParams}
            postResultObj={null}
            totalQuantity={5}
          />
        </Parent>
    ).toJSON();

    expect(CheckoutConfirmSnapshot).toMatchSnapshot();

  });

});

describe("Testing Checkout Confirm  Component", () => {
 it('testing checkout order confirm page', () => {
    act(() => {
      ReactDOM.render((
        
          <Parent>
            <CheckoutConfirm
              requestParams={requestParams}
              postResultObj={postResultObj}
              totalQuantity={5}
              history ={history}
              postOrder = {postOrder}
            />
          </Parent>
  
      ), container);
   
    });
    
    const divArr = document.querySelectorAll('div.text2');
   
    expect(divArr[0].textContent).toBe("khin");
    expect(divArr[1].textContent).toBe("lawoon");
    expect(divArr[2].textContent).toBe("23 street");
    expect(divArr[3].textContent).toBe("CMTZ");
    expect(divArr[4].textContent).toBe("myanmar");
    expect(divArr[5].textContent).toBe("mandalay");
    expect(divArr[6].textContent).toBe("mandalay");
    
    const buttonArr = document.querySelectorAll('BUTTON');
    act(() => {
      buttonArr[2].dispatchEvent(new Event('click', { bubbles: true }))
    });
    expect(buttonArr[2].textContent.toUpperCase()).toBe("SHOPPING")
    act(() => {
      buttonArr[3].dispatchEvent(new Event('click', { bubbles: true }))
    });
    

    act(() => {
      buttonArr[4].dispatchEvent(new Event('click', { bubbles: true }))
    });
 
    act(() => {
      buttonArr[5].dispatchEvent(new Event('click', { bubbles: true }))
    });
     const expectedInfo=
          {first_name: "khin",
          last_name: "lawoon",
          address1: "23 street",
          address2: "CMTZ",
          country: "myanmar",
          state: "mandalay",
          city: "mandalay",
          total_price: 50000
          }
    expect(postOrder).toHaveBeenCalled();
    expect(requestParams).toStrictEqual(expectedInfo);
    
    act(() => {
      buttonArr[6].dispatchEvent(new Event('click', { bubbles: true }))
    });

 });
    
});