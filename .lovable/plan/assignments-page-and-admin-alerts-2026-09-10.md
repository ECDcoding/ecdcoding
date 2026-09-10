# Assignments page and admin alerts

## What will change
- Replace the Assignments navigation submenu with one direct Assignments item, removing its dropdown arrow.
- Create a protected Assignments page styled and organized like Users’ Media, with clear activity categories and assignment details.
- Keep the current Grade R checklist and add the attached numeracy activities:
  - Developing a Number Concept: counting all, verbal counting, object counting, counting forward, counting backward, and number groups 1–10, 10–20, 20–30.
  - Counting on from a given number: 1–10, 3–10, and 5–10.
  - Breaking down and building up numbers: examples such as 5 = 2 + 3 and 3 + 2 = 5.
  - Conceptual subtraction using objects.
  - Ordinal counting and position: 1st, 2nd, and 3rd.
  - Cardinal numbering: counting objects such as houses, windows, and chimneys.
- Provide “Start assignment” actions that open the closest relevant lesson where one already exists.

## Admin assignment flow
- Admins can select an assignment, add or adjust its instruction, choose the 04–07 or 08–12 group, and publish it.
- Published assignments are stored securely in the backend rather than only in one browser.
- Signed-in users see a red alert and count beside Assignments when active work is waiting.
- Users can open the Assignments page and mark an assignment as acknowledged/completed without changing the assignment for anyone else.

## Technical details
- Add protected assignment and per-user response records with role-based access: admins manage assignments; authenticated users read active assignments and manage only their own responses.
- Add the new page to app navigation for both age groups and preserve existing lesson content.
- Reuse the existing account, role, button, and visual patterns.
- Validate the build and test the admin/user assignment flow in the preview.
