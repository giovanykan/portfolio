import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import portraitImage from './assets/giovany-portrait.png?url';
import './styles.css';

const portfolioAssets = import.meta.glob('./assets/portfolio/*.{webp,png,jpg,jpeg}', {
  eager: true,
  query: '?url',
  import: 'default',
});
const asset = (name, extension = 'webp') => portfolioAssets[`./assets/portfolio/${name}.${extension}`];
const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');

function stripBasePath(pathname) {
  if (!basePath) return pathname;
  if (pathname === basePath) return '/';
  if (pathname.startsWith(`${basePath}/`)) return pathname.slice(basePath.length) || '/';
  return pathname;
}

function withBasePath(path) {
  if (!basePath || !path.startsWith('/')) return path;
  if (path === '/') return `${basePath}/`;
  return `${basePath}${path}`;
}

const projects = [
  {
    slug: 'billetdoux',
    title: 'Billet Doux',
    shortTitle: 'Billet Doux',
    category: 'Visual Branding & Identity',
    subtitle: 'Visual Identity & Brand Experience',
    year: '2026',
    client: 'Billet Doux',
    role: 'Visual identity design',
    deliverables: 'Brand Identity Design, Packaging Design, Social Media Design, Product Presentation Design',
    cover: asset('billetdoux-preview', 'jpg'),
    hero: asset('billetdoux-detail', 'jpg'),
    heroDisplay: 'long-form',
    previewMode: 'logo',
    images: [],
    summary:
      'Billet Doux — French for "sweet note" or "love letter" — is an artisanal brand built on the intent to create meaningful, handcrafted gifts. The brand treats each crochet piece not merely as a product, but as a personal, lasting expression of affection.',
    concept:
      'My objective was to elevate traditional craftsmanship into a high-end lifestyle experience through a consistent visual identity that conveys warmth and premium quality.',
    second:
      'The system translates handmade texture into a refined brand experience across identity, packaging, social media, and product presentation.',
  },
  {
    slug: 'lenmarc',
    title: 'Lenmarc Mall — Chinese New Year Festive',
    shortTitle: 'Lenmarc Mall',
    category: 'Marketing & Integrated Campaigns',
    subtitle: 'Integrated Visual Strategy & Environmental Graphics',
    year: '2026',
    client: 'Lenmarc Mall',
    role: 'Seasonal campaign design',
    deliverables: 'Integrated Campaigns, Environmental Graphics, Social Media Design, Print Collateral',
    cover: asset('lenmarc-mall-preview', 'jpg'),
    hero: asset('lenmarc-mall-detail', 'jpg'),
    heroDisplay: 'long-form',
    previewMode: 'logo',
    images: [],
    summary:
      'A seasonal campaign developed for Lenmarc Mall during the Lunar New Year celebration, integrating digital promotions with physical environmental graphics into a cohesive festive experience.',
    concept:
      'I established a consistent visual identity across social media content, promotional materials, and large-scale mall installations — including stage backdrops, glass lobby graphics, and customer service touchpoints — to create a clean, welcoming, and premium atmosphere throughout the space.',
    second:
      'The system connects digital promotion, customer service graphics, stage treatment, and event calendars into one consistent retail language.',
  },
  {
    slug: 'bukit-darmo-golf',
    title: 'Bukit Darmo Golf',
    shortTitle: 'Bukit Darmo Golf',
    category: 'Marketing & Integrated Campaigns',
    subtitle: 'Promotional Campaign & Social Media Design',
    year: '2026',
    client: 'Bukit Darmo Golf',
    role: 'Campaign visual design',
    deliverables:
      'Promotional Campaign Design, Golf Tournament Collateral, Social Media Design, AI-Generated Visual Direction, Poster Design (Print & Digital)',
    cover: asset('bukit-darmo-golf-preview', 'jpg'),
    hero: asset('bukit-darmo-golf-detail', 'jpg'),
    heroDisplay: 'long-form',
    previewMode: 'logo',
    images: [],
    summary:
      'Bukit Darmo Golf is a golf club and clubhouse that brings together sport, leisure, and a refined social experience. I developed the visual direction to support a range of promotional campaigns while maintaining a consistent, polished brand presence across all communications.',
    concept:
      "The scope included tournament promotions, membership campaigns, seasonal offers, and social media content, each balancing the prestige of golf with a fresh, engaging visual approach aligned with the club's premium positioning.",
    second:
      'The campaign system was planned for multiple formats, from portrait posters to social media frames, while preserving a consistent sense of place.',
  },
  {
    slug: 'fairway-nine',
    title: 'Fairway Nine',
    shortTitle: 'Fairway Nine',
    category: 'Marketing & Integrated Campaigns',
    subtitle: 'Integrated Campaign & Environmental Graphics Design',
    year: '2026',
    client: 'Fairway Nine',
    role: 'Integrated campaign and environmental graphics design',
    deliverables:
      'Marketing Campaign Design • Environmental Graphics • Social Media Design • Print & Digital Signage • Renovation Hoarding Design',
    cover: asset('fairwaynine-preview', 'jpg'),
    hero: asset('fairwaynine-detail', 'jpg'),
    heroDisplay: 'long-form',
    previewMode: 'logo',
    images: [],
    summary:
      'FairwayNine Mall is the rebranded identity of Lenmarc Mall in Surabaya, positioning it as an upgraded shopping, lifestyle, and entertainment destination.',
    concept:
      "Working within the mall's new brand identity, I developed a range of campaigns and visual materials, including the Lunar New Year celebration, poster design, stage backdrop, and outdoor digital signage, social media content marking city milestones and tenant promotions, and environmental graphics supporting the mall's renovation period, such as construction hoarding and new dining experience signage.",
    second:
      'The work supported a more current destination identity while keeping campaign, environmental, social, and signage materials consistent across customer touchpoints.',
  },
  {
    slug: 'pakuwon-indah',
    title: 'Pakuwon Group',
    shortTitle: 'Pakuwon Group',
    category: 'Marketing & Integrated Campaigns',
    subtitle: 'Marketing Collateral & Print Design',
    year: '2026',
    client: 'Pakuwon Group',
    role: 'Marketing collateral and print design',
    deliverables: 'Marketing Campaign Design • Brochure Design • Flyer Design • Advertisement Design',
    cover: asset('pakuwon-group-preview', 'png'),
    hero: asset('pakuwon-group-detail', 'jpg'),
    heroDisplay: 'long-form',
    previewMode: 'logo',
    images: [],
    summary:
      "Pakuwon Group is one of Indonesia's leading real estate developers, known for pioneering large-scale integrated township and superblock developments across Surabaya and Jakarta.",
    concept:
      "I worked on the marketing and promotional materials for Pakuwon Group's residential housing division in Surabaya, developing brochures, flyers, newspaper advertisements, and event invitations for several housing clusters, helping communicate each development's lifestyle, location, and key offerings to prospective buyers.",
    second:
      'Across the set, the work focuses on continuity: typography, image placement, and pacing that feel credible across premium residential communication.',
  },
  {
    slug: 'toastjam',
    title: 'Toast Jam Factory',
    shortTitle: 'Toast Jam Factory',
    category: 'Marketing & Integrated Campaigns',
    subtitle: 'Visual Branding, Packaging & Social Media',
    year: '2026',
    client: 'Toast Jam Factory',
    role: 'Packaging and editorial design',
    deliverables: 'Editorial Menu Design, Packaging Design, Social Media Design',
    cover: asset('toastjam-preview', 'jpg'),
    hero: asset('toastjam-detail', 'jpg'),
    heroDisplay: 'long-form',
    previewMode: 'logo',
    images: [],
    summary:
      'A modern interpretation of the traditional kopi tiam experience, centered on a warm, earthy, and inviting atmosphere. The brand philosophy reinterprets this nostalgic experience through a refined visual language that balances heritage character with a clean, contemporary approach.',
    concept:
      'I applied this visual identity across key customer touchpoints, including editorial menu layouts, packaging, and social media content, to deliver a cohesive brand experience.',
    second:
      'The layouts keep information direct while giving the brand enough visual character to work across shelves, counters, and social posts.',
  },
  {
    slug: 'golden-saffron',
    title: 'The Golden Saffron',
    shortTitle: 'Golden Saffron',
    category: 'Editorial & Print',
    subtitle: 'Editorial & Collateral Design',
    year: '2026',
    client: 'The Golden Saffron',
    role: 'Print collateral design',
    deliverables: 'Editorial Menu Design, Brand Collaterals, Print Production',
    cover: asset('golden-saffron-preview', 'jpg'),
    hero: asset('golden-saffron-detail', 'jpg'),
    heroDisplay: 'long-form',
    previewMode: 'logo',
    images: [],
    summary: 'A design approach that translates rich culinary heritage into a premium dining presentation.',
    concept:
      "I elevated the restaurant's visual touchpoints, from custom placemats to promotional banners, through a balance of deep, regal tones and structured layouts.",
    second:
      'I also developed distinct identities for the Indian and Chinese menu volumes, ensuring extensive menus remained highly readable while retaining a polished, high-end aesthetic.',
  },
  {
    slug: 'sumi-ya',
    title: 'Sumi-Ya Charcoal Yakiniku',
    shortTitle: 'Sumi-Ya',
    category: 'Editorial & Print',
    subtitle: 'Menu Design',
    year: '2026',
    client: 'Sumi-Ya Charcoal Yakiniku',
    role: 'Menu design',
    deliverables: 'Menu Design, Editorial Layout, Print-Ready Artwork',
    cover: asset('sumiya-preview', 'jpg'),
    hero: asset('sumiya-detail', 'jpg'),
    heroDisplay: 'long-form',
    previewMode: 'logo',
    images: [],
    summary:
      "Sumi-Ya Charcoal Yakiniku is an authentic Japanese restaurant defined by bold flavors, quality ingredients, and a memorable dining experience. I developed the menu's visual direction to reflect this character, energetic, appetizing, and distinctly Japanese.",
    concept:
      'The design uses clear category structures, expressive food imagery, and bold red accents to guide guests through the menu with ease, balancing visual impact with readability to support a smooth ordering experience.',
  },
  {
    slug: 'one-bean',
    title: 'One Bean',
    shortTitle: 'One Bean',
    category: 'Editorial & Print',
    subtitle: 'Menu Design',
    year: '2026',
    client: 'One Bean',
    role: 'Print-ready artwork',
    deliverables: 'Menu Design, Editorial Layout',
    cover: asset('one-bean-preview', 'jpg'),
    hero: asset('one-bean-detail', 'jpg'),
    heroDisplay: 'long-form',
    previewMode: 'logo',
    images: [],
    summary:
      'One Bean is a coffee-focused concept built on the appeal of a well-crafted cup and an approachable dining experience.',
    concept:
      'I designed the menu to reflect this identity through a clean, editorial layout, relaxed, approachable, and detailed enough to reward closer reading.',
  },
];

