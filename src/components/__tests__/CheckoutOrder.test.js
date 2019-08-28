
import React from 'react'
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import CategoryList from '../CategoryList';
import renderer from 'react-test-renderer';
import Parent from '../Parent';
import CheckoutOrder from '../CheckoutOrder';
/*global jest*/
/*global expect*/
/*global MouseEvent*/
/*global Event*/

let container
beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
  
window.innerWidth = 700;
window.innerHeight = 700;
window.dispatchEvent(new Event('resize'));
})



afterEach(() => {
  document.body.outerHTML = '<body></body>'
  container = null

})



const valueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;

describe("CheckoutOrder component", () => {
  let cart = [{ id: 1, name: "a", quantity: 1, price: 1000, image:"a.jpg",subTotal : 1000 },
             { id: 2, name: "b", quantity: 1, price: 1000 , image:"b.jpg",subTotal : 1000 }];
 const deleteCartItem = jest.fn((id) => {

      if (id === 1) cart = [{ id: 2, name: "b", quantity: 1, price: 1000, subTotal: 1000 }];

      else cart = [{ id: 1, name: "a", quantity: 1, price: 1000, subTotal: 1000 }];

    });
  it('matches the snapshot', () => {
    const CheckoutOrderSnapshot = renderer.create(
    <Parent>
    <CheckoutOrder
      cart={cart}
      totalPrice={2000}
      totalQuantity={2}
      deleteCartItem={deleteCartItem}
    /></Parent>).toJSON();
    expect(CheckoutOrderSnapshot).toMatchSnapshot();

  });

});


describe("testing cart table", () => {

  it('testing delete link in checkoutOrder', () => {
    let cart = [
      { id: 1, name: "a", quantity: 1, price: 1000, subTotal: 1000 },
      { id: 2, name: "b", quantity: 1, price: 1000, subTotal: 1000 }
    ];
    const deleteCartItem = jest.fn((id) => {
      if (id === 1) cart = [{ id: 2, name: "b", quantity: 1, price: 1000, subTotal: 1000 }];
      else cart = [{ id: 1, name: "a", quantity: 1, price: 1000, subTotal: 1000 }];
    });
     act(() => {
      ReactDOM.render((
        <Parent><CheckoutOrder 
                    cart={cart} 
                    totalPrice={2000}
                    totalQuantity={2} 
                    deleteCartItem={deleteCartItem} /></Parent>

      ), container);
    });
  const linkArr = document.querySelectorAll('a');
  //console.log("linkArr",linkArr.length)
  // console.log(document.body.outerHTML)

  act(() => {
  linkArr[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });
  const expectedCart =[{ id: 2, name: "b", quantity: 1, price: 1000, subTotal: 1000 }];
  expect(deleteCartItem).toHaveBeenCalled();
  expect(cart).toStrictEqual(expectedCart);

  act(() => {
  linkArr[1].dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });
  const expectedCart1 =[{ id: 1, name: "a", quantity: 1, price: 1000, subTotal: 1000 }];
  expect(deleteCartItem).toHaveBeenCalled();
  expect(cart).toStrictEqual(expectedCart1);
  });
  
  it('testing and checking recieved data in checkoutOrder', () => {

    let cart = [
      { id: 1, name: "a", quantity: 5, price: 500, subTotal: 2500 },
      { id: 2, name: "b", quantity: 3, price: 1000, subTotal: 3000 }
    ];
     act(() => {

      ReactDOM.render((
        <Parent><CheckoutOrder 
                    cart={cart} 
                    totalPrice={2000}
                    totalQuantity={2} 
                    /></Parent>
      ), container);
      const divArr3 = document.querySelectorAll('div span');
    //   console.log("divArr",divArr3.length)
    //   console.log("#1",divArr3[0].textContent)
    // console.log("#2",divArr3[1].textContent)
    // console.log("#3",divArr3[2].textContent)
    // console.log("#4",divArr3[3].textContent)
    // console.log("#5",divArr3[4].textContent)
    // console.log("#6",divArr3[5].textContent)
    // console.log("#7",divArr3[6].textContent)
    // console.log("#8",divArr3[7].textContent)
    // console.log("#9",divArr3[8].textContent)
    // console.log("#10",divArr3[9].textContent)

    });
  });
})
