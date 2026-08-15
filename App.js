import React from "react";
import ReactDOM from "react-dom/client";

const elem = <span>React Element</span>;

const title = () => (
  <h1 id="heading" className="head" tabIndex={1}>
    {elem}
    Namste React using JSX 🚀
  </h1>
);

const number = 10000;

const HeadingComponent = () => (
  <div id="container">
    {title()}
    <h1>{number}</h1>
    <h1 className="heading">Namste React Functional Componenet 🚀</h1>
    <h2>{2 + 3}</h2>
  </div>
);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<HeadingComponent />);
