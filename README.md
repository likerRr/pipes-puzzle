# Pipes puzzle solution

## Design & Architecture decisions

### Types and interfaces

Because of lack of experience with TypeScript I'm not sure where should I store custom types and how to name them. In general, it's a good
thing to store one interface in a file, but this produces lots of files, so in order to simplify I store related interfaces in a file where
it's used.

### Scene transitions

Phaser provides a way to start a scene and allows passing data to the scene (in order to have ability to somehow communicate with a caller).
But it's almost impossible to type this data. The only adequate thing is to pass a class and check it like `instanceof`. But I opted in less
cumbersome option and just pass the typed object. 
