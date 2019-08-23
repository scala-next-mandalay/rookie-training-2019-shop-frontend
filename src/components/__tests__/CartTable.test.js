import React from 'react'
import renderer from 'react-test-renderer';
import Parent from '../Parent';
import CartTable from '../CartTable';
/*global expect*/

let container
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.outerHTML = '<body></body>';
  container = null;
});



// const valueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;



describe("CartTable component", () => {
  let cart = [{ id: 1, name: "a", quantity: 1, price: 1000 },
  { id: 2, name: "b", quantity: 1, price: 1000 }];
  it('matches the snapshot', () => {
    const CartTableSnapshot = renderer.create(
      <Parent><CartTable cart={cart} /></Parent>
    ).toJSON();
    expect(CartTableSnapshot).toMatchSnapshot();
  });
})