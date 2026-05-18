// Magazine App Initialization
document.addEventListener('DOMContentLoaded', () => {
    initMagazine();
});

function initMagazine() {
    // Loading sequence
    setTimeout(() => {
        document.querySelector('.magazine-loader').classList.add('fade-out');
    }, 2800);
    
    // Initialize all magazine features
    initNavigation();
    initScrollEffects();
    initAnimations();
    initSearch();
    initMenu();
    initDarkMode();
    
    // Track home page
    trackView('home');
}

// === NAVIGATION ===
function initNavigation() {
    document.querySelectorAll('[data-page]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.dataset.page;
            showPage(page);
        });
    });
}

function showPage(pageId) {
    document.querySelectorAll('.magazine-page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId)?.classList.add('active');
    
    // Update nav
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.toggle('active', item.dataset.page === pageId);
    });
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
    trackView(pageId);
}

// === MENU SYSTEM ===
let menuOpen = false;
function toggleMainMenu() {
    const overlay = document.getElementById('mainMenuOverlay');
    menuOpen = !menuOpen;
    overlay.classList.toggle('active', menuOpen);
    document.body.style.overflow = menuOpen ? 'hidden' : '';
}

// Close menu on overlay click
document.getElementById('mainMenuOverlay')?.addEventListener('click', (e) => {
    if (e.target.id === 'mainMenuOverlay') toggleMainMenu();
});

// === SCROLL EFFECTS ===
function initScrollEffects() {
    let ticking = false;
    
    function updateScroll() {
        const scroll = window.scrollY;
        
        // Parallax hero
        const heroImage = document.querySelector('.hero-image');
        if (heroImage) {
            heroImage.style.transform = `translateY(${scroll * 0.3}px)`;
        }
        
        // Fade sections
        document.querySelectorAll('.glass-card').forEach((card, index) => {
            const rect = card.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
        
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateScroll);
            ticking = true;
        }
    });
}

// === ANIMATIONS ===
function initAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.glass-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px) scale(0.95)';
        card.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
        observer.observe(card);
    });
}

// === SEARCH ===
function initSearch() {
    const searchInput = document.querySelector('.magazine-search input');
    
    searchInput?.addEventListener('focus', () => {
        searchInput.parentElement.classList.add('focused');
    });
    
    searchInput?.addEventListener('blur', () => {
        searchInput.parentElement.classList.remove('focused');
    });
}

// === DARK MODE ===
function initDarkMode() {
    const toggle = document.querySelector('.dark-mode-toggle');
    toggle?.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        // Save preference
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });
    
    // Load preference
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
}

// === TRACKING ===
function trackView(page) {
    console.log(`📖 Magazine View: ${page}`);
    gtag?.('event', 'page_view', { page_title: page });
}

// === CATEGORY CHIPS ===
document.addEventListener('click', (e) => {
    if (e.target.closest('.category-chip')) {
        const chip = e.target.closest('.category-chip');
        chip.style.transform = 'scale(0.95)';
        setTimeout(() => chip.style.transform = '', 150);
        
        console.log('📱 Category:', chip.textContent.trim());
    }
});

// === ENGAGEMENT BUTTONS ===
document.addEventListener('click', (e) => {
    if (e.target.closest('.bookmark-btn')) {
        const btn = e.target.closest('.bookmark-btn');
        btn.classList.toggle('active');
    }
    
    if (e.target.closest('.share-btn')) {
        navigator.share?.({
            title: 'تك تُوب',
            url: window.location.href
        });
    }
});

// === PERFORMANCE OPTIMIZATIONS ===
if ('IntersectionObserver' in window === false) {
    // Polyfill needed
    console.warn('IntersectionObserver not supported');
}

// PWA Ready
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
}// Add staggered animation for new sections
function initStaggeredAnimations() {
    const controller = new ScrollMagic.Controller();
    
    // Trending cards stagger
    const trendingCards = document.querySelectorAll('.trending-card');
    trendingCards.forEach((card, index) => {
        new ScrollMagic.Scene({
            triggerElement: card,
            triggerHook: 0.8,
            offset: -50
        })
        .setTween(card, 0.6, {opacity: 1, y: 0, scale: 1})
        .addTo(controller);
    });
}

// Initialize in your initMagazine()
initStaggeredAnimations();
// Newsletter form
document.querySelector('.newsletter-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = e.target.querySelector('input');
    alert('شكراً لاشتراكك في النشرة الإخبارية! 📧');
    input.value = '';
});

