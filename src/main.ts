import './style.css'
import 'reveal.js/dist/reveal.css'
import 'reveal.js/dist/theme/dracula.css'

import Reveal from 'reveal.js';
// import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';
import RevealNotes from 'reveal.js/plugin/notes/notes.esm';


let deck = new Reveal({
   // plugins: [ Markdown ]
   plugins: [RevealNotes]
})
deck.initialize();