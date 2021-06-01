#include <eosio/eosio.hpp>
#include <eosio/system.hpp>
#include <eosio/symbol.hpp>

using namespace std;
using namespace eosio;

CONTRACT affiliatepoc : public contract {
  public:
    using contract::contract;

    ACTION add_user(name admin, name account, uint64_t user_role);
    ACTION create_referral(name invitee, name referrer);
    ACTION expire_referral(name ivitee);
    ACTION verify_referral(name invitee);
    ACTION pay_referral(name invitee);
    ACTION reject_payment(name admin, name invitee, string memo);
    ACTION set_params(symbol token, name reward_account, uint8_t reward_amount, uint64_t expiry_period, bool manual_review);
    ACTION clear();

    enum user_role : uint64_t {
      ADMIN = 1,
      REFERRER = 2,
    };

    enum referral_status : uint64_t {
      PENDING_USER_REGISTRATION = 1,
      PENDING_KYC_VERIFICATION = 2,
      PENDING_PAYMENT = 3,
      PAYMENT_REJECTED = 4,
      EXPIRED = 5,
      PAID = 6,
    };

  private:
    TABLE referalusers {
      name      account;
      uint64_t  user_role;
      auto primary_key() const { return account.value; }
    };
    typedef multi_index<name("referalusers"), referalusers> referalusers_table;

    TABLE referrals {
      name      invitee;
      name      referrer;
      uint64_t  status;
      uint64_t  expires_on;
      auto primary_key() const { return invitee.value; }
    };
    typedef multi_index<name("referrals"), referrals> referrals_table;

    TABLE referparams {
      name      setting;
      string    value;
      auto primary_key() const { return setting.value; }
    };
    typedef multi_index<name("referparams"), referparams> referparams_table;
};



