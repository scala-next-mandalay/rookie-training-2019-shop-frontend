import React from 'react'
import { Authenticator } from 'aws-amplify-react'
import { withAuthenticator } from 'aws-amplify-react'


const App = ({authState, authData}) => {
  console.log(authState)
  console.log(authData)
  return (
    <div>TEST!!</div>
  )
}
export default withAuthenticator(App);
