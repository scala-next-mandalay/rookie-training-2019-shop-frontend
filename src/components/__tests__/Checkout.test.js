import React from 'react'
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import renderer from 'react-test-renderer';
import Checkout from '../Checkout';
import Parent from '../Parent';
import CheckoutForm from '../CheckoutForm';
/*global expect*/
/*global jest*/
let container
beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})



afterEach(() => {
  document.body.outerHTML = '<body></body>'
  container = null
})

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

let showForm=true;
let comp=<CheckoutForm/>
const clearCheckout=jest.fn(()=>{
    
})
// const setRequestParams = jest.fn((form) => {
//   let setRequest ={...form};
// });

describe("Checkout component", () => {
  it('matches the snapshot', () => {
    const CheckoutSnapshot = renderer.create(<Parent>
        <Checkout showForm={showForm} requestParams={requestParams} postResultObj={postResultObj} clearCheckout={clearCheckout} />
    </Parent>).toJSON();

    expect(CheckoutSnapshot).toMatchSnapshot();

  })

})
describe("Testing Checkout Component", () => {
 it('testing ', () => {
    act(() => {
      ReactDOM.render((<Parent>
        <Checkout showForm={showForm} requestParams={requestParams} postResultObj={postResultObj} clearCheckout={clearCheckout} />
        </Parent>), container);
        
   
    });
    expect(clearCheckout).toHaveBeenCalledWith();
     
 });
});