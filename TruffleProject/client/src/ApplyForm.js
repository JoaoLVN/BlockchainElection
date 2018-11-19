import React from "react";


class ApplyForm extends React.Component {
   state = { stackId: null ,image:'',name: '', proposals: '' };


   constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event){
    event.preventDefault();
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.Election;
    const stackId = contract.methods["Apply"].cacheSend(drizzle.web3.utils.utf8ToHex(this.state.image),
      drizzle.web3.utils.utf8ToHex(this.state.name),
      drizzle.web3.utils.utf8ToHex(this.state.proposals), {
      from: drizzleState.accounts[0]
    });
    this.setState({ stackId });
  }

  handleChange(event) {
    this.setState({  [event.target.name]: event.target.value });
  }
  getTxStatus() {
    const { transactions, transactionStack } = this.props.drizzleState;

    const txHash = transactionStack[this.state.stackId];

    if (!txHash) return null;

    return `Transaction status: ${transactions[txHash].status}`;
  }

  render() {
      return(
      <form className="col-4 mx-auto" onSubmit={this.handleSubmit} >
        <h5> Apply </h5>
        <div className="form-group row">
          <label htmlFor="image" className="col-sm-2 col-form-label">Image:</label>
          <div className="col-sm-10">
            <input id="image" name="image" type="text" className="form-control" onChange={this.handleChange} />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="name" className="col-sm-2 col-form-label">Name:</label>
          <div className="col-sm-10">
            <input id="name" name="name" type="text" className="form-control" onChange={this.handleChange} />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="proposals" className="col-sm-2 col-form-label">Proposals:</label>
          <div className="col-sm-10">
            <input id="proposals" name="proposals" type="text" className="form-control" onChange={this.handleChange} />
          </div>
        </div>
      
        <button  type="submit" className="btn btn-primary"> Apply </button> <br/>
        <div>{this.props.app.getTxStatus(this.state.stackId)}</div>
      </form>
      );
  }
}

export default ApplyForm;