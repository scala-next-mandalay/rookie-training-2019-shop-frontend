
import ReactDOM from 'react-dom';
import React from 'react'
import renderer from 'react-test-renderer';
import Parent from '../Parent';
import { act } from 'react-dom/test-utils';
import OrderHistory from '../OrderHistory';
import moment from 'moment';
/*global expect*/
/*global jest*/
/*global Event*/
/*global mount*/


let container;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.outerHTML = '<body></body>';
  container = null;
});

let orders =[{
  id:1,
  first_name: "khin",
  last_name: "lawoon",
  created_at :"2019-07-30",
  total_price: 4100
},
{ id:3,
  first_name: "kyaw",
  last_name: "myo min",
  created_at :"2019-07-23",
  total_price: 2000
}]
 
  const setSearchByOrderId=jest.fn((text)=>{
  
  for (const n of orders) {
  if (n.id===parseInt(text)) 
      {
        orders = [n];
      }
  }

  return orders;
});

  const setbeginDate=jest.fn((beginDate)=>{
  let date1=beginDate;
})

const setendDate=jest.fn((endDate)=>{
   let date2=endDate;
})
const clickOrderId=jest.fn((clickid)=>{
    let viewdetail=clickid;
})
const setPage=jest.fn(()=>{
  let page=0;
})


let fetchUser =[]; 
const fetchAuthedUser = jest.fn(() => {
  fetchUser =[{id:1,email:"lawoon@gmail.com"},{id:2,email :"aye@gmail.com"}]
});

const user ={id:1,email:"lawoon@gmail.com"}


const valueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
describe("History component", () => {

  it('matches the snapshot with user', () => {
    const OrderHistorySnapshot = renderer.create(
      <Parent>
      <OrderHistory 
        orders={orders}
        setSearchByOrderId={setSearchByOrderId}
        clickOrderId={clickOrderId}
        fetchAuthedUser={fetchAuthedUser}
        user={user}
        searchTextBegin={10-9-2019}
        searchTextEnd={9-8-2019}
        setbeginDate={setbeginDate}
        setendDate={setendDate}
      /> </Parent>
    ).toJSON();
    expect(OrderHistorySnapshot).toMatchSnapshot();

  });
    it('matches the snapshot with with no user', () => {
    const OrderHistoryWithNoUserSnapshot = renderer.create(
      <Parent>
      <OrderHistory 
        orders={orders}
        setSearchByOrderId={setSearchByOrderId}
        clickOrderId={clickOrderId}
        fetchAuthedUser={fetchAuthedUser}
        user={null}
        searchTextBegin={10-9-2019}
        searchTextEnd={9-8-2019}
        setbeginDate={setbeginDate}
        setendDate={setendDate}
      /> </Parent>
    ).toJSON();
    expect(OrderHistoryWithNoUserSnapshot).toMatchSnapshot();

  });
});


    
describe("Testing OrderDetail  Component", () => {
 it('testing and checking recieved data of  order detail page', () => {
    act(() => {
      ReactDOM.render((
      <Parent><OrderHistory 
        orders={orders}
        setSearchByOrderId={setSearchByOrderId}
        clickOrderId={clickOrderId}
        fetchAuthedUser={fetchAuthedUser}
        user={user}
        searchTextBegin={10-9-2019}
        searchTextEnd={9-8-2019}
        setbeginDate={setbeginDate}
        setendDate={setendDate}
      /> </Parent>), container);
   
    });
    
    /*testing table&& start table*/
    /*start table head*/
    const thArr = container.querySelectorAll('table th');
    expect(thArr[0].textContent.toUpperCase()).toBe('ORDERID');
    expect(thArr[1].textContent.toUpperCase()).toBe('ORDERDATE');
    expect(thArr[2].textContent.toUpperCase()).toBe('FIRST NAME');
    expect(thArr[3].textContent.toUpperCase()).toBe('LAST NAME');
    expect(thArr[4].textContent.toUpperCase()).toBe('TOTAL BILL');
    expect(thArr[5].textContent.toUpperCase()).toBe('DETAIL');
    /*end table head*/
    
    /*start table body*/
    const tdArr = container.querySelectorAll('table tbody td');
    
    /*first row*/
    expect(tdArr[0].textContent).toEqual("1");
    expect(tdArr[1].textContent).toBe("2019-07-30");
    expect(tdArr[2].textContent).toBe("khin");
    expect(tdArr[3].textContent).toBe("lawoon");
    expect(tdArr[4].textContent).toBe("4100");
   
  
   /*second row----*/
    expect(tdArr[6].textContent).toBe("3");
    expect(tdArr[7].textContent).toBe("2019-07-23");
    expect(tdArr[8].textContent).toBe("kyaw");
    expect(tdArr[9].textContent).toBe("myo min");
    expect(tdArr[10].textContent).toBe("2000");
    
   /*testing detail button of table */
   const buttonArr=document.querySelectorAll('td button');
    act(() => {
    buttonArr[0].dispatchEvent(new Event('click', { bubbles: true }));
    });
    expect(clickOrderId).toHaveBeenCalledTimes(1);

    act(() => {
    buttonArr[1].dispatchEvent(new Event('click', { bubbles: true }));
    });
    expect(clickOrderId).toHaveBeenCalled();
 
    /*end table body*/
  
    /*start table foot*/
    const selectArr=document.querySelectorAll('select');
    act(() =>{
    //selectArr[0][1].value=1
    selectArr[0][0].dispatchEvent(new Event('change', {bubbles: true}));
      });
    
    // expect(selectArr[0][0].textContent).toBe("5");
    // expect(selectArr[0][1].textContent).toBe("10");
    // expect(selectArr[0][2].textContent).toBe("25");
    expect(selectArr).toHaveLength(1);
    const selectArroption=document.querySelectorAll('select option');
    selectArroption[0].value=6
    expect(selectArroption[0].value).toBe("6");
    expect(selectArroption[1].value).toBe("10");
    expect(selectArroption[2].value).toBe("25");
    expect(selectArroption).toHaveLength(3);
  
    const tfootbtnArr=document.querySelectorAll('table tfoot td button ');
    expect(tfootbtnArr).toHaveLength(4);
 }); 
 
 it('testing searching data by orderid input', () => {
    act(() => {
      ReactDOM.render((
      <Parent><OrderHistory 
        orders={orders}
        setSearchByOrderId={setSearchByOrderId}
        clickOrderId={clickOrderId}
        fetchAuthedUser={fetchAuthedUser}
        user={user}
        searchTextBegin={10-9-2019}
        searchTextEnd={9-8-2019}
        setbeginDate={setbeginDate}
        setendDate={setendDate}
      /> </Parent>), container);
    const inputArr=container.querySelectorAll('input');
    expect(inputArr).toHaveLength(3);
    expect(inputArr[0].id).toBe("search");
    act(() => {
          valueSetter.call(inputArr[0], 3);
          inputArr[0].dispatchEvent(new Event('change', { bubbles: true }));
        });
    const expectedOrderId=[{
    id:3,
    first_name: "kyaw",
    last_name: "myo min",
    created_at :"2019-07-23",
    total_price: 2000
    }]
    expect(setSearchByOrderId).toHaveBeenCalled();
    expect(orders).toStrictEqual(expectedOrderId)
  });
 });
  
  it('testing begin date and end date', () => {

    act(() => {
      ReactDOM.render((
      <Parent><OrderHistory 
        orders={orders}
        setSearchByOrderId={setSearchByOrderId}
        clickOrderId={clickOrderId}
        fetchAuthedUser={fetchAuthedUser}
        user={user}
        searchTextBegin={2019-10-30}
        searchTextEnd={2019-11-23}
        setbeginDate={setbeginDate}
        setendDate={setendDate}
      /> </Parent>), container);
    const inputArr=container.querySelectorAll('input');
    expect(inputArr).toHaveLength(3);
    expect(inputArr[1].id).toBe("date1");
    expect(inputArr[2].id).toBe("date2");
    act(() => {
          valueSetter.call(inputArr[1], "2019-07-23");
          inputArr[1].dispatchEvent(new Event('change', { bubbles: true }));
        });
    expect(setbeginDate).toHaveBeenCalled();
    
    act(() => {
          valueSetter.call(inputArr[2], "2019-07-30");
          inputArr[2].dispatchEvent(new Event('change', { bubbles: true }));
        });
    expect(setendDate).toHaveBeenCalled();
  });
});


});
