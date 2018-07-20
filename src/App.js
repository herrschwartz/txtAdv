import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Output from './output.js';




class App extends Component {

  state = {
    outputItems: []
  }

  componentDidMount(){
    this.setState({
      outputItems: [...this.state.outputItems, {cls: "dm", txt: "You awaken in a small room, there is a plain white door in front of you. a small key lays on the groud in front of you."+
      "There is an arched passage to the left the opens up to a <span class='room'>room on the left</span> and the same for a <span class='room'>room on the right</span>. Both rooms are circular and look nearly identical."}]
    })
  }
  componentDidUpdate(){
    var scrollingElement = document.getElementById("container")
    scrollingElement.scrollTop = scrollingElement.scrollHeight;
  }

  enterItem(e){
    if(e.key === 'Enter'){
        var text = e.target.value;
        e.target.value = "";
        this.checkAction(text);
    }
  }
  checkAction(t){
    const {outputItems} = this.state;
    let outputAdd = []
    let tsplit = t.toLowerCase().split(" ")

    if(tsplit[0] === 'use'){
      outputAdd.push({cls: "", txt: t});
      outputAdd.push({cls: "using", txt: "using: "+ tsplit[1]});
    } else if(t.charAt(0) === ">") {
      outputAdd.push({cls: "comment", txt: t})
    } else if(tsplit[0] === "help"){
      outputAdd.push({cls: "comment", txt: "Commands:"})
      outputAdd.push({cls: "comment", txt: "> - for notes"})
      outputAdd.push({cls: "comment", txt: "use - uses an item in your inventory"})
      outputAdd.push({cls: "comment", txt: "look at - looks at an item or an object in the room, tip: you can also look at the room"})  
    } else {
      outputAdd.push({cls: "", txt: t});
      outputAdd.push({cls: "sorry", txt: "Sorry, I don't recognize the command '" +tsplit[0] + "' type 'help' for a list of commands"})
    }
    this.setState({
      outputItems: [...outputItems, ...outputAdd]
    })
  }

  render() {
    const {outputItems} = this.state
    return (
        <div className="space" id="container">
          <div id="output">
            { outputItems.map( (e) => <Output txt = {e.txt} cls = {e.cls}/> )}
          </div>
          <input type="text" id="main" onKeyDown = { this.enterItem.bind(this) } />
        </div>
    );
  }
}

export default App;
