const generateConfirmation = ({ account }) => {
  return `
    <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body>
        <table style="margin-left: auto; margin-right: auto;">
            <tr>
                <div style="max-width: 640px; margin-left: auto; margin-right: auto;">
                    <a href="https://earnproton.com" style="text-decoration: none; margin: 40px 0px 0px 16px; width: 178px; height: 53px;">
                        <img style="object-fit: scale-down;" src="https://earnproton.com/icons/proton.png"/>
                    </a>
                    <p align="left" style="margin: 24px 16px 24px; font-family: Arial; font-size: 21px; font-weight: normal; font-stretch: normal; font-style: normal; line-height: normal; letter-spacing: 0.15px; text-align: left; color: #000;">
                        ${account} - Welcome to the Proton On-Chain Referral Program!
                    </p>
                    <p align="left" style="margin: 0px 16px 8px; font-family: Arial; font-size: 16px; font-weight: normal; font-stretch: normal; font-style: normal; line-height: 1.5; letter-spacing: 0.44px; text-align: left; color: #000;">
                        Your Proton referral link is now active. You may share the following link with your friends to earn rewards when they complete new account registration and KYC on the Proton network:
                    </p>
                    <p align="center" style="margin: 0px 16px 16px;">
                        <a href="https://earnproton.com/join/${account}" style="font-family: Arial; font-size: 16px; font-weight: bold; font-stretch: normal; font-style: normal; line-height: 1; letter-spacing: 0.4px; text-align: center; color: #582acb;">
                            https://earnproton.com/join/${account}
                        </a>
                    </p>
                    <p align="left" style="margin: 0px 16px 24px; font-family: Arial; font-size: 16px; font-weight: normal; font-stretch: normal; font-style: normal; line-height: 1.5; letter-spacing: 0.44px; text-align: left; color: #000; overflow-wrap: break-word;">
                        To view your referrals and payments, login using your proton wallet at https://earnproton.com.
                    </p>
                    <p align="left" style="margin: 0px 16px 0px; font-family: Arial; font-size: 16px; font-weight: normal; font-stretch: normal; font-style: normal; line-height: 1.5; letter-spacing: 0.44px; text-align: left; color: #000;">
                        Best Regards,
                    </p>
                    <br>
                    <p align="left" style="margin: 0px 16px 35px; font-family: Arial; font-size: 16px; font-weight: bold; font-stretch: normal; font-style: normal; line-height: 1.5; letter-spacing: 0.44px; text-align: left; color: #000;">
                        The Proton Affiliate Team
                        <br>
                        (Edenia, SoftAtom)
                    </p>
                </div>
            </tr>
            <tr>
                <div style="background-color: #000; margin-left: auto; margin-right: auto; padding-top: 20px;">
                    <p align="left" style="width: 348px; margin: 0px auto 8px auto; font-family: Arial; font-size: 12px; font-weight: normal; font-stretch: normal; font-style: normal; line-height: 1.33; letter-spacing: 1.5px; text-align: center; color: #fff;">
                        THIS PROJECT WAS FUNDED THROUGH THE PROTON GOVERNANCE COMMITTEE WORKER PROPOSAL SYSTEM
                    </p>
                    <p align="left" style="flex-grow: 0; margin: 0px 16px 14px; font-family: Arial; font-size: 14px; font-weight: normal; font-stretch: normal; font-style: normal; line-height: 1.14; letter-spacing: 0.44px; text-align: center; color: #fff;">
                        <a href="https://forms.gle/GWHig5ciAvg5fdEH7" style="color: #fff;">
                            Apply Here for Funding
                        </a>
                    </p>
                    <div style="padding-bottom: 8px; text-align: center;">
                        <a href="https://www.facebook.com/protonxpr" style="text-decoration: none;">
                            <img style="width: 32px; height: 32px; margin-right: 16px;" src="https://earnproton.com/icons/facebook.png">
                        </a>
                        <a href="https://www.instagram.com/protonxpr" style="text-decoration: none;">
                            <img style="width: 32px; height: 32px; margin-right: 16px;" src="https://earnproton.com/icons/instagram.png">
                        </a>
                        <a href="https://twitter.com/protonxpr" style="text-decoration: none;">
                            <img style="width: 32px; height: 32px; margin-right: 16px;" src="https://earnproton.com/icons/twitter.png">
                        </a>
                        <a href="https://www.reddit.com/r/ProtonChain" style="text-decoration: none;">
                            <img style="width: 32px; height: 32px; margin-right: 16px;" src="https://earnproton.com/icons/reddit.png">
                        </a>
                        <a href="https://github.com/eoscostarica/proton-affiliate" style="text-decoration: none;">
                            <img style="width: 32px; height: 32px; margin-right: 16px;" src="https://earnproton.com/icons/github.png">
                        </a>
                        <a href="https://t.me/protonxpr" style="text-decoration: none;">
                            <img style="width: 32px; height: 32px;" src="https://earnproton.com/icons/telegram.png">
                        </a>
                    </div>
                </div>
            </tr>
        </table>
    </body>
  `
}

