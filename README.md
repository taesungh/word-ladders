# word-ladders

Simple web app to visualize transitions in a solution to the word ladder/doublets puzzle.\
Created using ReactJS.

## Live Preview
<WIP>

## Notable Features
* Uses scroll position for fluid progression of letters between words
* responsive letter sizes
* Attempts to transition between individual character shapes
* uses a weighted conversion system that considers word frequencies

## Current Issues
* SVG interpolation does not look great (may consider using a stencil typeface and hand cleaning individual transitions)
* need to decide whether or not conversion should be weighted along with which word database to use
* path interpolation fails on certain characters (notably g, m, w)

## Authors and Acknowledgement
Created by Taesung Hwang.\
Inspiration by Professor Shindler.\
Original word ladders/doublets puzzle by Lewis Carroll (Charles Dodgson).\
English word frequencies provided by Rachael Tatman.
