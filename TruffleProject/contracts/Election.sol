pragma solidity ^0.4.24;
pragma experimental ABIEncoderV2;

contract Election{
    
    struct Voter{
        bool Voted;
        address Vote;
    }
    
    struct Candidate{
        address Id;
        string Photo;
        string Name;
        string Proposals;
    }
    
    Candidate[] private _candidates;
    address private _auditioner;
    mapping(address=> Voter) private _voters;
    mapping(address=> uint) private _votes;
    bool private _ended;
    
    constructor() public{
        _auditioner = msg.sender;
        _ended=false;
    }
    
    function Apply(string photo,string name,string proposals) public{
         require(!_ended);
         require(!IsCandidate(msg.sender));
         
         _candidates.push(Candidate({
                Id:msg.sender,
                Photo:photo,
                Name: name,
                Proposals: proposals
        }));
         _votes[msg.sender] = 0;
    }
    
    function Vote(address candidate) public{
        require(!_ended);
        Voter storage sender = _voters[msg.sender] ;
        require(!sender.Voted);
        sender.Voted =true;
        sender.Vote = candidate;
        _votes[candidate]++;
    }
    
    function GetWinner() public view returns (bool ended, address winner,string photo,string name,string proposals)
    {
        ended = _ended; 
        if(ended){
            uint maxVotes=0;
            for(uint i=0;i<_candidates.length ;i++){
                if(maxVotes < _votes[_candidates[i].Id]){
                    winner= _candidates[i].Id;
                    photo = _candidates[i].Photo;
                    name = _candidates[i].Name;
                    proposals = _candidates[i].Proposals;
                    maxVotes = _votes[winner];
                }
            }
        }
    }
    
    function IsCandidate( address id ) private view returns(bool) {
        for(uint i=0;i<_candidates.length ;i++){
            if (_candidates[i].Id == id) return true;
        }
        return false;
    }
    
    function ListCandidates() public view returns(bool canVote,address vote, address[] ,string[],string[] , string[] ){
        address[] memory ids = new address[](_candidates.length);
        string[] memory photos  = new string[](_candidates.length);
        string[] memory names  = new string[](_candidates.length);
        string[] memory proposals  = new string[](_candidates.length);
        for(uint i=0;i<_candidates.length ;i++){
            ids[i] = _candidates[i].Id;
            photos[i] = _candidates[i].Photo;
            names[i] = _candidates[i].Name;
            proposals[i] = _candidates[i].Proposals;
        }
        return(!_voters[msg.sender].Voted,_voters[msg.sender].Vote,ids,photos,names,proposals);
    }
    
    function GetVote(address voter) public view returns(address candidateVoted){
        require(msg.sender==_auditioner);
        candidateVoted = _voters[voter].Vote;
    }
    
    function GetVoteCount(address candidate) public view returns(uint count){
        require(msg.sender==_auditioner);
        count = _votes[candidate];
    }
    
    function EndElection() public{
        require(msg.sender==_auditioner);
        _ended = true;
    }
}