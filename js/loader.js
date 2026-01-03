/**
 * ==========================================
 * HTML SECTIONS LOADER WITH LANG SUPPORT
 * ==========================================
 * Loads language-specific HTML sections from sections/{lang}/ folder
 */

const SUPPORTED_LANGS = ["en", "sr"];
const DEFAULT_LANG = "en";

function detectLanguageFromPath() {
  const [firstSegment] = window.location.pathname.split("/").filter(Boolean);
  if (SUPPORTED_LANGS.includes(firstSegment)) {
    return firstSegment;
  }
  return DEFAULT_LANG;
}

function applyLanguageMeta(lang) {
  const metaConfig = {
    en: {
      title: "JoyFruits — Caribbean Luxury Rakia",
      description:
        "Ultra-premium single-fruit mango rakia. Handcrafted in the Dominican Republic. An exclusive Caribbean treasure.",
    },
    sr: {
      title: "JoyFruits — Premium rakija od manga",
      description:
        "Ultra-premijum rakija od manga. Ručno pravljena u Dominikanskoj Republici. Ekskluzivno karipsko blago.",
    },
  };

  const meta = metaConfig[lang] || metaConfig[DEFAULT_LANG];
  document.documentElement.lang = lang;

  if (meta) {
    const titleEl = document.querySelector("title");
    if (titleEl) titleEl.textContent = meta.title;

    const descEl = document.querySelector('meta[name="description"]');
    if (descEl) descEl.setAttribute("content", meta.description);
  }
}

const currentLang = detectLanguageFromPath();
window.currentLang = currentLang;
applyLanguageMeta(currentLang);

// Load a single section, with graceful fallback to default language
async function loadSection(containerId, sectionFile) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const primaryPath = `/sections/${currentLang}/${sectionFile}`;
  const fallbackPath = `/sections/${DEFAULT_LANG}/${sectionFile}`;

  const tryLoad = async (path) => {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.text();
  };

  try {
    const html = await tryLoad(primaryPath);
    container.innerHTML = html;
  } catch (primaryError) {
    if (currentLang !== DEFAULT_LANG) {
      console.warn(`⚠️ Falling back to default language for ${sectionFile}`);
      try {
        const html = await tryLoad(fallbackPath);
        container.innerHTML = html;
      } catch (fallbackError) {
        console.error(`Error loading ${sectionFile}:`, fallbackError);
      }
    } else {
      console.error(`Error loading ${sectionFile}:`, primaryError);
    }
  }
}

// Load all sections
async function loadAllSections() {
  console.log(`🚀 Loading all sections for lang: ${currentLang}`);

  try {
    await Promise.all([
      loadSection("header", "header.html"),
      loadSection("hero", "hero.html"),
      loadSection("process", "process.html"),
      loadSection("voyage", "voyage.html"),
      loadSection("product", "product.html"),
      loadSection("flavors", "flavors.html"),
      loadSection("gallery", "gallery.html"),
      loadSection("testimonials", "testimonials.html"),
      loadSection("cta", "cta.html"),
      loadSection("footer", "footer.html"),
    ]);

    console.log("✅ All sections loaded successfully!");

    // Initialize app after all sections are loaded
    if (typeof initApp === "function") {
      initApp();
    }
  } catch (error) {
    console.error("❌ Error loading sections:", error);
  }
}

// Start loading when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", loadAllSections);
} else {
  loadAllSections();
}
