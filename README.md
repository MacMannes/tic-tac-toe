# Tic Tac Toe

## Rules

The rules of the Tic Tac Toe game are the following:

- a game is over when all fields are taken
- a game is over when all fields in a column are taken by a player
- a game is over when all fields in a row are taken by a player
- a game is over when all fields in a diagonal are taken by a player
- a player can take a field if not already taken
- players take turns taking fields until the game is over
- there are two player in the game (X and O)
- player X always starts the game

## Unit tests

Run the unit test with this command:

```shell
npm run test
```

## Coverage of unit tests

You can check the code coverage and view the html results by running this command:

```shell
npm run test:coverage && open coverage/index.html
```
