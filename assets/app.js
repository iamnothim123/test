// Simple SPA: hash-based router + dark mode + form handling
(function(){
  const app = document.getElementById('app');
  const navLinks = document.querySelectorAll('[data-link]');
  const themeBtn = document.getElementById('themeToggle');
  const yearEl = document.getElementById('year');

  // --- Dark / light theme ---
  const savedTheme = localStorage.getItem('theme');
  if(savedTheme === 'light'){ document.documentElement.classList.add('light'); }
  themeBtn.addEventListener('click', () => {
    document.documentElement.classList.toggle('light');
    localStorage.setItem('theme', document.documentElement.classList.contains('light') ? 'light' : 'dark');
  });

  // --- Active link highlight ---
  function updateActiveLink(route){
    navLinks.forEach(a => {
      const href = a.getAttribute('href');
      const isActive = href === '#/' + (route || '');
      a.setAttribute('aria-current', isActive ? 'page' : 'false');
    });
  }

  // --- Views ---
  const views = {
    "": () => `
      <section class="grid">
        <div class="col-12 card hero">
          <div>
            <h1>Build fast. Launch faster.</h1>
            <p>A minimal single-page app you can run from a ZIP. No build step, no tooling—just open <span class="kbd">index.html</span>.</p>
            <div class="cta">
              <a class="button" href="#/about">Learn more</a>
              <a class="button ghost" href="#/contact">Contact us</a>
            </div>
          </div>
          <div class="card">
            <p><strong>Quick tips</strong></p>
            <ul>
              <li>Use the moon/sun button to toggle dark mode.</li>
              <li>Edit <span class="kbd">assets/app.js</span> and <span class="kbd">assets/style.css</span>.</li>
              <li>Deploy by dropping the folder into any static host.</li>
            </ul>
          </div>
        </div>
        <div class="col-4 card">
          <h3>Zero build</h3>
          <p>Pure HTML/CSS/JS. Works locally by opening the file. Great for quick demos.</p>
        </div>
        <div class="col-4 card">
          <h3>Accessible</h3>
          <p>Semantic markup, focus management, and keyboard-friendly navigation.</p>
        </div>
        <div class="col-4 card">
          <h3>Customizable</h3>
          <p>Change colors in <span class="kbd">:root</span> variables and extend components easily.</p>
        </div>
      </section>
    `,

    "about": () => `
      <section class="grid">
        <div class="col-12 card">
          <h2>About</h2>
          <p>This starter uses a tiny hash router and keeps state in <span class="kbd">localStorage</span>. It is intentionally simple—no frameworks required—but you can swap it for React/Vue later.</p>
          <p>Why hash routing? It works from the local file system without a dev server.</p>
        </div>
        <div class="col-6 card">
          <h3>Features</h3>
          <ul>
            <li>Dark/light theme toggle</li>
            <li>Hash-based router</li>
            <li>Form validation example</li>
          </ul>
        </div>
        <div class="col-6 card">
          <h3>How to extend</h3>
          <ol>
            <li>Add a new route by updating the <span class="kbd">views</span> object.</li>
            <li>Attach behaviors in <span class="kbd">afterRender()</span>.</li>
            <li>Style new components in <span class="kbd">assets/style.css</span>.</li>
          </ol>
        </div>
      </section>
    `,

    "contact": () => `
      <section class="grid">
        <div class="col-12 card">
          <h2>Contact</h2>
          <p>Send us a note. This form validates inputs and simulates a submission.</p>
          <form id="contactForm" novalidate>
            <div class="form-row">
              <label for="name">Name</label>
              <input id="name" name="name" required minlength="2" placeholder="Your name" />
            </div>
            <div class="form-row">
              <label for="email">Email</label>
              <input id="email" name="email" type="email" required placeholder="you@example.com" />
              <small class="helper">We'll never share your email.</small>
            </div>
            <div class="form-row">
              <label for="message">Message</label>
              <textarea id="message" name="message" required minlength="10" rows="5" placeholder="How can we help?"></textarea>
            </div>
            <button class="button" type="submit">Send message</button>
            <div id="formAlert" class="alert" style="display:none; margin-top:12px"></div>
          </form>
        </div>
      </section>
    `
  };

  // --- Router ---
  function render(){
    const route = (location.hash.replace(/^#\//, '') || '');
    updateActiveLink(route);
    app.innerHTML = (views[route] || views[""])();
    afterRender(route);
    // move focus for accessibility
    app.focus();
  }

  // --- Page-specific behaviors ---
  function afterRender(route){
    if(route === 'contact'){
      const form = document.getElementById('contactForm');
      const alert = document.getElementById('formAlert');
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(form).entries());
        const errors = [];
        if(!data.name || data.name.trim().length < 2) errors.push("Name must be at least 2 characters.");
        if(!/^\S+@\S+\.\S+$/.test(data.email || '')) errors.push("Please enter a valid email address.");
        if(!data.message || data.message.trim().length < 10) errors.push("Message must be at least 10 characters.");

        if(errors.length){
          alert.style.display = 'block';
          alert.textContent = "Fix the following: " + errors.join(' ');
          return;
        }
        // Simulate success
        alert.style.display = 'block';
        alert.textContent = "Thanks! Your message was sent (simulated).";
        form.reset();
      });
    }
  }

  // Footer year
  yearEl.textContent = new Date().getFullYear();

  window.addEventListener('hashchange', render);
  window.addEventListener('DOMContentLoaded', render);
})();