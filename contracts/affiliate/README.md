<p align="center">
   <img src="../../docs/img/proton-xpr-logo.png" width="200">
</p>

# Affiliate Platform Smart Contract
**An on-chain affiliate marketing platform, rewarding users in XPR for referring and registering on Proton.**

View [project readme](../../README.md) document.

The **affiliate** smart contract will store referral info, validation info, and issue rewards for a successfully validated referral.

## User Story

@benobi invites crystalrose@gmail.com via the earnproton.com website, then if crystal converts to a real user ( @anything ) in 72 hours then ben is the parent of crystal and will get the reward when crystal KYCs. Crystal will also get a reward for signing up.

## Data Model

Data persisted in the smart contract multi index tables

<p align="center">
   <img src="../../docs/img/data-model.png">
</p>

### Referral Status

```
  PENDING_USER_REGISTRATION = 1
  PENDING_KYC_VERIFICATION = 2
  PENDING_PAYMENT = 3
  PAYMENT_REJECTED = 4
  EXPIRED = 5
  PAID = 6
```

### User Roles

```
  ADMIN = 1
  REFERRER = 2
```

## Actions

|    User Role    |   Action    |        Description        |               Pre Conditions                |          Post Conditions          |
| :-------------: | :---------: | :-----------------------: | :-----------------------------------------: | :-------------------------------: |
| Smart Contract  | `addadmin`  |  Grant Admin Permission   |       Account must exist and be KYCd        | Admin actions enabled for account |
| Smart Contract  |  `rmadmin`  |  Revoke Admin Permission  |      Account must be registered admin       |   Referral link enabled for user   |
|      Admin      |  `adduser`  | Grant Referral Permission  |       Account must exist and be KYCd        |   Referral link enabled for user   |
|      Admin      |  `rmuser`   | Revoke Referral Permission |     Account must be registered referrer     |  Referral link disabled for user   |
|    Referrer     |     N/A     |    Share Referral Link     |         Referral permission granted         |   Email sent with register link   |
|     Invitee     |  `addref`   |      Accept Referral      | Account doesn't exist & not already referred |     Referral added to table     |
| Backend Service | `verifyacc` |   Verify when accounts registered as invitee in a referral are created   |    Referral exists with status "PENDING_USER_REGISTRATION" && Referral hasn't expired    |  Referral status set to "PENDING_KYC_VERIFICATION"  |
| Backend Service | `verifykyc` |  Verify when accounts registered as invitee in a referral are marked as verified in `eosio.proton` - `usersinfo` table   |    Referral exists with status "PENDING_KYC_VERIFICATION" && Referral hasn't expired | Referral status set to "PENDING_PAYMENT" |
| Backend Service | `expireref` | Delete Expired Referrals  |          Referral hasn’t been paid          |         Referral deleted          |
|      Admin      |  `payref`   |      Manual Approval      |    KYC completed & Referral hasn't expired    |          Token Transfer           |
|      Admin      | `rejectref` |      Reject Referral      |          Referral hasn’t been paid          |         Referral deleted          |
| Smart Contract  | `setparams` |       System Config       |                    None                     |  Set the account that will pay for the referrals, the rewards amount to pay and the days before a referral expires|
| Smart Contract  |   `clear`   |       Clear Tables        |            For development purposes only    |                                   |

#### Params

Referral system configuration parameters set by smart contract account.

- **payer** : Account that holds token balance _(name)_
- **reward_amount** : Amount of tokens rewarded _(asset)_
- **expiration_days** : Time period for referral expiration _(datetime)_

### Admin Roles Appointed by Committee

- Smart Contract Account can update config params
- SysAdmin hosts backend service infrastructure
