#include <eosio/eosio.hpp>

using namespace std;
using namespace eosio;

CONTRACT affiliatepoc : public contract {
  public:
    using contract::contract;

    ACTION refer(name referrer, string uuid);
    ACTION clear();

  private:
    TABLE referrals {
      name    referrer;
      string  uuid;
      auto primary_key() const { return referrer.value; }
    };
    typedef multi_index<name("referrals"), referrals> referrals_table;
};
