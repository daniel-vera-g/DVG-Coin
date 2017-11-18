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
	constructer(index, timestamp, data, previusHash = ""){
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
	constructer(){
		// array of blocks (beginning with the genesisBlock)
		this.chain = [];
	}

	/**
	create genesis Block(first Block)
	@return new genesis Block
	*/
	createGenesisBlock(){
		return new Block(0, "10.11.2017", "Genesis Block", "0");
	}

	//returns latest Block in chain
	getLatestBlock(){
		this.chain = 
	}

	addNewBlock(new){

	}
}