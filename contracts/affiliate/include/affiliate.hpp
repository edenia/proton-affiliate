/*
*
* @author  EOSCostaRica.io [ https://eoscostarica.io ]
*
* @section DESCRIPTION
*  Header file for the declaration of all functions related with the affiliate contract
*
*    GitHub:         https://github.com/edenia/proton-affiliate
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
     * @param admin - The account name of the admin.
     * 
     * @return no return value.
     */
    ACTION addadmin(name admin);

    /**
     * Removes an admin
     * 
     * This action remove an admin
     *
     * @param admin - The account name of the admin to add to the users table (must be signed by smart contract)
     * 
     * @return no return value.
     */
    ACTION rmadmin(name admin);

    /**
     * Add User
     * 
     * This action adds a user
     *
     * @param admin - Name of the admin account that signs the action
     * @param user - The account name of the referrer user
     * @param role - The assined users' role
     * 
     * @return no return value.
     */
    ACTION adduser(name admin, name user, uint8_t role);

    /**
     * remove user
     * 
     * This action removes an user 
     *
     * @param admin - The account name of the admin to remove
     * @param user - The name of the user to be removed
     * 
     * @return no return value.
     */
    ACTION rmuser(name admin, name user);

    /**
     * add a referral. 
     * 
     * This acction sets a referral
     *
     * @param referrer - The name of the referrer
     * @param invitee - The name of the invitee in the referral
     * 
     * @return no return value.
     */
    ACTION addref(name referrer, name invitee);

    /**
     * Verify Account. 
     * 
     * This action verifies an invitee account has registered on the network
     *
     * @param invitee - The name of the invitee to verify
     * 
     * @return no return value.
     */
    ACTION verifyacc(name invitee);

    /**
     * Verify KYC
     * 
     * This action verifies an invitee account has completed KYC process
     * 
     * @param invitee - the account name of the invitee
     * 
     * @return no return value.
     */
    ACTION verifykyc(name invitee);

    /**
     * Verify expiration 
     * 
     * This action checks the referrals expiration date, and marks as EXPIRED
     * the due referrals
     * 
     * @return no return value.
     */
    ACTION verifyexp();

    /**
     * Pay referral. 
     * 
     * This action pay the reward amount for a valid referral 
     * (status PENDING_PAYMENT)
     *
     * @param admin - The name of the admin approving the referral
     * @param invitee - The name of the invitee in the referral
     * 
     * @return no return value.
     */
    ACTION payref(name admin, name invitee);

    /**
     * reject a referral 
     * 
     * This action rejects a referal this action expires a referral
     *
     * @param admin - The name of the admin account approving the referral
     * @param invitee - The name of the invitee in the referral
     * @param memo -  Reject memo message (optional)
     * 
     * @return no return value.
     */
    ACTION rejectref(name admin, name invitee, string memo);

    /**
     * Setup parameters
     * 
     * This action set the parameters values
     *
     * @param payer - The account from which funds are paid for valid referrals
     * @param rate - The exchange rate to be used
     * @param usd_reward_amount - The amount rewarded
     * @param expiration_days - Amount of days before referrals expire
     * 
     * @return no return value.
     */
    ACTION setparams(name payer, double rate, double usd_reward_amount, uint8_t expiration_days);

    /**
     * Setup parameters
     * 
     * This action set the status values
     *
     * @param admin - The name of the admin account approving the status
     * @param invitee - The name of the invitee in the status
     * @param status - The type of the status
     * 
     * @return no return value.
     */
    ACTION setstatus(name admin, name invitee, uint8_t status);

    /**
     * Setup parameters
     * 
     * This action sets the exchange rate used to calculate the amount of XPR to pay for a completed referral
     * 
     * @return no return value.
     */
    ACTION setrate(double xpr_usdt);

    /**
     * Clear referrals
     * 
     * This action cleans referrals with status PAYMENT_REJECTED, EXPIRED, PAID to save ram
     *
     * @return no return value.
     */
    ACTION clearref();

    /**
     * addref logging
     * 
     * This action logs the add reference activity
     *
     * @return no return value.
     */
    ACTION addreflog(name referrer,name invitee, uint8_t status, time_point_sec expires_on);

    /**
     * status logging
     * 
     * This action logs status' changes
     *
     * @return no return value.
     */
    ACTION statuslog(name invitee, uint8_t status);
    
    /**
     * Clear
     * 
     * This action cleans the affiliate data
     *
     * @return no return value.
     */
    ACTION clear();

     /**
     * Pay rejected
     * 
     * This action approves payment of a rejected referral
     * 
     * @param admin - The name of the admin account approving the status
     * @param referrer - The name of the referrer
     * @param invitee - the account name of the invitee
     * 
     * @return no return value.
     */
    ACTION payrejected(name admin, name referrer, name invitee);

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

    struct data_variant {
      std::optional<std::string> d_string;
      std::optional<uint64_t> d_uint64_t;
      std::optional<double> d_double;

      data_variant () {};
      data_variant (std::string val) { d_string = val; };
      data_variant (uint64_t val) { d_uint64_t = val; };
      data_variant (double val) { d_double = val; };
      
      bool operator < ( const data_variant& rhs ) const {
        std::string data_type = this->data_type();
        eosio::check(this->data_type() == rhs.data_type(), "not equivalent data types");
        if (data_type == "string") {
          return this->get<std::string>() < rhs.get<std::string>();
        } else if (data_type == "uint64_t") {
          return this->get<uint64_t>() < rhs.get<uint64_t>();
        } else if (data_type == "double") {
          return this->get<double>() < rhs.get<double>();
        } else {
          eosio::check(false, "invalid data_variant <");
          return false;
        }
      }

      std::string data_type ()const {
        if (d_string.has_value()) {
          return "string";
        } else if (d_uint64_t.has_value()) {
          return "uint64_t";
        } else if (d_double.has_value()) {
          return "double";
        } else {
          eosio::check(false, "invalid data_variant type");
          return {};
        }
      };

      template<typename T>
      T get ()const {
        std::string data_type = this->data_type();
        if constexpr (std::is_same<T, std::string>::value) {
          eosio::check(data_type == "string", "invalid data_variant get");
          return *d_string;
        } else if constexpr (std::is_same<T, uint64_t>::value) {
          eosio::check(data_type == "uint64_t", "invalid data_variant get");
          return *d_uint64_t;
        } else if constexpr (std::is_same<T, double>::value) {
          eosio::check(data_type == "double", "invalid data_variant get");
          return *d_double;
        } else {
          eosio::check(false, "invalid data_variant get");
          return {};
        }
      };

      EOSLIB_SERIALIZE( data_variant, (d_string)(d_uint64_t)(d_double) )
    };

    struct ProviderPoint {
      eosio::name provider;
      eosio::time_point time;
      data_variant data;

      EOSLIB_SERIALIZE( ProviderPoint, (provider)(time)(data) )
    };

    struct [[eosio::table, eosio::contract("oracles")]] Feed {
      uint64_t index;
      std::string name;
      std::string description;
      std::string aggregate_function;
      std::string data_type;
      std::map<std::string, uint64_t> config;
      std::map<eosio::name, eosio::time_point> providers;

      uint64_t primary_key() const { return index; };

      EOSLIB_SERIALIZE( Feed, (index)(name)
                              (description)(aggregate_function)
                              (data_type)(config)
                              (providers) )
    };
    typedef eosio::multi_index<"feeds"_n, Feed> feeds_table;

    struct [[eosio::table, eosio::contract("oracles")]] Data {
      uint64_t feed_index;
      data_variant aggregate;
      std::vector<ProviderPoint> points;

      uint64_t primary_key() const { return feed_index; };

      EOSLIB_SERIALIZE( Data, (feed_index)(aggregate)(points) )
    };
    typedef eosio::multi_index<"data"_n, Data> data_table;
};
