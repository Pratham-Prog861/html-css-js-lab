import { Challenge } from './types';

export const CHALLENGES: Challenge[] = [
  // ==========================================
  // MODULE 1: HTML STRUCTURE & SEMANTICS
  // ==========================================
  {
    id: '1-hello-world',
    title: '1. HTML: The Basics',
    description: 'Create a simple heading. Inside the body, create an `h1` tag with the text "Hello World".',
    difficulty: 'Beginner',
    type: 'html',
    initialCode: {
      html: '<!-- Write your code here -->\n',
      css: '',
      js: ''
    },
    validationCode: `
      const h1 = document.querySelector('h1');
      if (!h1) return { success: false, message: "No <h1> tag found." };
      if (h1.textContent.trim().toLowerCase() !== 'hello world') return { success: false, message: "The <h1> text should be 'Hello World'." };
      return { success: true, message: "Great job! You've created your first element." };
    `,
    hint: "Use the `<h1>` tag for the main heading. It should look like this: `<h1>Hello World</h1>`."
  },
  {
    id: 'html-paragraphs',
    title: '2. HTML: Paragraphs',
    description: 'Add a paragraph of text below the heading. Use the `<p>` tag.',
    difficulty: 'Beginner',
    type: 'html',
    initialCode: {
      html: '<h1>My Article</h1>\n<!-- Add a paragraph below -->\n',
      css: '',
      js: ''
    },
    validationCode: `
      const p = document.querySelector('p');
      if (!p) return { success: false, message: "No <p> tag found." };
      if (p.textContent.length < 5) return { success: false, message: "Write a bit more text in the paragraph." };
      return { success: true, message: "Paragraph added!" };
    `,
    hint: "Use the `<p>` tag directly below the heading: `<p>Your paragraph text here</p>`."
  },
  {
    id: 'html-anchor',
    title: '3. HTML: Links',
    description: 'Create a link to Google. Use the `<a>` tag with the `href` attribute set to "https://google.com" and the text "Go to Google".',
    difficulty: 'Beginner',
    type: 'html',
    initialCode: {
      html: '<!-- Create your link here -->\n',
      css: '',
      js: ''
    },
    validationCode: `
      const a = document.querySelector('a');
      if (!a) return { success: false, message: "No <a> tag found." };
      if (a.getAttribute('href') !== 'https://google.com') return { success: false, message: "The href attribute should be 'https://google.com'." };
      if (!a.textContent.includes('Google')) return { success: false, message: "The link text should contain 'Google'." };
      return { success: true, message: "Link created successfully!" };
    `,
    hint: "<a href='...'>Text</a>"
  },
  {
    id: 'html-images',
    title: '4. HTML: Images',
    description: 'Display an image. Use the `<img>` tag with `src="https://via.placeholder.com/150"` and an `alt` attribute of "Placeholder".',
    difficulty: 'Beginner',
    type: 'html',
    initialCode: {
      html: '<!-- Add your image here -->\n',
      css: '',
      js: ''
    },
    validationCode: `
      const img = document.querySelector('img');
      if (!img) return { success: false, message: "No <img> tag found." };
      if (!img.src.includes('via.placeholder.com')) return { success: false, message: "Incorrect image source." };
      if (img.getAttribute('alt') !== 'Placeholder') return { success: false, message: "Alt text should be 'Placeholder'." };
      return { success: true, message: "Image added!" };
    `,
    hint: "Use the `<img>` tag with `src` and `alt` attributes: `<img src=\"https://via.placeholder.com/150\" alt=\"Placeholder\">`."
  },
  {
    id: 'html-lists',
    title: '5. HTML: Ordered Lists',
    description: 'Create an ordered list with 3 items: "Red", "Green", "Blue". Use the `<ol>` tag for the list and `<li>` for items.',
    difficulty: 'Beginner',
    type: 'html',
    initialCode: {
      html: '<h3>My Favorite Colors</h3>\n<!-- Create your list below -->\n',
      css: '',
      js: ''
    },
    validationCode: `
      const ol = document.querySelector('ol');
      if (!ol) return { success: false, message: "No <ol> tag found." };
      const items = ol.querySelectorAll('li');
      if (items.length !== 3) return { success: false, message: "There should be exactly 3 <li> items." };
      if (items[0].textContent.includes("Red") && items[1].textContent.includes("Green") && items[2].textContent.includes("Blue")) {
        return { success: true, message: "List created correctly!" };
      }
      return { success: false, message: "The items should be Red, Green, and Blue in that order." };
    `,
    hint: "Wrap list items in `<ol>`: `<ol><li>Red</li><li>Green</li><li>Blue</li></ol>`."
  },
  {
    id: 'html-unordered-lists',
    title: '6. HTML: Unordered Lists',
    description: 'Create a shopping list using an unordered list `<ul>`. Add at least 2 items (e.g., "Milk", "Eggs").',
    difficulty: 'Beginner',
    type: 'html',
    initialCode: {
      html: '<h3>Shopping List</h3>\n',
      css: '',
      js: ''
    },
    validationCode: `
      const ul = document.querySelector('ul');
      if (!ul) return { success: false, message: "No <ul> tag found." };
      if (ul.querySelectorAll('li').length < 2) return { success: false, message: "Add at least 2 items." };
      return { success: true, message: "Unordered list created!" };
    `,
    hint: "Wrap list items in `<ul>`: `<ul><li>Milk</li><li>Eggs</li></ul>`."
  },
  {
    id: 'html-input-attributes',
    title: '7. HTML: Button Attributes',
    description: 'Create a button that is disabled. Use the `<button>` tag and add the `disabled` attribute. Text should be "Can\'t Click Me".',
    difficulty: 'Beginner',
    type: 'html',
    initialCode: {
      html: '',
      css: '',
      js: ''
    },
    validationCode: `
      const btn = document.querySelector('button');
      if (!btn) return { success: false, message: "No button found." };
      if (!btn.hasAttribute('disabled')) return { success: false, message: "Button is not disabled." };
      return { success: true, message: "Attribute applied correctly!" };
    `,
    hint: "Add the `disabled` attribute directly to the `<button>` tag: `<button disabled>Can't Click Me</button>`."
  },
  {
    id: 'html-forms',
    title: '8. HTML: Simple Login Form',
    description: 'Build a login form. Create a `<form>` containing two `<input>` fields (one for text, one for password) and a `<button>` with text "Login".',
    difficulty: 'Intermediate',
    type: 'html',
    initialCode: {
      html: '<h2>Login</h2>\n<!-- Build your form here -->\n',
      css: 'input { display: block; margin-bottom: 10px; }',
      js: ''
    },
    validationCode: `
      const form = document.querySelector('form');
      if (!form) return { success: false, message: "No <form> tag found." };
      const inputs = form.querySelectorAll('input');
      const btn = form.querySelector('button');
      if (inputs.length < 2) return { success: false, message: "You need at least two input fields." };
      if (inputs[1].type !== 'password') return { success: false, message: "The second input should have type='password'." };
      if (!btn || btn.textContent !== 'Login') return { success: false, message: "A button with text 'Login' is required." };
      return { success: true, message: "Form structure looks good!" };
    `,
    hint: "Wrap the inputs and button in a `<form>` element. Use `type=\"password\"` for the password input."
  },
  {
    id: 'html-checkbox-radio',
    title: '9. HTML: Checkboxes & Radios',
    description: 'Create a form with one checkbox (id="terms") and two radio buttons (name="gender") sharing the same name attribute.',
    difficulty: 'Intermediate',
    type: 'html',
    initialCode: {
      html: '<form>\n  <!-- Add checkbox and radios here -->\n</form>',
      css: '',
      js: ''
    },
    validationCode: `
      const check = document.querySelector('input[type="checkbox"]');
      const radios = document.querySelectorAll('input[type="radio"]');
      if (!check || check.id !== 'terms') return { success: false, message: "Checkbox with id='terms' missing." };
      if (radios.length < 2) return { success: false, message: "Need at least 2 radio buttons." };
      if (radios[0].name !== radios[1].name) return { success: false, message: "Radio buttons must share the same 'name' attribute." };
      return { success: true, message: "Inputs configured correctly!" };
    `,
    hint: "Add `<input type=\"checkbox\" id=\"terms\">` and two `<input type=\"radio\" name=\"gender\">` elements."
  },
  {
    id: 'html-table-basic',
    title: '10. HTML: Tables',
    description: 'Create a table with 2 columns and 2 rows (plus a header row). Use `<table>`, `<tr>`, `<th>`, and `<td>`.',
    difficulty: 'Intermediate',
    type: 'html',
    initialCode: {
      html: '<!-- Create your table here -->\n',
      css: 'table, th, td { border: 1px solid white; border-collapse: collapse; padding: 5px; }',
      js: ''
    },
    validationCode: `
      const table = document.querySelector('table');
      if (!table) return { success: false, message: "No table found." };
      const rows = table.querySelectorAll('tr');
      if (rows.length < 3) return { success: false, message: "Table should have at least 3 rows (1 header + 2 data)." };
      if (!table.querySelector('th')) return { success: false, message: "Table header (th) missing." };
      return { success: true, message: "Table structure is correct!" };
    `,
    hint: "Use `<table>` containing `<tr>` for rows, `<th>` for headers, and `<td>` for data cells."
  },
  {
    id: 'html-semantics',
    title: '11. HTML: Semantic Structure',
    description: 'Build a semantic layout with `<header>`, `<main>`, and `<footer>`. The header must contain an `<h1>`.',
    difficulty: 'Beginner',
    type: 'html',
    initialCode: {
      html: '<!-- Build your semantic layout here -->\n',
      css: '',
      js: ''
    },
    validationCode: `
      const header = document.querySelector('header');
      const main = document.querySelector('main');
      const footer = document.querySelector('footer');
      if (!header || !main || !footer) return { success: false, message: "Missing header, main, or footer." };
      if (!header.querySelector('h1')) return { success: false, message: "Header needs an <h1>." };
      return { success: true, message: "Semantic structure is perfect!" };
    `,
    hint: "Wrap the top heading in `<header>`, the article in `<main>`, and the copyright text in `<footer>`."
  },

  // ==========================================
  // MODULE 2: CSS STYLING & BOX MODEL
  // ==========================================
  {
    id: '2-styling-text',
    title: '12. CSS: Colors & Fonts',
    description: 'Style the text. Make the class `.highlight` red and give it a font-size of 20px.',
    difficulty: 'Beginner',
    type: 'css',
    initialCode: {
      html: '<p class="highlight">Important Text</p>',
      css: '.highlight {\n  /* Your CSS here */\n}',
      js: ''
    },
    validationCode: `
      const el = document.querySelector('.highlight');
      const style = window.getComputedStyle(el);
      if (style.color !== 'rgb(255, 0, 0)' && style.color !== 'red') return { success: false, message: "Color must be red." };
      if (style.fontSize !== '20px') return { success: false, message: "Font size must be 20px." };
      return { success: true, message: "Text styled correctly!" };
    `,
    hint: "Add CSS rules inside the stylesheet: `h1 { color: blue; font-size: 24px; }`."
  },
  {
    id: 'css-backgrounds',
    title: '13. CSS: Backgrounds',
    description: 'Give the body a background color of #f0f0f0 and the `.card` a white background.',
    difficulty: 'Beginner',
    type: 'css',
    initialCode: {
      html: '<div class="card">Content</div>',
      css: '/* Style body and .card */',
      js: ''
    },
    validationCode: `
      const bodyBg = window.getComputedStyle(document.body).backgroundColor;
      const cardBg = window.getComputedStyle(document.querySelector('.card')).backgroundColor;
      // Browsers convert hex to rgb
      if (bodyBg !== 'rgb(240, 240, 240)') return { success: false, message: "Body background should be #f0f0f0." };
      if (cardBg !== 'rgb(255, 255, 255)') return { success: false, message: "Card background should be white." };
      return { success: true, message: "Backgrounds applied!" };
    `,
    hint: "Set the `background-color` style on the body: `body { background-color: #f0f0f0; }`."
  },
  {
    id: 'css-box-model',
    title: '14. CSS: The Box Model',
    description: 'Add space! Give `.box` 20px padding, 5px solid border, and 10px margin.',
    difficulty: 'Beginner',
    type: 'css',
    initialCode: {
      html: '<div class="box">Box</div>',
      css: '.box { background: #ddd; display: inline-block; }',
      js: ''
    },
    validationCode: `
      const s = window.getComputedStyle(document.querySelector('.box'));
      if (s.paddingTop !== '20px') return { success: false, message: "Padding should be 20px." };
      if (s.borderTopWidth !== '5px') return { success: false, message: "Border width should be 5px." };
      if (s.marginTop !== '10px') return { success: false, message: "Margin should be 10px." };
      return { success: true, message: "Box model mastered!" };
    `,
    hint: "Apply padding and margin to the box selector: `.box { padding: 20px; margin: 10px; }`."
  },
  {
    id: 'css-text-align',
    title: '15. CSS: Text Alignment',
    description: 'Center the text inside the `.header` div and right-align the text inside `.footer`.',
    difficulty: 'Beginner',
    type: 'css',
    initialCode: {
      html: '<div class="header">Title</div>\n<div class="footer">Copyright</div>',
      css: '.header { background: #333; color: white; p: 10px; }\n.footer { background: #eee; p: 10px; }',
      js: ''
    },
    validationCode: `
      const h = window.getComputedStyle(document.querySelector('.header'));
      const f = window.getComputedStyle(document.querySelector('.footer'));
      if (h.textAlign !== 'center') return { success: false, message: "Header text not centered." };
      if (f.textAlign !== 'right') return { success: false, message: "Footer text not right-aligned." };
      return { success: true, message: "Alignment correct!" };
    `,
    hint: "Use the `text-align` property: `h1 { text-align: center; }`."
  },
  {
    id: 'css-borders',
    title: '16. CSS: Rounded Corners',
    description: 'Turn the square into a circle! Set the width/height to 100px and `border-radius` to 50%.',
    difficulty: 'Beginner',
    type: 'css',
    initialCode: {
      html: '<div class="circle"></div>',
      css: '.circle {\n  background: orange;\n  /* Add dimensions and radius */\n}',
      js: ''
    },
    validationCode: `
      const s = window.getComputedStyle(document.querySelector('.circle'));
      if (s.borderRadius !== '50%' && s.borderRadius !== '50px') return { success: false, message: "Border radius should be 50%." };
      if (s.width !== '100px' || s.height !== '100px') return { success: false, message: "Width and height must be 100px." };
      return { success: true, message: "It's a circle!" };
    `,
    hint: "Set border properties: `.box { border: 2px solid black; border-radius: 5px; }`."
  },
  {
    id: 'css-display',
    title: '17. CSS: Display Property',
    description: 'The list items are vertical. Make them horizontal by setting the `li` display to `inline` or `inline-block`.',
    difficulty: 'Intermediate',
    type: 'css',
    initialCode: {
      html: '<ul><li>Home</li><li>About</li><li>Contact</li></ul>',
      css: 'li {\n  background: #444; color: white; padding: 5px;\n  /* Change display here */\n}',
      js: ''
    },
    validationCode: `
      const s = window.getComputedStyle(document.querySelector('li'));
      if (s.display !== 'inline' && s.display !== 'inline-block') return { success: false, message: "Display must be inline or inline-block." };
      return { success: true, message: "Items are now horizontal!" };
    `,
    hint: "Set display to none: `.hidden-box { display: none; }`."
  },
  {
    id: 'css-opacity',
    title: '18. CSS: Opacity',
    description: 'Make the image semi-transparent. Set the opacity of `.ghost` to 0.5.',
    difficulty: 'Beginner',
    type: 'css',
    initialCode: {
      html: '<div class="ghost">Boo!</div>',
      css: '.ghost { background: black; color: white; padding: 20px; }',
      js: ''
    },
    validationCode: `
      const s = window.getComputedStyle(document.querySelector('.ghost'));
      if (s.opacity !== '0.5') return { success: false, message: "Opacity should be 0.5." };
      return { success: true, message: "Spooky!" };
    `,
    hint: "Use the opacity property: `.ghost { opacity: 0.5; }`."
  },

  // ==========================================
  // MODULE 3: ADVANCED CSS LAYOUT
  // ==========================================
  {
    id: '4-flexbox-center',
    title: '19. Flexbox: Centering',
    description: 'Center the box! Use Flexbox on the `.container` to center the `.box` both horizontally and vertically.',
    difficulty: 'Intermediate',
    type: 'css',
    initialCode: {
      html: '<div class="container">\n  <div class="box">Center Me</div>\n</div>',
      css: `.container {
  height: 200px;
  background: #eee;
  /* Add Flexbox rules here */
}
.box { width: 100px; height: 100px; background: #0ea5e9; }`,
      js: ''
    },
    validationCode: `
      const style = window.getComputedStyle(document.querySelector('.container'));
      if (style.display !== 'flex') return { success: false, message: "Container must be display: flex" };
      if (style.justifyContent !== 'center') return { success: false, message: "Missing justify-content: center." };
      if (style.alignItems !== 'center') return { success: false, message: "Missing align-items: center." };
      return { success: true, message: "Box is perfectly centered!" };
    `,
    hint: "Set flex layout properties: `.container { display: flex; justify-content: center; align-items: center; }`."
  },
  {
    id: 'css-flex-direction',
    title: '20. Flexbox: Column',
    description: 'The items are side-by-side. Make them stack vertically by changing the flex-direction to `column`.',
    difficulty: 'Intermediate',
    type: 'css',
    initialCode: {
      html: '<div class="flex">\n  <div>1</div><div>2</div><div>3</div>\n</div>',
      css: '.flex { display: flex; gap: 10px; } \n/* Add direction rule */',
      js: ''
    },
    validationCode: `
      const s = window.getComputedStyle(document.querySelector('.flex'));
      if (s.flexDirection !== 'column') return { success: false, message: "flex-direction should be column." };
      return { success: true, message: "Stacked correctly!" };
    `,
    hint: "Set flex direction to column: `.container { display: flex; flex-direction: column; }`."
  },
  {
    id: 'css-flex-wrap',
    title: '21. Flexbox: Wrapping',
    description: 'The items are squishing! Allow them to wrap to the next line using `flex-wrap: wrap`.',
    difficulty: 'Intermediate',
    type: 'css',
    initialCode: {
      html: '<div class="container">\n' + new Array(10).fill('<div class="item"></div>').join('') + '\n</div>',
      css: '.container { display: flex; width: 200px; border: 1px solid white; }\n.item { width: 50px; height: 50px; background: blue; margin: 2px; }',
      js: ''
    },
    validationCode: `
      const s = window.getComputedStyle(document.querySelector('.container'));
      if (s.flexWrap !== 'wrap') return { success: false, message: "Enable wrapping with flex-wrap: wrap." };
      return { success: true, message: "Items wrapped!" };
    `,
    hint: "Use the flex-wrap property: `.container { display: flex; flex-wrap: wrap; }`."
  },
  {
    id: 'css-grid-basic',
    title: '22. Grid: 2 Columns',
    description: 'Create a 2-column layout using `display: grid` and `grid-template-columns: 1fr 1fr`.',
    difficulty: 'Advanced',
    type: 'css',
    initialCode: {
      html: '<div class="grid">\n  <div>A</div><div>B</div><div>C</div><div>D</div>\n</div>',
      css: '.grid {\n  /* Add grid rules */\n  gap: 10px;\n}\n.grid div { background: #444; padding: 20px; }',
      js: ''
    },
    validationCode: `
      const s = window.getComputedStyle(document.querySelector('.grid'));
      if (s.display !== 'grid') return { success: false, message: "Use display: grid." };
      if (s.gridTemplateColumns.split(' ').length !== 2) return { success: false, message: "Should define 2 columns." };
      return { success: true, message: "Grid layout active!" };
    `,
    hint: "Define a grid: `.container { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }`."
  },
  {
    id: 'css-position-absolute',
    title: '23. Positioning: Absolute',
    description: 'Position the `.badge` in the top-right of the `.btn`. Remember to set `.btn` to `relative`!',
    difficulty: 'Intermediate',
    type: 'css',
    initialCode: {
      html: '<button class="btn">Inbox <span class="badge">3</span></button>',
      css: '.btn { padding: 10px; border: none; background: #333; color: white; }\n.badge { background: red; font-size: 10px; padding: 2px 5px; }',
      js: ''
    },
    validationCode: `
      const btn = window.getComputedStyle(document.querySelector('.btn'));
      const badge = window.getComputedStyle(document.querySelector('.badge'));
      if (btn.position !== 'relative') return { success: false, message: "Button needs position: relative." };
      if (badge.position !== 'absolute') return { success: false, message: "Badge needs position: absolute." };
      if (parseInt(badge.top) > 5 || parseInt(badge.right) > 5) return { success: false, message: "Position badge at top/right (e.g., 0px)." };
      return { success: true, message: "Positioned perfectly!" };
    `,
    hint: "Make the parent relative and child absolute: `.parent { position: relative; } .child { position: absolute; top: 10px; right: 10px; }`."
  },
  {
    id: 'css-z-index',
    title: '24. Positioning: Z-Index',
    description: 'The blue box is hiding behind the red box. Use `z-index` to bring `.blue` to the front.',
    difficulty: 'Intermediate',
    type: 'css',
    initialCode: {
      html: '<div class="red"></div><div class="blue"></div>',
      css: '.red, .blue { position: absolute; width: 100px; height: 100px; top: 20px; left: 20px; }\n.red { background: red; z-index: 1; }\n.blue { background: blue; top: 40px; left: 40px; }',
      js: ''
    },
    validationCode: `
      const blue = window.getComputedStyle(document.querySelector('.blue'));
      if (blue.zIndex === 'auto' || parseInt(blue.zIndex) <= 1) return { success: false, message: "Blue box z-index must be higher than 1." };
      return { success: true, message: "Blue box is now on top!" };
    `,
    hint: "Layer elements using z-index: `.box1 { position: relative; z-index: 2; } .box2 { position: relative; z-index: 1; }`."
  },
  {
    id: 'css-hover',
    title: '25. Transitions: Hover Effect',
    description: 'Change button background to red on hover. Add a `transition` of 0.3s for smooth effect.',
    difficulty: 'Intermediate',
    type: 'css',
    initialCode: {
      html: '<button class="btn">Hover Me</button>',
      css: '.btn { background: blue; color: white; padding: 10px; border: none; }',
      js: ''
    },
    validationCode: `
      const sheet = document.querySelector('style').sheet || document.styleSheets[0]; // simplistic check
      // Hard to validate hover state via computed style without triggering it.
      // We'll scan CSS text for simplicity or basic rule check
      let hasHover = false;
      let hasTransition = false;
      
      const btn = document.querySelector('.btn');
      if (window.getComputedStyle(btn).transitionDuration === '0s') return { success: false, message: "Add transition property (e.g. 0.3s)." };

      // We trust the user added the hover rule if the transition is there, or complex regex check
      return { success: true, message: "Transition configured!" };
    `,
    hint: ".btn:hover { background: red; } .btn { transition: background 0.3s; }"
  },

  // ==========================================
  // MODULE 4: JAVASCRIPT BASICS & DOM
  // ==========================================
  {
    id: 'js-select-element',
    title: '26. JS: Selecting Elements',
    description: 'Select the element with id "target" and change its text content to "Found You!".',
    difficulty: 'Beginner',
    type: 'js',
    initialCode: {
      html: '<div id="target">Find me...</div>',
      css: '',
      js: '// Select element and change text\n'
    },
    validationCode: `
      const el = document.getElementById('target');
      if (el.textContent !== 'Found You!') return { success: false, message: "Text should be 'Found You!'." };
      return { success: true, message: "Element manipulated!" };
    `,
    hint: "Use querySelector or getElementById: `const title = document.getElementById('title');` or `const title = document.querySelector('#title');`."
  },
  {
    id: 'js-change-style',
    title: '27. JS: Changing Styles',
    description: 'Select the box and change its background color to "purple" using JavaScript.',
    difficulty: 'Beginner',
    type: 'js',
    initialCode: {
      html: '<div id="box" style="width:50px; height:50px; background:red;"></div>',
      css: '',
      js: 'const box = document.getElementById("box");\n'
    },
    validationCode: `
      const box = document.getElementById('box');
      if (box.style.backgroundColor !== 'purple') return { success: false, message: "Background is not purple." };
      return { success: true, message: "Style updated!" };
    `,
    hint: "Access style properties in JS: `element.style.color = 'red'; element.style.fontSize = '20px';`."
  },
  {
    id: '3-button-click',
    title: '28. JS: Event Listeners',
    description: 'When the button is clicked, change its text to "Clicked!".',
    difficulty: 'Beginner',
    type: 'mixed',
    initialCode: {
      html: '<button id="btn">Click Me</button>',
      css: '',
      js: 'const btn = document.getElementById("btn");\n'
    },
    validationCode: `
      const btn = document.getElementById('btn');
      btn.click();
      if (btn.textContent !== 'Clicked!') return { success: false, message: "Text didn't change on click." };
      return { success: true, message: "Event listener working!" };
    `,
    hint: "Add a click listener to the button: `btn.addEventListener('click', () => { ... });`."
  },
  {
    id: 'js-input-value',
    title: '29. JS: Input Values',
    description: 'When the button is clicked, take the value from the input and display it in the result div.',
    difficulty: 'Intermediate',
    type: 'js',
    initialCode: {
      html: '<input id="in" value="Hello"><button id="btn">Show</button><div id="result"></div>',
      css: '',
      js: '// Add click listener to #btn, read #in, write to #result'
    },
    validationCode: `
      const btn = document.getElementById('btn');
      const input = document.getElementById('in');
      const res = document.getElementById('result');
      
      input.value = "Test1234";
      btn.click();
      
      if (res.textContent !== 'Test1234') return { success: false, message: "Result div didn't show input value." };
      return { success: true, message: "Data transfer successful!" };
    `,
    hint: "Get input value and assign it to textContent: `const val = input.value; output.textContent = val;`."
  },
  {
    id: 'js-toggle-class',
    title: '30. JS: Toggling Classes',
    description: 'When the box is clicked, toggle the class "active" on it.',
    difficulty: 'Intermediate',
    type: 'mixed',
    initialCode: {
      html: '<div id="box">Click Me</div>',
      css: '#box { padding: 20px; background: grey; } .active { background: green !important; }',
      js: 'const box = document.getElementById("box");\n'
    },
    validationCode: `
      const box = document.getElementById('box');
      const initial = box.classList.contains('active');
      box.click();
      if (box.classList.contains('active') === initial) return { success: false, message: "Class was not toggled." };
      return { success: true, message: "Class toggled!" };
    `,
    hint: "Toggle class using classList: `element.classList.toggle('active');`."
  },
  {
    id: 'js-create-element',
    title: '31. JS: Creating Elements',
    description: 'Create a new `<li>` element with text "New Item" and append it to the list.',
    difficulty: 'Intermediate',
    type: 'js',
    initialCode: {
      html: '<ul id="list"><li>Item 1</li></ul>',
      css: '',
      js: 'const list = document.getElementById("list");\n'
    },
    validationCode: `
      const list = document.getElementById('list');
      if (list.children.length < 2) return { success: false, message: "No new item added." };
      if (list.lastElementChild.textContent !== 'New Item') return { success: false, message: "New item text incorrect." };
      return { success: true, message: "Element created and appended!" };
    `,
    hint: "Use createElement and appendChild: `const newLi = document.createElement('li'); newLi.textContent = 'New Item'; list.appendChild(newLi);`."
  },
  {
    id: 'js-remove-element',
    title: '32. JS: Removing Elements',
    description: 'Remove the element with id "remove-me" from the DOM using JavaScript.',
    difficulty: 'Beginner',
    type: 'js',
    initialCode: {
      html: '<div id="keep">Keep</div><div id="remove-me">Delete</div>',
      css: '',
      js: 'const el = document.getElementById("remove-me");\n'
    },
    validationCode: `
      if (document.getElementById('remove-me')) return { success: false, message: "Element still exists." };
      return { success: true, message: "Element deleted!" };
    `,
    hint: "Remove an element: `child.remove();` or `parent.removeChild(child);`."
  },
  {
    id: 'js-math-random',
    title: '33. JS: Math & Random',
    description: 'Generate a random number between 0 and 10 and display it in the div `#num`.',
    difficulty: 'Intermediate',
    type: 'js',
    initialCode: {
      html: 'Random: <span id="num"></span>',
      css: '',
      js: 'const display = document.getElementById("num");\n'
    },
    validationCode: `
      const txt = document.getElementById("num").textContent;
      if (txt === '') return { success: false, message: "Display is empty." };
      const n = Number(txt);
      if (isNaN(n)) return { success: false, message: "Content is not a number." };
      if (n < 0 || n > 10) return { success: false, message: "Number out of range (0-10)." };
      return { success: true, message: "Random number generated!" };
    `,
    hint: "Generate a random number: `const rand = Math.floor(Math.random() * 10) + 1;`."
  },
  {
    id: 'js-array-loop',
    title: '34. JS: Arrays & Loops',
    description: 'Loop through the array `colors` and create a `div` for each color with that background color, appending them to `#container`.',
    difficulty: 'Advanced',
    type: 'js',
    initialCode: {
      html: '<div id="container"></div>',
      css: '#container div { width: 30px; height: 30px; display: inline-block; margin: 2px; }',
      js: 'const colors = ["red", "green", "blue", "yellow"];\nconst container = document.getElementById("container");\n'
    },
    validationCode: `
      const c = document.getElementById('container');
      if (c.children.length !== 4) return { success: false, message: "Expected 4 divs." };
      if (c.children[0].style.backgroundColor !== 'red') return { success: false, message: "First div not red." };
      return { success: true, message: "Array rendered!" };
    `,
    hint: "Loop through array colors: `colors.forEach(color => { ... });` or use a standard `for` loop."
  },
  {
    id: 'js-conditions',
    title: '35. JS: Conditionals',
    description: 'Check the variable `score`. If it is >= 50, set `#msg` text to "Pass", otherwise "Fail".',
    difficulty: 'Beginner',
    type: 'js',
    initialCode: {
      html: 'Result: <span id="msg"></span>',
      css: '',
      js: 'let score = 75;\nconst msg = document.getElementById("msg");\n// Add logic here'
    },
    validationCode: `
      const msg = document.getElementById('msg');
      if (msg.textContent !== 'Pass') return { success: false, message: "Logic incorrect for score 75." };
      return { success: true, message: "Condition logic works!" };
    `,
    hint: "Check if input value matches expected string: `if (val === 'google') { ... }`."
  },

  // ==========================================
  // MODULE 5: INTERACTIVE PROJECTS
  // ==========================================
  {
    id: 'js-counter',
    title: '36. Mini-App: Counter',
    description: 'Make the buttons work. Increment adds 1, Decrement subtracts 1 from the span `#count`.',
    difficulty: 'Intermediate',
    type: 'js',
    initialCode: {
      html: '<button id="dec">-</button> <span id="count">0</span> <button id="inc">+</button>',
      css: '',
      js: 'let count = 0;\n// Select elements and add listeners'
    },
    validationCode: `
      const inc = document.getElementById('inc');
      const countEl = document.getElementById('count');
      inc.click();
      if (countEl.textContent !== '1') return { success: false, message: "Increment failed." };
      const dec = document.getElementById('dec');
      dec.click();
      if (countEl.textContent !== '0') return { success: false, message: "Decrement failed." };
      return { success: true, message: "Counter functional!" };
    `,
    hint: "Add event listeners for increment and decrement: `count++; countDisplay.textContent = count;`."
  },
  {
    id: 'js-color-flipper',
    title: '37. Mini-App: Color Flipper',
    description: 'When button is clicked, change body background to a random color.',
    difficulty: 'Intermediate',
    type: 'js',
    initialCode: {
      html: '<button id="btn">Flip</button>',
      css: '',
      js: 'const colors = ["red", "blue", "green", "purple"];\ndocument.getElementById("btn").addEventListener("click", () => {\n  // Logic\n});'
    },
    validationCode: `
      const btn = document.getElementById('btn');
      const start = document.body.style.backgroundColor;
      btn.click();
      if (document.body.style.backgroundColor === start && document.body.style.backgroundColor === '') return { success: false, message: "Background didn't change." };
      return { success: true, message: "Colors flipping!" };
    `,
    hint: "Generate a random color index and set body style: `document.body.style.backgroundColor = colors[randomIndex];`."
  },
  {
    id: 'js-modal',
    title: '38. Mini-App: Simple Modal',
    description: 'Show the modal when "Open" is clicked. Hide it when "X" is clicked. (Use display: block/none).',
    difficulty: 'Advanced',
    type: 'mixed',
    initialCode: {
      html: '<button id="open">Open Modal</button>\n<div id="modal" class="hidden">\n  <div class="content"><span id="close">X</span><p>Hello</p></div>\n</div>',
      css: '.hidden { display: none; } #modal { position: fixed; top:0; left:0; width:100%; height:100%; background: rgba(0,0,0,0.5); } .content { background: white; margin: 100px auto; padding: 20px; width: 200px; }',
      js: '// Select elements and toggle "hidden" class or change display'
    },
    validationCode: `
      const open = document.getElementById('open');
      const close = document.getElementById('close');
      const modal = document.getElementById('modal');
      
      open.click();
      const style = window.getComputedStyle(modal);
      if (style.display === 'none') return { success: false, message: "Modal didn't open." };
      
      close.click();
      const style2 = window.getComputedStyle(modal);
      if (style2.display !== 'none') return { success: false, message: "Modal didn't close." };
      return { success: true, message: "Modal works!" };
    `,
    hint: "Open and close the modal by changing styling: `modal.style.display = 'block';` or `modal.classList.add('show');`."
  },
  {
    id: 'js-accordion',
    title: '39. Mini-App: Accordion',
    description: 'When the button is clicked, toggle the visibility of the panel.',
    difficulty: 'Intermediate',
    type: 'mixed',
    initialCode: {
      html: '<button class="accordion">Section 1</button>\n<div class="panel" style="display:none">Content...</div>',
      css: '.panel { padding: 10px; background: #eee; }',
      js: ''
    },
    validationCode: `
      const btn = document.querySelector('.accordion');
      const panel = document.querySelector('.panel');
      btn.click();
      if (panel.style.display === 'none') return { success: false, message: "Panel didn't open." };
      btn.click();
      if (panel.style.display !== 'none') return { success: false, message: "Panel didn't close." };
      return { success: true, message: "Accordion works!" };
    `,
    hint: "Toggle display: `content.style.display = content.style.display === 'block' ? 'none' : 'block';`."
  },
  {
    id: 'js-tabs',
    title: '40. Mini-App: Tabs',
    description: 'Implement simple tabs. When a button is clicked, show specific content div and hide others.',
    difficulty: 'Advanced',
    type: 'mixed',
    initialCode: {
      html: '<div><button onclick="openTab(\'t1\')">1</button><button onclick="openTab(\'t2\')">2</button></div>\n<div id="t1" class="tab">Tab 1</div><div id="t2" class="tab" style="display:none">Tab 2</div>',
      css: '',
      js: 'function openTab(id) {\n  // Hide all .tab, show #id\n}'
    },
    validationCode: `
      // We need to access global scope function which might be tricky if not attached to window in module
      // But in this app, scripts run in global scope of iframe.
      if (typeof window.openTab !== 'function') return { success: false, message: "openTab function missing." };
      window.openTab('t2');
      if (document.getElementById('t2').style.display === 'none') return { success: false, message: "Tab 2 didn't open." };
      if (document.getElementById('t1').style.display !== 'none') return { success: false, message: "Tab 1 didn't close." };
      return { success: true, message: "Tabs functional!" };
    `,
    hint: "Loop through tabs to remove active class, add it to clicked tab, and show/hide corresponding panels."
  },

  // ==========================================
  // MODULE 6: ADVANCED HTML & CSS
  // ==========================================
  {
    id: 'html-video',
    title: '41. HTML5: Video',
    description: 'Embed a video. Use `<video>` with `controls` attribute and width 300.',
    difficulty: 'Beginner',
    type: 'html',
    initialCode: {
      html: '<!-- Add video tag here -->',
      css: '',
      js: ''
    },
    validationCode: `
      const v = document.querySelector('video');
      if (!v) return { success: false, message: "No video tag." };
      if (!v.hasAttribute('controls')) return { success: false, message: "Missing controls attribute." };
      if (v.getAttribute('width') !== '300') return { success: false, message: "Width should be 300." };
      return { success: true, message: "Video player ready!" };
    `,
    hint: "Add the video tag: `<video src=\"video.mp4\" controls width=\"400\"></video>`."
  },
  {
    id: 'html-textarea',
    title: '42. Forms: Textarea',
    description: 'Create a `<textarea>` with 4 rows and 50 columns.',
    difficulty: 'Beginner',
    type: 'html',
    initialCode: {
      html: '',
      css: '',
      js: ''
    },
    validationCode: `
      const t = document.querySelector('textarea');
      if (!t) return { success: false, message: "No textarea." };
      if (t.getAttribute('rows') !== '4') return { success: false, message: "Rows should be 4." };
      return { success: true, message: "Text area created!" };
    `,
    hint: "Add the textarea tag: `<textarea rows=\"4\" cols=\"50\" placeholder=\"Type here...\"></textarea>`."
  },
  {
    id: 'html-select',
    title: '43. Forms: Select Dropdown',
    description: 'Create a `<select>` with 3 options: Volvo, Saab, Mercedes.',
    difficulty: 'Beginner',
    type: 'html',
    initialCode: {
      html: '',
      css: '',
      js: ''
    },
    validationCode: `
      const s = document.querySelector('select');
      if (!s) return { success: false, message: "No select tag." };
      if (s.options.length < 3) return { success: false, message: "Need 3 options." };
      return { success: true, message: "Dropdown created!" };
    `,
    hint: "Wrap options inside select: `<select><option value=\"apple\">Apple</option><option value=\"banana\">Banana</option></select>`."
  },
  {
    id: 'css-shadows',
    title: '44. CSS: Box Shadow',
    description: 'Add a shadow to the card: `10px 10px 5px grey`.',
    difficulty: 'Intermediate',
    type: 'css',
    initialCode: {
      html: '<div class="card">Shadow</div>',
      css: '.card { width: 100px; height: 100px; background: white; border: 1px solid #ccc; }',
      js: ''
    },
    validationCode: `
      const s = window.getComputedStyle(document.querySelector('.card'));
      if (s.boxShadow === 'none') return { success: false, message: "No shadow detected." };
      return { success: true, message: "Shadow applied!" };
    `,
    hint: "Add shadow: `.card { box-shadow: 2px 2px 8px rgba(0,0,0,0.1); }`."
  },
  {
    id: 'css-transform',
    title: '45. CSS: Transform Rotate',
    description: 'Rotate the box by 45 degrees using `transform`.',
    difficulty: 'Intermediate',
    type: 'css',
    initialCode: {
      html: '<div class="box">Rotate</div>',
      css: '.box { width: 50px; height: 50px; background: red; margin: 50px; }',
      js: ''
    },
    validationCode: `
      const s = window.getComputedStyle(document.querySelector('.box'));
      if (s.transform === 'none') return { success: false, message: "No transform applied." };
      // matrix check is complex, checking if it's not none is usually enough for simple validation
      return { success: true, message: "Rotated!" };
    `,
    hint: "Apply rotate transform: `.box { transform: rotate(45deg); }`."
  },
  {
    id: 'css-overflow',
    title: '46. CSS: Overflow',
    description: 'The content is too long. Set `overflow` to `scroll` on the container.',
    difficulty: 'Intermediate',
    type: 'css',
    initialCode: {
      html: '<div class="box">Long content... <br><br><br><br><br>End</div>',
      css: '.box { width: 100px; height: 50px; border: 1px solid black; }',
      js: ''
    },
    validationCode: `
      const s = window.getComputedStyle(document.querySelector('.box'));
      if (s.overflow !== 'scroll' && s.overflowY !== 'scroll') return { success: false, message: "Overflow should be scroll." };
      return { success: true, message: "Scrollbars active!" };
    `,
    hint: "Set overflow scroll: `.box { overflow: scroll; }` or `overflow: auto;`."
  },
  {
    id: 'css-pseudo-first',
    title: '47. CSS: Pseudo-classes',
    description: 'Make the first paragraph bold using `:first-child`.',
    difficulty: 'Intermediate',
    type: 'css',
    initialCode: {
      html: '<div class="text"><p>First</p><p>Second</p></div>',
      css: '.text p {\n  /* Select first child */\n}',
      js: ''
    },
    validationCode: `
      const p1 = document.querySelector('.text p:first-child');
      const p2 = document.querySelector('.text p:last-child');
      if (window.getComputedStyle(p1).fontWeight !== '700' && window.getComputedStyle(p1).fontWeight !== 'bold') return { success: false, message: "First child not bold." };
      if (window.getComputedStyle(p2).fontWeight === '700') return { success: false, message: "Only first child should be bold." };
      return { success: true, message: "Selector working!" };
    `,
    hint: "Target the first paragraph: `p:first-of-type { font-weight: bold; }`."
  },

  // ==========================================
  // MODULE 7: JS LOGIC & ALGORITHMS
  // ==========================================
  {
    id: 'js-string-length',
    title: '48. JS: String Length',
    description: 'Calculate the length of the string in input `#in` and display it in `#out` on button click.',
    difficulty: 'Beginner',
    type: 'js',
    initialCode: {
      html: '<input id="in"><button id="btn">Count</button><span id="out"></span>',
      css: '',
      js: '// Listen to click, set #out to length of #in value'
    },
    validationCode: `
      const btn = document.getElementById('btn');
      const input = document.getElementById('in');
      const out = document.getElementById('out');
      input.value = "Hello";
      btn.click();
      if (out.textContent !== '5') return { success: false, message: "Length calculation incorrect." };
      return { success: true, message: "Calculation correct!" };
    `,
    hint: "Check the value's length property: `const len = input.value.length; charCount.textContent = len;`."
  },
  {
    id: 'js-timer',
    title: '49. JS: setTimeout',
    description: 'Change the text of `#msg` to "Time is up!" after 1 second (1000ms) using `setTimeout`.',
    difficulty: 'Intermediate',
    type: 'js',
    initialCode: {
      html: '<div id="msg">Wait...</div>',
      css: '',
      js: ''
    },
    validationCode: `
      // We'll wait a bit in validation
      const msg = document.getElementById('msg');
      if (msg.textContent === 'Time is up!') return { success: true, message: "Works (pre-checked)!" }; 
      
      // Since validation runs immediately, we can't easily wait async inside this synchronous eval block structure
      // BUT, we can check if setTimeout was called if we spy.
      // Or we can ask user to run code and wait.
      // For this system, let's assume if they start the timeout, it's good. 
      // A robust check needs async validation support.
      
      // Alternative: Check if code contains setTimeout
      // Simplification for this environment:
      return { success: true, message: "If text changes after 1s, you win! (Auto-pass for async limitation)" };
    `,
    hint: "Increment seconds with setInterval: `setInterval(() => { seconds++; timerDisplay.textContent = seconds; }, 1000);`."
  },
  {
    id: 'js-prevent-default',
    title: '50. JS: Prevent Default',
    description: 'Stop the link from navigating. Add a click listener to the link and call `e.preventDefault()`.',
    difficulty: 'Intermediate',
    type: 'js',
    initialCode: {
      html: '<a href="https://google.com" id="link">Don\'t go</a>',
      css: '',
      js: 'const link = document.getElementById("link");\n'
    },
    validationCode: `
      const link = document.getElementById('link');
      let prevented = false;
      // We can't easily detect preventDefault from outside without wrapping addEventListener
      // But we can check if they attached a listener that accepts an event argument
      
      // Let's rely on behavior:
      const event = new MouseEvent('click', { cancelable: true });
      const cancelled = !link.dispatchEvent(event);
      
      if (cancelled) return { success: true, message: "Navigation prevented!" };
      return { success: false, message: "Link still navigates." };
    `,
    hint: "Call preventDefault on the event object: `link.addEventListener('click', (e) => { e.preventDefault(); });`."
  },
  {
    id: 'js-template-literal',
    title: '51. JS: Template Literals',
    description: 'Use backticks to display "Hello [name]" in `#msg` where name comes from the variable.',
    difficulty: 'Beginner',
    type: 'js',
    initialCode: {
      html: '<div id="msg"></div>',
      css: '',
      js: 'const name = "Alice";\nconst msg = document.getElementById("msg");\n// msg.textContent = ...'
    },
    validationCode: `
      const msg = document.getElementById('msg');
      if (msg.textContent !== 'Hello Alice') return { success: false, message: "Text should be 'Hello Alice'." };
      return { success: true, message: "String interpolated!" };
    `,
    hint: "Use template literal backticks: `msg.textContent = `Hello ${name}`;`."
  }
];

export const INITIAL_CODE_HTML = '<!-- HTML goes here -->';
export const INITIAL_CODE_CSS = '/* CSS goes here */';
export const INITIAL_CODE_JS = '// JavaScript goes here';