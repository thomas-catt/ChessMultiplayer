# Required fixes:
These are bugs I need to fix:

- **Pieces data mismatch bug:** Major bug, moving around screens causes a mismatch in the actual server pieces data, and the stored pieces data. One forced fix will be to ask the server for the correct pieces layout whenever the user goes to the *Home* page.
- **App Icon:** Looks funny, don't know whats wrong. Fix it.
- **Big board?** Remove padding around the board. Ditch the *"shelves"* idea. The space above and below the chess board will act as shelves fine enough, since you can place pieces anywhere.
- **Weird space on top:** Weird space below the status bar on Android builds. Probably a one line change.
- **Android Build 4 chars limit text is black:** Just that. Again, a small fix is needed.
- **_"Server is starting"_ message delay adjustment:** Sometimes appears when the server is awake, increase the delay from `2000ms` to `4000ms`.
- **Don't show _"Server is starting"_ message upon first run:** Just one more ternary condition, don't let this popup appear until the user has chosen their name.
- **Light mode status bar icon colors:** I saw a comment in `AppContext.js` that it can be fixed by modifying theme colors...  Don't really remember typing that lol.
> ***[LOW PRIORITY] Piece Username Label:** Appears on the oppposite side when the board is flipped. Small issue, but needs a bigger redesign.*

<!-- 
- **Loading saved storage:** Is able to load fine, but let's the app proceed to load with default data (`clientId` and `clientName`), which messes things up. **Don't let the app load until `AsyncStorage` data is populated.** Blank Screen maybe? -->
<!-- - **Piece drag lag:** The more inputs, the laggier. Probably will have to cap the amount of drag emits rather than throwing out every drag callback. -->
<!-- - **Light mode accent colors:** Not made yet, probably just needs new background colors. Current accent colors don't match light mode. -->

---

# To-do List:
All the stuff that's left:
- ### Auto-snap to grid:
    Optional feature to automatically align piece to the chess grid when released. (Don't do this outside of the chess board)
- ### Deployment:
    Idk just find somewhere to host both the SocketIO server and the react app. Also, make an APK. Please. Before that:
    - Design App icon, splash screen, and stuff
    - Remove any dev related stuff like useless `console.log`s and prep for production.
