const deepstream = require('deepstream.io-client-js')
const Nexmo = require('nexmo')

const client = deepstream('<Your app URL>')
client.login()

const nexmo = new Nexmo({
    apiKey: 'Your Nexmo apiKey',
    apiSecret: 'Your Nexmo apiSecret',
  }, { debug: true }
);

client.rpc.provide('send-sms', (data, response) => {
  const { name, number, shiftInfo } = data
  nexmo.message.sendSms(
    'Work',
    number,
    `Hi ${name}, your shifts this week are: ${shiftInfo}`,
    (err, res) => {
      if (err) {
        response.error(err)
      } else {
        response.send(null)
      }
    }
  )
})
