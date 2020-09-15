import React from "react";
import { bool, func, node, string } from "prop-types";

const CollapseComponent = props => {
  return (
    <div className={`Collapse ${props.className}`}>
      <div className="Collapse__head">
        {props.headEl}
        <div
          className={`Collapse__control ${props.open && "is-open"}`}
          onClick={props.onCollapse}
          role="button"
          tabIndex={0}
        >
          {props.controlEl}
        </div>
      </div>
      <div className={`Collapse__content collapse ${props.open && "in"}`}>
        {props.contentEl}
      </div>
    </div>
  );
};

CollapseComponent.defaultProps = {
  className: "",
  contentEl: null,
  controlEl: null,
  headEl: null,
};

CollapseComponent.propTypes = {
  className: string,
  contentEl: node,
  controlEl: node,
  headEl: node,
  open: bool.isRequired,
  onCollapse: func.isRequired,
};

class Collapse extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  handleCollapse = () => {
    this.setState(prevState => {
      return { open: !prevState.open };
    });
  };

  render() {
    return (
      <CollapseComponent
        className={this.props.className}
        contentEl={this.props.contentEl}
        controlEl={this.props.controlEl}
        headEl={this.props.headEl}
        open={this.state.open}
        onCollapse={this.handleCollapse}
      />
    );
  }
}

Collapse.defaultProps = {
  className: "",
  contentEl: null,
  controlEl: null,
  headEl: null,
};

Collapse.propTypes = {
  className: string,
  contentEl: node,
  controlEl: node,
  headEl: node,
};

export default Collapse;
