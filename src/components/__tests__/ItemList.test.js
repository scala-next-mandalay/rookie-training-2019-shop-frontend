import React from 'react'
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Parent from '../Parent';
import { act } from 'react-dom/test-utils';
import ItemList from '../ItemList';
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
const noMoreFetch=true;

const items = [{ id: 1, name:"ver" ,price:4000 ,image: 'pic1.png' },
            { id: 2, name: "mer" ,price:3000 ,image: 'pic2.png' },
            { id: 3, name: "neko" ,price:1000 ,image: 'pic3.png' }];

const fetchItems=jest.fn(()=>{
    
});
describe("ItemList component", () => {
  it('matches the snapshot', () => {
    const ItemListSnapshot = renderer.create(
      <Parent><ItemList 
      items={items}
      noMoreFetch={noMoreFetch}
      fetchItems={fetchItems}
     /> </Parent>
    ).toJSON();
    expect(ItemListSnapshot).toMatchSnapshot();
  });
});

describe("testing item list", () => {
  it('testing data in itemList', () => {
    let categories = [ {id:1 , name : "category1"},{id :3, name: "category3"}];
    
    act(() => {
      ReactDOM.render((
      <Parent><ItemList 
      items={items}
      noMoreFetch={noMoreFetch}
      fetchItems={fetchItems}
     /> </Parent>
      ), container);
      const itemNameArr = document.querySelectorAll('.nameTxt');
      const itemPriceArr = document.querySelectorAll('.priceTxt');
      expect(itemNameArr[0].textContent).toBe("Name:ver");
      expect(itemNameArr[1].textContent).toBe("Name:mer");
      expect(itemNameArr[2].textContent).toBe("Name:neko");
      expect(itemPriceArr[0].textContent).toBe("Price:4000Ks");
      expect(itemPriceArr[1].textContent).toBe("Price:3000Ks");
      expect(itemPriceArr[2].textContent).toBe("Price:1000Ks");
      const btnArr = document.querySelectorAll('button');
      expect(btnArr[0].textContent).toBe("Add Button");
      expect(btnArr).toHaveLength(3);
      
    });
  });
});

     