import MagicLoginStrategy from "passport-magic-login"
import sendEmail from './email.js';

const db = ['***', '***', '***', '***'];

async function getOrCreateUserWithEmail(param) {
    db.forEach((i) => {
        if(i === param) {
            return i;
        }
    })
    return false;
};

// IMPORTANT: ALL OPTIONS ARE REQUIRED!
const magicLogin = new MagicLoginStrategy.default({
  // Used to encrypt the authentication token. Needs to be long, unique and (duh) secret.
  secret: 'unique',

  // The authentication callback URL
  callbackUrl: "/",

  // Called with th e generated magic link so you can send it to the user
  // "destination" is what you POST-ed from the client
  // "href" is your confirmUrl with the confirmation token,
  // for example "/auth/magiclogin/confirm?token=<longtoken>"
  sendMagicLink: async (destination, href) => {
    await sendEmail({
      to: destination,
      body: `Click this link to finish logging in: http://localhost:3000${href}`
    })
  },

  // Once the user clicks on the magic link and verifies their login attempt,
  // you have to match their email to a user record in the database.
  // If it doesn't exist yet they are trying to sign up so you have to create a new one.
  // "payload" contains { "destination": "email" }
  // In standard passport fashion, call callback with the error as the first argument (if there was one)
  // and the user data as the second argument!
  verify: (payload, callback) => {
    // Get or create a user with the provided email from the database

    getOrCreateUserWithEmail(payload.destination)
      .then(user => {
        callback(null, user)
      })
      .catch(err => {
        callback(err)
      })
  }
});

export default magicLogin;