const portfolioOrder = [
  'billetdoux',
  'lenmarc',
  'bukit-darmo-golf',
  'fairway-nine',
  'pakuwon-indah',
  'golden-saffron',
  'toastjam',
  'sumi-ya',
  'one-bean',
];
const portfolioProjects = portfolioOrder.map((slug) => projects.find((project) => project.slug === slug)).filter(Boolean);

const workSections = [
  {
    id: 'visual-branding',
    title: 'Visual Branding & Identity',
    projectSlugs: ['billetdoux'],
  },
  {
    id: 'marketing',
    title: 'Marketing and Integrated Campaign',
    projectSlugs: ['lenmarc', 'bukit-darmo-golf', 'fairway-nine', 'pakuwon-indah', 'toastjam'],
  },
  {
    id: 'editorial',
    title: 'Editorial and Print',
    projectSlugs: ['golden-saffron', 'sumi-ya', 'one-bean'],
  },
];

const expertiseTags = [
  'Brand Strategy',
  'Logo & Corporate Identity',
  'Integrated Campaigns',
  'Social Media Design',
  'Editorial Layout',
  'Packaging Design',
  'Environmental Graphics',
  'Print Production',
];

function getRoute() {
  const path = stripBasePath(window.location.pathname).replace(/\/$/, '') || '/';
  const hash = window.location.hash;
  const projectMatch = path.match(/^\/project\/([^/]+)$/);
  return projectMatch
    ? { name: 'project', slug: projectMatch[1], hash }
    : { name: path === '/' ? 'home' : 'not-found', hash };
}

