# Frontend Mentor - In-browser markdown editor solution

This is a solution to the [In-browser markdown editor challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/inbrowser-markdown-editor-r16TrrQX9). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)


## Overview

### The challenge

Users should be able to:

- Create, Read, Update, and Delete markdown documents
- Name and save documents to be accessed as needed
- Edit the markdown of a document and see the formatted preview of the content
- View a full-page preview of the formatted content
- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- **Bonus**: If you're building a purely front-end project, use localStorage to save the current state in the browser that persists when the browser is refreshed


### Screenshot

![screenshot mobile](https://github.com/Lo-Deck/In-browser-markdown-editor/blob/main/screenshot/In-browser%20markdown%20editor-mobile.png).
![screenshot tablet](https://github.com/Lo-Deck/In-browser-markdown-editor/blob/main/screenshot/In-browser%20markdown%20editor-tablet.png).
![screenshot desktop](https://github.com/Lo-Deck/In-browser-markdown-editor/blob/main/screenshot/In-browser%20markdown%20editor-desktop.png).
![screenshot desktop-menu](https://github.com/Lo-Deck/In-browser-markdown-editor/blob/main/screenshot/In-browser%20markdown%20editor-desktop-menu.png).

### Links

- Solution URL: [Repositories](https://github.com/Lo-Deck/In-browser-markdown-editor).
- Live Site URL: [Website](https://lo-deck.github.io/In-browser-markdown-editor/).

## My process

### Built with

- Semantic HTML5 markup
- CSS
- Flexbox
- CSS Grid
- Mobile-first workflow


### What I learned

I learned how to create a markdown editor using `<textarea>` and turn the value into text using JS 

```js

lines = lines.map( line => line.replace(/^#{1}\s+(.*)\s*$/, "<h1 class='roboto-slab-bold markdown-main-title'>$1</h1>"));
lines = lines.map( line => line.replace(/^#{2}\s+(.*)\s*$/, "<h2 class='roboto-slab-light sub-titleH2'>$1</h2>"));
lines = lines.map( line => line.replace(/^#{3}\s+(.*)\s*$/, "<h3 class='roboto-slab-bold sub-titleH3'>$1</h3>"));
lines = lines.map( line => line.replace(/^#{4}\s+(.*)\s*$/, "<h4 class='roboto-slab-bold sub-titleH4'>$1</h4>"));

```
And delete and save the file using the localStorage.

```js

document.querySelector('.button-save').addEventListener('click', ( ) => {

    for(let i = 0; i < arrayJSON.length; i++){

        if(document.querySelector('input').value === arrayJSON[i].name){

            indexToSave = i;

        }

    }

    arrayJSON[indexToSave].content = document.querySelector('textarea').value; 

});

```

### Continued development

Learning from each challenge, I will continue to make website with JS and learning from different challenge from Front-end Mentor.


### Useful resources

- [Mozilla mdn](https://developer.mozilla.org/) - Very useful.
- [FreeCodeCamp](https://www.freecodecamp.org/) - I've been learning a lot.
- [Utopia](https://utopia.fyi/) - To have a better responsive design.


## Author

- Frontend Mentor - [@Lo-deck](https://www.frontendmentor.io/profile/Lo-Deck)


## Acknowledgments

Thanks to Front-end Mentor and its community.