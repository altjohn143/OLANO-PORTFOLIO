import { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import './project-cards.css'
import './animations.css'
import './loading.css'
import './showcase.css'
import './theme.css'
import './document-modal.css'
import './brand.css'
import './enhancements.css'
import './navigation.css'
import './responsive.css'
import vimsImage from './assets/vims.png'
import claraCareImage from './assets/claracare.png'
import hungryNookImage from './assets/hungry-nook.png'
import cloveCollectiveImage from './assets/clove-collective.png'
import ecommerceImage from './assets/ecommerce-olano.png'
import showcaseImage from './assets/showcase-gallery.png'
import weatherImage from './assets/weather-app.png'
import profileImage from './assets/john-matthew-olano.png'
import resumePreview from './assets/resume-preview.png'
import cvPreview from './assets/cv-preview.png'

const resumeDocument = { title: 'John Matthew Olano — Résumé', url: '/documents/John-Matthew-Olano-Resume.pdf', preview: resumePreview }
const cvDocument = { title: 'John Matthew Olano — CV', url: '/documents/John-Matthew-Olano-CV.pdf', preview: cvPreview }

const projects = [
  { title: 'VIMS', type: 'Full-stack web + mobile capstone', tag: 'Backend · MERN web app · VIMS Mobile', desc: 'A complete visitor information management system with a backend, MERN web app, and VIMS Mobile for Android and iOS—enhanced with OCR and an AI chatbot.', link: 'https://casimiro-westville-homes-vims.online/login', color: 'violet', featured: true, image: vimsImage },
  { title: 'ClaraCare', type: 'Web project', tag: 'MERN stack', desc: 'A modern web project built around a clear, approachable digital experience.', link: 'https://github.com/altjohn143/web-project', color: 'lime', image: claraCareImage },
  { title: 'Hungry Nook', type: 'Restaurant system', tag: 'Full stack', desc: 'Restaurant management system for organizing day-to-day food service operations.', link: 'https://github.com/altjohn143/hungry-nook', color: 'coral', image: hungryNookImage },
  { title: 'Clove Collective', type: 'Personal project', tag: 'React · Vercel', desc: 'A polished e-commerce inspired digital brand experience.', link: 'https://github.com/altjohn143/clove-collective', color: 'peach', image: cloveCollectiveImage },
  { title: 'Ecommerce Olano', type: 'Web project', tag: 'MERN stack', desc: 'An e-commerce application exploring product, cart, and shopping flows.', link: 'https://github.com/altjohn143/ecommerce-olano', color: 'sky', image: ecommerceImage },
  { title: 'Showcase Gallery', type: 'Creative web project', tag: 'React', desc: 'A gallery-focused project for presenting visual work with clarity.', link: 'https://github.com/altjohn143/showcase-gallery', color: 'yellow', image: showcaseImage },
  { title: 'Weather App', type: 'Android project', tag: 'Android Studio', desc: 'A native Android weather app exploring mobile interface patterns and app development.', link: 'https://github.com/altjohn143', color: 'sky', image: weatherImage },
]

const skills = [
  ['Frontend', 'React.js, responsive interfaces, Vite'],
  ['Backend', 'Node.js, Express.js, REST APIs'],
  ['Data', 'MongoDB / NoSQL, MySQL'],
  ['Mobile', 'React Native, Expo, EAS'],
  ['Cloud', 'Vercel, Render, TestFlight'],
  ['Integrations', 'OpenAI API, Resend email OTP'],
]

function LoadingScreen() {
  return <div className="loading-screen" aria-label="Loading portfolio" role="status">
    <div className="skeleton-nav"><div className="skeleton skeleton-logo" /><div className="skeleton skeleton-links" /><div className="skeleton skeleton-button" /></div>
    <div className="skeleton-hero"><div className="skeleton-copy"><div className="skeleton skeleton-eyebrow" /><div className="skeleton skeleton-heading" /><div className="skeleton skeleton-text" /><div className="skeleton-actions"><div className="skeleton skeleton-action" /><div className="skeleton skeleton-link" /></div></div><div className="skeleton skeleton-art" /></div>
    <div className="skeleton skeleton-rule" />
    <div className="skeleton-projects"><div className="skeleton skeleton-project" /><div className="skeleton skeleton-project" /><div className="skeleton skeleton-project" /></div>
  </div>
}

function DocumentModal({ document, onClose }) {
  if (!document) return null
  return <div className="document-modal" role="dialog" aria-modal="true" aria-label={`Viewing ${document.title}`} onMouseDown={onClose}>
    <div className="document-dialog" onMouseDown={(event) => event.stopPropagation()}>
      <div className="document-modal-header"><p>{document.title}</p><div className="document-modal-actions"><a className="download-link" href={document.url} download aria-label={`Download ${document.title}`} title={`Download ${document.title}`}>↓</a><a href={document.url} target="_blank" rel="noreferrer">Open in new tab ↗</a><button className="modal-close" type="button" onClick={onClose} aria-label="Close document viewer">×</button></div></div>
      <div className="document-preview"><img src={document.preview} alt={`${document.title} preview`} /></div>
    </div>
  </div>
}

function App() {
  const [active, setActive] = useState('All work')
  const [isLoading, setIsLoading] = useState(true)
  const [activeDocument, setActiveDocument] = useState(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [emailNotice, setEmailNotice] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const visible = active === 'All work' ? projects : active === 'Capstone project' ? projects.filter(p => p.type.toLowerCase().includes('capstone')) : projects.filter(p => p.type.toLowerCase().includes(active.toLowerCase()))
  const filters = ['All work', 'Capstone project', 'Web project', 'Restaurant system', 'Personal project']
  useEffect(() => {
    const finishLoading = () => window.setTimeout(() => setIsLoading(false), 450)
    if (document.readyState === 'complete') finishLoading()
    else window.addEventListener('load', finishLoading, { once: true })
    return () => window.removeEventListener('load', finishLoading)
  }, [])
  useEffect(() => {
    if (isLoading) return undefined
    const elements = document.querySelectorAll('[data-reveal]')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12 })
    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [active, isLoading])
  useEffect(() => {
    if (!activeDocument) return undefined
    const closeOnEscape = (event) => { if (event.key === 'Escape') setActiveDocument(null) }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', closeOnEscape)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', closeOnEscape) }
  }, [activeDocument])
  useEffect(() => {
    if (isLoading) return undefined
    let frame = 0
    const updateEnhancements = () => {
      frame = 0
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0)
      const heroImage = document.querySelector('.hero-portrait')
      const capstoneImage = document.querySelector('.capstone-image')
      if (heroImage) heroImage.style.setProperty('--portrait-parallax', `${Math.min(window.scrollY * .045, 30)}px`)
      if (capstoneImage) {
        const offset = capstoneImage.getBoundingClientRect().top - window.innerHeight / 2
        capstoneImage.style.setProperty('--capstone-parallax', `${Math.max(-18, Math.min(18, -offset * .045))}px`)
      }
    }
    const onScroll = () => { if (!frame) frame = window.requestAnimationFrame(updateEnhancements) }
    updateEnhancements()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => { window.cancelAnimationFrame(frame); window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll) }
  }, [isLoading])
  const handleCardMove = (event) => {
    const card = event.currentTarget
    const bounds = card.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width - .5
    const y = (event.clientY - bounds.top) / bounds.height - .5
    card.style.setProperty('--tilt-x', `${-y * 4}deg`)
    card.style.setProperty('--tilt-y', `${x * 5}deg`)
  }
  const resetCardTilt = (event) => {
    event.currentTarget.style.setProperty('--tilt-x', '0deg')
    event.currentTarget.style.setProperty('--tilt-y', '0deg')
  }
  const handleEmailClick = () => {
    setEmailNotice(true)
    window.setTimeout(() => setEmailNotice(false), 3200)
  }
  if (isLoading) return <LoadingScreen />
  return <main><div className="scroll-progress" style={{ '--scroll-progress': `${scrollProgress}%` }} aria-hidden="true" />
    <nav className="nav wrap" data-reveal>
      <a className="brand" href="#top" aria-label="OlanoWorks home"><img className="brand-mark" src="/olano-mark.svg" alt=""/><span className="brand-wordmark"><strong>OLANO</strong><small>PORTFOLIO</small></span></a>
      <div id="site-navigation" className={'navlinks' + (mobileMenuOpen ? ' is-open' : '')}><a href="#vims" onClick={() => setMobileMenuOpen(false)}>VIMS</a><a href="#work" onClick={() => setMobileMenuOpen(false)}>Work</a><a href="#about" onClick={() => setMobileMenuOpen(false)}>About</a><a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a></div>
      <button className="mobile-menu-trigger" type="button" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-expanded={mobileMenuOpen} aria-controls="site-navigation">{mobileMenuOpen ? 'CLOSE ×' : 'MENU ☰'}</button>
      <button className="nav-cta document-trigger" type="button" onClick={() => setActiveDocument(resumeDocument)}>Résumé <b>↗</b></button>
    </nav>

    <section className="hero wrap" id="top" data-reveal>
      <div className="hero-grid">
        <div>
          <p className="intro">Hello, I’m John Matthew Olano —</p>
          <h1>full-stack builder<br/>&amp; <em>problem solver.</em></h1>
          <p className="hero-copy">Fourth-year IT student specializing in mobile and web applications. I build practical products across web, Android, and iOS—from system design to launch.</p>
          <div className="hero-actions"><a className="button" href="#vims">Explore VIMS <b>↓</b></a><button className="text-link document-trigger" type="button" onClick={() => setActiveDocument(resumeDocument)}>View résumé <b>↗</b></button></div>
          <div className="quick-links"><a href="mailto:johnmatthewolano4@gmail.com" target="_blank" rel="noreferrer" onClick={handleEmailClick}>Email me</a><a href="https://github.com/altjohn143" target="_blank" rel="noreferrer">GitHub ↗</a></div>
        </div>
        <div className="hero-art" aria-label="Portrait of John Matthew Olano"><img className="hero-portrait" src={profileImage} alt="John Matthew Olano in formal attire"/><div className="profile-label">WEB + MOBILE<br/>DEVELOPMENT</div></div>
      </div>
    </section>

    <section className="capstone wrap" id="vims" data-reveal><div className="capstone-panel">
      <div className="capstone-image" style={{ backgroundImage: `url(${vimsImage})` }} aria-label="VIMS web and mobile interface preview" />
      <div><p className="kicker capstone-kicker">FEATURED CAPSTONE · VIMS</p><h2 className="reveal-title">One complete system, <em>web to mobile.</em></h2><p className="capstone-copy">Village Integrated Management System (VIMS) is a complete full-stack capstone: its repository contains the backend, a MERN web application, and VIMS Mobile. It serves the same community-management experience across the browser, Android, and iOS, with OCR and an AI chatbot through the OpenAI API.</p><div className="capstone-roles"><div className="capstone-role"><b>ROLE 01</b>Lead programmer</div><div className="capstone-role"><b>ROLE 02</b>Data analyst</div><div className="capstone-role"><b>ROLE 03</b>Full-stack contributor</div></div><p className="capstone-copy">Deployed as a web platform, Android build through Expo/EAS, and iOS build via Apple Developer TestFlight.</p><div className="capstone-actions"><a href="https://casimiro-westville-homes-vims.online/login" target="_blank" rel="noreferrer">Visit live VIMS ↗</a><a href="https://github.com/altjohn143/VIMS" target="_blank" rel="noreferrer">GitHub repository ↗</a></div></div>
    </div></section>

    <section className="work wrap" id="work" data-reveal>
      <div className="section-top"><div><p className="kicker">SELECTED WORK</p><h2 className="reveal-title">Things I’ve <em>made.</em></h2></div><p>Projects that reflect what I enjoy most: turning real-world problems into thoughtful digital tools.</p></div>
      <div className="filters">{filters.map(f => <button key={f} className={active === f ? 'selected' : ''} onClick={() => setActive(f)}>{f}</button>)}</div>
      <div className="project-grid">
        {visible.map((p, i) => <a className={'project '+p.color+(p.featured ? ' featured' : '')} key={p.title} href={p.link} target="_blank" rel="noreferrer" data-reveal onMouseMove={handleCardMove} onMouseLeave={resetCardTilt}>
          <div className="project-visual" style={{ backgroundImage: `url(${p.image})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}><span className="project-num">0{i + 1}</span></div>
          <div className="project-info"><div><p>{p.type}</p><h3>{p.title}</h3><span>{p.desc}</span></div><b className="arrow">↗</b></div>
          <div className="tech">{p.tag}</div>
        </a>)}
      </div>
    </section>

    <section className="about" id="about" data-reveal><div className="wrap about-grid">
      <div><p className="kicker">ABOUT ME</p><h2 className="reveal-title">Comfortable from<br/>idea to <em>launch.</em></h2></div>
      <div><div className="about-intro"><img className="about-photo" src={profileImage} alt="John Matthew Olano"/><div><p className="about-copy">I’m a fourth-year BS Information Technology student at National University – Mall of Asia, specializing in Mobile and Web Applications. I enjoy translating real needs into reliable, easy-to-use software—whether that means a management system, a mobile app, or a full-stack platform.</p><div className="resume-links"><button className="document-trigger" type="button" onClick={() => setActiveDocument(resumeDocument)}>View résumé ↗</button><button className="document-trigger" type="button" onClick={() => setActiveDocument(cvDocument)}>View CV ↗</button></div></div></div><div className="skill-list">{skills.map(([name, list], i) => <div className="skill" key={name}><span>0{i+1}</span><div><h3>{name}</h3><p>{list}</p></div></div>)}</div></div>
    </div></section>

    <section className="experience wrap" data-reveal><p className="kicker">BEYOND THE BROWSER</p><div className="experience-grid"><h2 className="reveal-title">I learn by<br/><em>shipping.</em></h2><div><p>I’m currently enrolled at National University – Mall of Asia Campus. For my capstone, VIMS, I helped deliver both web and mobile experiences—deploying Android builds through Expo/EAS and iOS builds through Apple Developer TestFlight. I’ve also worked with OpenAI-powered OCR and chat features, OTP email flows, system maintenance, Android weather apps, and game development with Unity and GameMaker.</p><div className="chips"><span>OpenAI API</span><span>OCR</span><span>TestFlight</span><span>Resend</span><span>Unity</span><span>Windows Admin</span></div></div></div></section>

    <footer id="contact" data-reveal><div className="wrap"><p className="kicker">GET IN TOUCH</p><h2 className="reveal-title">Let’s make something<br/><em>useful together.</em></h2><a className="footer-mail" href="mailto:johnmatthewolano4@gmail.com" target="_blank" rel="noreferrer" onClick={handleEmailClick}>johnmatthewolano4@gmail.com <b>↗</b></a><div className="footer-bottom"><span>© {new Date().getFullYear()} John Matthew Olano</span><div><a href="https://www.linkedin.com/in/olano-john-matthew-z-bb56172ba/" target="_blank" rel="noreferrer">LinkedIn</a><a href="https://github.com/altjohn143" target="_blank" rel="noreferrer">GitHub</a><a href="https://www.facebook.com/altjohn143" target="_blank" rel="noreferrer">Facebook</a><a href="https://www.instagram.com/mtt.xyz_/" target="_blank" rel="noreferrer">Instagram</a></div></div></div></footer>{emailNotice && <div className="mail-toast" role="status"><b>✓</b> Email link opened in a new tab</div>}<a className="back-top" href="#top" aria-label="Back to top">↑</a>
  <DocumentModal document={activeDocument} onClose={() => setActiveDocument(null)} /></main>
}
createRoot(document.getElementById('root')).render(<App />)
