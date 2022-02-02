<p align="center">
   <img src="./docs/img/proton-xpr-logo.png" width="200">
</p>

# Proton Affiliate Platform

**An on-chain affiliate marketing platform, rewarding users in XPR for referring and registering on Proton.**

![](https://img.shields.io/github/license/eoscostarica/proton-affiliate) ![](https://img.shields.io/badge/code%20style-standard-brightgreen.svg) ![](https://img.shields.io/badge/%E2%9C%93-collaborative_etiquette-brightgreen.svg) ![](https://img.shields.io/twitter/follow/eoscostarica.svg?style=social&logo=twitter) ![](https://img.shields.io/github/forks/eoscostarica/proton-affiliate?style=social)

### Production Instance: [earnproton.com](https://earnproton.com)

Proton mainnet instance deploys the `main` branch of this repository.

### Development Instance: [test.earnproton.com](https://test.earnproton.com)

Proton testnet instance deploys the `dev` branch of this repository.

## Table of Contents

- [Proton Affiliate Platform](#proton-affiliate-platform)
    - [Production Instance: earnproton.com](#production-instance-earnprotoncom)
    - [Development Instance: test.earnproton.com](#development-instance-testearnprotoncom)
  - [Table of Contents](#table-of-contents)
  - [Tech Stack](#tech-stack)
  - [Smart Contract](#smart-contract)
    - [Smart Contract Docs](#smart-contract-docs)
  - [Demux Pattern](#demux-pattern)
    - [Services Using Demux](#services-using-demux)
    - [Demux Data Flow](#demux-data-flow)
- [Installation](#installation)
  - [Before you Start](#before-you-start)
  - [First Time](#first-time)
  - [Quick Start](#quick-start)
- [File Structure](#file-structure)
- [Technical Documentation](#technical-documentation)
    - [EOSIO Blockchain Integration](#eosio-blockchain-integration)
    - [Web Application](#web-application)
    - [Hasura GraphQL Engine](#hasura-graphql-engine)
    - [Hapi REST Server](#hapi-rest-server)
- [License](#license)
- [Contributing](#contributing)
  - [About Sistemas Edenia Internacional S.A.](#about-sistemas-edenia-internacional-sa)

## Tech Stack

This application features the following tech stack :

- **React JS** : A Front End Web Application Framework.
- **Hapi** : Node JS HTTP API.
- **Demux** : Deterministic event-sourced state and side effect handling.
- **Hasura** : GraphQL Engine for PostgreSQL Database.
- **KEOSD** : Wallet service daemon for storing private keys and signing digital messages.
- **EOSIO** : Blockchain protocol with industry-leading transaction speed.
- **Kubernetes** : Docker Container Orchestration.

<p align="center">
   <img src="./docs/img/services.png">
</p>

## Smart Contract

The **affiliate** smart contract will store referral info, validation info, and issue rewards for a successfully validated referral.

### Smart Contract Docs

For more information on the smart contract design for thi POC please see the [smart contract readme](contracts/affiliate/README.md).

## Demux Pattern

[Demux](https://github.com/EOSIO/demux-js) is a backend infrastructure pattern for sourcing blockchain events to deterministically update queryable datastores and trigger side effects.

We use the demux pattern's ability for blockchain events to trigger new transactions, as well as other side effects outside of the blockchain. The blockchain as the single source of truth for all application state

### Services Using Demux

Backend services execute the following smart contract actions triggered by demux updaters. The custom permission `affiliate@verify` is created for the smart contract account so that keys stored in wallet service can can only call the following actions.

- **Account Registration** Triggers `verifyacc` action that updates referral when invitee registers a new account.

- **Account KYC** Triggers `verifykyc` action that updates referral when invitee completes KYC for a new account.

### Demux Data Flow

<p align="center">
   <img src="./docs/img/demux-data-pattern.png" width="500">
</p>

1. Client sends transaction to blockchain
1. Action Watcher invokes Action Reader to check for new blocks
1. Action Reader sees transaction in new block, parses actions
1. Action Watcher sends actions to Action Handler
1. Action Handler processes actions through Updaters and Effects
1. Actions run their corresponding Updaters, updating the state of the Datastore
1. Actions run their corresponding Effects, triggering external events
1. Client queries API for updated data

# Installation

## Before you Start

Somethings you need before getting started:

- [git](https://git-scm.com/)
- [node.js](https://nodejs.org/es/)
- [docker](https://www.docker.com/)
- [docker-compose](https://docs.docker.com/compose/)

## First Time

Copy the `.env.example` then update the environment variables according to your needs.

```
cp .env.example .env
```

## Quick Start

1.  Clone this repo using `git clone --depth=1 https://github.com/eoscostarica/proton-affiliate.git <YOUR_PROJECT_NAME>`.
2.  Move to the appropriate directory: `cd <YOUR_PROJECT_NAME>`.
3.  Run `make run` in order to start the project using docker compose.

At this point you can navigate to `http://localhost:3000`.

# File Structure

Within this repository you will find the following directories and files:

```
.
├── contracts ..................... EOSIO Smart Contracts
│   └── affiliate ................. Affiliate Platform Contract
├── docs .......................... Documentation
│   └── img ....................... Images and Diagrams
├── hapi .......................... Node JS backend & HTTP API
│   └── src
│       └── config ................ Backend Configurations
│       └── routes ................ HTTP routes
│       └── utils ................. Utilities and Libraries
│       └── services .............. Project Business Logic
|           └── hyperion .......... Demux Implementation
├── hasura ........................ Hasura GraphQL Engine
├── kubernetes .................... Kubernetes Manifests
├── utils ......................... Makefiles for project build
├── wallet ........................ EOSIO Wallet Service
└── webapp ........................ ReactJS Web Application
```

# Technical Documentation

### EOSIO Blockchain Integration

This project is being developed on the [Proton Testnet](https://proton-testnet.eosio.online/) using the [`affiliate`](https://proton-test.bloks.io/account/affiliate) smart contract account. The backend service is currently using [EOS Costa Rica's testnet API Node](https://proton-testnet.eosio.cr/v1/chain/get_info)

We use the [EOS JS](https://github.com/EOSIO/eosjs) javascript API for integration with EOSIO-based blockchain networks using EOSIO RPC API.

EOS JS documentation can be found [here](https://developers.eos.io/manuals/eosjs/latest/index)

### Web Application

This FullStack Template uses [React.js](https://reactjs.org) as a Frontend Library which together with other tools like [Apollo Client](https://www.apollographql.com/docs/react/), [GraphQL](https://graphql.org/) and [Material UI](https://material-ui.com/) brings a robust solution for building Single Page Applications out of the box.

### Hasura GraphQL Engine

[Hasura](https://hasura.io/) technology maps a [PostgreSQL](https://www.postgresql.org/) database and provides a reliable and easy-to-use API. This allow us to focus on critical features of our projects, delegating mechanic CRUD (Create, Read, Update, Delete) operations.
Hasura also enables custom REST handling capabilities with the possibility to integrate a custom REST server, that way we can extend the base CRUD functionalities and build custom business logic.

### Hapi REST Server

We need to handle REST custom requests coming from the Hasura GraphQL server. For this, we use [hapi.dev](https://hapi.dev/), which is a simple and easy-to-use backend framework.

# License

MIT © [Sistemas Edenia Internacional S.A.](https://edenia.com).

# Contributing

Please read Edenia's [Open Source Contributing Guidelines](https://developers.eoscostarica.io/docs/open-source-guidelines).

Please report bugs big and small by [opening an issue](https://github.com/edenia/proton-affiliate/issues/new/choose)

## About Sistemas Edenia Internacional S.A.

<p align="center">
	<a href="https://edenia.com">
		<img src="https://github.com/edenia/eos-rate/raw/master/docs/eoscostarica-logo-black.png" width="300">
	</a>
</p>
<br/>

Edenia offers a suite of services to make the internet safer, more efficient, and transparent. Our team has been operating since 1987, leveraging the newest and most promising technologies over the past years. We identify as technology agnostic builders with experience developing infrastructure and running nodes in different blockchain mainnets and testnets. Our goal is to push the boundaries of the network and leverage web3 for a greater good.

[edenia.com](https://edenia.com/)
