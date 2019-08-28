import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
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

describe("testing cart table", () => {

  it('testing and checking data in cart table', () => {

    let cart = [
      { id: 1, name: "a", quantity: 5, price: 500, subTotal: 2500 },
      { id: 2, name: "b", quantity: 3, price: 1000, subTotal: 3000 }
    ];
     act(() => {

      ReactDOM.render((
        <Parent><CartTable 
                    cart={cart} 
                    showQty={true}/></Parent>
      ), container);

    });
   console.log(container.outerHTML)
    const divArr = document.querySelectorAll('div span');
    expect(divArr[0].textContent.toUpperCase()).toBe('IMAGE');
    expect(divArr[1].textContent.toUpperCase()).toBe('DESCRIPTION');
    expect(divArr[2].textContent.toUpperCase()).toBe('PRICE');
    expect(divArr[3].textContent.toUpperCase()).toBe('QUANTITY');
    expect(divArr[4].textContent.toUpperCase()).toBe('TOTAL PRICE');
    
    /*for mobile row*/
    const divArr1 = document.querySelectorAll('div div');
    console.log("#0",divArr1[23].textContent)
    expect(divArr1[6].textContent).toBe("Description:a");
    expect(divArr1[7].textContent).toBe("Qty:5");
    expect(divArr1[9].textContent).toBe("Price:@500Ks");
    expect(divArr1[10].textContent).toBe("Total:2500Ks");
    expect(divArr1[16].textContent).toBe("Description:b");
    expect(divArr1[17].textContent).toBe("Qty:3");
    expect(divArr1[19].textContent).toBe("Price:@1000Ks");
    expect(divArr1[20].textContent).toBe("Total:3000Ks");
    //const divArr2 = document.querySelectorAll('div div div');
    const divArr3 = document.querySelectorAll('div .text2');
    /*for deskop row*/
    console.log("divArr3",divArr3.length)
    expect(divArr3[0].textContent).toBe('a');
    expect(divArr3[1].textContent).toBe('500');
    expect(divArr3[2].textContent).toBe('5');
    expect(divArr3[3].textContent).toBe('2500');
    expect(divArr3[5].textContent).toBe('b');
    expect(divArr3[6].textContent).toBe('1000');
    expect(divArr3[7].textContent).toBe('3');
    expect(divArr3[8].textContent).toBe('3000');
    // console.log("#1",divArr3[0].textContent)
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