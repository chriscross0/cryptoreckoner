import React, { useState } from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";

import PriceList from '../../Components/PriceList';

let container;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});
afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe("PriceList component", () => {

  // it shows a price

  it("shows the no prices message if no prices", () => {

    act(() => {
      ReactDOM.render(<PriceList prices={[]} isLoadingPrices={false} />, container);
    });
    const p = container.querySelector('p');
    expect(p.textContent).toBe("There are no prices currently avaulable.");

  });

  it("shows a price", () => {

    const prices = [
      { code : 'BTC', price : 1000, low : 0, high : 0, added : false }
    ];

    act(() => {
      ReactDOM.render(<PriceList prices={prices} isLoadingPrices={false} />, container);
    });
    const priceRow = container.querySelector('.cr-price .col-xs-3:nth-child(2)');
    expect(priceRow.textContent).toBe("1000");

  });

  it("shows the loading spinner during load", () => {

    act(() => {
      ReactDOM.render(<PriceList prices={[]} isLoadingPrices={true} />, container);
    });
    const spinner = container.querySelector('.cr-spinner');
    expect(spinner).not.toBeNull();

  });

});
