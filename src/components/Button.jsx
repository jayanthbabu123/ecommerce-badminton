import React from "react";

function Button({ type, size, children }) {
  return <button className={`btn btn-${type} btn-${size}`}>{children}</button>;
}

export default Button;
