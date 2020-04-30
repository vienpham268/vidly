import React from "react";
import Form from "./commons/form";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genre: ["Comedy", "Action", "Thriller"],
      stock: "",
      rate: "",
    },
    errors: {},
  };
  schema = {};
  render() {
    return (
      <div>
        <div>
          <h1>Movie Form</h1>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("title", "Title")}
            {this.renderDropdown("genre", "Genre")}
            {this.renderInput("stock", "Number in Stock")}
            {this.renderInput("rate", "Rate")}
            {this.renderButton("Save")}
          </form>
        </div>
      </div>
    );
  }
}

export default MovieForm;
