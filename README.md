# Pipes puzzle solution
[DEMO](https://pipes-puzzle.vercel.app/)

## Installation
```shell
git clone git@github.com:likerRr/pipes-puzzle.git
cd pipes-puzzle
cp .env.local.dist .env.local
npm i
```

Update `.env.local` with valid wss address
```shell
NEXT_PUBLIC_WEBSOCKET_URL=
```

Run dev server
```shell
npm start run dev
```

Or build and run for production
```shell
npm run build
npm run start
```

## Passwords
1. JustWarmingUp
2. DefinitelyWarm

## Implemented features

### Hand-drawn graphics
It's quite simple but still better, then ASCII

### Restoration of the lost connection
If connection was lost, the game tries to restore it in several attempts (with increasing pause between tries).
On success - the game starts from the beginning

### Congratulations screen
After completing a level user sees "congratulations screen" with a password which he can enter from the main menu to start directly from this level next time

### "Lose" screen
If user spent more than 10 attempts to submit his solution, "Lose" screen appears

### Enter password screen
Allows user to start from the level with corresponding password

* enter from keyboard
* paste from clipboard (if supported)
* go back on ESC

Currently it accepts the next passwords: JustWarmingUp, DefinitelyWarm, 3, 4, 5, 6

### Pause, restart level and a game
From the game menu user can:

* pause and continue the game
* restart the level
* restart the game

### Touch devices support
User can play from touch screen devices

* swipes support

## Design & Architecture decisions

### Types and interfaces

Because of lack of experience with TypeScript I'm not sure where it's best to store custom types and how to name them. In general, it's a good
thing to store one interface in a file, but this produces lots of files, so in order to simplify I store related type definitions in a file where
it's used

### Scene transitions

Phaser provides a way to start a scene and allows passing data to the scene (in order to have ability to somehow communicate with a caller).
But it's almost impossible to type this data. The only adequate thing is to pass a class and check it like `instanceof`. But I opted in less
cumbersome option and just pass the typed GOD object

### Nice elastic effect for the map
You can drag the map by holding RMB and after releasing, the map will return on the initial place. 
This is just a small thing to relax when the user is tired solving a puzzle

### Mini map for big levels
There is a challenge with displaying big maps like 1000x1000. The problems are:
* how to display all the map and make it user-friendly
* how to save user's memory and don't create 1000000 event handlers

I think there is no sense to show all the map at one moment. 
Thus, I limited playing area by 8x8 map and gave ability to move it by keyboard arrows or by swipes on mobile. 
So it means that user always sees just a part of the whole puzzle

### Phaser and Typescript
The most difficulties were with Phaser and Typescript, because I don't work with them very often, and I spent lots of time in googling and struggling with strange things.
But it was a very nice journey, I liked it

### State management
I haven't used any state management libraries because of needless in synch and sharing it between components (not react, but system components)

### Next.js
I use Vercel's next.js just because it provides easy and well known (for me) deploying flow
