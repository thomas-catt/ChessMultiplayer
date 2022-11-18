# Required fixes:
These are some major bugs I need to fix:

#### Laggy Dragging:
Probably doing apeshit crazy calculations on drag (need to look into it).

#### A connect/disconnect from any client resets board:
Apparently this happens when `appContext.setPiecesLocations` resets to `false` when a disconnection occurs. Maybe yet another `AppContext` fuckery don't know.

----
<!-- #### Board layout management:
- When a client connects, the board layout will be given to it.
- The board layout will have coordinates in **percentages**, which will be converted to the client's **pixels** when it receives the layout
- Everything happening on the client side should be measured in **pixels**, except for the actual piece movement, which should be in **percentages**

#### Percentages and pixels conversion:
The percentages should be calculated according to the ***Board's layout/ratio***, NOT the ***Screen's layout/ratio***. Should be easier by keeping all the utilized pixel values only relative to the **Board**, NOT relative to the **screen**. -->