import React from "react";

class Winner extends React.Component {
  state = { dataKey: null};

  componentDidMount() {
	  const { drizzle } = this.props;
    const contract = drizzle.contracts.Election;

    // let drizzle know we want to watch the `myString` method
    const dataKey = contract.methods["GetWinner"].cacheCall();

    // save the `dataKey` to local component state for later reference
    this.setState({ dataKey });
  }


  render() {
    const { drizzle } = this.props;
    const { Election } = this.props.drizzleState.contracts;
    const candidates = Election.GetWinner[this.state.dataKey];
    if(candidates== undefined) return <h2>Loading</h2>;
    if(candidates.value == undefined || !candidates.value[0]) return <h4>Election not over yet</h4>;
    var id=candidates.value[1];
    var image= drizzle.web3.utils.hexToUtf8(candidates.value[2]);
    var name= drizzle.web3.utils.hexToUtf8(candidates.value[3]);
    var proposals= drizzle.web3.utils.hexToUtf8(candidates.value[4]);
    var candidatesNameList=<div className="card col-auto col-md-3 col-lg-3 col-xl-3 mx-auto border-success" >
                              <div className="card-header">{name}</div>
                            <img className="card-img-top" src={image}/>
                            <div className="card-body">
                              <p className="card-text">{proposals}</p>
                            </div>
                            </div>;
    return(
      <div>
        <h5> Winner </h5>
        <div className="card-deck">
          {candidatesNameList} 
        </div>
      </div>
    );
  }
}

export default Winner;