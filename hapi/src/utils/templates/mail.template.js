const generateConfirmationMail = ({ account }) => {
  return `
    <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body>
        <table style="padding: 0px 16px 0px; margin-left: auto; margin-right: auto;">
            <tr>
                <table style="max-width: 640px; margin-left: auto; margin-right: auto;">
                    <tr>
                        <img style="margin: 0px 44px 24px 44px; width: 177.7px; height: 53px; object-fit: scale-down" src="https://earnproton.com/proton.png"/>
                    </tr>
                    <tr>
                        <p align="left" style="margin: 24px 96px; font-family: Arial; font-size: 21px; font-weight: normal; font-stretch: normal; font-style: normal; line-height: normal; letter-spacing: 0.15px; text-align: left; color: #000;">
                            Welcome to the Proton On-Chain Referral Program!
                        </p>
                    </tr>
                    <tr>
                        <p align="left" style="margin: 24px 96px; font-family: Arial; font-size: 16px; font-weight: normal; font-stretch: normal; font-style: normal; line-height: 1.5; letter-spacing: 0.44px; text-align: left; color: #000;">
                            Your Proton referral link is now active. You may share the following link with your friends to earn rewards when they complete new account registration and KYC on the Proton network:
                        </p>
                    </tr>
                    <tr>
                        <p align="center" style="margin: 24px 0 25px;">
                            <a href= https://earnproton.com/join/${account}" style="font-family: Arial; font-size: 16px; font-weight: bold; font-stretch: normal; font-style: normal; line-height: 1; letter-spacing: 0.4px; text-align: center; color: #582acb;">
                                https://earnproton.com/join/${account}
                            </a>
                        </p>
                    </tr>
                    <tr>
                        <p align="left" style="margin: 24px 96px; font-family: Arial; font-size: 16px; font-weight: normal; font-stretch: normal; font-style: normal; line-height: 1.5; letter-spacing: 0.44px; text-align: left; color: #000; overflow-wrap: break-word;">
                            To view your referrals and payments, login using your proton wallet at https://earnproton.com.
                        </p>
                    </tr>
                    <tr>
                        <p align="left" style="margin: 24px 96px 0px; font-family: Arial; font-size: 16px; font-weight: normal; font-stretch: normal; font-style: normal; line-height: 1.5; letter-spacing: 0.44px; text-align: left; color: #000;">
                            Best Regards,
                        </p>
                    </tr>
                    <tr>
                        <p align="left" style="margin: 8px 96px 24px; font-family: Arial; font-size: 16px; font-weight: bold; font-stretch: normal; font-style: normal; line-height: 1.5; letter-spacing: 0.44px; text-align: left; color: #000;">
                            The Proton Affiliate Team
                            <br>
                            (Edenia, SoftAtom)
                        </p>
                    </tr>
                </table>
            </tr>
            <tr>
                <table style="height: 157px; margin: 40px 0 0; padding: 22px 96px 15px; background-color: rgba(0, 0, 0, 0.87); margin-left: auto; margin-right: auto;">
                    <p align="left" style="flex-grow: 0;  margin: 0 0 20px; font-family: Arial; font-size: 14px; font-weight: normal; font-stretch: normal; font-style: normal; line-height: 1.14; letter-spacing: 0.44px; text-align: center; color: #fff;">
                        <a href="https://forms.gle/GWHig5ciAvg5fdEH7" style="color: #fff;">
                            Apply Here for Funding
                        </a>
                    </p>
                    <p align="left" style="margin: 20px 218px 15px; font-family: Arial; font-size: 12px; font-weight: normal; font-stretch: normal; font-style: normal; line-height: 1.33; letter-spacing: 1.5px; text-align: center; color: #fff;">
                        THIS PROJECT WAS FUNDED THROUGH THE PROTON GOVERNANCE COMMITTEE WORKER PROPOSAL SYSTEM
                    </p>
                </table>
            </tr>
        </table>
    </body>
  `
}

module.exports = {
  generateConfirmationMail
}
