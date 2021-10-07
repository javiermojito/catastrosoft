import React from "react";
import Navbar from "../Navbar/Navbar";

function Layout(props) {
  return (
    <div>
      <Navbar />
      {props.children}
      <footer>This is the footer</footer>
    </div>
  );
}

export default Layout;
