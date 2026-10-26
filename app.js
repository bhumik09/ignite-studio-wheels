/**
 * ==============================================================================
 * IGNITE STUDIO WHEELS - Interactive Engine
 * ==============================================================================
 * 
 * 💡 INTERVIEW ARCHITECTURE HIGHLIGHTS:
 * 1. Data-Driven Architecture: Single source of truth in `carsData` array.
 * 2. Real-Time Dynamic Filtering: High-performance ES6 `filter()` algorithm.
 * 3. Creator "Tag & Save" Discount Logic: Instant 15% calculation when user
 *    opts to tag @ignite.wheels in their YouTube/Instagram content.
 * 4. Deep-Link Automation: Sanitized WhatsApp payload using `encodeURIComponent`.
 */

// ==========================================
// 1. DATA STORE: IGNITE Creator Fleet
// ==========================================
const carsData = [
  {
    id: "lambo-huracan",
    name: "Lamborghini Huracán Evo",
    category: "supercar",
    tag: "Viral Night Reel Magnet 🔥",
    hp: "631 HP",
    speed: "2.9s",
    engine: "5.2L Naturally Aspirated V10",
    priceShoot4Hr: 24999,
    priceDaily: 89999,
    image: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=900&q=80",
    description: "Screaming V10 exhaust tuned specifically for high-clarity external microphone recordings."
  },
  {
    id: "porsche-gt3rs",
    name: "Porsche 911 GT3 RS",
    category: "track",
    tag: "Track Day POV Beast 🏁",
    hp: "518 HP",
    speed: "3.0s",
    engine: "4.0L High-Rev Flat-6",
    priceShoot4Hr: 22999,
    priceDaily: 79999,
    image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=900&q=80",
    description: "Massive swan-neck rear wing & aerodynamic carbon body. Ideal for Buddh Circuit track vlogs."
  },
  {
    id: "mustang-gt",
    name: "Ford Mustang GT V8",
    category: "muscle",
    tag: "Creator B-Roll Favorite ⭐",
    hp: "450 HP",
    speed: "4.3s",
    engine: "5.0L Coyote V8",
    priceShoot4Hr: 11999,
    priceDaily: 34999,
    image: "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=900&q=80",
    description: "Classic deep American rumble. Perfect for lifestyle vlogs, gym reels, and urban edits."
  },
  {
    id: "audi-r8-spyder",
    name: "Audi R8 V10 Spyder",
    category: "spyder",
    tag: "Music Video Hero 🎬",
    hp: "602 HP",
    speed: "3.1s",
    engine: "5.2L Quattro V10",
    priceShoot4Hr: 21999,
    priceDaily: 74999,
    image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=900&q=80",
    description: "Convertible soft-top for golden hour sunset shots and 360-degree gimbal panning."
  },
  {
    id: "amg-g63-brabus",
    name: "Mercedes-AMG G63 Edition",
    category: "suv",
    tag: "VIP Convoy & Hype 🛡️",
    hp: "577 HP",
    speed: "4.5s",
    engine: "4.0L Bi-Turbo V8",
    priceShoot4Hr: 19999,
    priceDaily: 69999,
    image: "https://images.unsplash.com/photo-1520050206274-a1ae44613e6d?auto=format&fit=crop&w=900&q=80",
    description: "Matte Black G-Wagon presence with side-exit roaring exhausts. Top choice for celebrity shoots."
  },
  {
    id: "bmw-m4-comp",
    name: "BMW M4 Competition (G82)",
    category: "muscle",
    tag: "Rolling Shot Precision ⚡",
    hp: "503 HP",
    speed: "3.4s",
    engine: "3.0L Twin-Turbo S58",
    priceShoot4Hr: 14999,
    priceDaily: 44999,
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=900&q=80",
    description: "Aggressive front fascia with razor-sharp drift dynamics for cinematic rolling captures."
  }
];

// WhatsApp Business Contact (Update anytime)
const WHATSAPP_NUMBER = "919045206782";

// Currently Selected Car for Modal
let activeCarForBooking = null;

// ==========================================
// 2. DOM REFERENCES
// ==========================================
const fleetGrid = document.getElementById("fleet-grid");
const filterButtons = document.querySelectorAll(".filter-btn");
const searchInput = document.getElementById("search-input");
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

// Modal Elements
const bookingModal = document.getElementById("booking-modal");
const modalCarTitle = document.getElementById("modal-car-title");
const modalCarImage = document.getElementById("modal-car-image");
const modalPlanSelect = document.getElementById("modal-plan-select");
const modalLocationSelect = document.getElementById("modal-location-select");
const modalAddonGopro = document.getElementById("addon-gopro");
const modalAddonPilot = document.getElementById("addon-pilot");
const modalAddonLights = document.getElementById("addon-lights");
const modalCreatorDiscount = document.getElementById("addon-creator-discount");
const modalCreatorHandle = document.getElementById("creator-handle-input");
const modalDiscountBadge = document.getElementById("discount-badge-row");
const modalTotalEstimate = document.getElementById("modal-total-estimate");
const modalWhatsappBtn = document.getElementById("modal-whatsapp-btn");

