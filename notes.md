# Required fixes:
<!-- No bugs to fix yet. -->
These are some bugs I need to fix:

- **Piece Username Label:** Appears on the oppposite side when the board is flipped. Small issue, but needs a bigger redesign.

---
# To-do List:
All the stuff that's left:
- ### "Flip Board" Option in settings:
    A better flip board option which is not randomly thrown into the home page.
- ### Player Accent Colors:
    A specific calculated accent color for each player. Should appear on the held piece, chat icon, and just anywhere the player is referred. The color will be computed based on the `clientId` field which is a `uuid` value. Get all the numbers in the `id`, and add them all up until it's a single digit number. This way, we will have a number from 1 – 9. Then have 9 predefined accent colors (dark mode and light mode) and use the computed value as the colors array index.
- ### [Large] Stored Username/Settings:
    Easy on Web, will need **Async Storage** on Android. Simply show a dialog when the app opens for the first time, inputting the player's name. Then store that name in `localStorage`/**Async Storage** and use that name forever. Should be changable from the settings section.
