import React, { useState } from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";

import Header from '../../Components/Header';

let container;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});
afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe("Header component", () => {

  it("shows the app title", () => {

    act(() => {
      ReactDOM.render(<Header />, container);
    });
    const span2 = container.querySelector('h1.App-title');
    expect(span2.textContent).toBe("CryptoReckoner");

  });
});
