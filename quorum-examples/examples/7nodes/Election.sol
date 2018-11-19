pragma solidity ^0.4.24;

contract Election{
    
    struct Voter{
        bool Voted;
        address Vote;
    }
    
    struct Candidate{
        address Id;
        bytes32 Name;
        bytes32 Proposals;
    }
    
   Candidate[] public Candidates;
    
    address private _auditioner;
    mapping(address=> Voter) private _voters;
    mapping(address=> uint) private _votes;
    
    constructor() public{
        _auditioner = msg.sender;
    }
    
    function Apply(bytes32 name,bytes32 proposals) public{
         require(!IsCandidate(msg.sender));
         
         Candidates.push(Candidate({
                Id:msg.sender,
                Name: name,
                Proposals: proposals
        }));
         _votes[msg.sender] = 0;
    }
    
    function Vote(address candidate) public{
        Voter storage sender = _voters[msg.sender] ;
        require(!sender.Voted);
        sender.Voted =true;
        sender.Vote = candidate;
        _votes[candidate]++;
    }
    
    function GetWinner() public view returns (address winner)
    {
        uint maxVotes=0;
        for(uint i=0;i<Candidates.length ;i++){
            address currentId = Candidates[i].Id;
            if(maxVotes < _votes[currentId]){
                winner= currentId;
                maxVotes = _votes[currentId];
            }
        }
    }
    
    function IsCandidate( address id ) private view returns(bool) {
        for(uint i=0;i<Candidates.length ;i++){
            if (Candidates[i].Id == id) return true;
        }
        return false;
    }
    
    function GetVote(address voter) public view returns(address candidateVoted){
        require(msg.sender==_auditioner);
        candidateVoted = _voters[voter].Vote;
    }
    
    function GetVoteCount(address candidate) public view returns(uint count){
        require(msg.sender==_auditioner);
        count = _votes[candidate];
    }
    
}