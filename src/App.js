import React, { useState, useEffect, useRef } from 'react';

// --- SVGs for Icons (Inline to keep it single file) ---
const Icons = {
  Github: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
  ),
  Mail: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
  ),
  Code: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
  ),
  ExternalLink: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
  )
};

const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Handle Parallax Effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 20,
        y: (e.clientY / window.innerHeight) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
    setActiveSection(id);
  };

  return (
    <div className="app-container">

      {/* --- Background Elements --- */}
      <div className="blob blob-1" style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }} />
      <div className="blob blob-2" style={{ transform: `translate(${-mousePos.x}px, ${-mousePos.y}px)` }} />
      <div className="blob blob-3" />

      {/* --- Navigation --- */}
      <nav className="nav">
        {['Home', 'Skills', 'Projects', 'Contact'].map((item) => (
          <div 
            key={item}
            className={`nav-link ${activeSection === item.toLowerCase() ? 'active' : ''}`}
            onClick={() => scrollTo(item.toLowerCase())}
          >
            {item}
          </div>
        ))}
      </nav>

      {/* --- Home Section --- */}
      <section id="home">
        <div className="hero-content">
          <div className="avatar-container">
            👨‍💻
          </div>
          <h2 style={{ fontSize: '1.5rem', color: '#94a3b8', marginBottom: '10px' }}>Hi, I'm Riddhi Jain</h2>
          <h1 style={{ fontSize: '4rem', marginBottom: '20px', lineHeight: 1.1 }}>
            Building <span className="gradient-text">Digital Dreams</span>
          </h1>
          <p style={{ fontSize: '1.2rem', marginBottom: '40px' }}>
            <span className="typewriter">Software Developer and AI Enthusiast</span>
          </p>
          <div className="btn" style={{ cursor: 'pointer' }} onClick={() => scrollTo('projects')}>
            View My Work
          </div>
        </div>
      </section>

      {/* --- Skills Section --- */}
      <section id="skills">
        <h2 style={{ fontSize: '2.5rem', marginBottom: '50px' }}>
          My <span className="gradient-text">Superpowers</span>
        </h2>
        <div className="skills-grid">
          {['React', 'JavaScript', 'Node.js', 'AI', 'Data Structures', 'Python', 'Git'].map((skill, index) => (
            <div key={index} className="skill-tag" style={{ animationDelay: `${index * 0.1}s` }}>
              <span>✨</span> {skill}
            </div>
          ))}
        </div>
      </section>

      {/* --- Projects Section --- */}
      <section id="projects">
        <h2 style={{ fontSize: '2.5rem', marginBottom: '50px' }}>
          Recent <span className="gradient-text">Creations</span>
        </h2>
        <div className="projects-grid">
          {[
            { title: "Neon Dashboard", desc: "A crypto analytics dashboard with real-time data.", img: "neon.png", tags: ["React", "D3.js"] },
            { title: "Space Explorer", desc: "3D interactive solar system explorer.", img: "space.png", tags: ["Three.js", "R3F"] },
            { title: "Chat Bubble", desc: "Real-time messaging app with cute stickers.", img: "chat.png", tags: ["Socket.io", "Node"] },
          ].map((project, index) => (
            <div key={index} className="card">
              <div className="project-image"><img src={project.img} alt={project.title} /></div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>{project.title}</h3>
              <p style={{ color: '#94a3b8', marginBottom: '20px' }}>{project.desc}</p>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                {project.tags.map(t => (
                  <span key={t} style={{ fontSize: '0.8rem', padding: '5px 10px', background: 'rgba(255,255,255,0.1)', borderRadius: '5px' }}>{t}</span>
                ))}
              </div>
              <a href="#" className="btn" style={{ width: '100%', justifyContent: 'center' }}>
                <Icons.ExternalLink /> Check it out
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* --- Contact Section --- */}
      <section id="contact">
        <div className="card" style={{ maxWidth: '600px', width: '100%', textAlign: 'center', padding: '60px' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Let's <span className="gradient-text">Connect</span></h2>
          <p style={{ color: '#94a3b8', marginBottom: '40px' }}>
            Got a project in mind? Looking for a new team member? 
            Or just want to chat about anime and code? Hit me up!
          </p>
          
          <a href="mailto:jainriddhi405@gmail.com" className="btn" style={{ fontSize: '1.2rem', padding: '15px 40px' }}>
            <Icons.Mail /> Say Hello
          </a>

          <div className="social-links" style={{ justifyContent: 'center' }}>
            <div className="social-icon"><Icons.Github /></div>
            <div className="social-icon"><Icons.Code /></div>
          </div>
        </div>
        <footer style={{ marginTop: 'auto', padding: '50px 0', color: '#64748b' }}>
          <p>© 2024 Built with ❤️ & React</p>
        </footer>
      </section>
    </div>
  );
};

export default App;