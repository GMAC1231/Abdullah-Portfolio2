import {
  BarChart3,
  BatteryCharging,
  BellRing,
  Bike,
  BookOpenCheck,
  BriefcaseBusiness,
  CheckCircle2,
  CirclePlay,
  Clock3,
  CloudRain,
  CloudSun,
  CodeXml,
  Coffee,
  CreditCard,
  Droplets,
  Flower2,
  FolderKanban,
  Gamepad2,
  Gauge,
  LayoutDashboard,
  Leaf,
  ListChecks,
  LocateFixed,
  MapPin,
  MessageCircle,
  MoonStar,
  Navigation,
  Package,
  PackageCheck,
  Pizza,
  Scale,
  Search,
  ShoppingBag,
  ShoppingBasket,
  ShoppingCart,
  Smartphone,
  Soup,
  Sparkles,
  Star,
  Sun,
  TimerReset,
  UserRoundCheck,
  UsersRound,
  UtensilsCrossed,
  Waves,
  Wind,
  Wrench,
} from "lucide-react";
import type { Project } from "@/data/portfolio";

const icons = {
  dashboard: LayoutDashboard,
  services: BriefcaseBusiness,
  commerce: PackageCheck,
  scooter: Bike,
  weather: CloudSun,
  mobile: Smartphone,
  guide: BookOpenCheck,
  portfolio: CodeXml,
  flower: Flower2,
  meditation: MoonStar,
  food: UtensilsCrossed,
  game: Gamepad2,
};

