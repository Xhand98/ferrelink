<script>
  import { Link } from 'svelte-routing';
  import ThemeToggle from '../lib/components/ThemeToggle.svelte';
  import Button from '../lib/components/ui/button/button.svelte';
  import { Package, TrendingUp, Users, Shield, Zap, BarChart3, ArrowRight, Check } from 'lucide-svelte';
</script>

<div class="landing-page">
  <nav class="nav">
    <div class="container nav-content">
      <div class="logo">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="4" width="24" height="24" stroke="currentColor" stroke-width="3"/>
          <path d="M12 12L16 8L20 12" stroke="currentColor" stroke-width="3" stroke-linecap="square"/>
          <path d="M16 8V20" stroke="currentColor" stroke-width="3" stroke-linecap="square"/>
        </svg>
        <span>FERRELINK</span>
      </div>
      
      <div class="nav-actions">
        <ThemeToggle />
        <Link to="/login">
          <Button variant="ghost" size="sm">Iniciar Sesión</Button>
        </Link>
        <Link to="/register">
          <Button size="sm">Comenzar</Button>
        </Link>
      </div>
    </div>
  </nav>

  <section class="hero">
    <div class="container">
      <div class="hero-content">
        <h1 class="hero-title">
          SISTEMA DE GESTIÓN<br/>
          PARA FERRETERÍAS
        </h1>
        <p class="hero-subtitle">
          Control total de inventario, ventas y clientes. Sin complicaciones.
        </p>
        <div class="hero-actions">
          <Link to="/register">
            <Button size="lg">
              EMPEZAR AHORA
              <ArrowRight size={20} />
            </Button>
          </Link>
          <Link to="/demo">
            <Button variant="outline" size="lg">VER DEMO</Button>
          </Link>
        </div>
        <p class="hero-note">Sin tarjeta • 30 días gratis • Soporte incluido</p>
      </div>
    </div>
  </section>

  <section class="stats">
    <div class="container">
      <div class="stats-grid">
        <div class="stat-item">
          <div class="stat-number">200+</div>
          <div class="stat-label">Ferreterías activas</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">45min</div>
          <div class="stat-label">Tiempo ahorrado/día</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">98%</div>
          <div class="stat-label">Menos errores</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">24/7</div>
          <div class="stat-label">Acceso total</div>
        </div>
      </div>
    </div>
  </section>

  <section class="features">
    <div class="container">
      <div class="section-header">
        <h2>FUNCIONALIDADES PRINCIPALES</h2>
        <p>Todo lo que necesitas para gestionar tu ferretería eficientemente</p>
      </div>
      
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon">
            <Package size={40} strokeWidth={2.5} />
          </div>
          <h3>CONTROL DE INVENTARIO</h3>
          <p>Gestión en tiempo real de productos, stock y movimientos. Alertas automáticas.</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon">
            <Zap size={40} strokeWidth={2.5} />
          </div>
          <h3>VELOCIDAD EXTREMA</h3>
          <p>Atiende más clientes en menos tiempo. Cada segundo cuenta.</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon">
            <TrendingUp size={40} strokeWidth={2.5} />
          </div>
          <h3>ANÁLISIS DE VENTAS</h3>
          <p>Reportes detallados de ventas y tendencias de tu negocio.</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon">
            <BarChart3 size={40} strokeWidth={2.5} />
          </div>
          <h3>DASHBOARD COMPLETO</h3>
          <p>Métricas clave y KPIs en un solo lugar.</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon">
            <Shield size={40} strokeWidth={2.5} />
          </div>
          <h3>SEGURIDAD TOTAL</h3>
          <p>Datos encriptados y backups automáticos.</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon">
            <Users size={40} strokeWidth={2.5} />
          </div>
          <h3>GESTIÓN DE EQUIPO</h3>
          <p>Múltiples usuarios con permisos personalizados.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="pricing">
    <div class="container">
      <div class="section-header">
        <h2>PLANES SIMPLES</h2>
        <p>Elige el plan que se adapte a tu ferretería</p>
      </div>
      
      <div class="pricing-grid">
        <div class="pricing-card">
          <h3>BÁSICO</h3>
          <div class="price">
            <span class="amount">$29</span>
            <span class="period">/mes</span>
          </div>
          <ul class="features-list">
            <li><Check size={20} /> 1 Usuario</li>
            <li><Check size={20} /> 500 Productos</li>
            <li><Check size={20} /> Reportes básicos</li>
            <li><Check size={20} /> Soporte por email</li>
          </ul>
          <Button variant="outline" class="w-full">SELECCIONAR</Button>
        </div>

        <div class="pricing-card featured">
          <div class="badge">MÁS POPULAR</div>
          <h3>PROFESIONAL</h3>
          <div class="price">
            <span class="amount">$69</span>
            <span class="period">/mes</span>
          </div>
          <ul class="features-list">
            <li><Check size={20} /> 5 Usuarios</li>
            <li><Check size={20} /> Productos ilimitados</li>
            <li><Check size={20} /> Reportes avanzados</li>
            <li><Check size={20} /> Soporte prioritario</li>
            <li><Check size={20} /> API access</li>
          </ul>
          <Button class="w-full">SELECCIONAR</Button>
        </div>

        <div class="pricing-card">
          <h3>EMPRESA</h3>
          <div class="price">
            <span class="amount">$149</span>
            <span class="period">/mes</span>
          </div>
          <ul class="features-list">
            <li><Check size={20} /> Usuarios ilimitados</li>
            <li><Check size={20} /> Todo ilimitado</li>
            <li><Check size={20} /> Análisis avanzado</li>
            <li><Check size={20} /> Soporte 24/7</li>
            <li><Check size={20} /> Onboarding dedicado</li>
          </ul>
          <Button variant="outline" class="w-full">SELECCIONAR</Button>
        </div>
      </div>
    </div>
  </section>

  <section class="cta">
    <div class="container">
      <div class="cta-content">
        <h2>EMPIEZA HOY MISMO</h2>
        <p>Prueba gratis durante 30 días. Sin tarjeta de crédito.</p>
        <Link to="/register">
          <Button size="lg">
            CREAR CUENTA GRATIS
            <ArrowRight size={20} />
          </Button>
        </Link>
      </div>
    </div>
  </section>

  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-brand">
          <div class="logo">
            <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="4" width="24" height="24" stroke="currentColor" stroke-width="3"/>
              <path d="M12 12L16 8L20 12" stroke="currentColor" stroke-width="3" stroke-linecap="square"/>
              <path d="M16 8V20" stroke="currentColor" stroke-width="3" stroke-linecap="square"/>
            </svg>
            <span>FERRELINK</span>
          </div>
          <p>Sistema de gestión para ferreterías modernas</p>
        </div>
        
        <div class="footer-links">
          <div>
            <h4>PRODUCTO</h4>
            <a href="#features">Funcionalidades</a>
            <a href="#pricing">Precios</a>
            <a href="/demo">Demo</a>
          </div>
          <div>
            <h4>EMPRESA</h4>
            <a href="/about">Nosotros</a>
            <a href="/contact">Contacto</a>
            <a href="/blog">Blog</a>
          </div>
          <div>
            <h4>LEGAL</h4>
            <a href="/privacy">Privacidad</a>
            <a href="/terms">Términos</a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2026 FerreLink. Todos los derechos reservados.</p>
      </div>
    </div>
  </footer>
