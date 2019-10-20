import React, { useState } from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";

import ReactTestUtils from 'react-dom/test-utils'; // ES6

import AddForm from '../../Components/AddForm';

import Enzyme from 'enzyme';
import { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() });

let container;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});
afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe("AddForm component", () => {

  it("shows the select, input and button", () => {

    const prices = [
      { code : 'BTC', price : 1000, low : 0, high : 0, added : false }
    ];

    act(() => {
      ReactDOM.render(<AddForm addHolding={() => {}} prices={prices} />, container);
    });
    const input = container.querySelector('.cr-addform input[type=number]');
    expect(input).not.toBeNull();

    const select = container.querySelector('.cr-addform select');
    expect(select).not.toBeNull();

    const button = container.querySelector('.cr-addform button[type=submit]');
    expect(button).not.toBeNull();

  });

  it("shows the 'all prices added' message when they are", () => {

    const prices = [
      { code : 'BTC', price : 1000, low : 0, high : 0, added : true }
    ];

    act(() => {
      ReactDOM.render(<AddForm addHolding={() => {}} prices={prices} />, container);
    });
    const input = container.querySelector('p');
    expect(input.textContent).toBe("You've added all of the available currencies. ");

  });

  it("fires the submit handler with the correct arguments", () => {

    const callback = jest.fn();

    const prices = [
      { code : 'BTC', price : 1000, low : 0, high : 0, added : false },
      { code : 'BTC2', price : 1000, low : 0, high : 0, added : false },
    ];

    const wrapper = mount(<AddForm addHolding={callback} prices={prices} />);

    const input = wrapper.find('input').at(0);
    input.instance().value = '123';
    input.simulate('change');

    const select = wrapper.find('select').at(0);
    select.instance().value = 'BTC';
    select.simulate('change');

    //wrapper.find('form').at(0).simulate('submit'); // alternative - submit the form itself
    wrapper.find('button').at(0).simulate('submit'); // submit on the button

    expect(callback).toHaveBeenCalledWith({ amount : '123', code : 'BTC' });

  });


});
