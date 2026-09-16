# Add Setswana to ECD AI

## What will change
- Add an English / Setswana language selector inside ECD AI.
- Translate the welcome message, suggested questions, input guidance, voice setting, and user-facing errors for Setswana mode.
- Send the selected language with every question so ECD AI replies consistently in that language.
- Add the supplied Setswana “Ditshekeletsa tsa Boitshwaro” material as authoritative guidance for Cycle of Behavior questions.

## Technical details
- Keep English as the default and preserve existing conversations when switching languages.
- Use South African English (`en-ZA`) or Setswana (`tn-ZA`) for browser voice recognition according to the selected language.
- Update and deploy the ECD AI function with bilingual response rules and the supplied age-stage terminology.
- Validate both language modes, the live AI response, and the app build.
