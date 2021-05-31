# Proton Affiliate Platform

A fully on-chain affiliate marketing platform, rewarding users in XPR coin for referring another user to the Proton platform.

## Smart Contract POC

The **afiliatepoc** smart contract will store referral info, validation info, and issue rewards for a successfully validated referral.

## User Story

@benobi invites crystalrose@gmail.com via the earnproton.com website, then if crystal converts to a real user ( @anything ) in 72 hours then ben is the parent of crystal and will get the reward when crystal KYCs. Crystal will also get a reward for signing up.

## Data Model

Data persisted in the smart contract multi index tables

<p align="center">
		<img src="/docs/img/data-model.png" width="300">
</p>

### Referal Status

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

|    User Role    |      Action       |       Description        |               Pre Conditions                |        Post Conditions         |
| :-------------: | :---------------: | :----------------------: | :-----------------------------------------: | :----------------------------: |
|      Admin      |    `add_user`     | Grant Referal Permission |       Account must exist and be KYCd        | Referal link enabled for user  |
|    Referrer     |        N/A        |    Share Referal Link    |         Referral permission granted         | Email sent with register link  |
|     Invitee     | `create_referral` |     Accept Referral      | Account doesnt exist & not already referred |   Referreral added to table    |
| Backend Service | `verify_referral` |  Verify new account KYC  |    KYC completed & Referal hasnt expired    | Referral set for manual review |
| Backend Service | `expire_referral` | Delete Expired Referrals |          Referral hasn’t been paid          |        Referral deleted        |
|      Admin      |  `pay_referral`   |     Manual Approval      |                                             |         Token Transfer         |
|      Admin      | `reject_payment`  |      System Config       |                                             |        Referral deleted        |
|      Admin      |   `set_params`    |      System Config       |                                             |                                |

#### Params

Referral system configuration parameters set by admin user.

- **token_symbol** : Token used to pay rewards _(symbol)_
- **reward_account** : Account that holds token balance _(name)_
- **reward_amount** : Amount of tokens rewarded _(number)_
- **expiry_period** : Time period for referal expiration _(datetime)_
- **manual_review** : Manual review required _(true or false)_

## Services Architecture

In order to send emails and to store the email addresses "off chain" we would need some backend services , meaning someone would have to host the email server and database

<p align="center">
		<img src="/docs/img/services.png" width="300">
</p>

### Admin Roles Appointed by Committee

- Smart Contract Admin can update config params
- SysAdmin hosts backend service and email server
