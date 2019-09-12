import React, { useState } from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";

import Footer from '../../Components/Footer';

let container;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});
afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe("Footer component", () => {

  it("shows the copyright text", () => {

    act(() => {
      ReactDOM.render(<Footer />, container);
    });
    const span2 = container.querySelector('.cr-footer > p:last-child');
    expect(span2.textContent).toBe("CryptoReckoner 2018");

  });
});
