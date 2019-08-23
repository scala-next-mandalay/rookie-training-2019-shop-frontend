import React from 'react'
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Parent from '../Parent';
import { act } from 'react-dom/test-utils';
import NavTesting from '../NavTesting';
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

let categories = [{ id: 1, name: "category1" },
                  { id: 2, name: "category2" }];
let id=null;
const setCategoryId = jest.fn((value) => {
  id = value;
});

describe("NavTesting component", () => {
  it('matches the snapshot', () => {
    const NavTestingSnapshot = renderer.create(
      <Parent><NavTesting setCategoryId={setCategoryId} categories={categories}/></Parent>
    ).toJSON();
    expect(NavTestingSnapshot).toMatchSnapshot();
  });
})

describe("testing category", () => {
      it('Test selection', () => {
        let categories = [ {id:1 , name : "category1"},{id :2, name: "category2"}];
        
        act(() => {
          ReactDOM.render((
            <Parent>
              <NavTesting categories={categories} setCategoryId={setCategoryId}/>
            </Parent>
          ), container);
       
          const selectArr = document.querySelectorAll('select');
          act(() =>{
            // selectArr[0][1].value=1
            selectArr[0][1].dispatchEvent(new MouseEvent('click', {bubbles: true}));
          });
         
          //console.log("selectArr[0][1]",selectArr[0][1].textContent)
          expect(setCategoryId).toHaveBeenCalled();
          expect(id).toBe(2);
          
           act(() =>{
            selectArr[0][0].value=1
            selectArr[0][0].dispatchEvent(new MouseEvent('click', {bubbles: true}));
          });
          expect(setCategoryId).toHaveBeenCalled();
          expect(id).toBe(1);
          expect(selectArr[0][0].textContent).toBe("category1");
        });
      });
});
      