function navigate(path) {
  window.history.pushState({}, '', withBasePath(path));
  window.dispatchEvent(new PopStateEvent('popstate'));
}

function AppLink({ href, children, ...props }) {
  const isRootRelative = href.startsWith('/');
  const renderedHref = isRootRelative ? `${withBasePath(new URL(href, window.location.origin).pathname)}${new URL(href, window.location.origin).hash}` : href;

  function handleClick(event) {
    const isPlainLeftClick = event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;
    const url = new URL(renderedHref, window.location.origin);

    if (isPlainLeftClick && url.origin === window.location.origin) {
      event.preventDefault();
      navigate(`${stripBasePath(url.pathname)}${url.hash}`);
    }
  }

  return (
    <a href={renderedHref} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}

function useRoute() {
  const [route, setRoute] = useState(getRoute);

  useEffect(() => {
    const redirectedPath = sessionStorage.getItem('portfolioRedirect');
    if (redirectedPath) {
      sessionStorage.removeItem('portfolioRedirect');
      window.history.replaceState({}, '', withBasePath(redirectedPath));
      setRoute(getRoute());
    }

    const updateRoute = () => setRoute(getRoute());
    window.addEventListener('popstate', updateRoute);
    return () => window.removeEventListener('popstate', updateRoute);
  }, []);

  return route;
}

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
      },
      { threshold: 0.12 },
    );

    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  });
}

