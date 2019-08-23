import ReactDOM from 'react-dom';
import React from 'react'
import renderer from 'react-test-renderer';
import Parent from '../Parent';
import { act } from 'react-dom/test-utils';
import OrderHistory from '../OrderHistory';
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

const orders =[{
  id:1,
  first_name: "khin",
  last_name: "lawoon",
  created_at :"2019-07-30 07:48:47",
  total_price: 4100
},
{ id:3,
  first_name: "kyaw",
  last_name: "myo min",
  created_at :"2019-07-23 07:48:47",
  total_price: 2000
}]

const setSearchByOrderId=jest.fn((text)=>{
  let id=text;
//   if(text===1) orders=[{id:1,
//   first_name: "khin",
//   last_name: "lawoon",
//   created_at :"2019-07-30 07:48:47",
//   total_price: 4100}]

// else orders=[{ id:2,
//   first_name: "kyaw",
//   last_name: "myo min",
//   created_at :"2019-07-23 07:48:47",
//   total_price: 2000
// }]
})


const clickOrderId=jest.fn((clickid)=>{
    let viewdetail=clickid;
})


let fetchUser =[]; 
const fetchAuthedUser = jest.fn(() => {
  fetchUser =[{id:1,email:"lawoon@gmail.com"},{id:2,email :"aye@gmail.com"}]
});

const user ={id:1,email:"lawoon@gmail.com"}
 let date=null;
const setbeginDate=jest.fn((beginDate)=>{
    date=beginDate;
})
const setendDate=jest.fn((endDate)=>{
    date=endDate;
})
const valueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
describe("History component", () => {

    it('matches the snapshot', () => {
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
     
    const inputArr=container.querySelectorAll('input');
    console.log("inputArr",inputArr.length);
    expect(inputArr).toHaveLength(3);
    expect(inputArr[0].id).toBe("search");
    act(() => {
          valueSetter.call(inputArr[0], '1');
          inputArr[0].dispatchEvent(new Event('click', { bubbles: true }));
        });
 
    // const expectedOrderId=[{
    // id:1,
    // first_name: "khin",
    // last_name: "lawoon",
    // total_price: 4100,
    // }]
    
    //expect(setSearchByOrderId).toHaveBeenCalledWith(1);
    // console.log("order",orders)
    // expect(orders).toStrictEqual(expectedOrderId)
    
    

    
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
    expect(tdArr[1].textContent).toBe("2019-07-30 07:48:47");
    expect(tdArr[2].textContent).toBe("khin");
    expect(tdArr[3].textContent).toBe("lawoon");
    expect(tdArr[4].textContent).toBe("4100");
  
   /*second row----*/
    expect(tdArr[6].textContent).toBe("3");
    expect(tdArr[7].textContent).toBe("2019-07-23 07:48:47");
    expect(tdArr[8].textContent).toBe("kyaw");
    expect(tdArr[9].textContent).toBe("myo min");
    expect(tdArr[10].textContent).toBe("2000");
    
   /*testing detail button of table */
   const buttonArr=document.querySelectorAll('td button');
    act(() => {
    buttonArr[0].dispatchEvent(new Event('click', { bubbles: true }));
    });
    expect(clickOrderId).toHaveBeenCalledWith(1);
   act(() => {
    buttonArr[1].dispatchEvent(new Event('click', { bubbles: true }));
    });
    expect(clickOrderId).toHaveBeenCalledWith(3);
 
    /*end table body*/
  
    /*start table foot*/
  
    const selectArr=document.querySelectorAll('select');
    console.log("selectArr",selectArr.length);
  
    act(() =>{
  //selectArr[0][1].value=1
    selectArr[0][0].dispatchEvent(new Event('change', {bubbles: true}));
      });
    expect(selectArr[0][0].textContent).toBe("5");
    expect(selectArr[0][1].textContent).toBe("10");
    expect(selectArr[0][2].textContent).toBe("25");
           
           
    /*skip first page,pervious,next,last page*/
  
 }); 

 });
    
});