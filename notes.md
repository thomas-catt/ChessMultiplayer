# Required fixes:
These are some bugs I need to fix:

- **Light mode status bar icon colors:** I saw a comment in `AppContext.js` that it can be fixed by modifying theme colors...  Don't really remember typing that lol.
> ***[LOW PRIORITY] Piece Username Label:** Appears on the oppposite side when the board is flipped. Small issue, but needs a bigger redesign.*

<!-- 
- **Loading saved storage:** Is able to load fine, but let's the app proceed to load with default data (`clientId` and `clientName`), which messes things up. **Don't let the app load until `AsyncStorage` data is populated.** Blank Screen maybe? -->
<!-- - **Piece drag lag:** The more inputs, the laggier. Probably will have to cap the amount of drag emits rather than throwing out every drag callback. -->
<!-- - **Light mode accent colors:** Not made yet, probably just needs new background colors. Current accent colors don't match light mode. -->

---

# To-do List:
All the stuff that's left:
- ### Deployment:
    Idk just find somewhere to host both the SocketIO server and the react app. Also, make an APK. Please. Before that:
    - Design App icon, splash screen, and stuff
    - Remove any dev related stuff like useless `console.log`s and prep for production.