function useParallax() {
  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionQuery.matches) return undefined;

    let frame = 0;
    const settleTimers = [];

    const update = () => {
      frame = 0;
      const elements = Array.from(document.querySelectorAll('[data-parallax]'));
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.bottom < -160 || rect.top > viewportHeight + 160) return;

        const speed = Number(element.dataset.parallaxSpeed || 0.04);
        const centerDelta = rect.top + rect.height / 2 - viewportHeight / 2;
        element.style.setProperty('--parallax-y', `${(centerDelta * speed).toFixed(2)}px`);
      });
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    settleTimers.push(window.setTimeout(requestUpdate, 80));
    settleTimers.push(window.setTimeout(requestUpdate, 280));
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    window.addEventListener('load', requestUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      settleTimers.forEach((timer) => window.clearTimeout(timer));
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      window.removeEventListener('load', requestUpdate);
      document.querySelectorAll('[data-parallax]').forEach((element) => element.style.removeProperty('--parallax-y'));
    };
  });
}

function usePageReset(routeKey) {
  useEffect(() => {
    document.title =
      routeKey === 'home' ? 'Giovany Kantoro | Portfolio' : `${routeKey.replaceAll('-', ' ')} | Giovany Kantoro`;

    requestAnimationFrame(() => {
      if (window.location.hash) {
        document.querySelector(window.location.hash)?.scrollIntoView();
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      }
    });
  }, [routeKey]);
}

function Header() {
  return (
    <header className="site-header" id="top">
      <AppLink className="wordmark" href="/" aria-label="Back to homepage">
        portfolio
      </AppLink>
      <nav className="nav-links" aria-label="Main navigation">
        <AppLink href="/#work">Work</AppLink>
        <AppLink href="/#about">About</AppLink>
        <AppLink href="/#contact">Contact</AppLink>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <span>GIOVANY_KANTORO</span>
      <span>© 2026 Giovany Kantoro. All rights reserved.</span>
      <div>
        <a href="https://www.behance.net/" rel="noreferrer">
          Behance
        </a>
        <a href="https://www.linkedin.com/" rel="noreferrer">
          LinkedIn
        </a>
      </div>
    </footer>
  );
}

function ProjectCard({ project, index }) {
  return (
    <article className={`project-card reveal project-card-${index + 1}`}>
      <AppLink href={`/project/${project.slug}`} aria-label={`View ${project.title}`}>
        <img
          src={project.hero}
          alt={`${project.title} project preview`}
          width="1200"
          height="900"
          loading={index < 2 ? 'eager' : 'lazy'}
        />
        <span className="view-label">View project</span>
      </AppLink>
      <div className="card-caption">
        <h3>{project.shortTitle}</h3>
        <p className="card-subtitle">{project.subtitle}</p>
        <p className="card-summary">{project.summary}</p>
        <p className="scope-line">Scope of Work: {project.deliverables}</p>
      </div>
    </article>
  );
}

