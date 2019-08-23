import React from 'react'
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import CheckoutSuccess from '../CheckoutSuccess';
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
  const postResultObj = {
  id:"5",
  first_name: "khin",
  last_name: "lawoon",
  address1: "23 street",
  address2: "CMTZ",
  country: "myanmar",
  state: "mandalay",
  city: "mandalay",
  total_price: 50000
  }
   const history = { push: jest.fn()};
  
    
  // });
  describe("CheckoutSuccess  Component", () => {
  it('matches the snapshot', () => {
    const CheckoutSuccessSnapshotWithPostObj = renderer.create(
      
        <Parent>
          <CheckoutSuccess
            postResultObj={postResultObj}
            history={history}
          />
        </Parent>
    ).toJSON();
    expect(CheckoutSuccessSnapshotWithPostObj).toMatchSnapshot();
  });
 
  });

  describe("Testing Checkout Confirm  Component", () => {
  it('testing checkout order confirm page', () => {
    act(() => {
      ReactDOM.render((
        
      <Parent>
        <CheckoutSuccess
            postResultObj={postResultObj}
            history={history}
          />
      </Parent>
  
      ), container);
    });
    
    //testing order id 
    const divArr = container.querySelectorAll('div .text2');
    expect(divArr[0].textContent).toBe("Your Order Id is 5"); 
     
    /*start table*/
    /*start testing table head*/
    const thArr = container.querySelectorAll('table th');
    expect(thArr[0].textContent.toUpperCase()).toBe('FIRSTNAME');
    expect(thArr[1].textContent.toUpperCase()).toBe('LASTNAME');
    expect(thArr[2].textContent.toUpperCase()).toBe('ADDRESS1');
    expect(thArr[3].textContent.toUpperCase()).toBe('ADDRESS2');
    expect(thArr[4].textContent.toUpperCase()).toBe('COUNTRY');
    expect(thArr[5].textContent.toUpperCase()).toBe('STATE');
    expect(thArr[6].textContent.toUpperCase()).toBe('CITY');
    /*end table head*/
    
    /*start testing table body*/
    const tdArr = document.querySelectorAll('table tbody td');
    expect(tdArr[0].textContent).toBe("khin");
    expect(tdArr[1].textContent).toBe("lawoon");
    expect(tdArr[2].textContent).toBe("23 street");
    expect(tdArr[3].textContent).toBe("CMTZ");
    expect(tdArr[4].textContent).toBe("myanmar");
    expect(tdArr[5].textContent).toBe("mandalay");
    expect(tdArr[6].textContent).toBe("mandalay");
    expect(tdArr[8].textContent.toUpperCase()).toBe('SUBTOTAL');
    expect(tdArr[9].textContent).toBe("50000MMK");
    expect(tdArr[10].textContent.toUpperCase()).toBe('SALES TAX');
    expect(tdArr[11].textContent).toBe("0MMK");
    expect(tdArr[12].textContent.toUpperCase()).toBe('TOTAL PRICE');
    expect(tdArr[13].textContent).toBe("50000MMK");
    /*end table body*/
    
    const buttonArr = document.querySelectorAll('button');
    // console.log("buttonArr",buttonArr.length)
    // console.log("buttonArr",buttonArr[0].textContent)
    // console.log("buttonArr",buttonArr[1].textContent)
    // console.log("buttonArr",buttonArr[2].textContent)
    act(() => {
        buttonArr[2].dispatchEvent(new Event('click', { bubbles: true }))
      });
    expect(buttonArr[2].textContent.toUpperCase()).toBe("SHOPPING")

});
    
});