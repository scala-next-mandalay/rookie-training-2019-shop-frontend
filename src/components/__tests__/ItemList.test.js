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

const items = [{ id: 1, name: "ver" ,price:4000 ,image: 'pic1' },
            { id: 2, name: "mer" ,price:3000 ,image: 'pic2' },
            { id: 3, name: "neko" ,price:1000 ,image: 'pic3' }];

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