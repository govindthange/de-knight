// Contract based on https://docs.openzeppelin.com/contracts/4.x/erc721
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ChessNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    string public constant NftName = "ChessNFT";
    string public constant NftSymbol = "CNFT";

    event ChessNFTMinted(address minter, string tokenUri, uint256 tokenId);

    constructor() ERC721(NftName, NftSymbol) {}

    function mintFromOwner(address recipient, string memory tokenURI)
        public
        onlyOwner
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 tokenId = _tokenIds.current();
        _mint(recipient, tokenId);
        _setTokenURI(tokenId, tokenURI);

        emit ChessNFTMinted(msg.sender, tokenURI, tokenId);

        return tokenId;
    }

    function mint(string memory tokenURI) public returns (uint256) {
        _tokenIds.increment();

        uint256 tokenId = _tokenIds.current();
        _mint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenURI);

        emit ChessNFTMinted(msg.sender, tokenURI, tokenId);

        return tokenId;
    }

    function reflectMint(string memory tokenURI)
        public
        pure
        returns (string memory)
    {
        return tokenURI;
    }
}
