import React, { useState } from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";

import Total from '../../Components/Total';

let container;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});
afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe("Total component", () => {
  it("shows the initial text", () => {

    act(() => {
      ReactDOM.render(<Total total={{ value : 0 }} />, container);
    });
    const span = container.getElementsByTagName("span")[0];
    expect(span.textContent).toBe("0.00 USD");

  });

  it("does the expected rounding on the total", () => {

    act(() => {
      ReactDOM.render(<Total total={{ value : 123.567777 }} />, container);
    });
    const span2 = container.querySelector('span');
    expect(span2.textContent).toBe("123.57 USD");

  });
});
