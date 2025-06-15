import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

function Layout(props) {
  const { children } = props;
  console.log(props)
  return (
    <div>
      <Header />
      <div className="d-flex">
        <Sidebar />
        <main className="flex-grow-1 bg-light p-4">{children}</main>
      </div>
    </div>
  );
}

export default Layout;
