# word-ladders

Simple web app to visualize transitions in a solution to the word ladder/doublets puzzle.\
Created using ReactJS.

## Live Preview
<WIP>

## Notable Features
* Uses scroll position for fluid progression of letters between words
* Attempts to transition between individual character shapes
* TBD: may use a weighted conversion system that considers word frequencies

## Current Issues
* path containing spaces (from no path message) causes TypeError
* MorphTransition stutters when going in reverse (scrolling up)
* word size needs to decrease when overflowing
* SVG interpolation does not look great (may consider using a stencil typeface and hand cleaning individual transitions)
* need to decide whether or not conversion should be weighted along with which word database to use

## Authors and Acknowledgement
Created by Taesung Hwang.\
Inspiration by Professor Shindler.\
Original word ladders/doublets puzzle by Lewis Carroll (Charles Dodgson).
