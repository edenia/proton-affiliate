#include <eosio/eosio.hpp>

using namespace std;
using namespace eosio;

struct kyc_prov {
	name kyc_provider;
	string kyc_level;
	uint64_t kyc_date;
};

CONTRACT affiliate : public contract {
  public:
    using contract::contract;

    ACTION addadmin(name admin);
    ACTION rmadmin(name admin);
    ACTION adduser(name admin, name user, uint8_t role);
    ACTION rmuser(name admin, name user);
    ACTION addref(name referrer,name invitee);
    ACTION expireref(name ivitee);
    ACTION verifyref(name invitee);
    ACTION payref(name admin, name invitee);
    ACTION rejectref(name admin, name invitee, string memo);
    ACTION setparams(name setting, string value);
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
      name      user;
      uint8_t   role;
      auto      primary_key() const { return user.value; }
    };
    typedef multi_index<name("users"), users> users_table;

    TABLE referrals {
      name                    invitee;
      name                    referrer;
      uint8_t                 status;
      eosio::time_point_sec   expires_on;
      auto primary_key() const { return invitee.value; }
    };
    typedef multi_index<name("referrals"), referrals> referrals_table;

    TABLE params {
      name      setting;
      string    value;
      auto primary_key() const { return setting.value; }
    };
    typedef multi_index<name("params"), params> params_table;

    // System Contract Table for KYC verification
		TABLE userinfo {
			name                                     acc;
			std::string                              name;
			std::string                              avatar;
			bool                                     verified;
			uint64_t                                 date;
			uint64_t                                 verifiedon;
			eosio::name                              verifier;

			vector<eosio::name>                      raccs;
			vector<tuple_1>                          aacts;
			vector<tuple<eosio::name, string>>       ac;

			vector<kyc_prov>                         kyc;
			
			uint64_t primary_key()const { return acc.value; }
		};

		typedef eosio::multi_index< "usersinfo"_n, userinfo > usersinfo;
};