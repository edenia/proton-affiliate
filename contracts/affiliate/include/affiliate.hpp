/*##################################
#
#
# Created by EOSCostaRica.io
#
#
##################################*/

#include <eosio/eosio.hpp>
#include <eosio/singleton.hpp>
#include <eosio/asset.hpp>

using namespace std;
using namespace eosio;

CONTRACT affiliate : public contract {
  public:
    using contract::contract;

    ACTION addadmin(name admin);
    ACTION rmadmin(name admin);
    ACTION adduser(name admin, name user, uint8_t role);
    ACTION rmuser(name admin, name user);
    ACTION addref(name referrer,name invitee);
    ACTION expireref(name ivitee);
    ACTION verifyacc(name invitee);
    ACTION verifykyc(name invitee);

    /**
     * Pay referral. 
     * 
     * This action pay the reward amount for a valid referral 
     * (status PENDING_PAYMENT and not expired)
     *
     * @param admin - The name of the admin approving the referral
     * @param invitee - The name of the invitee in the referral
     * @return no return value.
     */
    ACTION payref(name admin, name invitee);

    ACTION rejectref(name admin, name invitee, string memo);
    ACTION setparams(name payer, asset reward_amount, uint8_t expiration_days);
    ACTION clear();
    
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
    };
    typedef multi_index<name("referrals"), referrals> referrals_table;

    TABLE params {
      name       payer;
      asset      reward_amount;
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

