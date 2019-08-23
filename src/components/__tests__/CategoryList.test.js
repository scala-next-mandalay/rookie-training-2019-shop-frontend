import React from 'react'
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Parent from '../Parent';
import { act } from 'react-dom/test-utils';
import CategoryList from '../CategoryList';
/*global expect*/
/*global jest*/
/*global MouseEvent*/

let container;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.outerHTML = '<body></body>';
  container = null;
});

const handleDrawerClose= jest.fn(() => {

})
let categories = [{ id: 1, name: "category1" },
                  { id: 3, name: "category3" }];
let id=null;
const setCategoryId = jest.fn((value) => {
  id = value;
});

describe("CategoryList component", () => {
  it('matches the snapshot', () => {
    const CategoryListSnapshot = renderer.create(
      <Parent><CategoryList 
      setCategoryId={setCategoryId} 
      categories={categories}
      handleDrawerClose={handleDrawerClose}/></Parent>
    ).toJSON();
    expect(CategoryListSnapshot).toMatchSnapshot();
  });
})

describe("testing category list", () => {
      it('Testing category data show', () => {
        let categories = [ {id:1 , name : "category1"},{id :3, name: "category3"}];
        
        act(() => {
          ReactDOM.render((
            <Parent>
              <CategoryList handleDrawerClose={handleDrawerClose} categories={categories} setCategoryId={setCategoryId}/>
            </Parent>
          ), container);
         
          
       const spanDivArr = document.querySelectorAll('span div');
         act(() =>{
            spanDivArr[0].dispatchEvent(new MouseEvent('click', {bubbles: true}));
          });
          expect(setCategoryId).toHaveBeenCalled();
          expect(id).toBe(1);
          
          act(() =>{
            spanDivArr[1].dispatchEvent(new MouseEvent('click', {bubbles: true}));
          });
          expect(setCategoryId).toHaveBeenCalled();
          expect(id).toBe(3);
          expect(spanDivArr[1].textContent).toBe("category3");
        });
      });
});
      