// ================= ACTIVE NAV MENU =================
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".nav-link");
  const current = window.location.pathname.split("/").pop();

  links.forEach(link => {
    const href = link.getAttribute("href").split("/").pop();
    link.classList.remove("active");

    if (
      href === current ||
      (current === "" && href === "index.html")
    ) {
      link.classList.add("active");
    }
  });
});


// hero-swiper
const heroSwiper = new Swiper(".hero-swiper", {
  loop: true,
  speed: 900,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".hero-dots",
    clickable: true,
  },
  on: {
    slideChangeTransitionStart() {
      const active = this.slides[this.activeIndex];
      const bg = active.querySelector(".hero-content").dataset.bg;
      document.querySelector(".hero-section").style.backgroundImage =
        `url('${bg}')`;
    },
  },
});

// Set initial background
document.querySelector(".hero-section").style.backgroundImage =
  `url('${document.querySelector(".swiper-slide-active .hero-content").dataset.bg}')`;

/* ================= SIGNATURE MENU FILTER ================= */
const menuTabs = document.querySelectorAll(".menu-tabs .tab");
const productItems = document.querySelectorAll(".product-item");

menuTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    menuTabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");

    const filter = tab.dataset.filter;

    productItems.forEach((item) => {
      item.style.display =
        filter === "all" || item.dataset.category === filter ? "block" : "none";
    });
  });
});


/* ================= STATS COUNTER ================= */
const statSection = document.getElementById("stats");
const counters = document.querySelectorAll(".stat-number");
let statsStarted = false;

const startCounters = () => {
  counters.forEach(counter => {
    const target = Number(counter.dataset.target);
    const duration = 1500; // total animation time (ms)
    const startTime = performance.now();

    const update = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      counter.textContent = Math.floor(progress * target);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        counter.textContent = target;
      }
    };

    requestAnimationFrame(update);
  });
};

const observer = new IntersectionObserver(
  entries => {
    if (entries[0].isIntersecting && !statsStarted) {
      startCounters();
      statsStarted = true;
      observer.disconnect();
    }
  },
  { threshold: 0.5 }
);

observer.observe(statSection);

/* ================= GALLERY SWIPER ================= */

const swiperLeft = new Swiper(".swiper-left", {
  slidesPerView: "auto",
  spaceBetween: 25,
  loop: true,
  speed: 9000,
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
  },
  allowTouchMove: true,
});

const swiperRight = new Swiper(".swiper-right", {
  slidesPerView: "auto",
  spaceBetween: 25,
  loop: true,
  speed: 9000,
  autoplay: {
    delay: 0,
    reverseDirection: true,
    disableOnInteraction: false,
  },
  allowTouchMove: true,
});

/* Pause on hover */
document.querySelectorAll(".gallery-swiper").forEach(swiperEl => {
  swiperEl.addEventListener("mouseenter", () => {
    swiperEl.swiper.autoplay.stop();
  });
  swiperEl.addEventListener("mouseleave", () => {
    swiperEl.swiper.autoplay.start();
  });
});

/* ================= REVIEWS MARQUEE JS ================= */

/*
  This JS is intentionally light.
  It mirrors your Gallery JS behavior:
  - Handles hover pause safely
  - Ready if you later switch to Swiper or GSAP
  - No conflict with CSS marquee
*/

document.querySelectorAll(".reviews-track").forEach(track => {
  const inner = track.querySelector(".track-inner");

  track.addEventListener("mouseenter", () => {
    inner.style.animationPlayState = "paused";
  });

  track.addEventListener("mouseleave", () => {
    inner.style.animationPlayState = "running";
  });
});



/* ================= HABIT TABS (FIXED) ================= */
    const habitTabs = document.querySelectorAll(".tab-btn");
    const habitContents = document.querySelectorAll(".habit-content-grid");

    habitTabs.forEach(tab => {
      tab.addEventListener("click", () => {
        habitTabs.forEach(t => t.classList.remove("active"));
        habitContents.forEach(c => c.classList.remove("active"));

        tab.classList.add("active");
        document.getElementById(tab.dataset.tab).classList.add("active");
      });
    });

    
     const tabs = document.querySelectorAll(".siglab-tab");
  const items = document.querySelectorAll(".siglab-item");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      const filter = tab.dataset.filter;

      items.forEach(item => {
        if (filter === "all" || item.dataset.category === filter) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });