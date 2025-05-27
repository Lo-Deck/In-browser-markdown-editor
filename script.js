
/* FETCH DATA */

async function fetchData () {

    try{

        response = await fetch('./data.json', {
            method: 'GET',
            mode: 'cors',
            headers:{
                'Content-Type': 'application/json'
            }
        });

        if(!response.ok){
            throw(`Error loading data : ${response.status}`);
        }

        const data = await response.json();

        return data;

    }
    catch(error){
        console.error('Error: ', error);
    }

}



/*DARK LIGHT MODE */

let isdarkLightclicked = false;

document.querySelectorAll('.icon-mode')[1].classList.add('active');

document.querySelector('.button-switch').addEventListener('click', () => {

    isdarkLightclicked = !isdarkLightclicked;

    if(isdarkLightclicked){
        document.querySelector('.switch').style.transform = 'translateX(-0.75rem)'; 
        document.querySelector('body').setAttribute('data-theme', 'dark'); 
        document.querySelectorAll('.icon-mode')[0].classList.add('active');
        document.querySelectorAll('.icon-mode')[1].classList.remove('active');
    }

    if(!isdarkLightclicked){
        document.querySelector('.switch').style.transform = 'translateX(0.75rem)';        
        document.querySelector('body').setAttribute('data-theme', 'light');
        document.querySelectorAll('.icon-mode')[1].classList.add('active');
        document.querySelectorAll('.icon-mode')[0].classList.remove('active');
    }

});


// if(window.matchMedia("(prefers-color-scheme: dark)").matches){

//     isdarkLightclicked = !isdarkLightclicked;

//     if(isdarkLightclicked){
//         document.querySelector('.switch').style.transform = 'translateX(clamp(0.375rem, 0.2557rem + 0.5089vw, 0.5rem))'; 
//         document.querySelector('body').setAttribute('data-theme', 'dark');        
//     }

//     if(!isdarkLightclicked){
//         document.querySelector('.switch').style.transform = 'translateX(clamp(-0.625rem, -0.0143rem + -1.2723vw, -0.3125rem))';        
//         document.querySelector('body').setAttribute('data-theme', 'light');
//     }

// };




/* OPEN MENU */

const textarea = document.querySelector('textarea');

let isMenuOpen = false;

document.querySelector('.button-menu').addEventListener('click', (event) => {
    isMenuOpen = !isMenuOpen;
    isMenuOpen ? document.querySelector('.container-menu').style.display = 'block' : document.querySelector('.container-menu').style.display = 'none';
    isMenuOpen ? document.querySelector('.button-menu img').src = './assets/icon-close.svg' : document.querySelector('.button-menu img').src = './assets/icon-menu.svg' ;
});



/* FUNCTION */

