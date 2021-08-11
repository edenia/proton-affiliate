<h1 class="contract">addadmin</h1>
---
spec-version: 0.1.0
title: Add an Administrator User
summary: The intent of `{{ addadmin }}` is to allow `admin` accounts to add a new admin user.


<h1 class="contract">rmadmin</h1>
---
spec-version: 0.1.0
title: Remove an Administrator User
summary: The intent of `{{ rmadmin }}` is to allow `admin` accounts to remove a other admin users.

<h1 class="contract">adduser</h1>
---
spec-version: 0.1.0
title: Add an Affiliate User
summary: The intent of `{{ adduser }}` is to allow `admin` accounts to add a new affiliate user.


<h1 class="contract">rmuser</h1>
---
spec-version: 0.1.0
title: Remove an Affiliate User
summary: The intent of `{{ rmuser }}` is to allow `admin` accounts to remove an affiliate user.

<h1 class="contract">addref</h1>
---
spec-version: 0.1.0
title: Add a referral
summary: This action creates a new referral.

<h1 class="contract">verifyacc</h1>
---
spec-version: 0.1.0
title: Verify Account
summary: This action verifies an invitee account has registered on the network.

<h1 class="contract">verifykyc</h1>
---
spec-version: 0.1.0
title: Verify KYC
summary: This action verifies an invitee account has completed the KYC process.

<h1 class="contract">verifyexp</h1>
---
spec-version: 0.1.0
title: Verify expiration
summary: This action checks the referrals expiration date, and marks as EXPIRED the due referrals.

<h1 class="contract">payref</h1>
---
spec-version: 0.1.0
title: Pay referral
summary: This action pays the reward amount for a valid referral (status PENDING_PAYMENT and not expired)

<h1 class="contract">rejectref</h1>
---
spec-version: 0.1.0
title: Reject a referral 
summary: This action rejects a referral this action expires a referral.

<h1 class="contract">setparams</h1>
---
spec-version: 0.1.0
title: System parameters
summary: This action set the parameters values.

<h1 class="contract">setstatus</h1>
---
spec-version: 0.1.0
title: Set referral status
summary: This action bypasses the KYC validation and is intended for development purposes only.

<h1 class="contract">setrate</h1>
---
spec-version: 0.1.0
title: Set exchange rate
summary: Sets the exchange rate used to calculate the amount of XPR to pay for a completed referral.

<h1 class="contract">clearref</h1>
---
spec-version: 0.1.0
title: Clear Referrals
summary: This action cleans referrals with status PAYMENT_REJECTED, EXPIRED, PAID to save RAM.

<h1 class="contract">addreflog</h1>
---
spec-version: 0.1.0
title: Referrals Logging
summary: This action logs the add referral activity.

<h1 class="contract">statuslog</h1>
---
spec-version: 0.1.0
title: Status Logging
summary: This action logs status changes.

<h1 class="contract">clear</h1>
---
spec-version: 0.1.0
title: Clear
summary: This action cleans the contract data and is intended for development purposes only.