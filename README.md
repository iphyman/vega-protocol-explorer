<img src="./apps/explorer-ui/src/assets/images/logo-dark.png">

**An opensource explorer for the VegProtocol (VEGA) blockchain.**

**Project structure**
VegaScan is a block explorer and analytics platform for Vega Protocol, a decentralised derivatives scaling layer for Web3.

Having studied the VegaProtocol codebase written with Golang programming language, this project strived to implement deciphering of the tendermint transactions using typescript.

# Project Structure

This uses a monorepo pattern to structure it's codebase. It contains the following packages;

- explorer-api
- explorer-ui
- ui-components
- sdk

# Development

To run the project on your local machine, clone the repository,
Run `yarn` or `npm install` in the root directory to install all required dependencies.

- Run `nx serve explorer-ui` to serve the frontend
- Run `nx serve explorer-api --dev` to serve the api service.

The project is self contained, decoding transaction has been abstracted to the sdk so transactions can be decoded on the frontend without making calls to the serverless api.

# Demo

You can view the live working app deployed on vercel https://vegascan.vercel.app/

# Project Roadmap

A minimal javascript SDK has been developed to speed up interaction with the vegaprotocol node. This SDK will further be developed post hackathon to ship as a standalone javascript package.

The explorer ui will be improved to match with the VegaProtocol branding and more features implemented such as;

- exploring markets
- trading activities
- looking up parties and account balances
- visualising delegation data
- indexing blockchain data to a database to allow performing more complex data filtering
