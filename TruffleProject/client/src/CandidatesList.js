import React from "react";

class CandidatesList extends React.Component {
  state = { dataKey: null , stackId:null};

  constructor(props) {
    super(props);

    this.vote = this.vote.bind(this);
  }

  componentDidMount() {
	  const { drizzle } = this.props;
    const contract = drizzle.contracts.Election;

    // let drizzle know we want to watch the `myString` method
    const dataKey = contract.methods["ListCandidates"].cacheCall();

    // save the `dataKey` to local component state for later reference
    this.setState({ dataKey });
  }

  vote(event){
    var id = event.target.id;
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.Election;
    const stackId = contract.methods["Vote"].cacheSend(id,{
      from: drizzleState.accounts[0]
    });
    this.setState({ stackId });
  }

  render() {
    const { drizzle } = this.props;
    const { Election } = this.props.drizzleState.contracts;
    const candidates = Election.ListCandidates[this.state.dataKey];
    if(candidates=== undefined) return <h4>Loading CandidatesList...</h4>;
    if(candidates.value=== undefined) return <h4>No Candidates</h4>;

    var candidatesNameList =[];
    var canVote=candidates.value[0];
    var votedCandidate=candidates.value[1];

    for (var i = 0 ;i < candidates.value[2].length; i++) {
      var id=candidates.value[2][i];
      var image= drizzle.web3.utils.hexToUtf8(candidates.value[3][i]);
      var name= drizzle.web3.utils.hexToUtf8(candidates.value[4][i]);
      var proposals= drizzle.web3.utils.hexToUtf8(candidates.value[5][i]);
      var button = canVote?  <button onClick={this.vote} id={id} className="btn btn-success">Vote</button>:"";
      var cardStyle="card col-auto col-md-3 col-lg-3 col-xl-3 mx-auto "+ (votedCandidate===id?"border-success":"");
      candidatesNameList.push(
        <div className={cardStyle} key={i}>
          <div className="card-header">{name}</div>
        <img className="card-img-top" src={image}/>
        <div className="card-body">
          <p className="card-text">{proposals}</p>
          {button}
        </div>
        </div>
      );
    }
   candidatesNameList =  candidatesNameList.length === 0 ? <i className="mx-auto">No Candidates</i> :candidatesNameList;
    return(
      <div>
        <h5> Candidates </h5>
        <div className="card-deck">
          {candidatesNameList} 
        </div>
        <div>{this.props.app.getTxStatus(this.state.stackId)}</div>
      </div>
    );
  }
}

export default CandidatesList;