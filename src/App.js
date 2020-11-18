import React, { Component } from 'react';
import './App.css';
import { CardList } from './components/card-list/card-list.component';
import { SearchBox } from './components/search-box/search-box.component';
class App extends Component {

  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: ''
    };

    //bind() -> returns a new functionw here the context of this is set to whatever we passed to it
    //for every class method that is written -> we must bind it
    //there is a way to easy fix it by using arrow function
    // this.handleChange = this.handleChange.bind(this);
  }

  //when component mounts -> renders it to page
  //calls whatever block of code
  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => this.setState({ monsters: users }))
  }

  //bind() -> returns a new functionw here the context of this is set to whatever we passed to it
  //for every class method that is written -> we must bind it
  //there is a way to easy fix it by using arrow function
  // handleChange(e) {
  //   //JavaScript doesn't set context
  //   this.setState({ searchField: e.target.value })
  // }
  //arrow functions automatically binds to the place they were defined
  handleChange = (e) => {
    //JavaScript doesn't set context
    this.setState({ searchField: e.target.value })
  }

  render() {

    //destructuring -> allows us to pull properties off of an object and set it as constants
    const { monsters, searchField } = this.state;

    //similar to these:
    // const monsters = this.state.monsters;
    // const searchField = this.state.searchField;

    const filteredMonsters = monsters.filter(monster =>
      monster.name.toLowerCase().includes(searchField.toLowerCase())
    )

    return (
      <div className="App">
        <h1> Monsters Rolodex </h1>
        
        <SearchBox
          placeholder='search monsters'
          handleChange={this.handleChange}
        />

        <CardList monsters={filteredMonsters} />

      </div>
    );
  }
}

export default App;