a = eth.accounts[0]
web3.eth.defaultAccount = a;

// abi and bytecode generated from simplestorage.sol:
// > solcjs --bin --abi simplestorage.sol
var abi = [
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "Candidates",
		"outputs": [
			{
				"name": "Id",
				"type": "address"
			},
			{
				"name": "Name",
				"type": "bytes32"
			},
			{
				"name": "Proposals",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "name",
				"type": "bytes32"
			},
			{
				"name": "proposals",
				"type": "bytes32"
			}
		],
		"name": "Apply",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "voter",
				"type": "address"
			}
		],
		"name": "GetVote",
		"outputs": [
			{
				"name": "candidateVoted",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "candidate",
				"type": "address"
			}
		],
		"name": "GetVoteCount",
		"outputs": [
			{
				"name": "count",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "GetWinner",
		"outputs": [
			{
				"name": "winner",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "EndElection",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "candidate",
				"type": "address"
			}
		],
		"name": "Vote",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	}
];

var bytecode = "608060405234801561001057600080fd5b5060018054600160a060020a031916331790556004805460ff191690556105038061003c6000396000f3006080604052600436106100825763ffffffff7c0100000000000000000000000000000000000000000000000000000000600035041663290e921281146100875780636a86856a146100c75780638a0731e9146100e45780638c0d42e5146101215780639f6c4e6c14610154578063caf5a1a514610169578063f5b083461461017e575b600080fd5b34801561009357600080fd5b5061009f60043561019f565b60408051600160a060020a039094168452602084019290925282820152519081900360600190f35b3480156100d357600080fd5b506100e26004356024356101da565b005b3480156100f057600080fd5b50610105600160a060020a03600435166102d7565b60408051600160a060020a039092168252519081900360200190f35b34801561012d57600080fd5b50610142600160a060020a0360043516610315565b60408051918252519081900360200190f35b34801561016057600080fd5b5061010561034b565b34801561017557600080fd5b506100e26103ca565b34801561018a57600080fd5b506100e2600160a060020a03600435166103f0565b60008054829081106101ad57fe5b6000918252602090912060039091020180546001820154600290920154600160a060020a03909116925083565b60045460ff16156101ea57600080fd5b6101f333610474565b156101fd57600080fd5b604080516060810182523380825260208083019586528284019485526000805460018101825581805293517f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e5636003958602908101805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a039093169290921790915596517f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e56488015594517f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e56590960195909555835290925290812055565b600154600090600160a060020a031633146102f157600080fd5b50600160a060020a0390811660009081526002602052604090205461010090041690565b600154600090600160a060020a0316331461032f57600080fd5b50600160a060020a031660009081526003602052604090205490565b60008080805b6000548210156103c457600080548390811061036957fe5b6000918252602080832060039283020154600160a060020a03168084529190526040909120549091508310156103b957600160a060020a0381166000908152600360205260409020549093509150825b600190910190610351565b50505090565b600154600160a060020a031633146103e157600080fd5b6004805460ff19166001179055565b60045460009060ff161561040357600080fd5b50336000908152600260205260409020805460ff161561042257600080fd5b8054600160ff19909116811774ffffffffffffffffffffffffffffffffffffffff001916610100600160a060020a03949094169384021790915560009182526003602052604090912080549091019055565b6000805b6000548110156104cc5782600160a060020a031660008281548110151561049b57fe5b6000918252602090912060039091020154600160a060020a031614156104c457600191506104d1565b600101610478565b600091505b509190505600a165627a7a72305820c26d301ce1ffd88e5602e3821759d29d165ad27d366108705e6b14b16ab8fce10029";

var simpleContract = web3.eth.contract(abi);
var simple = simpleContract.new({from:web3.eth.accounts[0], data: bytecode, gas: 0x47b760}, function(e, contract) {
	if (e) {
		console.log("err creating contract", e);
	} else {
		if (!contract.address) {
			console.log("Contract transaction send: TransactionHash: " + contract.transactionHash + " waiting to be mined...");
		} else {
			console.log("Contract mined! Election started! . Address: " + contract.address);
			console.log(contract);
		}
	}
});