const generateRejectionByKYC = ({ account }) => {
  return `
      <head>
          <meta charset="utf-8">
          <meta http-equiv="x-ua-compatible" content="ie=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1">
      </head>
      <body>
          <table style="margin-left: auto; margin-right: auto;">
              <tr>
                  <div style="max-width: 640px; margin-left: auto; margin-right: auto;">
                      <a href="https://earnproton.com" style="text-decoration: none; margin: 40px 0px 0px 16px; width: 178px; height: 53px;">
                          <img style="object-fit: scale-down;" src="https://earnproton.com/icons/proton.png"/>
                      </a>
                      <p align="left" style="margin: 24px 16px 24px; font-family: Arial; font-size: 21px; font-weight: normal; font-stretch: normal; font-style: normal; line-height: normal; letter-spacing: 0.15px; text-align: left; color: #000;">
                          ${account} - Regarding Your Proton On-Chain Referral Program Request
                      </p>
                      <p align="left" style="margin: 0px 16px 8px; font-family: Arial; font-size: 16px; font-weight: normal; font-stretch: normal; font-style: normal; line-height: 1.5; letter-spacing: 0.44px; text-align: left; color: #000;">
                        Your Proton referral link has not been approved. To begin using the Proton Referral Program and start earning rewards, you must first complete the KYC (Know Your Client) authentication process in the Proton wallet.
                      </p>
                      <br>
                      <p align="left" style="margin: 0px 16px 24px; font-family: Arial; font-size: 16px; font-weight: normal; font-stretch: normal; font-style: normal; line-height: 1.5; letter-spacing: 0.44px; text-align: left; color: #000; overflow-wrap: break-word;">
                        To request joining the Referral Program, go to the Proton wallet app and submit your KYC application. To find out what countries can complete a KYC, go to the Proton wallet app or ask in the Proton Telegram chat: https://t.me/protonxpr. If you're still having problems after confirming this information, please get in touch with us through Telegram: https://t.me/eoscr.
                      </p>
                      <p align="left" style="margin: 0px 16px 0px; font-family: Arial; font-size: 16px; font-weight: normal; font-stretch: normal; font-style: normal; line-height: 1.5; letter-spacing: 0.44px; text-align: left; color: #000;">
                          Best Regards,
                      </p>
                      <br>
                      <p align="left" style="margin: 0px 16px 35px; font-family: Arial; font-size: 16px; font-weight: bold; font-stretch: normal; font-style: normal; line-height: 1.5; letter-spacing: 0.44px; text-align: left; color: #000;">
                          The Proton Affiliate Team
                          <br>
                          (Edenia, SoftAtom)
                      </p>
                  </div>
              </tr>
              <tr>
                  <div style="background-color: #000; margin-left: auto; margin-right: auto; padding-top: 20px;">
                      <p align="left" style="width: 348px; margin: 0px auto 8px auto; font-family: Arial; font-size: 12px; font-weight: normal; font-stretch: normal; font-style: normal; line-height: 1.33; letter-spacing: 1.5px; text-align: center; color: #fff;">
                          THIS PROJECT WAS FUNDED THROUGH THE PROTON GOVERNANCE COMMITTEE WORKER PROPOSAL SYSTEM
                      </p>
                      <p align="left" style="flex-grow: 0; margin: 0px 16px 14px; font-family: Arial; font-size: 14px; font-weight: normal; font-stretch: normal; font-style: normal; line-height: 1.14; letter-spacing: 0.44px; text-align: center; color: #fff;">
                          <a href="https://forms.gle/GWHig5ciAvg5fdEH7" style="color: #fff;">
                              Apply Here for Funding
                          </a>
                      </p>
                      <div style="padding-bottom: 8px; text-align: center;">
                          <a href="https://www.facebook.com/protonxpr" style="text-decoration: none;">
                              <img style="width: 32px; height: 32px; margin-right: 16px;" src="https://earnproton.com/icons/facebook.png">
                          </a>
                          <a href="https://www.instagram.com/protonxpr" style="text-decoration: none;">
                              <img style="width: 32px; height: 32px; margin-right: 16px;" src="https://earnproton.com/icons/instagram.png">
                          </a>
                          <a href="https://twitter.com/protonxpr" style="text-decoration: none;">
                              <img style="width: 32px; height: 32px; margin-right: 16px;" src="https://earnproton.com/icons/twitter.png">
                          </a>
                          <a href="https://www.reddit.com/r/ProtonChain" style="text-decoration: none;">
                              <img style="width: 32px; height: 32px; margin-right: 16px;" src="https://earnproton.com/icons/reddit.png">
                          </a>
                          <a href="https://github.com/eoscostarica/proton-affiliate" style="text-decoration: none;">
                              <img style="width: 32px; height: 32px; margin-right: 16px;" src="https://earnproton.com/icons/github.png">
                          </a>
                          <a href="https://t.me/protonxpr" style="text-decoration: none;">
                              <img style="width: 32px; height: 32px;" src="https://earnproton.com/icons/telegram.png">
                          </a>
                      </div>
                  </div>
              </tr>
          </table>
      </body>
    `
}

module.exports = {
  generateConfirmation,
  generateRejectionByKYC
}
