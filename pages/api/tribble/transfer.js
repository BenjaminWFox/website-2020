/* eslint-disable camelcase */
export default async function tribbleTransfer(req, res) {
  const { body } = req
  const { token_id, new_token_owner_id } = body

  const response = await fetch('https://rest.nearapi.org/transfer_nft', {
    method: 'POST',
    body: JSON.stringify({
      token_id,
      'receiver_id': new_token_owner_id,
      'enforce_owner_id': 'need-find-tribbles-js13k.testnet',
      'memo': 'Congrats on finding and claiming this Tribble!!',
      'owner_private_key': process.env.TRIBBLE_PK,
      'contract': 'need-find-tribbles-js13k.testnet'
    }),
    headers: { 'Content-Type': 'application/json' },
  })

  console.log(response)

  try {
    const result = await response.json()

    if (result?.token_id === token_id && result?.owner_id === new_token_owner_id) {
      res.status(200).json({ status: 'Success' })
    }
    else {
      console.log(result)

      res.status(500).json({ status: 'Error' })
    }

  }
  catch (err) {
    console.log(err)

    res.status(500).json({ status: 'Error' })
  }

}
