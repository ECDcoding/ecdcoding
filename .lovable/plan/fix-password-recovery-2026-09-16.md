# Fix password recovery

## Changes
- Add a public “Set new password” page at `/reset-password`.
- Verify the recovery link establishes a valid recovery session before accepting a password.
- Require matching passwords with a minimum length, update the account password, then return the user to sign-in.
- Show clear expired/invalid-link and submission error states.

## Verification
- Confirm the new route no longer opens the missing-page screen.
- Run the project checks and verify the recovery page in the browser.
