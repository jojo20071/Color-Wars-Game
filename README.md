# Color Wars Game

## Overview
color-wars-game.vercel.app
![image](https://github.com/user-attachments/assets/33f7395c-0701-4928-8a0f-abc9e11beae1)

Color Wars is a strategic, turn-based web game where players compete to control the board by clicking on squares to increment their values. The game alternates between two colors (red and blue), and the goal is to dominate the board.

## Features

- **Real-time Updates**: The game board updates dynamically based on player interactions, with data fetched from and pushed to a server.
- **Turn-based Mechanics**: Players take turns, with the color switching after each move.
- **Cascading Effects**: When a square's value reaches 4, it causes adjacent squares to increment, potentially leading to a chain reaction.

## How to Play

1. **Select a Color**: Choose either red or blue at the start of the game.
2. **Take Your Turn**: Click on a square to increase its value. If a square reaches a value of 4, it will cause nearby squares to increment.
3. **Dominate the Board**: Strategically click squares to maximize your control. The game alternates turns between players.

## Technical Details

- **Local Storage**: Stores the player's selected color.
- **Server Interaction**: Game state is stored and updated on a remote server via `fetch` API calls.
- **Cascading Logic**: The game features cascading effects when a square's value exceeds 4, causing adjacent squares to increment.

## Requirements

- A web browser with JavaScript enabled.
- Internet connection for server communication.
