

# Proton affiliate unit tests
The follow tests were design to test the proton smart contract's actions.

## Prerequisites
1) If Node.js is not installed on your system, install the Node.js package by typing:

```$ sudo dnf install @nodejs```

2) Enable the Yarn repository and import the repository’s GPG key:

```$ curl --silent --location https://dl.yarnpkg.com/rpm/yarn.repo | sudo tee /etc/yum.repos.d/yarn.repo```

```$ sudo rpm --import https://dl.yarnpkg.com/rpm/pubkey.gpg ```

3) Once the repository is enabled, install Yarn:

```$ sudo dnf install yarn```

4) Accounts #### #### must exits in the blockchain
## How to Run tests

 ```yarn add eosjs```

 ```yarn install```

 ```yarn test_proton```