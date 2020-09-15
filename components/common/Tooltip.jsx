import React from "react";
import { node, string } from "prop-types";

const Tooltip = props => {
  return (
    <div className={`Tooltip ${props.className}`} data-direction={props.dir}>
      <div className="Tooltip__placeholder">{props.placeholder}</div>
      {props.content && <span className="Tooltip__triangle" />}
      {props.content && (
        <span className="Tooltip__content">{props.content}</span>
      )}
    </div>
  );
};

Tooltip.defaultProps = {
  className: "",
  content: null,
  dir: "left",
  placeholder: null,
};

Tooltip.propTypes = {
  className: string,
  content: node,
  dir: string,
  placeholder: node,
};

export default Tooltip;