export default function ProjectVisual({
  project,
  compact = false,
}: {
  project: Project;
  compact?: boolean;
}) {
  const Icon = icons[project.visual];

  return (
    <div
      className={`project-visual project-visual--${project.visual} ${
        compact ? "project-visual--compact" : ""
      }`}
    >
      <div className="visual-grid" />
      <div className="visual-orb visual-orb--one" />
      <div className="visual-orb visual-orb--two" />

      <div className="project-visual-top">
        <span className="visual-icon">
          <Icon size={compact ? 24 : 30} />
        </span>

        <span className="visual-status">
          <i />
          {project.liveUrl
            ? "Live project"
            : project.deploymentUrl
              ? "Deployment ready"
              : project.githubUrl
                ? "Source available"
                : "Project concept"}
        </span>
      </div>

      <div className="visual-window">
        <div className="visual-window-bar">
          <span />
          <span />
          <span />
        </div>

        <div className="visual-window-content">
          <div className="visual-side-rail">
            <span className="active" />
            <span />
            <span />
            <span />
          </div>

          <div className="visual-main">
            <div className="visual-metrics">
              <span />
              <span />
              <span />
            </div>

            <div className="visual-chart">
              <BarChart3 size={compact ? 35 : 54} />
              <i />
              <i />
              <i />
              <i />
            </div>

            <div className="visual-list">
              <span>
                <UsersRound size={13} />
              </span>
              <span />
              <span />
            </div>
          </div>
        </div>
      </div>

      {project.visual === "dashboard" ? (
        <div
          className="visual-special visual-special--taskflow"
          aria-hidden="true"
        >
          <div className="taskflow-preview">
            <aside className="taskflow-preview-sidebar">
              <span className="taskflow-preview-logo">
                <FolderKanban size={compact ? 15 : 19} />
              </span>

              <i className="active" />
              <i />
              <i />
              <i />
            </aside>

            <div className="taskflow-preview-main">
              <header className="taskflow-preview-header">
                <div>
                  <small>PROJECT WORKSPACE</small>
                  <b>TaskFlow</b>
                </div>

                <div className="taskflow-preview-tools">
                  <Search size={compact ? 12 : 15} />
                  <BellRing size={compact ? 12 : 15} />
                  <span>AM</span>
                </div>
              </header>

              <div className="taskflow-preview-stats">
                <span className="taskflow-preview-stat">
                  <i aria-hidden="true">
                    <FolderKanban size={compact ? 10 : 13} />
                  </i>
                  <span>
                    <small>PROJECTS</small>
                    <b>08</b>
                  </span>
                </span>

                <span className="taskflow-preview-stat">
                  <i aria-hidden="true">
                    <CheckCircle2 size={compact ? 10 : 13} />
                  </i>
                  <span>
                    <small>COMPLETED</small>
                    <b>24</b>
                  </span>
                </span>

                <span className="taskflow-preview-stat">
                  <i aria-hidden="true">
                    <Gauge size={compact ? 10 : 13} />
                  </i>
                  <span>
                    <small>PROGRESS</small>
                    <b>78%</b>
                  </span>
                </span>
              </div>

              <div className="taskflow-preview-board">
                <section>
                  <header>
                    <Clock3 size={compact ? 11 : 14} />
                    TO DO
                  </header>

                  <article>
                    <i className="priority priority--cyan" />
                    <b>Portfolio update</b>
                    <span>
                      <UserRoundCheck size={10} />
                      Today
                    </span>
                  </article>

                  <article>
                    <i className="priority priority--purple" />
                    <b>Firebase rules</b>
                    <span>
                      <UserRoundCheck size={10} />
                      Review
                    </span>
                  </article>
                </section>

                <section>
                  <header>
                    <Gauge size={compact ? 11 : 14} />
                    WORKING
                  </header>

                  <article>
                    <i className="priority priority--green" />
                    <b>Dashboard UI</b>
                    <span>
                      <UserRoundCheck size={10} />
                      75%
                    </span>
                  </article>
                </section>

                <section>
                  <header>
                    <CheckCircle2 size={compact ? 11 : 14} />
                    DONE
                  </header>

                  <article>
                    <i className="priority priority--gold" />
                    <b>Authentication</b>
                    <span>
                      <CheckCircle2 size={10} />
                      Complete
                    </span>
                  </article>
                </section>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {project.visual === "services" ? (
        <div
          className="visual-special visual-special--smartfix"
          aria-hidden="true"
        >
          <div className="smartfix-preview">
            <div className="smartfix-preview-phone">
              <header>
                <span>9:41</span>
                <BellRing size={compact ? 11 : 14} />
              </header>

              <div className="smartfix-preview-greeting">
                <small>WELCOME BACK</small>
                <b>Find trusted services</b>
              </div>

              <div className="smartfix-preview-search">
                <Search size={compact ? 12 : 15} />
                <span>What service do you need?</span>
              </div>

              <div className="smartfix-preview-services">
                <span>
                  <Wrench size={compact ? 15 : 20} />
                  <small>Repair</small>
                </span>

                <span>
                  <Sparkles size={compact ? 15 : 20} />
                  <small>Cleaning</small>
                </span>

                <span>
                  <Waves size={compact ? 15 : 20} />
                  <small>Plumbing</small>
                </span>
              </div>

              <div className="smartfix-preview-request">
                <div>
                  <small>ACTIVE REQUEST</small>
                  <b>AC Maintenance</b>
                  <span>
                    <MapPin size={10} />
                    Muscat, Oman
                  </span>
                </div>

                <i>Open</i>
              </div>
            </div>

            <div className="smartfix-provider-card">
              <div className="smartfix-provider-avatar">
                <UserRoundCheck size={compact ? 17 : 24} />
              </div>

              <div>
                <small>AVAILABLE PROVIDER</small>
                <b>Ahmed Services</b>

                <span>
                  <Star size={11} />
                  4.9 rating
                </span>
              </div>

              <MessageCircle size={compact ? 15 : 20} />
            </div>
          </div>
        </div>
      ) : null}

      {project.visual === "commerce" ? (
        <div
          className="visual-special visual-special--commerce"
          aria-hidden="true"
        >
          <div className="commerce-preview">
            <header className="commerce-preview-nav">
              <span>
                <ShoppingBag size={compact ? 14 : 18} />
                <b>MODERN STORE</b>
              </span>

              <div>
                <Search size={compact ? 12 : 15} />
                <ShoppingCart size={compact ? 12 : 15} />
                <i>3</i>
              </div>
            </header>

            <div className="commerce-preview-content">
              <section className="commerce-preview-products">
                <div className="commerce-preview-heading">
                  <div>
                    <small>NEW COLLECTION</small>
                    <b>Featured products</b>
                  </div>

                  <span>View all</span>
                </div>

                <div className="commerce-preview-grid">
                  <article>
                    <span className="product-image product-image--one">
                      <Package size={compact ? 18 : 27} />
                    </span>

                    <small>Premium Product</small>
                    <b>$45.00</b>
                  </article>

                  <article>
                    <span className="product-image product-image--two">
                      <ShoppingBag size={compact ? 18 : 27} />
                    </span>

                    <small>Daily Essential</small>
                    <b>$28.00</b>
                  </article>

                  <article>
                    <span className="product-image product-image--three">
                      <Sparkles size={compact ? 18 : 27} />
                    </span>

                    <small>New Arrival</small>
                    <b>$36.00</b>
                  </article>
                </div>
              </section>

              <aside className="commerce-preview-cart">
                <header>
                  <ShoppingCart size={compact ? 13 : 17} />
                  <b>Your cart</b>
                </header>

                <div className="commerce-cart-item">
                  <i />
                  <span>
                    <small>Product item</small>
                    <b>$45.00</b>
                  </span>
                </div>

                <div className="commerce-cart-item">
                  <i />
                  <span>
                    <small>Product item</small>
                    <b>$28.00</b>
                  </span>
                </div>

                <footer>
                  <span>
                    <small>TOTAL</small>
                    <b>$73.00</b>
                  </span>

                  <span className="commerce-preview-checkout">
                    <CreditCard size={compact ? 11 : 14} />
                    Checkout
                  </span>
                </footer>
              </aside>
            </div>
          </div>
        </div>
      ) : null}

      {project.visual === "scooter" ? (
        <div
          className="visual-special visual-special--scooter"
          aria-hidden="true"
        >
          <div className="scooter-preview">
            <div className="scooter-preview-map">
              <span className="map-road map-road--one" />
              <span className="map-road map-road--two" />
              <span className="map-road map-road--three" />

              <i className="map-pin map-pin--one">
                <Bike size={compact ? 12 : 16} />
              </i>

              <i className="map-pin map-pin--two">
                <Bike size={compact ? 12 : 16} />
              </i>

              <i className="map-pin map-pin--three">
                <Bike size={compact ? 12 : 16} />
              </i>

              <span className="map-current-location">
                <LocateFixed size={compact ? 13 : 17} />
              </span>
            </div>

            <div className="scooter-preview-panel">
              <header>
                <div>
                  <small>NEAREST SCOOTER</small>
                  <b>Scooter #204</b>
                </div>

                <Navigation size={compact ? 15 : 21} />
              </header>

              <div className="scooter-preview-bike">
                <Bike size={compact ? 39 : 58} />

                <span>
                  <small>DISTANCE</small>
                  <b>120 m</b>
                </span>
              </div>

              <div className="scooter-preview-details">
                <span>
                  <BatteryCharging size={compact ? 12 : 16} />
                  <small>86%</small>
                </span>

                <span>
                  <Gauge size={compact ? 12 : 16} />
                  <small>25 km</small>
                </span>
              </div>

              <span className="scooter-preview-unlock">
                Unlock scooter
              </span>
            </div>
          </div>
        </div>
      ) : null}

      {project.visual === "weather" ? (
        <div
          className="visual-special visual-special--weather"
          aria-hidden="true"
        >
          <div className="weather-preview-phone">
            <header className="weather-preview-header">
              <div>
                <span>
                  <MapPin size={compact ? 11 : 14} />
                  Muscat
                </span>

                <small>Sunday, 19 July</small>
              </div>

              <BellRing size={compact ? 13 : 17} />
            </header>

            <div className="weather-preview-current">
              <div>
                <small>CURRENT WEATHER</small>
                <b>34°</b>
                <span>Partly cloudy</span>
              </div>

              <span className="weather-preview-sun">
                <Sun size={compact ? 35 : 52} />
                <CloudSun size={compact ? 42 : 62} />
              </span>
            </div>

            <div className="weather-preview-details">
              <span>
                <Wind size={compact ? 13 : 17} />
                <small>Wind</small>
                <b>12 km/h</b>
              </span>

              <span>
                <Droplets size={compact ? 13 : 17} />
                <small>Humidity</small>
                <b>58%</b>
              </span>

              <span>
                <CloudRain size={compact ? 13 : 17} />
                <small>Rain</small>
                <b>10%</b>
              </span>
            </div>

            <div className="weather-preview-forecast">
              <span>
                <small>MON</small>
                <Sun size={compact ? 12 : 17} />
                <b>35°</b>
              </span>

              <span>
                <small>TUE</small>
                <CloudSun size={compact ? 12 : 17} />
                <b>33°</b>
              </span>

              <span>
                <small>WED</small>
                <CloudRain size={compact ? 12 : 17} />
                <b>31°</b>
              </span>

              <span>
                <small>THU</small>
                <Sun size={compact ? 12 : 17} />
                <b>36°</b>
              </span>
            </div>
          </div>
        </div>
      ) : null}

      {project.visual === "guide" ? (
        <div
          className="visual-special visual-special--guide"
          aria-hidden="true"
        >
          <div className="rule-guide-mini">
            <div className="rule-guide-cover">
              <BookOpenCheck size={compact ? 24 : 34} />
              <span>
                <small>PROFESSIONAL GUIDE</small>
                <b>MONOPOLY RULES</b>
              </span>
            </div>

            <div className="rule-guide-layout">
              <aside className="rule-guide-index">
                <span className="active">01</span>
                <span>02</span>
                <span>03</span>
                <span>04</span>
              </aside>

              <div className="rule-guide-page">
                <div className="rule-guide-heading">
                  <ListChecks size={compact ? 17 : 21} />
                  <span>
                    <b>HOW TO PLAY</b>
                    <i />
                  </span>
                </div>

                <div className="rule-guide-lines">
                  <i />
                  <i />
                  <i />
                  <i />
                </div>

                <div className="rule-guide-callout">
                  <Scale size={compact ? 14 : 17} />
                  <span>Clear rules · Quick reference</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {project.visual === "portfolio" ? (
        <div
          className="visual-special visual-special--portfolio"
          aria-hidden="true"
        >
          <div className="portfolio-browser-mini">
            <div className="portfolio-mini-nav">
              <i />
              <i />
              <i />
              <span />
            </div>

            <div className="portfolio-mini-hero">
              <div>
                <small>HELLO, I AM</small>
                <b>ABDULLAH</b>
                <span />
              </div>
              <i className="portfolio-avatar-mini" />
            </div>

            <div className="portfolio-mini-cards">
              <i />
              <i />
              <i />
            </div>
          </div>
        </div>
      ) : null}

      {project.visual === "flower" ? (
        <div
          className="visual-special visual-special--flower"
          aria-hidden="true"
        >
          <div className="flower-shop-mini">
            <div className="flower-mini-nav">
              <span className="flower-mini-brand">
                <Leaf size={compact ? 14 : 18} />
                <b>GREEN BLOOM</b>
              </span>

              <span className="flower-mini-cart">
                <ShoppingBasket size={compact ? 14 : 18} />
                <i>2</i>
              </span>
            </div>

            <div className="flower-mini-hero">
              <div>
                <small>FRESH COLLECTION</small>
                <b>Bring nature home.</b>
                <span />
              </div>

              <span className="flower-mini-feature">
                <Flower2 size={compact ? 36 : 52} />
                <i />
              </span>
            </div>

            <div className="flower-mini-products">
              <span>
                <Leaf size={compact ? 15 : 19} />
                <i />
                <b>$18</b>
              </span>

              <span>
                <Flower2 size={compact ? 15 : 19} />
                <i />
                <b>$24</b>
              </span>

              <span>
                <Sparkles size={compact ? 15 : 19} />
                <i />
                <b>$16</b>
              </span>
            </div>
          </div>
        </div>
      ) : null}

      {project.visual === "meditation" ? (
        <div
          className="visual-special visual-special--meditation"
          aria-hidden="true"
        >
          <div className="meditation-phone-mini">
            <div className="meditation-mini-top">
              <span>9:41</span>
              <MoonStar size={compact ? 13 : 16} />
            </div>

            <div className="meditation-mini-copy">
              <small>DAILY CALM</small>
              <b>Mindful breathing</b>
              <span>Slow down · Focus · Reset</span>
            </div>

            <div className="meditation-mini-orbit">
              <i className="orbit orbit--one" />
              <i className="orbit orbit--two" />

              <span>
                <Waves size={compact ? 22 : 29} />
                <b>10:00</b>
              </span>
            </div>

            <div className="meditation-mini-progress">
              <i />
            </div>

            <div className="meditation-mini-controls">
              <span>
                <TimerReset size={compact ? 14 : 18} />
              </span>

              <span className="meditation-mini-play">
                <CirclePlay size={compact ? 28 : 38} />
              </span>

              <span>
                <Sparkles size={compact ? 14 : 18} />
              </span>
            </div>
          </div>
        </div>
      ) : null}

      {project.visual === "food" ? (
        <div
          className="visual-special visual-special--food"
          aria-hidden="true"
        >
          <div className="neon-food-mini">
            <div className="neon-food-nav">
              <span>
                <UtensilsCrossed size={compact ? 14 : 18} />
                <b>NEON FOOD</b>
              </span>

              <span className="neon-food-cart">
                <ShoppingCart size={compact ? 14 : 18} />
                <i>3</i>
              </span>
            </div>

            <div className="neon-food-hero">
              <div>
                <small>ONLINE FOOD EXPRESS</small>
                <b>Fresh taste. Fast order.</b>
                <span>Explore menu</span>
              </div>

              <div className="neon-food-orbit">
                <Pizza size={compact ? 35 : 52} />
                <i />
              </div>
            </div>

            <div className="neon-food-menu">
              <span>
                <Pizza size={compact ? 15 : 20} />
                <i />
                <b>$8.90</b>
              </span>

              <span>
                <Soup size={compact ? 15 : 20} />
                <i />
                <b>$6.50</b>
              </span>

              <span>
                <Coffee size={compact ? 15 : 20} />
                <i />
                <b>$3.80</b>
              </span>
            </div>
          </div>
        </div>
      ) : null}

      <div className="project-visual-label">
        <small>{project.eyebrow}</small>
        <strong>{project.shortTitle}</strong>
      </div>
    </div>
  );
}
