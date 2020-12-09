# word-ladders

Simple web app to visualize transitions in a solution to the word ladder/doublets puzzle.\
Created using ReactJS.

## Live Preview
https://taesungh.github.io/word-ladders

## Notable Features
* Uses scroll position for fluid progression of letters between words
* responsive letter sizes
* Attempts to transition between individual character shapes
* uses a weighted conversion system that considers word frequencies

## Current Issues
* SVG interpolation does not look great without stencil typeface (may consider hand cleaning individual transitions)
* path interpolation fails on certain characters depending on typeface
* digram kerning could be improved

## Potential Features
* instead of morphing, show tree of neighboring words
    - this version could also be turned into a game of finding a correct path

## Authors and Acknowledgement
Created by Taesung Hwang.\
Inspiration by Professor Shindler.\
Original word ladders/doublets puzzle by Lewis Carroll (Charles Dodgson).\
English word frequencies provided by Rachael Tatman.\
Aftermarket typefaces provided by Adobe Fonts Typekit
