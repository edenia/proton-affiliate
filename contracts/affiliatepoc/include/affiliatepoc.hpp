#include <eosio/eosio.hpp>

using namespace std;
using namespace eosio;

CONTRACT affiliatepoc : public contract {
  public:
    using contract::contract;

    ACTION add_user(name account, uint64_t user_role);
    ACTION create_referral(name invitee, name referrer);
    ACTION expire_referral(name ivitee);
    ACTION verify_referral(name invitee);
    ACTION pay_referral(name invitee);
    ACTION set_params(symbol token, name reward_account, uint8_t reward_amount, uint64_t expiry_period, bool manual_review);
    ACTION clear();

    enum user_role : uint64_t {
      ADMIN = 1,
      REFERRER = 2,
    };

    enum referral_status : uint64_t {
      PENDING_REGISTRATION = 1,
      PENDING_PAYMENT = 2,
      PAYMENT_REJECTED = 3,
      EXPIRED = 4,
      PAID = 5,
    };

  private:
    TABLE referral_users {
      name      account;
      uint64_t  user_role;
      auto primary_key() const { return account.value; }
    };
    typedef multi_index<name("referral_users"), referral_users> referral_users_table;

    TABLE referrals {
      name      invitee;
      name      referrer;
      uint64_t  status;
      uint64_t  expires_on;
      auto primary_key() const { return invitee.value; }
    };
    typedef multi_index<name("referrals"), referrals> referrals_table;

    TABLE referral_params {
      name      setting;
      string    value;
      auto primary_key() const { return setting.value; }
    };
    typedef multi_index<name("referral_params"), referral_params> referral_params_table;
};