function turnIntoText(text){

    // let lines = event.target.value.split('\n');

    let lines = text.value.split('\n');


    let change = 0;

    lines = lines.map( (item) => {

        if( item.match(/`{3}/) && change === 0 ){
            change = 1; 
            return '<pre class="threeBacktits roboto-mono-regular">';
        }

        else if( item.match(/`{3}/) && change === 1 ){
            change = 0;
            return '</pre>';
        }

        if(change === 1){
            const span = document.createElement('span');
            span.textContent = item;
            return `${span.innerHTML}<br>` ;
        }   

        return item.trim();

    });


    lines = lines.map( line => line.replace(/^#{1}\s+(.*)\s*$/, "<h1 class='roboto-slab-bold markdown-main-title'>$1</h1>"));
    lines = lines.map( line => line.replace(/^#{2}\s+(.*)\s*$/, "<h2 class='roboto-slab-light sub-titleH2'>$1</h2>"));
    lines = lines.map( line => line.replace(/^#{3}\s+(.*)\s*$/, "<h3 class='roboto-slab-bold sub-titleH3'>$1</h3>"));
    lines = lines.map( line => line.replace(/^#{4}\s+(.*)\s*$/, "<h4 class='roboto-slab-bold sub-titleH4'>$1</h4>"));
    lines = lines.map( line => line.replace(/^#{5}\s+(.*)\s*$/, "<h5 class='roboto-slab-bold sub-titleH5'>$1</h5>"));
    lines = lines.map( line => line.replace(/^#{6}\s+(.*)\s*$/, "<h6 class='roboto-slab-bold sub-titleH6'>$1</h6>"));
    lines = lines.map( line => line.replace(/^>\s+(.*)\s*$/, "<p class='container-grey roboto-slab-bold'>$1</p>"));
    lines = lines.map( line => line.replace(/\[(.*?)\]\((.*?)\)/g, "<a class='markdown-link' href='$2' target='_blank'>$1</a>"));


    for(let i = 0; i < lines.length; i++){

        if(lines[i].match(/^1\.\s+(.*)/)){
            lines[i] = lines[i].replace(/^1\.\s+(.*)/, "<ol class='list-markdown roboto-slab-regular text-markdown'><li>$1</li>") ;
        }

        if(lines[i].match(/^[0-9]\.\s+(.*)/)){

            if( lines[i+1] === '' ){
                lines[i] = lines[i].replace(/^[0-9]\.\s+(.*)/, "<li>$1</li></ol>")
            }
            else{
                lines[i] = lines[i].replace(/^[0-9]\.\s+(.*)/, "<li>$1</li>")
            }

        }

    }


    for(let i = 0; i < lines.length; i++){

        if(lines[i-1] === '' && lines[i].match(/^\-\s+(.*)/)){
            lines[i] = lines[i].replace(/^\-\s+(.*)/, "<ul class='unordered-list roboto-slab-regular text-markdown'><li>$1</li>");
        }

        else if(lines[i].match(/^\-\s+(.*)/)){

            if( lines[i+1] === '' ){
                lines[i] = lines[i].replace(/^\-\s+(.*)/, "<li>$1</li></ul>")
            }
            else{
                lines[i] = lines[i].replace(/^\-\s+(.*)/, "<li>$1</li>");
            }
            
        }

    }


    lines = lines.map(line => line.replace(/^([a-zA-Z].*)$/, "<p class='roboto-slab-regular text-markdown'>$1</p>"));
    lines = lines.map(line => line.replace(/(?<!`)`([^`]+)`(?!`)/g, (match, content) => {
    
        const span = document.createElement('span');
        const text = document.createTextNode(content);
        console.log('text', text);
        span.classList.add('oneBacktits');
        span.textContent = content;
        return span.outerHTML;

    } ) );


    for(let i = 0; i < lines.length; i++){

        if(lines[i] === ''){  
            lines[i] = '<br>';
        }   

    }

    document.querySelector('.result').innerHTML = lines.join('');

}








/* DISPLAY PREVIEW */

document.querySelectorAll('.button-preview')[0].addEventListener('click', (event) => {

    if(window.innerWidth < 768){
        document.querySelector('.preview').style.display = 'flex';
        document.querySelector('.markdown').style.display = 'none';
    }

    else{
        document.querySelector('.preview').style.display = 'flex';
        document.querySelectorAll('.button-preview')[0].style.display = 'none';
    }



    turnIntoText(document.querySelector('textarea'));


});


document.querySelectorAll('.button-preview')[1].addEventListener('click', () => {

    if(window.innerWidth < 768){
        document.querySelector('.preview').style.display = 'none';
        document.querySelector('.markdown').style.display = 'flex';
    }

    else {
        document.querySelector('.preview').style.display = 'none';
        document.querySelectorAll('.button-preview')[0].style.display = 'block';
    }

    turnIntoText(document.querySelector('textarea'));


});





/* MARKDOWN TURN INTO TEXT*/

document.querySelector('textarea').addEventListener('input', (event) => {


    turnIntoText(event.target);

    // let lines = event.target.value.split('\n');
    // let change = 0;

    // lines = lines.map( (item) => {

    //     if( item.match(/`{3}/) && change === 0 ){
    //         change = 1; 
    //         return '<pre class="threeBacktits roboto-mono-regular">';
    //     }

    //     else if( item.match(/`{3}/) && change === 1 ){
    //         change = 0;
    //         return '</pre>';
    //     }

    //     if(change === 1){
    //         const span = document.createElement('span');
    //         span.textContent = item;
    //         return `${span.innerHTML}<br>` ;
    //     }   

    //     return item.trim();

    // });


    // lines = lines.map( line => line.replace(/^#{1}\s+(.*)\s*$/, "<h1 class='roboto-slab-bold markdown-main-title'>$1</h1>"));
    // lines = lines.map( line => line.replace(/^#{2}\s+(.*)\s*$/, "<h2 class='roboto-slab-light sub-titleH2'>$1</h2>"));
    // lines = lines.map( line => line.replace(/^#{3}\s+(.*)\s*$/, "<h3 class='roboto-slab-bold sub-titleH3'>$1</h3>"));
    // lines = lines.map( line => line.replace(/^#{4}\s+(.*)\s*$/, "<h4 class='roboto-slab-bold sub-titleH4'>$1</h4>"));
    // lines = lines.map( line => line.replace(/^#{5}\s+(.*)\s*$/, "<h5 class='roboto-slab-bold sub-titleH5'>$1</h5>"));
    // lines = lines.map( line => line.replace(/^#{6}\s+(.*)\s*$/, "<h6 class='roboto-slab-bold sub-titleH6'>$1</h6>"));
    // lines = lines.map( line => line.replace(/^>\s+(.*)\s*$/, "<p class='container-grey roboto-slab-bold'>$1</p>"));
    // lines = lines.map( line => line.replace(/\[(.*?)\]\((.*?)\)/g, "<a class='markdown-link' href='$2' target='_blank'>$1</a>"));


    // for(let i = 0; i < lines.length; i++){

    //     if(lines[i].match(/^1\.\s+(.*)/)){
    //         lines[i] = lines[i].replace(/^1\.\s+(.*)/, "<ol class='list-markdown roboto-slab-regular text-markdown'><li>$1</li>") ;
    //     }

    //     if(lines[i].match(/^[0-9]\.\s+(.*)/)){

    //         if( lines[i+1] === '' ){
    //             lines[i] = lines[i].replace(/^[0-9]\.\s+(.*)/, "<li>$1</li></ol>")
    //         }
    //         else{
    //             lines[i] = lines[i].replace(/^[0-9]\.\s+(.*)/, "<li>$1</li>")
    //         }

    //     }

    // }


    // for(let i = 0; i < lines.length; i++){

    //     if(lines[i-1] === '' && lines[i].match(/^\-\s+(.*)/)){
    //         lines[i] = lines[i].replace(/^\-\s+(.*)/, "<ul class='unordered-list roboto-slab-regular text-markdown'><li>$1</li>");
    //     }

    //     else if(lines[i].match(/^\-\s+(.*)/)){

    //         if( lines[i+1] === '' ){
    //             lines[i] = lines[i].replace(/^\-\s+(.*)/, "<li>$1</li></ul>")
    //         }
    //         else{
    //             lines[i] = lines[i].replace(/^\-\s+(.*)/, "<li>$1</li>");
    //         }
            
    //     }

    // }


    // lines = lines.map(line => line.replace(/^([a-zA-Z].*)$/, "<p class='roboto-slab-regular text-markdown'>$1</p>"));
    // lines = lines.map(line => line.replace(/(?<!`)`([^`]+)`(?!`)/g, (match, content) => {
    
    //     const span = document.createElement('span');
    //     const text = document.createTextNode(content);
    //     console.log('text', text);
    //     span.classList.add('oneBacktits');
    //     span.textContent = content;
    //     return span.outerHTML;

    // } ) );


    // for(let i = 0; i < lines.length; i++){

    //     if(lines[i] === ''){  
    //         lines[i] = '<br>';
    //     }   

    // }

    // document.querySelector('.result').innerHTML = lines.join('');


});




function checkPageLoaded (){

    const isAlreadyLoad = localStorage.getItem('isPageLoaded');

    if(isAlreadyLoad === '1'){
        return true;
    }
    else{
        return false;
    }

}



let arrayJSON = [];


document.addEventListener('DOMContentLoaded', () => {

    fetchData().then( (data) => {

        arrayJSON = data;

        for(const file of arrayJSON){

            const p = document.createElement('p');
            p.classList.add('text', 'roboto-regular');

            const span = document.createElement('span');
            span.classList.add('roboto-light');
            span.textContent = file.createdAt;

            p.insertAdjacentElement('afterbegin', span);
            const span2 = document.createElement('span');
            span2.textContent = file.name;

            p.insertAdjacentElement('beforeend', span2);
            document.querySelector('.your-file').insertAdjacentElement('beforeend', p);

            if(!checkPageLoaded() && file.name === 'welcome.md'){

                localStorage.setItem('isPageLoaded', '1');
                document.querySelector('textarea').value = file.content;
                document.querySelector('input').value = 'welcome.md';

            }

        }

    });


    document.querySelector('body').addEventListener('click', (event) => {

        if(event.target.closest('.your-file .text')){

            const target = event.target.closest('.your-file .text');
            const contentToLoad = target.querySelector('span:nth-of-type(2)').textContent;

            for(const file of arrayJSON){

                if(contentToLoad === file.name){
                    document.querySelector('textarea').value = file.content;
                    document.querySelector('input').value = file.name;
                }

            }

           
            // document.querySelector('.result').innerHTML = '';

            turnIntoText(document.querySelector('textarea'));




        }

    });//end event.target


    const dialogBox = document.querySelector('.dialog-box');

    dialogBox.addEventListener('click', (event) => {

        if (event.target === dialogBox) {
            dialogBox.close();
        }

    });    


    let currentNameDocument;

    document.querySelector('input').addEventListener('click', () => {
        currentNameDocument = document.querySelector('input').value;
    });


    document.querySelector('input').addEventListener('change', () => {

        // console.log('input');
        // document.querySelector('textarea').value = file.content;
        // console.log(document.querySelector('input').value);

        for(const file of arrayJSON){

            if(currentNameDocument === file.name){
                // console.log('for...of', file.name);
                file.name = document.querySelector('input').value;
            }

        }

        
        document.querySelectorAll('.your-file .text').forEach( (item) => {

            item.querySelector('span:nth-of-type(2)').textContent;

            if(currentNameDocument === item.querySelector('span:nth-of-type(2)').textContent){
                item.querySelector('span:nth-of-type(2)').textContent = document.querySelector('input').value;
                currentNameDocument = document.querySelector('input').value;
            }

        } );

    });


});



document.querySelector('.button-document').addEventListener('click', () => {

    const now = new Date();
    const dateCreated = `${now.getDate()}-${now.getMonth()+1}-${now.getFullYear()}` 

    const obj = {
        createdAt: dateCreated,
        name:  function() {

            let returnName;

            for(let i = 0; i < arrayJSON.length; i++){
                
                const name = arrayJSON[i].name.split('.');
                currentName = name[0].split(name[0].split('document')[1])[0];

                if(currentName === 'untitled-document'){        

                    let whichNumber = Number(name[0].split('document')[1]);
                    whichNumber++;
                    currentName += `${whichNumber}.md`;
                    returnName = currentName;

                }

            }

            return returnName;

        }(),

        content: ""
    };


    arrayJSON.push(obj);

    const p = document.createElement('p');
    p.classList.add('text', 'roboto-regular');

    const span = document.createElement('span');
    span.classList.add('roboto-light');
    span.textContent = obj.createdAt;

    p.insertAdjacentElement('afterbegin', span);
    const span2 = document.createElement('span');
    span2.textContent = obj.name;

    p.insertAdjacentElement('beforeend', span2);
    document.querySelector('.your-file').insertAdjacentElement('beforeend', p);

});







/* OPEN DIALOG BOX */

document.querySelector('.button-delete').addEventListener('click', (event) => {
    event.stopPropagation();
    document.querySelector('dialog').showModal();
});


document.querySelector('.button-dialog-confirm').addEventListener('click', ( ) => {

    document.querySelector('dialog').close();
    let indexToCut = 0;

    for(let i = 0; i < arrayJSON.length; i++){

        if(document.querySelector('input').value === arrayJSON[i].name){

            indexToCut = i;

        }

    }

    // console.log('indexToCut', indexToCut);

    arrayJSON.splice(indexToCut, 1);

    document.querySelectorAll('.your-file .text').forEach( (item) => {

        // item.querySelector('span:nth-of-type(2)').textContent;

        if(document.querySelector('input').value === item.querySelector('span:nth-of-type(2)').textContent){
            // item.querySelector('span:nth-of-type(2)').parentElement;
            console.log(item.querySelector('span:nth-of-type(2)').parentElement);
            item.querySelector('span:nth-of-type(2)').parentElement.remove();

        }

    } );

    document.querySelector('input').value = '';

});





document.querySelector('.button-save').addEventListener('click', ( ) => {

    console.log('button-save');

    for(let i = 0; i < arrayJSON.length; i++){

        if(document.querySelector('input').value === arrayJSON[i].name){

            indexToSave = i;

        }

    }


    console.log('indexToSave', indexToSave);
    
    console.log(document.querySelector('textarea').value);

    arrayJSON[indexToSave].content = document.querySelector('textarea').value; 

    console.log(arrayJSON);

});










/* KEY */

document.addEventListener('keyup', (event) => {

    if(event.code === 'ArrowDown'){
        console.log('keyup');
        localStorage.setItem('isPageLoaded', '0');        
    }

});


document.addEventListener('keyup', (event) => {

    if(event.code === 'ArrowUp'){
        console.log('keyup');
        console.log(arrayJSON);       
    }

});
