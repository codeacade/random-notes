// recreating ct8 node / React enviromnment: wiki.mydevil.net/React
// lots of changes made, lots of errors fixed
// improved communication betweer front and back end
// modals ID issue fixed
// database update/fetching fixed

import React from 'react';

const TodoItem = ( props ) => {   // state-less component for each single note
  const classNameNotDone = "card flex-row justify-content-end";
  const classNameDone = "card completed flex-row justify-content-end";
  var itemTitile = props.element.title;
  var itemId = props.element.id;

  return (
    <div>
      <div className={ props.element.isDone? classNameDone : classNameNotDone } key={ itemId }>
        <h4 className="text-dark mx-auto" onClick={ 
          () => props.passFromParent(itemId) }>
            { itemTitile } 
        </h4>
        <button className="btn btn-danger text-light" data-bs-toggle="modal" data-bs-target={ "#modal" + itemId }>
            { <i className="bi bi-trash"></i> }
        </button>
      </div> 

      <div className="modal fade" id={ "modal" + itemId } role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                Delete note: { itemTitile } ?
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={ 
                () => props.deleteMe(itemId) }>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}


class Todo extends React.Component{  // main component
  state = {
    elements: [],    // was: elementsJ.elements,
    newElement: "" // value of new input on the list
  }

  fetchJson = () => {  // method to refresh item list
    fetch('/api/')
    .then( res => res.json())
    .then( data => this.setState({elements: data.elements}))
  }

  passToChild = (id) => {  // child id comes back from child
    var elementsID = this.state.elements.findIndex(row => row.id === id);
    var newElements = this.state.elements;
    newElements[elementsID].isDone = !newElements[elementsID].isDone;
    this.setState({elements: newElements});  // change original state.elements

    fetch('/api/' + id, {  // PUT to store TODO/DONE
      method: 'PUT',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ 
        id: id,
        title: newElements[elementsID].title,
        isDone: newElements[elementsID].isDone 
      
      })
    })
  }

  deleteChild = (id) => {   // to remove item from JSON and then refresh list
    fetch('/api/' + id, { method: 'DELETE' })
    .then((response) => console.log(response))   // wait for database to be updated
    .then( this.fetchJson )  // refresh items list
  }

  inputUpdate = (event) => {  // dynamic update of Add <input> field
    this.setState({ newElement: event.target.value});
  }

  inputAdd = () => {  // is ADD button pressed, adds new element to list
    const newRow = {
      id: Math.ceil(Math.random() * 200000),
      title: this.state.newElement,
      isDone: false
    }
    this.setState({ newElement: ""});

    fetch('/api/', {  // POST method to store amended list
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(newRow)
    })
    .then((response) => console.log(response))   // wait for database to be updated
    .then( this.fetchJson )  // refresh items list
  }

  componentDidMount(){      // initial reading list items from db.json file
    setTimeout(this.fetchJson, 10);
  }

  render() {
    const elements = this.state.elements.map(item => {
      return ( < TodoItem element={ item } passFromParent={ this.passToChild }
        deleteMe={ this.deleteChild }  /> )
    })

    return (
      <div className="bg-info p-2 text-center">
        <h1 className="my-3">Todo App</h1>

        <div className="bg-dark card flex-row justify-content-end">
          <input className="mx-4 my-2" value={ this.state.newElement }
            onChange={ this.inputUpdate } />
          <button className="btn btn-primary text-light" onClick={ this.state.newElement && this.inputAdd }>
            {"Add"}
          </button>
        </div>

        { elements }
      </div>
    )
  }
}


function App() {
  return (
    <div>
      < Todo />
    </div>
  );
}

export default App;
