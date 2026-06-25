Below is the component for your context <!DOCTYPE html><html lang="en" class="scroll-smooth"><head>
  <meta charset="utf-8">
  <meta content="width=device-width, initial-scale=1.0" name="viewport">
  <title>Essence — Bespoke Interior Design &amp; Architectural Curation</title>
  <link href="https://fonts.cdnfonts.com/css/neue-haas-grotesk-display-pro" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&amp;display=swap" rel="stylesheet">
   
    <style>
      .animate-on-scroll-hidden { opacity: 0; transform: translateY(30px); transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1); }
      .animate-on-scroll-visible { opacity: 1; transform: translateY(0); }
      @keyframes spin-slow {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      .animate-spin-slow { animation: spin-slow 12s linear infinite; }
    </style>
<style type="text/tailwindcss">@tailwind base;
@tailwind components;
@tailwind utilities;

@font-face {
  font-family: 'neue-haas-grotesk-display-pro';
  src: url('https://fonts.cdnfonts.com/css/neue-haas-grotesk-display-pro') format('woff2');
}

.clinic-hero-text {
  font-size: clamp(2.5rem, 8vw, 84px);
  line-height: 0.95;
  letter-spacing: -0.03em;
}

.clinic-sub-text {
  font-size: clamp(1rem, 2vw, 23.5281px);
  line-height: 1.4;
}

.clinic-btn-label {
  font-size: 18px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.grid-line-v {
  @apply absolute top-0 bottom-0 w-[1px] bg-studio-dark/10 pointer-events-none;
}

.grid-line-h {
  @apply absolute left-0 right-0 h-[1px] bg-studio-dark/10 pointer-events-none;
}

/* Flip Card Utilities */
.perspective-1000 {
  perspective: 1000px;
}

.preserve-3d {
  transform-style: preserve-3d;
}

.backface-hidden {
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.rotate-y-180 {
  transform: rotateY(180deg);
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: #fff;
}
::-webkit-scrollbar-thumb {
  background: rgb(34, 34, 34);
}</style><script src="https://cdn.tailwindcss.com"></script><script>tailwind.config = {
  important: '#app-root',
  theme: {
    extend: {
      colors: {
        'studio-dark': 'rgb(34, 34, 34)',
        'studio-surface': 'rgb(255, 255, 255)',
        'studio-accent': 'rgb(168, 153, 132)',
        'studio-light': 'rgb(249, 248, 246)',
      },
      fontFamily: {
        'primary': ['neue-haas-grotesk-display-pro', 'Arial', 'sans-serif'],
        'serif': ['Playfair Display', 'serif'],
      },
      letterSpacing: {
        'tight-hero': '-0.03em',
        'widest-caps': '0.3em',
      },
      spacing: {
        'grid': '28px',
      }
    }
  }
}</script></head>

<body id="app-root">
  <div class="font-primary bg-studio-surface text-studio-dark overflow-x-hidden min-h-screen flex flex-col w-full relative">
    
    <header id="main-header" class="fixed top-0 left-0 right-0 z-50">
      <nav class="max-w-[1920px] mx-auto px-grid h-[100px] flex items-center justify-between mix-blend-difference relative z-[70]">
        <a href="/" class="text-white font-primary text-2xl tracking-tighter uppercase font-bold" data-editable="text" data-path="header.logo">
          Essence
        </a>

        <div class="flex items-center gap-8">
          <div class="hidden md:flex items-center gap-8 pr-8">
            <a href="#projects" class="text-white font-primary text-xs uppercase tracking-widest-caps hover:opacity-60 transition-opacity">Projects</a>
            <a href="#philosophy" class="text-white font-primary text-xs uppercase tracking-widest-caps hover:opacity-60 transition-opacity">Philosophy</a>
            <a href="#contact" class="text-white font-primary text-xs uppercase tracking-widest-caps hover:opacity-60 transition-opacity">Contact</a>
          </div>
          
          <button id="menu-toggle" class="relative flex flex-col gap-1.5 group cursor-pointer" aria-label="Menu">
            <div id="line-1" class="w-8 h-[1px] bg-white transition-all duration-300"></div>
            <div id="line-2" class="w-8 h-[1px] bg-white transition-all duration-300"></div>
          </button>
        </div>
      </nav>

      <div id="mobile-menu" class="fixed inset-0 bg-studio-dark z-[60] translate-x-full transition-transform duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] flex flex-col p-grid border-l border-white/5">
        <div class="flex-grow flex flex-col justify-center gap-8">
          <a href="#projects" class="text-white font-primary text-6xl md:text-8xl uppercase tracking-tighter hover:opacity-50 transition-all duration-500 menu-link">Projects</a>
          <a href="#philosophy" class="text-white font-primary text-6xl md:text-8xl uppercase tracking-tighter hover:opacity-50 transition-all duration-500 menu-link">Philosophy</a>
          <a href="#contact" class="text-white font-primary text-6xl md:text-8xl uppercase tracking-tighter hover:opacity-50 transition-all duration-500 menu-link">Contact</a>
        </div>
        <div class="flex justify-between items-end pb-8">
          <div class="text-white/40 text-sm uppercase tracking-widest font-primary">© 2024 Essence Atelier</div>
          <div class="flex gap-6">
             <a href="#" class="text-white/60 hover:text-white transition-colors uppercase text-xs tracking-widest">Instagram</a>
             <a href="#" class="text-white/60 hover:text-white transition-colors uppercase text-xs tracking-widest">Journal</a>
          </div>
        </div>
      </div>
    </header>

    <main class="flex-grow"><section id="studio-hero" class="relative w-full h-[100vh] min-h-[800px] select-none overflow-hidden">
  <div class="absolute inset-0 z-20 pointer-events-none">
    <div class="max-w-[1920px] mx-auto h-full relative border-x border-studio-dark/10">
      <div class="grid-line-v left-1/4"></div>
      <div class="grid-line-v left-1/2"></div>
      <div class="grid-line-v left-3/4"></div>
      <div class="grid-line-h top-1/4"></div>
      <div class="grid-line-h top-1/2"></div>
      <div class="grid-line-h top-3/4"></div>
    </div>
  </div>

  <div class="absolute inset-0 z-0">
    <img src="https://images.pexels.com/photos/8082306/pexels-photo-8082306.jpeg?w=1920&amp;h=1080&amp;fit=crop" alt="Essence Studio Vision" class="w-full h-full object-cover">
    <div class="absolute inset-0 bg-black/20"></div>
  </div>

  <div class="relative z-30 w-full h-full mx-auto max-w-[1920px]">
    <div class="relative h-full flex flex-col justify-end p-grid pb-24 md:pb-48">
      <div class="max-w-4xl" data-animation="fade-up">
        <h1 class="clinic-hero-text text-white mix-blend-difference" data-editable="text" data-path="hero.title">
          The Soul of <br><span class="italic font-serif">Space</span>
        </h1>
        <p class="clinic-sub-text text-white/90 mt-8 max-w-xl" data-editable="text" data-path="hero.subtitle">
          Bespoke interior architecture that whispers instead of shouts. We craft environments that harmonize with the nuances of daily life.
        </p>
      </div>

      <div class="flex flex-wrap mt-12 gap-px bg-white/10 backdrop-blur-sm self-start" data-animation="fade-up">
        <a href="#contact" class="px-12 py-8 bg-white text-studio-dark clinic-btn-label hover:bg-studio-dark hover:text-white transition-all duration-500">
          Inquire
        </a>
        <a href="#projects" class="px-12 py-8 bg-studio-dark text-white clinic-btn-label hover:bg-white hover:text-studio-dark transition-all duration-500">
          Portfolios
        </a>
      </div>
    </div>
  </div>
</section>

<!-- Stats/Philosophy -->
<section id="philosophy" class="bg-studio-light border-y border-studio-dark/10 overflow-hidden">
  <div class="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-4 lg:grid-rows-2">
    <!-- Main Motto Block -->
    <div class="lg:col-span-2 lg:row-span-2 p-10 md:p-16 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-studio-dark/10 bg-white" data-animation="fade-up">
      <div>
        <span class="text-xs uppercase tracking-[0.5em] text-studio-accent mb-8 block" data-editable="text" data-path="philosophy.label">Core Ethos</span>
        <h2 class="text-4xl md:text-5xl font-primary tracking-tighter uppercase leading-[0.95]" data-editable="text" data-path="philosophy.heading">
          Silent <br><span class="text-studio-accent">Luxury</span>, <br>Vocal <br><span class="italic font-serif normal-case">Identity.</span>
        </h2>
      </div>
      <div class="mt-16 max-w-sm">
        <p class="text-lg text-studio-dark/70 leading-relaxed italic font-serif" data-editable="text" data-path="philosophy.quote">
          "The most powerful spaces are those that reflect the silent rhythm of the person who occupies them."
        </p>
      </div>
    </div>

    <!-- Stats Grid Items -->
    <div class="p-8 border-b border-studio-dark/10 flex flex-col justify-between bg-studio-light group hover:bg-studio-dark transition-colors duration-700" data-animation="fade-up">
      <span class="text-[10px] uppercase tracking-widest text-studio-accent group-hover:text-white/40">Portfolio</span>
      <div class="mt-4">
        <div class="text-5xl font-bold tracking-tighter group-hover:text-white transition-colors" data-editable="text" data-path="stats.cases.value">400+</div>
        <p class="text-[10px] uppercase tracking-widest mt-2 text-studio-dark/60 group-hover:text-white/60" data-editable="text" data-path="stats.cases.label">Curated Spaces</p>
      </div>
    </div>

    <div class="p-8 border-b border-l-0 lg:border-l border-studio-dark/10 flex flex-col justify-between bg-white group hover:bg-studio-accent transition-colors duration-700" data-animation="fade-up">
      <span class="text-[10px] uppercase tracking-widest text-studio-accent group-hover:text-white/40">Heritage</span>
      <div class="mt-4">
        <div class="text-5xl font-bold tracking-tighter group-hover:text-white transition-colors" data-editable="text" data-path="stats.years.value">12</div>
        <p class="text-[10px] uppercase tracking-widest mt-2 text-studio-dark/60 group-hover:text-white/60" data-editable="text" data-path="stats.years.label">Global Locations</p>
      </div>
    </div>

    <!-- The Approach Block -->
    <div class="lg:col-span-2 p-10 md:p-16 flex flex-col md:flex-row gap-10 items-center bg-studio-light border-t lg:border-t-0 border-studio-dark/10" data-animation="fade-up">
       <div class="flex-grow space-y-6">
          <h3 class="text-3xl uppercase tracking-tighter" data-editable="text" data-path="philosophy.standard.title">The Atelier Method</h3>
          <p class="text-studio-dark/70 leading-relaxed max-w-lg" data-editable="text" data-path="philosophy.standard.text">Our design process begins with a sensory audit of your environment, analyzing light trajectories, acoustic resonance, and the tactile flow of materials.</p>
          <div class="flex gap-4">
            <div class="w-12 h-px bg-studio-dark mt-3"></div>
            <span class="text-xs uppercase tracking-widest" data-editable="text" data-path="philosophy.standard.sub">Architectural Precision</span>
          </div>
       </div>
       <!-- Rotating Seal Badge -->
       <div class="shrink-0 w-32 h-32 rounded-full border border-studio-dark/10 flex items-center justify-center animate-spin-slow">
          <svg class="w-24 h-24 text-studio-accent" viewBox="0 0 100 100">
            <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="none"></path>
            <text class="text-[7.5px] uppercase tracking-[2px] fill-current font-bold">
              <textPath href="#circlePath">Atelier • Essence • Curation • Atelier • Essence • Curation •</textPath>
            </text>
          </svg>
       </div>
    </div>
  </div>
</section>

<!-- Projects/Disciplines Grid -->
<section id="projects" class="py-32 bg-white">
  <div class="max-w-[1920px] mx-auto px-grid">
    <div class="flex flex-col md:flex-row justify-between items-baseline mb-20" data-animation="fade-up">
      <h2 class="text-4xl md:text-6xl font-primary font-bold uppercase tracking-tighter">Portfolios</h2>
      <p class="text-xs uppercase tracking-[0.4em] text-studio-dark/40 font-bold mt-4 md:mt-0">Structural Integrity meets Visual Poetry</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- Project 1: Dark Variant -->
      <article class="group h-[600px] perspective-1000" data-animation="fade-up">
        <div class="relative w-full h-full transition-transform duration-[800ms] preserve-3d group-hover:rotate-y-180">
          <!-- Front Face -->
          <div class="absolute inset-0 backface-hidden bg-studio-dark text-white p-12 flex flex-col items-center text-center border border-studio-dark">
            <span class="text-xs font-bold tracking-widest text-studio-accent mb-12 block uppercase">Series 01</span>
            <div class="mb-12 relative">
              <div class="w-56 h-56 overflow-hidden rounded-full border-4 border-white/10">
                <img src="https://images.pexels.com/photos/13722871/pexels-photo-13722871.jpeg?w=600&amp;h=600&amp;fit=crop" alt="Private Residencies" class="w-full h-full object-cover grayscale brightness-125">
              </div>
            </div>
            <h3 class="text-4xl font-primary font-bold uppercase tracking-tighter">Private<br>Residencies</h3>
          </div>
          <!-- Back Face -->
          <div class="absolute inset-0 backface-hidden rotate-y-180 bg-studio-accent text-white p-12 flex flex-col items-center justify-center text-center border border-studio-accent">
            <h3 class="text-3xl font-primary font-bold uppercase tracking-tighter mb-8">Sanctuary Design</h3>
            <p class="text-white/80 text-base leading-relaxed max-w-[280px] mb-12">Bespoke home environments that prioritize privacy, natural light optimization, and custom material palettes tailored to the owner's lifestyle.</p>
            <a href="#contact" class="inline-block border-b-2 border-white pb-1 text-xs uppercase tracking-[0.3em] font-bold hover:opacity-70 transition-opacity">View Portfolio</a>
          </div>
        </div>
      </article>

      <!-- Project 2: Accent Variant -->
      <article class="group h-[600px] perspective-1000" data-animation="fade-up">
        <div class="relative w-full h-full transition-transform duration-[800ms] preserve-3d group-hover:rotate-y-180">
          <!-- Front Face -->
          <div class="absolute inset-0 backface-hidden bg-studio-accent text-white p-12 flex flex-col items-center text-center border border-studio-accent">
            <span class="text-xs font-bold tracking-widest text-white/60 mb-12 block uppercase">Series 02</span>
            <div class="mb-12 relative">
              <div class="w-56 h-56 overflow-hidden rounded-full border-4 border-white/20">
                <img src="https://images.pexels.com/photos/27562793/pexels-photo-27562793.png?w=600&amp;h=600&amp;fit=crop" alt="Commercial Spaces" class="w-full h-full object-cover grayscale">
              </div>
            </div>
            <h3 class="text-4xl font-primary font-bold uppercase tracking-tighter">Atmospheric<br>Retail</h3>
          </div>
          <!-- Back Face -->
          <div class="absolute inset-0 backface-hidden rotate-y-180 bg-studio-dark text-white p-12 flex flex-col items-center justify-center text-center border border-studio-dark">
            <h3 class="text-3xl font-primary font-bold uppercase tracking-tighter mb-8">Brand Narratives</h3>
            <p class="text-white/60 text-base leading-relaxed max-w-[280px] mb-12">Translating brand identity into three-dimensional experiences, focusing on customer journey and sensory engagement.</p>
            <a href="#contact" class="inline-block border-b-2 border-studio-accent pb-1 text-xs uppercase tracking-[0.3em] font-bold hover:text-studio-accent transition-colors">View Portfolio</a>
          </div>
        </div>
      </article>

      <!-- Project 3: Light Variant -->
      <article class="group h-[600px] perspective-1000" data-animation="fade-up">
        <div class="relative w-full h-full transition-transform duration-[800ms] preserve-3d group-hover:rotate-y-180">
          <!-- Front Face -->
          <div class="absolute inset-0 backface-hidden bg-studio-light border border-studio-dark/10 text-studio-dark p-12 flex flex-col items-center text-center">
            <span class="text-xs font-bold tracking-widest text-studio-accent mb-12 block uppercase">Series 03</span>
            <div class="mb-12 relative">
              <div class="w-56 h-56 overflow-hidden rounded-full border-4 border-white">
                <img src="https://images.pexels.com/photos/3104526/pexels-photo-3104526.jpeg?w=600&amp;h=600&amp;fit=crop" alt="Bespoke Objects" class="w-full h-full object-cover grayscale contrast-125">
              </div>
            </div>
            <h3 class="text-4xl font-primary font-bold uppercase tracking-tighter">Bespoke<br>Objects</h3>
          </div>
          <!-- Back Face -->
          <div class="absolute inset-0 backface-hidden rotate-y-180 bg-white border border-studio-dark/10 text-studio-dark p-12 flex flex-col items-center justify-center text-center">
            <h3 class="text-3xl font-primary font-bold uppercase tracking-tighter mb-8">Curated Details</h3>
            <p class="text-studio-dark/60 text-base leading-relaxed max-w-[280px] mb-12">Limited edition furniture, lighting, and textural installations designed exclusively for Essence projects.</p>
            <a href="#contact" class="inline-block border-b-2 border-studio-dark pb-1 text-xs uppercase tracking-[0.3em] font-bold hover:text-studio-accent transition-colors">View Portfolio</a>
          </div>
        </div>
      </article>
    </div>
  </div>
</section>

<!-- Ethos Section -->
<section id="about" class="py-32 bg-studio-light">
  <div class="max-w-[1920px] mx-auto px-grid">
    
    <!-- Section Header -->
    <div class="text-center mb-24" data-animation="fade-up">
      <h2 class="text-5xl md:text-8xl font-primary font-bold uppercase tracking-tighter leading-[0.95] mb-6">
        The <span class="italic font-serif text-studio-accent lowercase">Ethos</span>
      </h2>
      <p class="text-xs uppercase tracking-[0.5em] text-studio-dark/40 font-bold">The Foundation of Spatial Artistry</p>
    </div>

    <!-- Main Highlight: Core Philosophy -->
    <div class="grid grid-cols-1 gap-8 mb-8">
      <article class="group" data-animation="fade-up">
        <div class="bg-studio-dark text-white flex flex-col lg:flex-row items-center justify-between p-12 md:p-20 min-h-[500px] transition-transform duration-500 hover:-translate-y-2">
          <div class="lg:w-1/2 text-left">
            <span class="uppercase tracking-widest mb-6 block text-studio-accent text-sm font-bold">Core Belief</span>
            <h3 class="text-4xl md:text-6xl font-primary font-bold uppercase tracking-tighter mb-8 leading-none">Restraint Over <br><span class="italic font-serif text-studio-accent lowercase">Excess</span></h3>
            <p class="text-lg md:text-xl text-white/70 max-w-lg leading-relaxed">We believe that a space is defined as much by what is left out as by what is put in. Our design language is rooted in European minimalism and architectural honesty.</p>
            <div class="mt-12 inline-block border-b-2 border-studio-accent pb-2 font-bold uppercase tracking-widest text-xs hover:text-studio-accent transition-colors cursor-pointer">Our Methodology</div>
          </div>
          <div class="lg:w-1/3 mt-12 lg:mt-0 aspect-square overflow-hidden rounded-full border-8 border-white/5 group-hover:scale-105 transition-transform duration-700">
            <img src="https://images.pexels.com/photos/8837715/pexels-photo-8837715.jpeg?w=800&amp;h=800&amp;fit=crop" alt="Restraint Ethos" class="w-full h-full object-cover grayscale brightness-110">
          </div>
        </div>
      </article>
    </div>

    <!-- Secondary Grid: Heritage & Science -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- The Studio (Heritage) -->
      <article class="group" data-animation="fade-up">
        <div class="bg-studio-accent text-white flex flex-col items-center justify-center p-12 text-center min-h-[550px] transition-transform duration-500 hover:-translate-y-2">
          <div class="mb-8">
            <h3 class="text-3xl md:text-4xl font-primary font-bold uppercase tracking-tighter">The London Studio</h3>
          </div>
          <div class="w-64 h-64 md:w-80 md:h-80 overflow-hidden rounded-full mb-10 relative border-4 border-white/20">
            <img src="https://images.pexels.com/photos/8842336/pexels-photo-8842336.jpeg?w=600&amp;h=600&amp;fit=crop" alt="Essence Studio" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 grayscale">
          </div>
          <p class="text-lg md:text-xl max-w-sm leading-relaxed text-white/90">A laboratory of ideas where architects, designers, and artisans collaborate to push the boundaries of spatial design.</p>
        </div>
      </article>

      <!-- Digital Precision (Science) -->
      <article class="group" data-animation="fade-up">
        <div class="bg-white border border-studio-dark/10 text-studio-dark flex flex-col items-center justify-center p-12 text-center min-h-[550px] transition-transform duration-500 hover:-translate-y-2">
          <div class="mb-8">
            <h3 class="text-3xl md:text-4xl font-primary font-bold uppercase tracking-tighter">Spatial Dynamics</h3>
          </div>
          <div class="w-64 h-64 md:w-80 md:h-80 overflow-hidden rounded-full mb-10 relative border-4 border-studio-light">
            <img src="https://images.pexels.com/photos/18069160/pexels-photo-18069160.png?w=600&amp;h=600&amp;fit=crop" alt="Spatial Science" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 grayscale opacity-80 group-hover:opacity-100">
          </div>
          <p class="text-lg md:text-xl max-w-sm leading-relaxed text-studio-dark/70">Utilizing advanced light-mapping and 3D acoustics to ensure your space performs as beautifully as it looks.</p>
        </div>
      </article>
    </div>

  </div>
</section>

<!-- Booking Section -->
<section id="contact" class="py-32 bg-white">
  <div class="max-w-[1920px] mx-auto px-grid">
    <div class="grid grid-cols-1 lg:grid-cols-2 border border-studio-dark">
      <div class="p-12 md:p-24 bg-studio-light border-b lg:border-b-0 lg:border-r border-studio-dark">
        <h2 class="text-5xl font-primary uppercase tracking-tighter mb-8">Begin Your<br>Narrative</h2>
        <p class="text-studio-dark/60 mb-12 max-w-md">Inquire about our design services or schedule a studio visit. Let's discuss the vision for your next project.</p>
        
        <form class="space-y-8" id="booking-form">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="relative">
              <input type="text" id="name" class="w-full bg-transparent border-b border-studio-dark/30 py-4 focus:outline-none focus:border-studio-dark transition-colors peer placeholder-transparent" placeholder="Name">
              <label for="name" class="absolute left-0 top-0 text-xs uppercase tracking-widest text-studio-dark/40 peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:top-0 peer-focus:text-xs transition-all pointer-events-none">Full Name</label>
            </div>
            <div class="relative">
              <input type="email" id="email" class="w-full bg-transparent border-b border-studio-dark/30 py-4 focus:outline-none focus:border-studio-dark transition-colors peer placeholder-transparent" placeholder="Email">
              <label for="email" class="absolute left-0 top-0 text-xs uppercase tracking-widest text-studio-dark/40 peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:top-0 peer-focus:text-xs transition-all pointer-events-none">Email Address</label>
            </div>
          </div>
          <div class="relative">
            <select class="w-full bg-transparent border-b border-studio-dark/30 py-4 focus:outline-none focus:border-studio-dark transition-colors appearance-none text-studio-dark/60 uppercase text-xs tracking-widest">
              <option>Project Type</option>
              <option>Residential Architecture</option>
              <option>Commercial/Retail</option>
              <option>Bespoke Furniture</option>
              <option>Full Renovation</option>
            </select>
          </div>
          <button type="submit" class="w-full py-6 bg-studio-dark text-white uppercase tracking-[0.3em] font-bold hover:bg-studio-accent transition-colors duration-500" data-pixel-form-submit="true" data-pixel-form-id="l7m1u">
            Send Inquiry
          </button>
        </form>
      </div>
      
      <div class="relative min-h-[500px]">
        <img src="https://images.pexels.com/photos/4977439/pexels-photo-4977439.jpeg?w=1000&amp;h=1200&amp;fit=crop" alt="Studio Materials" class="absolute inset-0 w-full h-full object-cover">
        <div class="absolute inset-0 bg-studio-dark/10"></div>
        <div class="absolute bottom-12 right-12 text-right text-white">
          <div class="text-4xl font-serif italic mb-2">Essence Atelier</div>
          <p class="uppercase tracking-widest text-sm opacity-80">42 Bruton Place, W1J 6PA</p>
        </div>
      </div>
    </div>
  </div>
</section>

<script>
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('booking-form');
  if(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button');
      const originalText = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;
      
      setTimeout(() => {
        btn.textContent = 'Inquiry Received';
        btn.classList.replace('bg-studio-dark', 'bg-green-800');
        form.reset();
      }, 1500);
    });
  }
});
</script></main>

    <footer class="bg-studio-dark text-white py-24 px-grid">
      <div class="max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div class="space-y-6">
          <div class="text-3xl font-bold tracking-tighter uppercase">Essence</div>
          <p class="text-white/60 max-w-xs">Designing spatial narratives that balance architectural integrity with human emotion.</p>
        </div>
        <div class="space-y-4">
          <h4 class="uppercase tracking-widest text-sm text-white/40">Expertise</h4>
          <ul class="space-y-2">
            <li><a href="#" class="hover:text-studio-accent transition-colors">Residential Architecture</a></li>
            <li><a href="#" class="hover:text-studio-accent transition-colors">Bespoke Furniture</a></li>
            <li><a href="#" class="hover:text-studio-accent transition-colors">Atmospheric Lighting</a></li>
            <li><a href="#" class="hover:text-studio-accent transition-colors">Art Curation</a></li>
          </ul>
        </div>
        <div class="space-y-4">
          <h4 class="uppercase tracking-widest text-sm text-white/40">Studio</h4>
          <p class="text-white/60">42 Bruton Place<br>Mayfair, London<br>W1J 6PA</p>
        </div>
        <div class="space-y-4">
          <h4 class="uppercase tracking-widest text-sm text-white/40">Connect</h4>
          <div class="flex gap-4">
            <a href="#" class="hover:text-studio-accent transition-colors italic font-serif">Instagram</a>
            <a href="#" class="hover:text-studio-accent transition-colors italic font-serif">Journal</a>
          </div>
          <p class="text-white/60">studio@essence-atelier.com</p>
        </div>
      </div>
      <div class="max-w-[1920px] mx-auto mt-24 pt-8 border-t border-white/10 flex justify-between text-xs uppercase tracking-widest text-white/40">
        <span>Terms &amp; Privacy</span>
        <span>© 2024 Essence Design Studio</span>
      </div>
    </footer>

  </div>

  <script>
    document.addEventListener('DOMContentLoaded', () => {
      // Menu Logic
      const menuToggle = document.getElementById('menu-toggle');
      const mobileMenu = document.getElementById('mobile-menu');
      const line1 = document.getElementById('line-1');
      const line2 = document.getElementById('line-2');
      const menuLinks = document.querySelectorAll('.menu-link');
      
      let isOpen = false;

      const toggleMenu = () => {
        isOpen = !isOpen;
        if (isOpen) {
          mobileMenu.classList.remove('translate-x-full');
          line1.style.transform = 'translateY(4px) rotate(45deg)';
          line2.style.transform = 'translateY(-4px) rotate(-45deg)';
          document.body.style.overflow = 'hidden';
        } else {
          mobileMenu.classList.add('translate-x-full');
          line1.style.transform = 'none';
          line2.style.transform = 'none';
          document.body.style.overflow = '';
        }
      };

      menuToggle.addEventListener('click', toggleMenu);
      menuLinks.forEach(link => link.addEventListener('click', toggleMenu));

      // Scroll Observer
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-on-scroll-visible');
          }
        });
      }, { threshold: 0.1 });

      document.querySelectorAll('[data-animation="fade-up"]').forEach(el => {
        el.classList.add('animate-on-scroll-hidden');
        observer.observe(el);
      });
    });
  </script>


    <script id="lh-website-form-handler" data-lh-form-handler="true">
    (function() {
      if (window.__lhWebsiteFormHandlerInitialized) return;
      window.__lhWebsiteFormHandlerInitialized = true;

      var PROJECT_ID = "4aXg1UuItkSpGWOhurjz";
      var DEFAULT_SUCCESS_MESSAGE = 'Thanks. Your message has been sent.';
      var DEFAULT_ERROR_MESSAGE = 'Could not submit the form. Please try again.';

      function isLocalHostname(hostname) {
        var normalized = String(hostname || '').trim().toLowerCase();
        return normalized === 'localhost' || normalized === '127.0.0.1';
      }

      function readHostnameFromUrl(url) {
        if (!url) return '';

        try {
          return String(new URL(url).hostname || '').trim().toLowerCase();
        } catch (_) {
          return '';
        }
      }

      function detectApiBaseUrl() {
        try {
          var hostname = window.location.hostname || '';
          if (isLocalHostname(hostname)) {
            return 'http://localhost:8080/api';
          }
        } catch (_) {}

        try {
          var baseHostname = readHostnameFromUrl(document.baseURI || '');
          if (isLocalHostname(baseHostname)) {
            return 'http://localhost:8080/api';
          }
        } catch (_) {}

        try {
          var parentHostname =
            window.parent && window.parent !== window && window.parent.location
              ? String(window.parent.location.hostname || '').trim().toLowerCase()
              : '';
          if (isLocalHostname(parentHostname)) {
            return 'http://localhost:8080/api';
          }
        } catch (_) {}

        return 'https://api.landinghero.ai/api';
      }

      var API_BASE_URL = detectApiBaseUrl();

      function getFeedbackNode(form) {
        var feedback = form.nextElementSibling;
        if (
          feedback &&
          feedback.nodeType === 1 &&
          feedback.getAttribute('data-lh-form-feedback') === 'true'
        ) {
          return feedback;
        }

        feedback = document.createElement('div');
        feedback.setAttribute('data-lh-form-feedback', 'true');
        feedback.setAttribute('aria-live', 'polite');
        feedback.style.marginTop = '12px';
        feedback.style.padding = '12px 14px';
        feedback.style.borderRadius = '10px';
        feedback.style.fontSize = '14px';
        feedback.style.lineHeight = '1.5';
        feedback.style.display = 'none';
        form.insertAdjacentElement('afterend', feedback);
        return feedback;
      }

      function setFeedback(form, kind, message) {
        var feedback = getFeedbackNode(form);
        feedback.textContent = message || '';
        feedback.style.display = message ? 'block' : 'none';
        feedback.style.border = kind === 'success'
          ? '1px solid rgba(16, 185, 129, 0.25)'
          : '1px solid rgba(239, 68, 68, 0.25)';
        feedback.style.background = kind === 'success'
          ? 'rgba(16, 185, 129, 0.08)'
          : 'rgba(239, 68, 68, 0.08)';
        feedback.style.color = kind === 'success' ? '#065f46' : '#991b1b';
      }

      function isElementVisible(element) {
        if (!element) return false;
        if (element.type === 'hidden') return false;

        try {
          var style = window.getComputedStyle(element);
          if (
            style.display === 'none' ||
            style.visibility === 'hidden' ||
            Number(style.opacity || '1') === 0
          ) {
            return false;
          }
        } catch (_) {}

        if (typeof element.getClientRects === 'function') {
          return element.getClientRects().length > 0;
        }

        return true;
      }

      function getFieldLabel(form, element) {
        var ariaLabel = String(element.getAttribute('aria-label') || '').trim();
        if (ariaLabel) return ariaLabel;

        var labels = element.labels;
        if (labels && labels.length > 0) {
          var joined = Array.prototype.map.call(labels, function(label) {
            return String(label.textContent || '').trim();
          }).filter(Boolean).join(' ');
          if (joined) return joined;
        }

        var id = String(element.id || '').trim();
        if (id) {
          try {
            var escapedId =
              typeof CSS !== 'undefined' && typeof CSS.escape === 'function'
                ? CSS.escape(id)
                : id.replace(/"/g, '\"');
            var explicitLabel = form.querySelector('label[for="' + escapedId + '"]');
            if (explicitLabel) {
              var explicitText = String(explicitLabel.textContent || '').trim();
              if (explicitText) return explicitText;
            }
          } catch (_) {}
        }

        var parentLabel = typeof element.closest === 'function'
          ? element.closest('label')
          : null;
        if (parentLabel) {
          var parentText = String(parentLabel.textContent || '').trim();
          if (parentText) return parentText;
        }

        var parentElement = element.parentElement;
        if (parentElement) {
          var siblingLabel = parentElement.querySelector('label');
          if (siblingLabel) {
            var siblingLabelText = String(siblingLabel.textContent || '').trim();
            if (siblingLabelText) return siblingLabelText;
          }
        }

        var previousSibling = element.previousElementSibling;
        while (previousSibling) {
          if (String(previousSibling.tagName || '').toLowerCase() === 'label') {
            var previousSiblingText = String(previousSibling.textContent || '').trim();
            if (previousSiblingText) return previousSiblingText;
          }
          previousSibling = previousSibling.previousElementSibling;
        }

        var placeholder = String(element.getAttribute('placeholder') || '').trim();
        if (placeholder) return placeholder;

        return String(element.name || element.id || element.type || 'field').trim();
      }

      function addDataValue(data, name, value) {
        if (!name) return;

        if (Object.prototype.hasOwnProperty.call(data, name)) {
          if (Array.isArray(data[name])) {
            data[name].push(value);
          } else {
            data[name] = [data[name], value];
          }
          return;
        }

        data[name] = value;
      }

      function normalizeFieldType(element) {
        var tagName = String(element.tagName || '').toLowerCase();
        if (tagName === 'textarea') return 'textarea';
        if (tagName === 'select') return 'select';
        return String(element.type || tagName || 'text').toLowerCase();
      }

      function getFieldValue(element) {
        var type = normalizeFieldType(element);

        if (type === 'checkbox' || type === 'radio') {
          return element.checked ? 'true' : '';
        }

        if (type === 'file') {
          if (!element.files || !element.files.length) return '';
          return Array.prototype.map.call(element.files, function(file) {
            return file && file.name ? file.name : '';
          }).filter(Boolean).join(', ');
        }

        if (element.tagName && String(element.tagName).toLowerCase() === 'select' && element.multiple) {
          return Array.prototype.map.call(element.selectedOptions || [], function(option) {
            return option && option.value ? option.value : '';
          }).filter(Boolean).join(', ');
        }

        return String(element.value || '').trim();
      }

      function collectFormPayload(form) {
        var fields = [];
        var data = {};
        var elements = form.querySelectorAll('input, textarea, select');

        Array.prototype.forEach.call(elements, function(element, index) {
          if (!element || element.disabled) return;
          if (!isElementVisible(element)) return;

          var type = normalizeFieldType(element);
          if (
            type === 'submit' ||
            type === 'button' ||
            type === 'reset' ||
            type === 'image'
          ) {
            return;
          }

          if ((type === 'checkbox' || type === 'radio') && !element.checked) {
            return;
          }

          var value = getFieldValue(element);
          if (!value) return;

          var name = String(element.name || element.id || ('field_' + index)).trim();
          if (!name) return;

          fields.push({
            name: name,
            label: getFieldLabel(form, element),
            type: type,
            value: value
          });
          addDataValue(data, name, value);
        });

        return { fields: fields, data: data };
      }

      function getPageUrl() {
        try {
          if (window.location.href && window.location.href !== 'about:srcdoc') {
            return window.location.href;
          }
        } catch (_) {}

        try {
          return String(document.baseURI || '').trim();
        } catch (_) {
          return '';
        }
      }

      function setSubmittingState(form, isSubmitting) {
        var submitControls = form.querySelectorAll(
          'button[type="submit"], input[type="submit"], input[type="image"], [data-pixel-form-submit="true"]'
        );

        Array.prototype.forEach.call(submitControls, function(control) {
          if (!(control instanceof HTMLElement)) return;

          if (isSubmitting) {
            if (!control.hasAttribute('data-lh-original-disabled')) {
              control.setAttribute(
                'data-lh-original-disabled',
                control.hasAttribute('disabled') ? 'true' : 'false'
              );
            }
            control.setAttribute('disabled', 'disabled');
          } else if (control.getAttribute('data-lh-original-disabled') === 'false') {
            control.removeAttribute('disabled');
          }

          if (control.tagName.toLowerCase() === 'button') {
            if (isSubmitting) {
              if (!control.hasAttribute('data-lh-original-label')) {
                control.setAttribute(
                  'data-lh-original-label',
                  String(control.textContent || '')
                );
              }
              control.textContent = 'Sending...';
            } else if (control.hasAttribute('data-lh-original-label')) {
              control.textContent = control.getAttribute('data-lh-original-label') || '';
              control.removeAttribute('data-lh-original-label');
            }
          } else if (control.tagName.toLowerCase() === 'input') {
            if (isSubmitting) {
              if (!control.hasAttribute('data-lh-original-label')) {
                control.setAttribute(
                  'data-lh-original-label',
                  String(control.getAttribute('value') || '')
                );
              }
              control.setAttribute('value', 'Sending...');
            } else if (control.hasAttribute('data-lh-original-label')) {
              control.setAttribute(
                'value',
                control.getAttribute('data-lh-original-label') || ''
              );
              control.removeAttribute('data-lh-original-label');
            }
          }

          if (!isSubmitting) {
            control.removeAttribute('data-lh-original-disabled');
          }
        });
      }

      async function handleLandingHeroSubmit(payload) {
        return fetch(API_BASE_URL + '/projects/forms/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });
      }

      async function handleWebhookSubmit(url, payload) {
        return fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });
      }

      document.addEventListener('submit', async function(event) {
        var form = event.target;
        if (!(form instanceof HTMLFormElement)) return;
        if (!PROJECT_ID) return;
        if (form.__lhFormSubmitting) return;

        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();

        var payload = collectFormPayload(form);
        if (!payload.fields.length) {
          setFeedback(form, 'error', 'Please complete the form before submitting.');
          return;
        }

        form.__lhFormSubmitting = true;
        setSubmittingState(form, true);
        setFeedback(form, 'success', '');

        var mode = String(form.getAttribute('data-lh-form-mode') || 'landinghero')
          .trim()
          .toLowerCase() === 'webhook'
          ? 'webhook'
          : 'landinghero';

        var requestPayload = {
          project_id: PROJECT_ID,
          projectId: PROJECT_ID,
          submittedAt: new Date().toISOString(),
          pageUrl: getPageUrl(),
          form: {
            pixelId: String(form.getAttribute('data-pixel-id') || '').trim()
          },
          fields: payload.fields,
          data: payload.data
        };

        try {
          var response;

          if (mode === 'webhook') {
            var webhookUrl = String(form.getAttribute('data-lh-form-webhook-url') || '').trim();
            if (!webhookUrl) {
              throw new Error('Webhook URL is not configured for this form.');
            }
            response = await handleWebhookSubmit(webhookUrl, requestPayload);
          } else {
            requestPayload.recipientEmail = String(
              form.getAttribute('data-lh-form-recipient-email') || ''
            ).trim();
            response = await handleLandingHeroSubmit(requestPayload);
          }

          if (!response.ok) {
            var errorMessage = DEFAULT_ERROR_MESSAGE;
            try {
              var errorBody = await response.json();
              if (errorBody && errorBody.error) {
                errorMessage = String(errorBody.error);
              }
            } catch (_) {}
            throw new Error(errorMessage);
          }

          setFeedback(form, 'success', DEFAULT_SUCCESS_MESSAGE);
          form.reset();
        } catch (error) {
          setFeedback(
            form,
            'error',
            error && error.message ? error.message : DEFAULT_ERROR_MESSAGE
          );
        } finally {
          form.__lhFormSubmitting = false;
          setSubmittingState(form, false);
        }
      }, true);
    })();
  </script>
</body></html>