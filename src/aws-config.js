import aws_exports from './aws-exports'

// NOTE: https://docs.amplify.aws/lib/auth/social/q/platform/js#amazon-cognito-user-pool-setup

const isLocalhost = Boolean(
  window.location.hostname === "localhost" ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === "[::1]" ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

// Assuming you have two redirect URIs, and the first is for localhost and second is for production
const [
  localRedirectSignIn,
  productionRedirectSignInAmplifyapp, // eslint-disable-line no-unused-vars
  productionRedirectSignInJacoyutoriuscom
] = aws_exports.oauth.redirectSignIn.split(",");

const [
  localRedirectSignOut,
  productionRedirectSignOutAmplifyapp, // eslint-disable-line no-unused-vars
  productionRedirectSignOutJacoyutoriuscom
] = aws_exports.oauth.redirectSignOut.split(",");

const awsConfig = {
  ...aws_exports,
  oauth: {
    ...aws_exports.oauth,
    redirectSignIn: isLocalhost ? localRedirectSignIn : productionRedirectSignInJacoyutoriuscom,
    redirectSignOut: isLocalhost ? localRedirectSignOut : productionRedirectSignOutJacoyutoriuscom,
  }
}

export default awsConfig