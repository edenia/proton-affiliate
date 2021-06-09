/*
*
* @author  EOSCostaRica.io [ https://eoscostarica.io ]
*
* @section DESCRIPTION
*  Header file for the declaration of all functions related with the affiliate contract
*
*    GitHub:         https://github.com/eoscostarica/proton-affiliate
*
*/

#include <eosio/eosio.hpp>
#include <eosio/singleton.hpp>
#include <eosio/asset.hpp>

using namespace std;
using namespace eosio;

CONTRACT affiliate : public contract {
  public:
    using contract::contract;

    /**
     * Add an Admin
     * 
     * This action adds an admin
     *
     * @param admin - The name of the admin approving the referral
     * @return no return value.
     */
    ACTION addadmin(name admin);

    /**
     * Removes an admin
     * 
     * This action removes an admin
     *
     * @param admin - The name of the admin to remoe
     * @return no return value.
     */
    ACTION rmadmin(name admin);

    /**
     * Add an User
     * 
     * This action adds a user
     *
     * @param admin - The name of the admin 
     * @param user - The name of the user
     * @param role - The assined users' rol
     * @return no return value.
     */
    ACTION adduser(name admin, name user, uint8_t role);

    /**
     * Remove an user
     * 
     * This action removes an user 
     *
     * @param admin - The name of the admin
     * @param user - The name of the user to be removed
     * @return no return value.
     */
    ACTION rmuser(name admin, name user);

    /**
     * Add a referral. 
     * 
     * This acction sets a referral
     *
     * @param referrer - The name of the referrer
     * @param invitee - The name of the invitee in the referral
     * @return no return value.
     */
    ACTION addref(name referrer, name invitee);

    /**
     * Verify Account. 
     * 
     * This action verify an account
     *
     * @param invitee - The name of the invitee to verify
     * @return no return value.
     */
    ACTION verifyacc(name invitee);

    /**
     * Verify KYC
     * 
     * This action verify the KYC for an invitee
     * 
     * @param invitee - The name of the invitee for kyc
     */
    ACTION verifykyc(name invitee);

    /**
     * Verify expiration
     * 
     * This action update the status for expired referrals
     *
     * @return no return value.
     */
    ACTION verifyexp();

    /**
     * Pay referral.
     * 
     * This action pay the reward amount for a valid referral 
     * @note (status PENDING_PAYMENT and not expired)
     *
     * @param admin - The name of the admin approving the referral
     * @param invitee - The name of the invitee in the referral
     * @return no return value.
     */
    ACTION payref(name admin, name invitee);

    /**
     * Reject a referral 
     * 
     * This action rejects a referal
     *
     * @param admin - The name of the admin approving the referral
     * @param invitee - The name of the invitee in the referral
     * @param memo -  Reject memo message
     * @return no return value.
     */
    ACTION rejectref(name admin, name invitee, string memo);

    /**
     * Setup parameters
     * 
     * This action set the parameters values
     *
     * @param payer - The payers' name
     * @param rate - The exchange rate to be used
     * @param usd_reward_amount - The amount rewarded
     * @param expiration_days - Amount of days before expire
     * @return no return value.
     */
    ACTION setparams(name payer, double rate, double usd_reward_amount, uint8_t expiration_days);

    ACTION setrate(double rate);
    ACTION addreflog(name referrer,name invitee, uint8_t status, time_point_sec expires_on);
    ACTION statuslog(name invitee, uint8_t status);
    ACTION clearref();
    
    /**
     * Clear
     * 
     * This action cleans the affiliate data
     *
     * @return no return value.
     */
    ACTION clear();

    bool has_valid_kyc(name account);
    
    enum user_roles : uint8_t {
      ADMIN = 1,
      REFERRER = 2,
    };

    enum referral_status : uint8_t {
      PENDING_USER_REGISTRATION = 1,
      PENDING_KYC_VERIFICATION = 2,
      PENDING_PAYMENT = 3,
      PAYMENT_REJECTED = 4,
      EXPIRED = 5,
      PAID = 6,
    }; 

  private:
    TABLE users {
      name     user;
      uint8_t  role;
      auto     primary_key() const { return user.value; }
    };
    typedef multi_index<name("users"), users> users_table;

    TABLE referrals {
      name      invitee;
      name      referrer;
      uint8_t   status;
      eosio::time_point_sec  expires_on;

      auto primary_key() const { return invitee.value; }
      uint64_t by_status() const { return status; }
      uint64_t by_expires_on() const { return expires_on.sec_since_epoch(); }
    };
    typedef multi_index<
      name("referrals"),
      referrals,
      indexed_by<name("status"), const_mem_fun<referrals, uint64_t, &referrals::by_status>>,
      indexed_by<name("expireson"), const_mem_fun<referrals, uint64_t, &referrals::by_expires_on>>
    > referrals_table;

    TABLE params {
      name       payer;
      double     rate;
      double     usd_reward_amount;
      asset      asset_reward_amount;
      uint8_t    expiration_days;
    };
    typedef singleton<name("params"), params> params_table;

    struct kyc_prov {
      name kyc_provider;
      string kyc_level;
      uint64_t kyc_date;
    };

    TABLE userinfo {
			name                                          acc;
			std::string                                   name;
			std::string                                   avatar;
			bool                                          verified;
			uint64_t                                      date;
			uint64_t                                      verifiedon;
			eosio::name                                   verifier;

			vector<eosio::name>                           raccs;
			vector<std::tuple<eosio::name, eosio::name>>  aacts;
			vector<std::tuple<eosio::name, string>>       ac;

			vector<kyc_prov>                              kyc;
			
			uint64_t primary_key()const { return acc.value; }
		};
		typedef multi_index<name("usersinfo"), userinfo > usersinfo_table;
};