</div>

<style>
  .landing-page {
    min-height: 100vh;
  }

  /* NAV */
  .nav {
    border-bottom: 3px solid var(--border-primary);
    background-color: var(--background);
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .nav-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 5rem;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 1.25rem;
    font-weight: 700;
    letter-spacing: 1px;
  }

  .nav-actions {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  /* HERO */
  .hero {
    padding: 6rem 0;
    border-bottom: 3px solid var(--border-primary);
  }

  .hero-content {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
  }

  .hero-title {
    font-size: 4rem;
    font-weight: 700;
    line-height: 1;
    margin-bottom: 1.5rem;
    letter-spacing: -2px;
  }

  .hero-subtitle {
    font-size: 1.5rem;
    color: var(--fg-tertiary);
    margin-bottom: 2rem;
    line-height: 1.4;
  }

  .hero-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-bottom: 1.5rem;
  }

  .hero-note {
    color: var(--fg-muted);
    font-size: 0.875rem;
  }

  /* STATS */
  .stats {
    padding: 3rem 0;
    border-bottom: 3px solid var(--border-primary);
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
  }

  .stat-item {
    text-align: center;
  }

  .stat-number {
    font-size: 3rem;
    font-weight: 700;
    color: var(--primary);
    line-height: 1;
  }

  .stat-label {
    margin-top: 0.5rem;
    color: var(--fg-tertiary);
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  /* SECTIONS */
  .features,
  .pricing,
  .cta {
    padding: 6rem 0;
    border-bottom: 3px solid var(--border-primary);
  }

  .section-header {
    text-align: center;
    margin-bottom: 4rem;
  }

  .section-header h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    letter-spacing: -1px;
  }

  .section-header p {
    font-size: 1.125rem;
    color: var(--fg-tertiary);
  }

  /* FEATURES */
  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }

  .feature-card {
    padding: 2.5rem;
    border: 3px solid var(--border-primary);
    background-color: var(--card);
    box-shadow: 8px 8px 0 0 var(--border-primary);
    transition: all var(--transition-base);
  }

  .feature-card:hover {
    transform: translate(-2px, -2px);
    box-shadow: 10px 10px 0 0 var(--border-primary);
  }

  .feature-icon {
    width: 4rem;
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 3px solid var(--border-primary);
    margin-bottom: 1.5rem;
    color: var(--primary);
  }

  .feature-card h3 {
    font-size: 1.125rem;
    margin-bottom: 0.75rem;
    letter-spacing: 0.5px;
  }

  .feature-card p {
    color: var(--fg-tertiary);
    line-height: 1.6;
  }

  /* PRICING */
  .pricing-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    max-width: 1100px;
    margin: 0 auto;
  }

  .pricing-card {
    padding: 2.5rem;
    border: 3px solid var(--border-primary);
    background-color: var(--card);
    box-shadow: 8px 8px 0 0 var(--border-primary);
    position: relative;
    transition: all var(--transition-base);
  }

  .pricing-card:hover {
    transform: translate(-2px, -2px);
    box-shadow: 10px 10px 0 0 var(--border-primary);
  }

  .pricing-card.featured {
    border-color: var(--primary);
    box-shadow: 8px 8px 0 0 var(--primary);
  }

  .pricing-card.featured:hover {
    box-shadow: 10px 10px 0 0 var(--primary);
  }

  .badge {
    position: absolute;
    top: -12px;
    right: 1.5rem;
    background-color: var(--primary);
    color: var(--primary-foreground);
    padding: 0.25rem 0.75rem;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 1px;
  }

  .pricing-card h3 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    letter-spacing: 0.5px;
  }

  .price {
    margin-bottom: 2rem;
    display: flex;
    align-items: baseline;
    gap: 0.5rem;
  }

  .amount {
    font-size: 3rem;
    font-weight: 700;
    line-height: 1;
  }

  .period {
    color: var(--fg-tertiary);
    font-size: 1.125rem;
  }

  .features-list {
    list-style: none;
    margin-bottom: 2rem;
  }

  .features-list li {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 0;
    border-bottom: 1px solid var(--border-primary);
  }

  .features-list li:last-child {
    border-bottom: none;
  }

  /* CTA */
  .cta {
    background-color: var(--primary);
    color: var(--primary-foreground);
    border: none;
  }

  .cta-content {
    text-align: center;
    max-width: 700px;
    margin: 0 auto;
  }

  .cta-content h2 {
    font-size: 3rem;
    margin-bottom: 1rem;
    letter-spacing: -1px;
  }

  .cta-content p {
    font-size: 1.25rem;
    margin-bottom: 2rem;
    opacity: 0.9;
  }

  /* FOOTER */
  .footer {
    padding: 4rem 0 2rem;
    background-color: var(--bg-elevated);
  }

  .footer-content {
    display: grid;
    grid-template-columns: 2fr 3fr;
    gap: 4rem;
    margin-bottom: 3rem;
  }

  .footer-brand p {
    color: var(--fg-tertiary);
    margin-top: 1rem;
  }

  .footer-links {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }

  .footer-links h4 {
    font-size: 0.875rem;
    margin-bottom: 1rem;
    letter-spacing: 1px;
  }

  .footer-links a {
    display: block;
    color: var(--fg-tertiary);
    margin-bottom: 0.5rem;
    transition: color var(--transition-fast);
  }

  .footer-links a:hover {
    color: var(--primary);
  }

  .footer-bottom {
    padding-top: 2rem;
    border-top: 1px solid var(--border-primary);
    text-align: center;
    color: var(--fg-muted);
    font-size: 0.875rem;
  }

  @media (max-width: 768px) {
    .hero-title {
      font-size: 2.5rem;
    }

    .hero-subtitle {
      font-size: 1.125rem;
    }

    .hero-actions {
      flex-direction: column;
    }

    .features-grid,
    .pricing-grid {
      grid-template-columns: 1fr;
    }

    .footer-content {
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    .footer-links {
      grid-template-columns: 1fr;
    }
  }
</style>
