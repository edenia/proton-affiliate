<h1 class="contract">addadmin</h1>
---
spec_version: 0.1.0
title: Add an Administrator User
summary: The intent of `{{ addadmin }}` is to allow `admin` accounts to add a new admin user.
icon: @ICON_BASE_URL@/@ADMIN_ICON_URI@
---

<h1 class="contract">rmadmin</h1>
---
spec_version: 0.1.0
title: Remove an Administrator User
summary: The intent of `{{ rmadmin }}` is to allow `admin` accounts to remove another admin user.
icon: @ICON_BASE_URL@/@ADMIN_ICON_URI@
---

<h1 class="contract">adduser</h1>
---
spec_version: 0.1.0
title: Add an Affiliate User
summary: The intent of `{{ adduser }}` is to allow `admin` accounts to add a new affiliate user.
icon: @ICON_BASE_URL@/@ACCOUNT_ICON_URI@
---

<h1 class="contract">rmuser</h1>
---
spec_version: 0.1.0
title: Remove an Affiliate User
summary: The intent of `{{ rmuser }}` is to allow `admin` accounts to remove an affiliate user.
icon: @ICON_BASE_URL@/@ACCOUNT_ICON_URI@
---

<h1 class="contract">addref</h1>
---
spec_version: 0.1.0
title: Add a referral
summary: This action creates a new referral.
icon: 
---

<h1 class="contract">verifyacc</h1>
---
spec_version: 0.1.0
title: Verify Account
summary: This action verifies an invitee account has registered on the network.
icon: 
---

<h1 class="contract">verifykyc</h1>
---
spec_version: 0.1.0
title: Verify KYC
summary: This action verifies an invitee account has completed the KYC process.
icon: 
---

<h1 class="contract">verifyexp</h1>
---
spec_version: 0.1.0
title: Verify expiration
summary: This action checks the referrals expiration date, and marks as EXPIRED the due referrals.
icon: 
---

<h1 class="contract">payref</h1>
---
spec_version: 0.1.0
title: Pay referral
summary: This action pays the reward amount for a valid referral (status PENDING_PAYMENT and not expired).
icon: 
---

<h1 class="contract">rejectref</h1>
---
spec_version: 0.1.0
title: Reject a referral 
summary: This action rejects a referral payment.
icon: 
---

<h1 class="contract">setparams</h1>
---
spec_version: 0.1.0
title: System parameters
summary: This action sets the parameters table values.
icon: 
---

<h1 class="contract">setstatus</h1>
---
spec_version: 0.1.0
title: Set referral status
summary: This action bypasses the KYC validation and is intended for development purposes only.
icon: 
---

<h1 class="contract">setrate</h1>
---
spec_version: 0.1.0
title: Set exchange rate
summary: Sets the exchange rate used to calculate the amount of XPR to pay for a completed referral.
icon: 
---

<h1 class="contract">clearref</h1>
---
spec_version: 0.1.0
title: Clear Referrals
summary: This action cleans referrals with status PAYMENT_REJECTED, EXPIRED, PAID to save RAM.
icon: 
---

<h1 class="contract">addreflog</h1>
---
spec_version: 0.1.0
title: Referrals Logging
summary: This action logs the add referral activity.
icon: 
---

<h1 class="contract">statuslog</h1>
---
spec_version: 0.1.0
title: Status Logging
summary: This action logs status changes.
icon: 
---

<h1 class="contract">clear</h1>
---
spec_version: 0.1.0
title: Clear
summary: This action cleans the contract data and is intended for development purposes only.
icon: 
---