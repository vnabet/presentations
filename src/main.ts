import './style.css'
import 'reveal.js/dist/reveal.css'
import 'reveal.js/dist/theme/league.css';
// import 'reveal.js/plugin/highlight/monokai.css';
import './atom-one-dark.min.css';


import Reveal from 'reveal.js';
import RevealMarkdow from 'reveal.js/plugin/markdown/markdown';
import RevealNotes from 'reveal.js/plugin/notes/notes';
import RevealHighlight from 'reveal.js/plugin/highlight/highlight'


//data-markdown="./test.md"

// (document.querySelector('#main-section') as HTMLElement).dataset.markdown = './test.md';


interface ISlide {
   title:string;
   files:string[];
}


async function loadList():Promise<ISlide[]> {
   const res = await fetch('./list.json');

   const list = await res.json();

   //console.log('res', list)
   return list as ISlide[];
}

async function displayList() {
   const list = await loadList();

   const pres =  document.querySelector('.presentations') as HTMLElement;
   const listEl = document.querySelector('ul.list') as HTMLElement;

   pres.classList.add('visible');

   list.forEach((slide) => {
      const li = document.createElement('li');
      const link = document.createElement('a');

      link.setAttribute('href', `?files=${slide.files.join(',')}`);
      link.innerText = slide.title;

      li.appendChild(link);

      listEl.appendChild(li)
   })
}

function init() {
   const urlParams = new URLSearchParams(window.location.search);
   const files = urlParams.get('files');

   if(files && files.length) {
      launchReveal(files.split(','));
   } else {
      displayList();
   }
   
}

function launchReveal(files:string[]) {

   if(!files.length) {displayList(); return;};

   const slides = document.querySelector('.reveal .slides') as HTMLElement;

   files.forEach((file) => {



         const section = document.createElement('section');
         section.dataset.markdown = file;

         slides.appendChild(section);


   })

   let deck = new Reveal({
      plugins: [RevealMarkdow, RevealNotes, RevealHighlight]
   })
   deck.initialize();
}

init();



// let deck = new Reveal({
//    // plugins: [ Markdown ]
//    plugins: [RevealMarkdow, RevealNotes, RevealHighlight]
// })
// deck.initialize();