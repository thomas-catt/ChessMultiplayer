# Required fixes:
These are some bugs I need to fix:
- **Piece drag lag:** The more inputs, the laggier. Probably will have to cap the amount of drag emits rather than throwing out every drag callback.
- **Light mode accent colors:** Not made yet, probably just needs new background colors. Current accent colors don't match light mode.
- **Piece Username Label:** Appears on the oppposite side when the board is flipped. Small issue, but needs a bigger redesign.

---

# To-do List:
All the stuff that's left:
- ### [In Progress] Stored Username/Settings:
    **UPDATE:** Completed, but doesn't use any storage at all for now. Need to store:
    - Client name and `clientId`
    - Everything on the settings page

    > Easy on Web, will need **Async Storage** on Android. Simply show a dialog when the app opens for the first time, inputting the player's name. Then store that name in `localStorage`/**Async Storage** and use that name forever. Should be changable from the settings section.
