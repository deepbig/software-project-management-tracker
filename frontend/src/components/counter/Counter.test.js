import React from 'react';
import Counter from './Counter';
// setup file
import { shallow } from 'enzyme';



describe("Counter Testing", () => {
  
  let wrapper;
  beforeEach(() => {
     //it will only render outer part, not the childrens by using shallow
    wrapper = shallow(<Counter />); 
  })

  test('render the title of counter', () => {
    expect(wrapper.find('h1').text()).toContain("This is counter app");

  });

  test("render a button with test of `increment`", () => {
    expect(wrapper.find('#increment-btn').text()).toBe("Increment"); // find by id
  })

  test("render the initial value of state in a div", () => {
    expect(wrapper.find('#counter-value').text()).toBe("0");
  })

  test("render the click event of increment button and increment counter value", () => {
    wrapper.find('#increment-btn').simulate('click');
    expect(wrapper.find('#counter-value').text()).toBe("1");
  })

  test("render the click event of decrement button and decrement counter value", () => {
    wrapper.find('#increment-btn').simulate('click');
    expect(wrapper.find('#counter-value').text()).toBe("1");
    wrapper.find('#decrement-btn').simulate('click');
    expect(wrapper.find('#counter-value').text()).toBe("0");
  });

  test("render the disable click event when the counter value is being negative", () => {
    // wrapper.find('#increment-btn').simulate('click'); //To check this works.
    const mountWrapper = wrapper.find('#decrement-btn');
    expect(mountWrapper.find({ disabled : true }).text()).toBe("Decrement");

  });

});

