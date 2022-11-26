# Required fixes:
These are some major bugs I need to fix:

#### Server-centralized pieces layout storage:
Currently all the pieces locations are passed to each of the clients individually. So if a new user joins the game, they don't receive the current game progress from the server, but rather the default chess layout (which being the only progress of the game the server knows about). 
- Make the server store the `piecesLocations` as it receives the inputs.
- Then hand over this data to any new user that joins.
- The `gridIndexToPercentage()` function should probably be server-sided since now the server should contain `piecesLocations` **in percentages** rather than **grid indexes**.
- Keep the grid indexes, but just manually call `gridIndexToPercentage()` once to finally store the `piecesLocations` in percentages. This object will modify as the server receives pieces input.