function PortfolioTile({ project, index }) {
  const isLogoTile = project.previewMode === 'logo';
  const tileSpeed = index % 2 === 0 ? '0.065' : '-0.052';

  return (
    <article className={`portfolio-tile reveal${isLogoTile ? ' is-logo-tile' : ''}`}>
      <AppLink href={`/project/${project.slug}`} aria-label={`View ${project.title}`}>
        <span className="portfolio-thumb parallax-layer" data-parallax data-parallax-speed={tileSpeed}>
          <img
            className={isLogoTile ? undefined : 'parallax-image'}
            data-parallax={!isLogoTile || undefined}
            data-parallax-speed={!isLogoTile ? (index % 2 === 0 ? '-0.036' : '0.032') : undefined}
            src={project.cover || project.hero}
            alt={`${project.title} project preview`}
            width="900"
            height="900"
            loading={index < 3 ? 'eager' : 'lazy'}
          />
        </span>
        <h3>{project.shortTitle}</h3>
      </AppLink>
    </article>
  );
}

function HomePage({ routeHash }) {
  useReveal();
  useParallax();
  usePageReset(`home${routeHash}`);

  return (
    <>
      <Header />
      <main id="main-content">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-orbit hero-orbit-left parallax-layer" data-parallax data-parallax-speed="0.07" aria-hidden="true" />
          <div className="hero-orbit hero-orbit-right parallax-layer" data-parallax data-parallax-speed="-0.06" aria-hidden="true" />
          <div className="hero-copy reveal parallax-layer" data-parallax data-parallax-speed="-0.024">
            <p className="hero-kicker">Senior Graphic Designer · 15+ Years of Experience</p>
            <h1 id="hero-title">Giovany Kantoro</h1>
            <p className="hero-note hero-role">Visual Branding & Identity · Marketing & Integrated Campaigns · Editorial & Print</p>
            <div className="hero-actions">
              <a className="primary-action" href="#work">View Work</a>
              <a className="secondary-action" href="#contact">Get in Touch</a>
            </div>
          </div>
          <a className="scroll-cue" href="#about" aria-label="Scroll to about section">
            <span>Scroll</span>
          </a>
        </section>

        <section className="about-section" id="about" aria-labelledby="about-title">
          <figure className="portrait-card reveal parallax-layer" data-parallax data-parallax-speed="0.026">
            <img
              className="parallax-image"
              data-parallax
              data-parallax-speed="-0.032"
              src={portraitImage}
              alt="Giovany Kantoro portrait"
              width="900"
              height="1168"
              loading="lazy"
            />
          </figure>
          <article className="about-copy reveal parallax-layer" data-parallax data-parallax-speed="-0.018">
            <h2 id="about-title">About Me</h2>
            <p>
              I am a graphic designer with over 15 years of experience across marketing, branding, and editorial design.
              My work spans menu and editorial design, integrated marketing campaigns, and full brand identity systems,
              always grounded in a clear understanding of each brand's positioning and voice.
            </p>
            <p>
              I have integrated AI tools into my workflow to accelerate iteration while maintaining a high standard of craft
              and attention to detail. My approach combines strategic thinking with strong visual execution to deliver work
              that is both distinctive and effective.
            </p>
            <div className="expertise-tags" aria-label="Design expertise">
              {expertiseTags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </article>
        </section>

        <section className="work-section" id="work" aria-label="Selected portfolio work">
          <header className="work-section-heading reveal">
            <h2>Portfolio</h2>
          </header>
          <div className="portfolio-grid" aria-live="polite">
            {portfolioProjects.map((project, index) => (
              <PortfolioTile key={project.slug} project={project} index={index} />
            ))}
          </div>
        </section>

        <section className="contact-section" id="contact" aria-labelledby="contact-title">
          <h2 id="contact-title" className="reveal">
            Let's Create Something Memorable Together
          </h2>
          <a className="outline-button reveal" href="mailto:hello@example.com">
            Start a conversation
          </a>
        </section>
      </main>
      <Footer />
    </>
  );
}

function ProjectPage({ slug }) {
  const projectIndex = portfolioProjects.findIndex((project) => project.slug === slug);
  const project = portfolioProjects[projectIndex];
  const previous = portfolioProjects[(projectIndex - 1 + portfolioProjects.length) % portfolioProjects.length];
  const next = portfolioProjects[(projectIndex + 1) % portfolioProjects.length];

  useReveal();
  useParallax();
  usePageReset(project?.slug || 'not-found');

  useEffect(() => {
    if (!project) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'ArrowLeft') navigate(`/project/${previous.slug}`);
      if (event.key === 'ArrowRight') navigate(`/project/${next.slug}`);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [next, previous, project]);

  if (!project) return <NotFoundPage />;

  return (
    <>
      <Header />
      <main id="main-content" className="detail-page portfolio-detail-page">
        <AppLink className="back-link reveal" href="/#work">
          ← Back to work
        </AppLink>

        <section className="detail-section portfolio-detail" aria-labelledby="detailTitle">
          <div className="portfolio-detail-intro reveal parallax-layer" data-parallax data-parallax-speed="-0.018">
            <h1 id="detailTitle">{project.shortTitle}</h1>
            <div>
              <p>{project.summary}</p>
              <p>{project.concept}</p>
            </div>
          </div>

          <figure
            className={`portfolio-hero-figure reveal parallax-layer${project.heroDisplay === 'long-form' ? ' is-long-form' : ''}`}
            data-parallax
            data-parallax-speed="0.018"
          >
            <AppLink href={`/project/${next.slug}`} aria-label="Open next project">
              <img
                className="parallax-image"
                data-parallax
                data-parallax-speed={project.heroDisplay === 'long-form' ? '0.006' : '-0.034'}
                src={project.hero}
                alt={`${project.title} main project visual`}
                width="1800"
                height="1200"
              />
            </AppLink>
          </figure>

          {project.images.length > 0 && (
            <div className="portfolio-masonry reveal">
              {project.images.map((image, imageIndex) => (
                <figure key={image}>
                  <img
                    className="parallax-image"
                    data-parallax
                    data-parallax-speed={imageIndex % 2 === 0 ? '0.028' : '-0.024'}
                    src={image}
                    alt={`${project.title} supporting visual ${imageIndex + 1}`}
                    width="1200"
                    height="900"
                    loading="lazy"
                  />
                </figure>
              ))}
            </div>
          )}

          <aside className="portfolio-detail-meta reveal" aria-label="Project metadata">
            <div>
              <span>Client</span>
              <strong>{project.client}</strong>
            </div>
            <div>
              <span>Discipline</span>
              <strong>{project.role}</strong>
            </div>
            <div>
              <span>Scope</span>
              <strong>{project.deliverables}</strong>
            </div>
          </aside>

          <nav className="project-pager reveal" aria-label="Project navigation">
            <AppLink href={`/project/${previous.slug}`}>
              <span>Previous project</span>
              <strong>{previous.shortTitle}</strong>
            </AppLink>
            <AppLink href={`/project/${next.slug}`}>
              <span>Next project</span>
              <strong>{next.shortTitle}</strong>
            </AppLink>
          </nav>
        </section>
      </main>
      <Footer />
    </>
  );
}

function NotFoundPage() {
  usePageReset('not-found');

  return (
    <>
      <Header />
      <main id="main-content" className="not-found">
        <p className="kicker">404 / Archive missing</p>
        <h1>That page is not in the portfolio archive.</h1>
        <AppLink className="outline-button" href="/">
          Return home
        </AppLink>
      </main>
      <Footer />
    </>
  );
}

function App() {
  const route = useRoute();
  const page = useMemo(() => {
    if (route.name === 'home') return <HomePage routeHash={route.hash} />;
    if (route.name === 'project') return <ProjectPage slug={route.slug} />;
    return <NotFoundPage />;
  }, [route]);

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      {page}
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
