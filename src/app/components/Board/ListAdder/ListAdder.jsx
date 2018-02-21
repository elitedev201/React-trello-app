import React, { Component } from "react";
import { connect } from "react-redux";
import Textarea from "react-textarea-autosize";
import shortid from "shortid";
import "./ListAdder.scss";

class ListAdder extends Component {
  constructor() {
    super();
    this.state = {
      isListInEdit: false,
      newListTitle: ""
    };
  }
  handleBlur = () => {
    this.setState({ isListInEdit: false });
  };
  handleChange = event => {
    this.setState({ newListTitle: event.target.value });
  };
  handleKeyDown = event => {
    if (event.keyCode === 13) {
      event.preventDefault();
      this.handleSubmit();
    } else if (event.keyCode === 27) {
      this.setState({ isListInEdit: false });
    }
  };
  handleSubmit = () => {
    const { dispatch, boardId } = this.props;
    const { newListTitle } = this.state;
    const listId = shortid.generate();
    if (newListTitle === "") return;
    dispatch({
      type: "ADD_LIST",
      payload: { listTitle: newListTitle, listId, boardId }
    });
    this.setState({ isListInEdit: false, newListTitle: "" });
  };
  render = () => {
    const { isListInEdit, newListTitle } = this.state;
    if (!isListInEdit) {
      return (
        <button
          onClick={() => this.setState({ isListInEdit: true })}
          className="add-list-button"
        >
          Add a list...
        </button>
      );
    }
    return (
      <div className="list">
        <div className="list-title-textarea-wrapper">
          <Textarea
            autoFocus
            useCacheForDOMMeasurements
            value={newListTitle}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            className="list-title-textarea"
            onBlur={this.handleBlur}
            spellCheck={false}
          />
        </div>
      </div>
    );
  };
}

export default connect()(ListAdder);
