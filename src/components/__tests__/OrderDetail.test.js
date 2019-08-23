import React from 'react'
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Parent from '../Parent';
import { act } from 'react-dom/test-utils';
import OrderDetail from '../OrderDetail';
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
const orderitems = [{ id: 1,order_id:5,item_id:12, name: "item1",quantity:2,unit_price:800,total_price:1600,},
                    { id: 2,order_id:5,item_id:10, name: "item2" ,quantity:5,unit_price:500,total_price:2500, }];

const selectedOrder ={
  first_name: "khin",
  last_name: "lawoon",
  address1: "23street",
  address2: "CMTZ",
  country: "myanmar",
  state: "mandalay",
  city: "mandalay",
  created_at :"2019-07-30 07:48:47",
  total_price: 4100
}
describe("OrderDetail component", () => {
  it('matches the snapshot', () => {
    const OrderDetailSnapshotWithSelectedOrder = renderer.create(
      <Parent><OrderDetail 
      orderitems={orderitems}
      selectedOrder={selectedOrder}
     /> </Parent>
    ).toJSON();
    expect(OrderDetailSnapshotWithSelectedOrder).toMatchSnapshot();
  });
  
  
    it('matches the snapshot', () => {
    const OrderDetailSnapshot = renderer.create(
      <Parent><OrderDetail 
      orderitems={orderitems}
      selectedOrder={null}
      /> </Parent>
    ).toJSON();
    expect(OrderDetailSnapshot).toMatchSnapshot();

});
  
});


describe("Testing OrderDetail  Component", () => {
 it('testing and checking recieved data of  order detail page', () => {
    act(() => {
      ReactDOM.render((<Parent><OrderDetail
      selectedOrder={selectedOrder}
      orderitems={orderitems}
      
     /> 
     </Parent>), container);
   
    });
    
    //table head
    const thArr = container.querySelectorAll('table th');
    expect(thArr[0].textContent.toUpperCase()).toBe('ID');
    expect(thArr[1].textContent.toUpperCase()).toBe('ORDERID');
    expect(thArr[2].textContent.toUpperCase()).toBe('ITEM ID');
    expect(thArr[3].textContent.toUpperCase()).toBe('ITEM NAME');
    expect(thArr[4].textContent.toUpperCase()).toBe('PRICE');
    expect(thArr[5].textContent.toUpperCase()).toBe('QTY');
    expect(thArr[6].textContent.toUpperCase()).toBe('TOTAL PRICE');
    
    const tdArr = container.querySelectorAll('table td');
    //first row-----
    expect(tdArr[0].textContent).toBe("1");
    // expect(tdArr[1].textContent).toBe("5");
    expect(tdArr[2].textContent).toBe("12");
    expect(tdArr[3].textContent).toBe("item1");
    expect(tdArr[4].textContent).toBe("800");
    expect(tdArr[5].textContent).toBe("2");
    expect(tdArr[6].textContent).toBe("1600");
    
    //second row----
    expect(tdArr[7].textContent).toBe("2");
    // expect(tdArr[1].textContent).toBe("5");
    expect(tdArr[9].textContent).toBe("10");
    expect(tdArr[10].textContent).toBe("item2");
    expect(tdArr[11].textContent).toBe("500");
    expect(tdArr[12].textContent).toBe("5");
    expect(tdArr[13].textContent).toBe("2500");
    
    
    const divArr2 = container.querySelectorAll('.text2 div');
    expect(divArr2[0].textContent).toBe("Order Date- 2019-07-30 07:48:47");
    expect(divArr2[1].textContent).toBe("Order Total- 4100");
    expect(divArr2[2].textContent.toUpperCase()).toBe('BILLING ADDRESS');
    expect(divArr2[3].textContent).toBe("khin lawoon");
    expect(divArr2[4].textContent).toBe("23street CMTZ");
    expect(divArr2[5].textContent).toBe("mandalay");
    expect(divArr2[6].textContent).toBe("mandalay");
    expect(divArr2[7].textContent).toBe("myanmar");
    expect(divArr2[9].textContent.toUpperCase()).toBe('PAYMENT METHOD');
    expect(divArr2[10].textContent.toUpperCase()).toBe('CHECKMONEY/MONEYORDER');
    expect(divArr2[11].textContent.toUpperCase()).toBe('DELIVERY ADDRESS');
    expect(divArr2[12].textContent).toBe("khin lawoon");
    expect(divArr2[13].textContent).toBe("23street CMTZ");
    expect(divArr2[14].textContent).toBe("mandalay");
    expect(divArr2[15].textContent).toBe("mandalay");
    expect(divArr2[16].textContent).toBe("myanmar");
    expect(divArr2[18].textContent.toUpperCase()).toBe('SHIPPING METHOD');
    expect(divArr2[19].textContent.toUpperCase()).toBe('SHIPPING');
   
    
 });
    
});
