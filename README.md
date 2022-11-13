# De-Knight

`De-Knight` is a `play-to-earn` game that deploys major elements of blockchain technology such as cryptocurrencies, non-fungible tokens, crowdfunding, multi-sig wallets, governance, DAO, etc. The players collect cryptocurrencies and NFTs produced in the blockchain and can also generate income by selling in-game NFTs or earn cryptocurrency rewards, both of which can be exchanged for fiat cash.

# De-Knight Game Highlights

## # Play Solo

## # Play Tournament

### Text Chat

### Video Chat

## # Currency/Token Swap

## # NFT Minting

## # Marketplace

## # Crowdfunding

De-Knight supports crowdfunding through `peer-to-peer` fund raising model that removes the need for intermediaries. The game's `CHESS (♞)` coins are exchangeable over peer to peer network.

This blockchain-powered fundraising mechanism offer a solution to tournament organizers who plan to commit resources, time and money for a chess tournaments by renting venue for conducting the match and marketing the same. With De-Knight' crowdfunding feature the organizers can test market acceptance and viability before committing the accumulated funds. This market knowledge makes tournament organizers more willing to take on the financial risk to arrange match that could be profitable.

### **So how does De-Knight crowdfunding work?**

When a potential organizer of a chess tournament presents the initiative of a new chess match, interested parties may choose to support the event.

Each supporter transfers the required amount in `CHESS (♞)` coins to an escrow wallet bound by a De-Knight smart contract. The creator can launch a tournament when the total amount in escrow reaches the target within a specified period.

### The 3 crowdfunding scenarios

1. Once a tournament is created, published and accepted by the majority of the donors through a governance voting system, the complete funds are released to the organizers.

2. When each milestone (such as renting a venue for a chess, or completion of a marketing campaign) is reached and accepted by a predefined ratio of supporters, then a portion of the funds is released to facilitate project progress.

3. When the tournament is created and released or made live for public, the funds can be released to the organizers with or without donor acceptance independent of donor acceptance levels.

The predetermined amount from the escrow wallet will be transferred to the creator once consensus is reached. In this way, the smart contract insulates donors against judgment errors from project creators.

### The De-Knight Crowdfunding Contract

It is a fully customizable smart contracts that defines the terms of the contract, the conditions under which funds are released to the tournament organizers. The contract allows donors (tournament audience) to choose campaigns offering terms they agree with. It also creates a transparent relationship where tournament organizers and donors are protected. Donors can safely contribute to their favorite chess tournaments. Audience can support any tournament and purchase digital products.

# De-Knight Governance Token (DGT)

DGT enables its owners to make decisions in a decentralized manner.

- It is used to form DAO which is a governing body for the project.
- It facilitates decentralized communication between DGT holders.

### **Why is this important?**

In a traditional centralized organization decision making is bestowed upon a single leader or a small group of board members. Only they have the power to set rules & regulations and decide on the future direction of the organization. This leaves individuals, users, investors to be struck off from the whole conversation regarding its governance.

In the web3 world with the power of smart contracts any individual who obtains governance tokens for a protocol may now participate in this decentralized communication with other governance token holders, put forward proposals on new rules or future direction and in turn vote for proposals put forth by others in the community.

# De-Knight Governance

## The Logistics

To manage the logistics of governance and implementing changes within it, the De-Knight contract allows to mint & sell an initial supply of DGT.

## The Decentralized Autonomous Organization

Individuals or groups who choose to purchase initially minted tokens form a DAO which essentially is a simple governing body for the De-Knight project.

This DAO setup is run by a portfolio of De-Knight smart contracts which allows DGT holders to coordinate online, make decisions autonomously without ever knowing each other and establish rules that are encoded on a blockchain.

### **What decisions could De-Knight DAO make?** _- you may ask._

DAO through a portfolio of smart contracts controls how money moves within blockchain and how the money in the treasury gets spent. It therefore allows you to:

- Act on proposals or RFC/RFEs for upgrades in game mechanics.
- Decide whether to invest gains from NFT trades in marketing.
- Decide whether you want to hire somebody for an offline task.
- Decide whether you want to fire somebody for doing a bad job.

### **How much power does DGT holders actually possess?**

The DGT holders vote on how the money in the treasury gets spent.

Usually 1 DGT indicates 1 Vote but this gives unfair advantage to those who hold more tokens.

Rather than favoring the number of tokens held the De-Knight smart contracts favor the time a certain wallet has held their governance tokens for. It incentizes early adopters who believed in the project and have been along for decision making processes for the longest.

# De-Knight Treasury

The funds generated from the initial tokens form the treasury. The treasury allows for the funding for any proposals reaching a majority consensus amongst the token holders. These treasuries can later grow in value even further through liquid treasury and events such as staking, transaction fees.

# De-Knight Tournament Campaign Workflow

1. Event organizers proposes a chess tournament.
2. DGT holders vote for the proposal through De-Knight Governance contract.
3. Based on voting the De-Knight's designated/elected group through its multi-sig wallets approve the creation of a chess tournament campaign.
4. Event organizers execute Crowdfund::launch() w/ campaign's start date, end date and goal.
5. Investors/Donars execute Crowdfund::pledge()/unpledge() before campaign's end date.
6. If the campaign's goal is not met by the end date then the Crowdfund contract allows refund to be initiated by the investors/donors.
7. If the campaign's goal is met by the end date then the organizers can initiate Crowdfund::claim() transaction.
8. Claims are approved through multi-sig wallet.
