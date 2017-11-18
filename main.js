const SHA256 = require('crypto-js/sha256');

//define how a block on the blockchain will look like
class Block{
	/**
	make constructer for each Block with properties of the Blockchain Block
	@index tells where Block sits on the chain  
	@timestamp tells when block was created
	@data data to transfer f.ex money exchanged
	@previousHash String that contains hash previous block --> ensures integrity of blockchain
	*/
	constructor(index, timestamp, data, previousHash = ""){
		this.index = index;
		this.timestamp = timestamp;
		this.data = data;
		this.previousHash = previousHash;
		// hash property to save hash of current block 
		this.hash = this.calculateHash(); 
	}

	// function to calculate hash through taking properties of Block and runn it through hahs function
	calculateHash(){
		// return sha256 as hash function
		return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
	}
}


//class for creating our actual blockchain
class Blockchain{
	/**
	constructer responsible to initialize Blockchain
	*/
	constructor(){
		// array of blocks (beginning with the genesisBlock)
		this.chain = [this.createGenesisBlock()];
	}

	/**
	create genesis Block(first Block)
	@return new genesis Block
	*/
	createGenesisBlock(){
		return new Block(0, "10.11.2017", "Genesis Block", "0");
	}

	//returns latest Block in chain
	 getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

	//adds a new Block to the exisiting Blockchain
	addBlock(newBlock){
		newBlock.previousHash = this.getLatestBlock().hash;
		newBlock.hash = newBlock.calculateHash();
		this.chain.push(newBlock);
	}

	//verify integrity of Blockchain through looping over entire chain
	isChainValid(){
		for(var i = 1; i < this.chain.length; i++){
			const currentBlock = this.chain[i];
			const previousBlock = this.chain[i -1];

			//check if chain is valid

			//check if the hash is the same
			if (currentBlock.hash !== currentBlock.calculateHash()) {
				return false;
			}

			// check if block links to a correct previous block 
			if (currentBlock.previousHash !== previousBlock.hash) {
				return false;
			}

			//if nothing takes place chain is valid
			return true;
		}
	}
}

//initiate Blockchain
let dvgCoin = new Blockchain();
dvgCoin.addBlock(new Block(1, "18.11.17", {amount: 4}));
dvgCoin.addBlock(new Block(2, "18.11.17", {amount: 6}));

//show to the user if Chain is valid
console.log('Is Chain valid ?  ' + dvgCoin.isChainValid());

//test if chain is valid after change
dvgCoin.chain[1].data = {amount: 100};

//show to the user if Chain is valid
console.log('Is Chain valid ?  ' + dvgCoin.isChainValid());

// console.log(JSON.stringify(dvgCoin, null, 4));