// ==========================================
// 3. RENDER CARS FUNCTION
// ==========================================
function renderCars(carsToDisplay) {
  if (!fleetGrid) return;

  if (carsToDisplay.length === 0) {
    fleetGrid.innerHTML = `
      <div class="col-span-full py-16 text-center">
        <p class="text-2xl font-semibold text-gray-300">No machines found matching your query!</p>
        <p class="text-sm text-gray-500 mt-2">Try clearing your search query or selecting "All Garage".</p>
      </div>
    `;
    return;
  }

  fleetGrid.innerHTML = carsToDisplay
    .map(
      (car) => `
    <article class="glass-panel rounded-2xl overflow-hidden border border-cyan-500/15 hover:border-cyan-400/60 transition-all duration-300 flex flex-col group shadow-lg shadow-black/40">
      
      <!-- Car Image with Cyber Badge -->
      <div class="relative h-60 overflow-hidden bg-slate-950">
        <img 
          src="${car.image}" 
          alt="${car.name}" 
          loading="lazy"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-[#07090E] via-transparent to-transparent opacity-85"></div>
        <span class="absolute top-4 left-4 bg-black/80 backdrop-blur-md border border-cyan-400/40 text-[#00F0FF] text-xs font-bold px-3 py-1 rounded-full shadow-md">
          ${car.tag}
        </span>
      </div>

      <!-- Content Body -->
      <div class="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 class="font-heading text-xl font-bold text-white group-hover:text-[#00F0FF] transition-colors">
            ${car.name}
          </h3>
          <p class="text-xs text-gray-400 mt-1 mb-4 line-clamp-2">
            ${car.description}
          </p>

          <!-- Specs Grid -->
          <div class="grid grid-cols-3 gap-2 py-3 border-y border-white/10 text-center mb-5">
            <div class="bg-white/5 rounded-lg p-2 border border-white/5">
              <span class="block text-[11px] text-gray-400">Power</span>
              <span class="font-bold text-sm text-white">${car.hp}</span>
            </div>
            <div class="bg-white/5 rounded-lg p-2 border border-white/5">
              <span class="block text-[11px] text-gray-400">0-100</span>
              <span class="font-bold text-sm text-[#00F0FF]">${car.speed}</span>
            </div>
            <div class="bg-white/5 rounded-lg p-2 border border-white/5">
              <span class="block text-[11px] text-gray-400">Engine</span>
              <span class="font-bold text-sm text-white">${car.engine}</span>
            </div>
          </div>
        </div>

        <!-- Pricing & Action Buttons -->
        <div>
          <div class="flex items-baseline justify-between mb-4">
            <div>
              <span class="text-xs text-gray-400 block">Creator Shoot Pass (4h)</span>
              <span class="text-xl font-black text-white">₹${car.priceShoot4Hr.toLocaleString("en-IN")}</span>
            </div>
            <div class="text-right">
              <span class="text-xs text-gray-400 block">Full Day (24h)</span>
              <span class="text-sm font-semibold text-gray-300">₹${car.priceDaily.toLocaleString("en-IN")}</span>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-2.5">
            <button 
              onclick="openBookingModal('${car.id}')"
              class="w-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm py-2.5 rounded-xl transition duration-200 text-center border border-white/10"
            >
              Calculator
            </button>
            <button 
              onclick="directWhatsApp('${car.id}')"
              class="w-full bg-[#00F0FF] hover:bg-[#00d5e3] text-black font-extrabold text-xs sm:text-sm py-2.5 rounded-xl transition duration-200 text-center shadow-lg shadow-[#00F0FF]/25 flex items-center justify-center gap-1.5"
            >
              <span>Instant Book</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </button>
          </div>
        </div>
      </div>

    </article>
  `
    )
    .join("");
}

// ==========================================
// 4. FILTERING & SEARCH
// ==========================================
let currentCategory = "all";