// Category hover effects
document.querySelectorAll('.cat-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateX(-4px)';
    });
    item.addEventListener('mouseleave', () => {
        item.style.transform = '';
    });
});
// APK Website Features
const appsData = {
    whatsapp: {
        icon: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg',
        title: 'واتساب',
        developer: 'WhatsApp LLC',
        version: '2.24.1.77',
        rating: 4.9,
        downloads: '1.2B',
        size: '10.2 MB',
        downloadUrl: '#'
    },
    tiktok: {
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Tiktok_icon.svg/1280px-Tiktok_icon.svg.png',
        title: 'تيك توك',
        developer: 'TikTok Pte. Ltd.',
        version: '34.1.5',
        rating: 4.6,
        downloads: '892M',
        size: '145 MB',
        downloadUrl: '#'
    }
};

// Search Suggestions
function initSearchSuggestions() {
    const searchInput = document.getElementById('mainSearch');
    const mobileSearch = document.getElementById('mobileSearch');
    const suggestions = document.getElementById('searchSuggestions');
    const mobileSuggestions = document.getElementById('mobileSearchSuggestions');

    const inputs = [searchInput, mobileSearch];
    const suggContainers = [suggestions, mobileSuggestions];

    inputs.forEach((input, index) => {
        if (!input) return;

        input.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const container = suggContainers[index];
            
            if (query.length < 2) {
                container.classList.remove('active');
                return;
            }

            // Show suggestions
            const filteredApps = Object.values(appsData).filter(app => 
                app.title.toLowerCase().includes(query) || 
                app.developer.toLowerCase().includes(query)
            );

            container.innerHTML = filteredApps.slice(0, 5).map(app => `
                <div class="suggestion-item" onclick="selectSuggestion('${app.title}')">
                    <div class="suggestion-icon">
                        <img src="${app.icon}" alt="${app.title}">
                    </div>
                    <div class="suggestion-text">
                        <div class="suggestion-title">${app.title}</div>
                        <div class="suggestion-subtitle">${app.developer}</div>
                    </div>
                </div>
            `).join('');

            container.classList.add('active');
        });
    });
}

function selectSuggestion(title) {
    document.getElementById('mainSearch').value = title;
    document.getElementById('searchSuggestions').classList.remove('active');
    showAppDetails(Object.keys(appsData).find(key => appsData[key].title === title));
}

// Mobile Search Toggle
function toggleMobileSearch() {
    document.getElementById('mobileSearchOverlay').classList.toggle('active');
}

// App Download
function downloadApp(appId) {
    const app = appsData[appId];
    if (app) {
        // Simulate download
        const btn = event.target.closest('.app-download-btn');
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري التحميل...';
        setTimeout(() => {
            alert(`تم تحميل ${app.title} بنجاح! 📱`);
            btn.innerHTML = `<i class="fab fa-android"></i> تحميل APK`;
        }, 2000);
    }
}

// App Details Page
function showAppDetails(appId) {
    const app = appsData[appId];
    if (!app) return;

    // Populate details
    document.getElementById('detailAppIcon').src = app.icon;
    document.getElementById('detailAppTitle').textContent = app.title;
    document.getElementById('detailAppDeveloper').textContent = app.developer;
    document.getElementById('detailAppRating').innerHTML = `
        <div class="stars">${'★'.repeat(Math.floor(app.rating)).padEnd(5, '☆')}</div>
        <span>${app.rating}</span> <span>(${Math.floor(Math.random()*1000)} تقييم)</span>
    `;
    
    showPage('appDetails');
}

// Floating Nav
function initFloatingNav() {
    document.querySelectorAll('.float-nav-item[data-page]').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const page = item.dataset.page;
            showPage(page);
            document.querySelectorAll('.float-nav-item').forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
        });
    });
}

// Initialize new features
function initApkFeatures() {
    initSearchSuggestions();
    initFloatingNav();
    
    // Hover animations
    document.querySelectorAll('.app-card').forEach((card, index) => {
        card.addEventListener('mouseenter', () => card.classList.add('animate-hover'));
        card.addEventListener('animationend', () => card.classList.remove('animate-hover'));
    });
}

// Update initMagazine()
function initMagazine() {
    setTimeout(() => {
        document.querySelector('.magazine-loader').classList.add('fade-out');
    }, 2800);
    
    initNavigation();
    initScrollEffects();
    initAnimations();
    initSearch();
    initMenu();
    initDarkMode();
    initApkFeatures(); // NEW
    
    trackView('home');
}

// Dark Mode Toggle
function initDarkMode() {
    const toggle = document.querySelector('.dark-mode-toggle');
    toggle?.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        document.documentElement.setAttribute('data-theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });
    
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        document.documentElement.setAttribute('data-theme', 'dark');
    }
}