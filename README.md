# Tic Tac Toe
This is a web-based implementation of the classic game of Tic Tac Toe. The game allows two players to take turns marking spaces on a 3x3 grid, with the objective of getting three marks in a row (horizontally, vertically, or diagonally) before the other player does.

In addition, the game includes the ability to save game state across page refreshes using browser local storage. This means that if you close the page and come back later, your game state (including whose turn it is and where each player has placed their marks) will still be available.

# LIVE DEMO
Go to the live demo here https://tic-tac-toe-taupe-five.vercel.app/

# Usage
To play the game, simply click on an empty space on the game board to mark it with your player token (X or O). The game will automatically alternate turns between the two players.

If a player gets three marks in a row, the game will end and a message will be displayed indicating the winner. If the game board is filled with no winner, the game will end in a draw.

# Saving Game State
The game uses browser local storage to save the current game state, which includes the following information:

Whose turn it is (player X or player O)
The current state of the game board (which spaces have been marked by each player)
This means that if you close the page and come back later, your saved game will still be available.

# Contributing
If you have any suggestions or bug reports, please feel free to open an issue on this repository. Pull requests are also welcome.

# License
This project is licensed under the MIT License.
