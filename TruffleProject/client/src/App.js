import React, { Component } from 'react';
import './App.css';
import CandidatesList from './CandidatesList';
import ApplyForm from './ApplyForm';
import Winner from './Winner';

class App extends Component {
  state = { loading: true, drizzleState: null , page:"home" };

  constructor(props) {
    super(props);

    this.handleMenu = this.handleMenu.bind(this);
  }

  getTxStatus(stackId) {
    const { transactions, transactionStack } = this.state.drizzleState;
    const txHash = transactionStack[stackId];
    if (!txHash) return null;
    var errorStatus= "alert alert-" +( transactions[txHash].status=== "error" ? "danger": transactions[txHash].status==="success"? "success":"info");
    console.log(errorStatus);
    return <div className={errorStatus}>{transactions[txHash].status}</div>;
  }

  componentDidMount() {
    const { drizzle } = this.props;

    // subscribe to changes in the store
    this.unsubscribe = drizzle.store.subscribe(() => {

      // every time the store updates, grab the state from drizzle
      const drizzleState = drizzle.store.getState();

      // check to see if it's ready, if so, update local component state
      if (drizzleState.drizzleStatus.initialized) {
        this.setState({ loading: false, drizzleState });
      }
    });
  }

  compomentWillUnmount() {
    this.unsubscribe();
  }

  handleMenu(event) {
    this.setState({  page: [event.target.name] });
  }

  render() {
    var currentPage = this.state.page == "Apply" ? this.Apply() : this.state.page=="Winner" ? this.Winner() : this.List();
    if (this.state.loading) currentPage =  <h1>Loading...</h1>;
    return <div className="App"> {this.Menu()} <br/> {currentPage} </div>;
  }

  Menu(){
  	return <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  		<a className="navbar-brand" href="#" name="Home" onClick={this.handleMenu} >Blockchain Election</a>
  		<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
    		<span className="navbar-toggler-icon"></span>
  		</button>
  		<div className="collapse navbar-collapse" id="navbarText">
  			<ul className="navbar-nav mr-auto">
		 		<li className="nav-item">
	        		<a className="nav-link" name="List" onClick={this.handleMenu} href="#">List</a>
	      		</li> 		
	      		<li className="nav-item">
	        		<a className="nav-link" name="Apply" onClick={this.handleMenu} href="#">Apply</a>
	      		</li>	      		
	      		<li className="nav-item">
	        		<a className="nav-link" name="Winner" onClick={this.handleMenu} href="#">Winner</a>
	      		</li>
	    	</ul>
	    </div>
	</nav>;
  }

  List(){
  	return <CandidatesList 
    			 app={this}
			     drizzle={this.props.drizzle}
			     drizzleState={this.state.drizzleState}
			 />;
  }
   Apply(){
  	return <ApplyForm 
			    app={this}
			    drizzle={this.props.drizzle}
			    drizzleState={this.state.drizzleState}
			 />;
  }
  Winner(){
  	return <Winner 
			    app={this}
			    drizzle={this.props.drizzle}
			    drizzleState={this.state.drizzleState}
			 />;
  }
}

export default App;
