const generateConfirmationMail = ({ account }) => {
  return `
    <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body>
        <table style="margin-left: auto; margin-right: auto;">
            <tr>
                <table style="max-width: 640px; margin-left: auto; margin-right: auto;">
                    <tr>
                        <img style="margin: 40px 0px 24px 16px; width: 178px; height: 53px; object-fit: scale-down;" src="https://earnproton.com/icons/proton.png"/>
                    </tr>
                    <tr>
                        <p align="left" style="margin: 0px 16px 24px; font-family: Arial; font-size: 21px; font-weight: normal; font-stretch: normal; font-style: normal; line-height: normal; letter-spacing: 0.15px; text-align: left; color: #000;">
                            ${account} - Welcome to the Proton On-Chain Referral Program!
                        </p>
                    </tr>
                    <tr>
                        <p align="left" style="margin: 0px 16px 8px; font-family: Arial; font-size: 16px; font-weight: normal; font-stretch: normal; font-style: normal; line-height: 1.5; letter-spacing: 0.44px; text-align: left; color: #000;">
                            Your Proton referral link is now active. You may share the following link with your friends to earn rewards when they complete new account registration and KYC on the Proton network:
                        </p>
                    </tr>
                    <tr>
                        <p align="center" style="margin: 0px 16px 16px;">
                            <a href="https://earnproton.com/join/${account}" style="font-family: Arial; font-size: 16px; font-weight: bold; font-stretch: normal; font-style: normal; line-height: 1; letter-spacing: 0.4px; text-align: center; color: #582acb;">
                                https://earnproton.com/join/${account}
                            </a>
                        </p>
                    </tr>
                    <tr>
                        <p align="left" style="margin: 0px 16px 24px; font-family: Arial; font-size: 16px; font-weight: normal; font-stretch: normal; font-style: normal; line-height: 1.5; letter-spacing: 0.44px; text-align: left; color: #000; overflow-wrap: break-word;">
                            To view your referrals and payments, login using your proton wallet at https://earnproton.com.
                        </p>
                    </tr>
                    <tr>
                        <p align="left" style="margin: 0px 16px 0px; font-family: Arial; font-size: 16px; font-weight: normal; font-stretch: normal; font-style: normal; line-height: 1.5; letter-spacing: 0.44px; text-align: left; color: #000;">
                            Best Regards,
                        </p>
                    </tr>
                    <tr>
                        <br>
                        <p align="left" style="margin: 0px 16px 35px; font-family: Arial; font-size: 16px; font-weight: bold; font-stretch: normal; font-style: normal; line-height: 1.5; letter-spacing: 0.44px; text-align: left; color: #000;">
                            The Proton Affiliate Team
                            <br>
                            (Edenia, SoftAtom)
                        </p>
                    </tr>
                </table>
            </tr>
            <tr>
                <div style="background-color: #000; margin-left: auto; margin-right: auto; padding-top: 20px;">
                    <table style=" margin-left: auto; margin-right: auto;">
                        <tr>
                            <p align="left" style="width: 348px; margin: 0px auto 8px auto; font-family: Arial; font-size: 12px; font-weight: normal; font-stretch: normal; font-style: normal; line-height: 1.33; letter-spacing: 1.5px; text-align: center; color: #fff;">
                                THIS PROJECT WAS FUNDED THROUGH THE PROTON GOVERNANCE COMMITTEE WORKER PROPOSAL SYSTEM
                            </p>
                        </tr>
                        <tr>
                            <p align="left" style="flex-grow: 0; margin: 0px 16px 14px; font-family: Arial; font-size: 14px; font-weight: normal; font-stretch: normal; font-style: normal; line-height: 1.14; letter-spacing: 0.44px; text-align: center; color: #fff;">
                                <a href="https://forms.gle/GWHig5ciAvg5fdEH7" style="color: #fff;">
                                    Apply Here for Funding
                                </a>
                            </p>
                        </tr>
                        <tr>
                            <div style="margin-bottom: 16px; text-align: center;">
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
                        </tr>
                    </table>
                </div>
            </tr>
        </table>
    </body>
  `
}

module.exports = {
  generateConfirmationMail
}