function filterCars(category) {
  currentCategory = category;

  filterButtons.forEach((btn) => {
    if (btn.dataset.filter === category) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  applyFilters();
}

function applyFilters() {
  const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : "";

  const filtered = carsData.filter((car) => {
    const matchesCategory = currentCategory === "all" || car.category === currentCategory;
    const matchesSearch =
      car.name.toLowerCase().includes(searchTerm) ||
      car.description.toLowerCase().includes(searchTerm) ||
      car.engine.toLowerCase().includes(searchTerm);

    return matchesCategory && matchesSearch;
  });

  renderCars(filtered);
}

// ==========================================
// 5. INTERACTIVE CALCULATOR & CREATOR DISCOUNT
// ==========================================
function openBookingModal(carId) {
  const car = carsData.find((c) => c.id === carId);
  if (!car) return;

  activeCarForBooking = car;

  if (modalCarTitle) modalCarTitle.textContent = car.name;
  if (modalCarImage) modalCarImage.src = car.image;

  // Reset Add-ons
  if (modalAddonGopro) modalAddonGopro.checked = false;
  if (modalAddonPilot) modalAddonPilot.checked = false;
  if (modalAddonLights) modalAddonLights.checked = false;
  if (modalCreatorDiscount) modalCreatorDiscount.checked = false;

  updateModalEstimate();

  if (bookingModal) {
    bookingModal.classList.remove("hidden");
    bookingModal.classList.add("flex");
  }
}

function closeBookingModal() {
  if (bookingModal) {
    bookingModal.classList.add("hidden");
    bookingModal.classList.remove("flex");
  }
  activeCarForBooking = null;
}

function updateModalEstimate() {
  if (!activeCarForBooking) return;

  const plan = modalPlanSelect ? modalPlanSelect.value : "shoot4";
  let subtotal = plan === "shoot4" ? activeCarForBooking.priceShoot4Hr : activeCarForBooking.priceDaily;

  // Add-on Calculations
  let addonCost = 0;
  if (modalAddonGopro && modalAddonGopro.checked) addonCost += 1500;
  if (modalAddonPilot && modalAddonPilot.checked) addonCost += 3000;
  if (modalAddonLights && modalAddonLights.checked) addonCost += 1000;

  subtotal += addonCost;

  // Creator "Tag & Save" 15% Subsidy
  let discount = 0;
  if (modalCreatorDiscount && modalCreatorDiscount.checked) {
    discount = Math.round(subtotal * 0.15);
    if (modalDiscountBadge) modalDiscountBadge.classList.remove("hidden");
  } else {
    if (modalDiscountBadge) modalDiscountBadge.classList.add("hidden");
  }

  const finalTotal = subtotal - discount;

  if (modalTotalEstimate) {
    modalTotalEstimate.textContent = `₹${finalTotal.toLocaleString("en-IN")}`;
  }

  updateWhatsAppLink(finalTotal, plan, discount);
}

function updateWhatsAppLink(finalTotal, plan, discount) {
  if (!modalWhatsappBtn || !activeCarForBooking) return;

  const location = modalLocationSelect ? modalLocationSelect.value : "Noida Film City";
  const planLabel = plan === "shoot4" ? "4-Hour Creator Shoot Pass" : "24-Hour Day Rental";
  const handle = modalCreatorHandle && modalCreatorHandle.value.trim() ? modalCreatorHandle.value.trim() : "None";
  const discountText = discount > 0 ? `Yes (15% Off Applied - Saved ₹${discount.toLocaleString("en-IN")})` : "No";

  const message = `🔥 *IGNITE CREATOR BOOKING INQUIRY*
━━━━━━━━━━━━━━━━━━
• *Machine:* ${activeCarForBooking.name}
• *Shoot Package:* ${planLabel}
• *Location / Hub:* ${location}
• *Creator Handle:* ${handle}
• *Tag & Save 15% Subsidy:* ${discountText}
• *Estimated Total:* ₹${finalTotal.toLocaleString("en-IN")}
━━━━━━━━━━━━━━━━━━
Hi IGNITE Team, I want to book this machine for my shoot. Please confirm slot availability!`;

  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  modalWhatsappBtn.href = waUrl;
}

// 1-Click WhatsApp from Card
function directWhatsApp(carId) {
  const car = carsData.find((c) => c.id === carId);
  if (!car) return;

  const message = `Hi IGNITE Studio Wheels! 🔥 I'm interested in booking the *${car.name}* for an upcoming content shoot. Please share slot availability.`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
}

// ==========================================
// 6. EVENT BINDINGS
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  renderCars(carsData);

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterCars(btn.dataset.filter);
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", applyFilters);
  }

  // Calculator Listeners
  if (modalPlanSelect) modalPlanSelect.addEventListener("change", updateModalEstimate);
  if (modalLocationSelect) modalLocationSelect.addEventListener("change", updateModalEstimate);
  if (modalAddonGopro) modalAddonGopro.addEventListener("change", updateModalEstimate);
  if (modalAddonPilot) modalAddonPilot.addEventListener("change", updateModalEstimate);
  if (modalAddonLights) modalAddonLights.addEventListener("change", updateModalEstimate);
  if (modalCreatorDiscount) modalCreatorDiscount.addEventListener("change", updateModalEstimate);
  if (modalCreatorHandle) modalCreatorHandle.addEventListener("input", updateModalEstimate);

  // Mobile Menu
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }

  // Close Modal on backdrop click
  if (bookingModal) {
    bookingModal.addEventListener("click", (e) => {
      if (e.target === bookingModal) {
        closeBookingModal();
      }
    });
  }
});
