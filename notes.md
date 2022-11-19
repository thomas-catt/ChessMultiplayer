# Required fixes:
These are some major bugs I need to fix:

#### Incomplete Multiplayer:
If ClientA joins first, and ClientB joins later, then ClientB will only receive `PieceDrag`, and ClientA will be unable to update its piece positions (while both clients still receiving `PieceDrag`). No idea why this is happening, but force updating the entire `appContext.piecesLocations` **does** (kinda) fix it.

#### A connect/disconnect from any client resets board:
Apparently this happens when `appContext.setPiecesLocations` resets to `false` when a disconnection occurs. Maybe yet another `AppContext` fuckery don't know.
