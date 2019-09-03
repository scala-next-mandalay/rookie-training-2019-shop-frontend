
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
                    totalPrice={5500}
                    totalQuantity={8} 
                    /></Parent>
      ), container);
    const divArr = document.querySelectorAll('div span');
    expect(divArr[0].textContent.toUpperCase()).toBe('PRODUCT');
    expect(divArr[1].textContent.toUpperCase()).toBe('DESCRIPTION');
    expect(divArr[2].textContent.toUpperCase()).toBe('QUANTITY');
    expect(divArr[3].textContent.toUpperCase()).toBe('PRICE');
    expect(divArr[4].textContent.toUpperCase()).toBe('TOTAL QUANTITY');
    expect(divArr[5].textContent.toUpperCase()).toBe('SUBTOTAL');
    expect(divArr[6].textContent.toUpperCase()).toBe('SALES TAX');
    expect(divArr[7].textContent.toUpperCase()).toBe('TOTAL PRICE');
    const divArr3 = document.querySelectorAll('.text1 div');
    /*for total*/
    expect(divArr3[0].textContent).toBe('8(Items)');
    expect(divArr3[1].textContent).toBe('5500MMK');
    expect(divArr3[2].textContent).toBe('0.0MMK');
    expect(divArr3[3].textContent).toBe('5500MMK');
    /*name of cart*/
    const divArr4 = document.querySelectorAll('.nameTxt');
    expect(divArr4[0].textContent).toBe('a');
    expect(divArr4[1].textContent).toBe('b');
    /*for quantity x subtotal and total of cart*/
    const divArr5 = document.querySelectorAll('.text2 div');
    expect(divArr5[3].textContent).toBe('5x500MMK');
    expect(divArr5[4].textContent).toBe('2500MMK');
    expect(divArr5[10].textContent).toBe('3x1000MMK');
    expect(divArr5[11].textContent).toBe('3000MMK');
    /*for select box of no of quantity*/
    const optionArr = document.querySelectorAll('select');
    expect(optionArr[0][0].textContent).toBe('1');
    expect(optionArr[0][1].textContent).toBe('2');
    expect(optionArr[0][2].textContent).toBe('3');
    expect(optionArr[0][3].textContent).toBe('4');
    expect(optionArr[0][4].textContent).toBe('5');
    expect(optionArr[0][5].textContent).toBe('6');
    expect(optionArr[0][6].textContent).toBe('7');
    expect(optionArr[0][7].textContent).toBe('8');
    expect(optionArr[0][8].textContent).toBe('9');
    expect(optionArr[0][9].textContent).toBe('10');
    expect(optionArr[0][10].textContent).toBe('11');
    expect(optionArr[0][11].textContent).toBe('12');
    expect(optionArr[0][12].textContent).toBe('13');
    expect(optionArr[0][13].textContent).toBe('14');
    expect(optionArr[0][14].textContent).toBe('15');
    expect(optionArr[0][15].textContent).toBe('16');
    expect(optionArr[0][16].textContent).toBe('17');
    expect(optionArr[0][17].textContent).toBe('18');
    expect(optionArr[0][18].textContent).toBe('19');
    expect(optionArr[0][19].textContent).toBe('20');
    
    
    });
  });
})
