alter table "public"."referral_history" add constraint "referral_history_invitee_contract_action_block_num_trxid_key" unique ("invitee", "contract", "action", "block_num", "trxid");
