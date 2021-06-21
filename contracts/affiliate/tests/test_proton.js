/*
 * @file
 * @author  (C) 2021 by eoscostarica [ https://eoscostarica.io ]
 * @version 1.1.0
 *
 * @section DESCRIPTION
 *     unit test for proton affiliate program
 *    GitHub:         https://github.com/eoscostarica/proton-affiliate
 *
 */

const { Api, JsonRpc, RpcError } = require('eosjs')
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig') // development only
const fetch = require('node-fetch') // node only; not needed in browsers
const { TextEncoder, TextDecoder } = require('util') // node only; native TextEncoder/Decoder

const contract_name = 'affiliate'

const rateproducer_priv_key = 'fsss....sff'
const rateproducer_pub_key = 'ffssss.  ssf'

const signatureProvider = new JsSignatureProvider([rateproducer_priv_key])
const rpc = new JsonRpc('http://localhost:8888', { fetch })
const api = new Api({
  rpc,
  signatureProvider,
  textDecoder: new TextDecoder(),
  textEncoder: new TextEncoder()
})
const get = require('lodash.get')
var chai = require('chai'),
  assert = chai.assert

describe('proton unit tests', function () {
  it('proton: testing action ZZZ with wrong symbol', async () => {
    try {
      const result = await api.transact(
        {
          actions: [
            {
              account: contract_name,
              name: 'setconfig',
              authorization: [
                {
                  actor: contract_name,
                  permission: 'active'
                }
              ],
              data: {
                symbol: 'tckt',
                version: '1.0'
              }
            }
          ]
        },
        {
          blocksBehind: 3,
          expireSeconds: 30
        }
      )
    } catch (err) {
      let errorMessage = get(err, 'json.error.details[0].message')
      errorMessage &&
        (errorMessage = errorMessage
          .replace('assertion failure with message:', '')
          .trim())
      assert.equal(
        'eosio_assert_message_exception',
        get(err, 'json.error.name') || ''
      )
      assert.equal(errorMessage, 'not valid symbol')
    }
  })
})
