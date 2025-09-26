// Real Estate Application JavaScript

// Sample property data
const propertiesData = [
  {
    id: 1,
    title: "Modern Downtown Apartment",
    location: "New York, NY",
    price: 450000,
    type: "apartment",
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1200,
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
    description:
      "Beautiful modern apartment in the heart of downtown with stunning city views.",
    features: ["Balcony", "Gym", "Pool", "Parking"],
    yearBuilt: 2020,
    agent: "Sarah Johnson",
    agentPhone: "+1 (555) 123-4567",
  },
  {
    id: 2,
    title: "Luxury Family House",
    location: "Los Angeles, CA",
    price: 850000,
    type: "house",
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2500,
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
    description:
      "Spacious family home with a large backyard and modern amenities.",
    features: ["Garden", "Garage", "Fireplace", "Updated Kitchen"],
    yearBuilt: 2018,
    agent: "Mike Davis",
    agentPhone: "+1 (555) 234-5678",
  },
  {
    id: 3,
    title: "Cozy Townhouse",
    location: "Chicago, IL",
    price: 320000,
    type: "townhouse",
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1800,
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop",
    description:
      "Charming townhouse in a quiet neighborhood with excellent schools nearby.",
    features: ["Deck", "Basement", "Hardwood Floors", "Central AC"],
    yearBuilt: 2015,
    agent: "Emily Wilson",
    agentPhone: "+1 (555) 345-6789",
  },
  {
    id: 4,
    title: "Penthouse Condo",
    location: "Miami, FL",
    price: 1200000,
    type: "condo",
    bedrooms: 3,
    bathrooms: 3,
    sqft: 2200,
    image:
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=400&h=300&fit=crop",
    description:
      "Luxurious penthouse with panoramic ocean views and premium finishes.",
    features: ["Ocean View", "Rooftop", "Concierge", "Valet Parking"],
    yearBuilt: 2021,
    agent: "Carlos Rodriguez",
    agentPhone: "+1 (555) 456-7890",
  },
  {
    id: 5,
    title: "Suburban Family Home",
    location: "Austin, TX",
    price: 425000,
    type: "house",
    bedrooms: 3,
    bathrooms: 2,
    sqft: 2000,
    image:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=300&fit=crop",
    description:
      "Perfect family home in a great school district with a large yard.",
    features: [
      "Large Yard",
      "Two-Car Garage",
      "Updated Bathrooms",
      "Open Floor Plan",
    ],
    yearBuilt: 2017,
    agent: "Jennifer Brown",
    agentPhone: "+1 (555) 567-8901",
  },
  {
    id: 6,
    title: "Urban Loft",
    location: "Seattle, WA",
    price: 380000,
    type: "apartment",
    bedrooms: 1,
    bathrooms: 1,
    sqft: 900,
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
    description:
      "Stylish loft apartment in a converted warehouse with exposed brick walls.",
    features: [
      "Exposed Brick",
      "High Ceilings",
      "City View",
      "Modern Appliances",
    ],
    yearBuilt: 2019,
    agent: "David Kim",
    agentPhone: "+1 (555) 678-9012",
  },
];

// Global variables
let currentProperties = [...propertiesData];
let displayedCount = 6;
let isLoading = false;

// DOM elements
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const propertyType = document.getElementById("propertyType");
const priceRange = document.getElementById("priceRange");
const bedrooms = document.getElementById("bedrooms");
const propertiesGrid = document.getElementById("propertiesGrid");
const loadMoreBtn = document.getElementById("loadMoreBtn");
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const contactForm = document.getElementById("contactForm");
const propertyModal = document.getElementById("propertyModal");
const modalContent = document.getElementById("modalContent");
const closeModal = document.querySelector(".close");

// Initialize the application
document.addEventListener("DOMContentLoaded", function () {
  displayProperties();
  setupEventListeners();
  setupSmoothScrolling();
});

// Setup event listeners
function setupEventListeners() {
  // Search functionality
  searchBtn.addEventListener("click", handleSearch);
  searchInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      handleSearch();
    }
  });

  // Filter functionality
  propertyType.addEventListener("change", handleFilter);
  priceRange.addEventListener("change", handleFilter);
  bedrooms.addEventListener("change", handleFilter);

  // Load more properties
  loadMoreBtn.addEventListener("click", loadMoreProperties);

  // Mobile navigation
  navToggle.addEventListener("click", toggleMobileMenu);

  // Contact form
  contactForm.addEventListener("submit", handleContactForm);

  // Modal functionality
  closeModal.addEventListener("click", closePropertyModal);
  window.addEventListener("click", function (e) {
    if (e.target === propertyModal) {
      closePropertyModal();
    }
  });

  // Navbar scroll effect
  window.addEventListener("scroll", handleNavbarScroll);
}

// Display properties
function displayProperties() {
  propertiesGrid.innerHTML = "";

  const propertiesToShow = currentProperties.slice(0, displayedCount);

  propertiesToShow.forEach((property) => {
    const propertyCard = createPropertyCard(property);
    propertiesGrid.appendChild(propertyCard);
  });

  // Show/hide load more button
  loadMoreBtn.style.display =
    currentProperties.length > displayedCount ? "block" : "none";
}

// Create property card element
function createPropertyCard(property) {
  const card = document.createElement("div");
  card.className = "property-card";
  card.onclick = () => openPropertyModal(property);

  card.innerHTML = `
        <div class="property-image">
            <img src="${property.image}" alt="${
    property.title
  }" onerror="this.src='https://via.placeholder.com/400x300?text=Property+Image'">
            <div class="property-badge">${
              property.type.charAt(0).toUpperCase() + property.type.slice(1)
            }</div>
        </div>
        <div class="property-info">
            <div class="property-price">$${property.price.toLocaleString()}</div>
            <div class="property-title">${property.title}</div>
            <div class="property-location">
                <i class="fas fa-map-marker-alt"></i>
                ${property.location}
            </div>
            <div class="property-features">
                <div class="feature">
                    <i class="fas fa-bed"></i>
                    ${property.bedrooms} bed
                </div>
                <div class="feature">
                    <i class="fas fa-bath"></i>
                    ${property.bathrooms} bath
                </div>
                <div class="feature">
                    <i class="fas fa-ruler-combined"></i>
                    ${property.sqft} sqft
                </div>
            </div>
            <div class="property-description">${property.description}</div>
        </div>
    `;

  return card;
}

// Handle search functionality
function handleSearch() {
  const searchTerm = searchInput.value.toLowerCase().trim();

  if (searchTerm === "") {
    currentProperties = [...propertiesData];
  } else {
    currentProperties = propertiesData.filter(
      (property) =>
        property.title.toLowerCase().includes(searchTerm) ||
        property.location.toLowerCase().includes(searchTerm) ||
        property.description.toLowerCase().includes(searchTerm) ||
        property.type.toLowerCase().includes(searchTerm)
    );
  }

  displayedCount = 6;
  displayProperties();
}

// Handle filter functionality
function handleFilter() {
  const typeFilter = propertyType.value;
  const priceFilter = priceRange.value;
  const bedroomFilter = bedrooms.value;

  currentProperties = propertiesData.filter((property) => {
    const typeMatch = !typeFilter || property.type === typeFilter;

    let priceMatch = true;
    if (priceFilter) {
      const [min, max] = priceFilter.split("-");
      if (max) {
        priceMatch =
          property.price >= parseInt(min) && property.price <= parseInt(max);
      } else {
        priceMatch = property.price >= parseInt(min);
      }
    }

    const bedroomMatch =
      !bedroomFilter || property.bedrooms >= parseInt(bedroomFilter);

    return typeMatch && priceMatch && bedroomMatch;
  });

  displayedCount = 6;
  displayProperties();
}

// Load more properties
function loadMoreProperties() {
  if (isLoading) return;

  isLoading = true;
  loadMoreBtn.innerHTML = '<span class="loading"></span> Loading...';

  // Simulate loading delay
  setTimeout(() => {
    displayedCount += 6;
    displayProperties();
    isLoading = false;
    loadMoreBtn.innerHTML = "Load More Properties";
  }, 1000);
}

// Open property modal
function openPropertyModal(property) {
  modalContent.innerHTML = `
        <div style="position: relative;">
            <img src="${property.image}" alt="${
    property.title
  }" style="width: 100%; height: 300px; object-fit: cover; border-radius: 15px 15px 0 0;" onerror="this.src='https://via.placeholder.com/800x300?text=Property+Image'">
            <div style="position: absolute; top: 20px; left: 20px; background: #e74c3c; color: white; padding: 8px 16px; border-radius: 20px; font-weight: bold;">
                ${
                  property.type.charAt(0).toUpperCase() + property.type.slice(1)
                }
            </div>
        </div>
        <div style="padding: 2rem;">
            <h2 style="color: #2c3e50; margin-bottom: 1rem; font-size: 2rem;">${
              property.title
            }</h2>
            <div style="font-size: 2rem; color: #e74c3c; font-weight: bold; margin-bottom: 1rem;">$${property.price.toLocaleString()}</div>
            <div style="color: #7f8c8d; margin-bottom: 1.5rem; display: flex; align-items: center;">
                <i class="fas fa-map-marker-alt" style="margin-right: 0.5rem;"></i>
                ${property.location}
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
                <div style="text-align: center; padding: 1rem; background: #f8f9fa; border-radius: 10px;">
                    <i class="fas fa-bed" style="color: #e74c3c; font-size: 1.5rem; margin-bottom: 0.5rem;"></i>
                    <div style="font-weight: bold;">${
                      property.bedrooms
                    } Bedrooms</div>
                </div>
                <div style="text-align: center; padding: 1rem; background: #f8f9fa; border-radius: 10px;">
                    <i class="fas fa-bath" style="color: #e74c3c; font-size: 1.5rem; margin-bottom: 0.5rem;"></i>
                    <div style="font-weight: bold;">${
                      property.bathrooms
                    } Bathrooms</div>
                </div>
                <div style="text-align: center; padding: 1rem; background: #f8f9fa; border-radius: 10px;">
                    <i class="fas fa-ruler-combined" style="color: #e74c3c; font-size: 1.5rem; margin-bottom: 0.5rem;"></i>
                    <div style="font-weight: bold;">${property.sqft} sqft</div>
                </div>
                <div style="text-align: center; padding: 1rem; background: #f8f9fa; border-radius: 10px;">
                    <i class="fas fa-calendar" style="color: #e74c3c; font-size: 1.5rem; margin-bottom: 0.5rem;"></i>
                    <div style="font-weight: bold;">Built ${
                      property.yearBuilt
                    }</div>
                </div>
            </div>
            
            <div style="margin-bottom: 2rem;">
                <h3 style="color: #2c3e50; margin-bottom: 1rem;">Description</h3>
                <p style="color: #7f8c8d; line-height: 1.6;">${
                  property.description
                }</p>
            </div>
            
            <div style="margin-bottom: 2rem;">
                <h3 style="color: #2c3e50; margin-bottom: 1rem;">Features</h3>
                <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                    ${property.features
                      .map(
                        (feature) =>
                          `<span style="background: #e74c3c; color: white; padding: 5px 12px; border-radius: 15px; font-size: 0.9rem;">${feature}</span>`
                      )
                      .join("")}
                </div>
            </div>
            
            <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 10px; margin-bottom: 2rem;">
                <h3 style="color: #2c3e50; margin-bottom: 1rem;">Contact Agent</h3>
                <div style="display: flex; align-items: center; margin-bottom: 0.5rem;">
                    <i class="fas fa-user" style="color: #e74c3c; margin-right: 0.5rem;"></i>
                    <strong>${property.agent}</strong>
                </div>
                <div style="display: flex; align-items: center;">
                    <i class="fas fa-phone" style="color: #e74c3c; margin-right: 0.5rem;"></i>
                    <a href="tel:${
                      property.agentPhone
                    }" style="color: #e74c3c; text-decoration: none;">${
    property.agentPhone
  }</a>
                </div>
            </div>
            
            <div style="display: flex; gap: 1rem;">
                <button onclick="window.open('tel:${
                  property.agentPhone
                }')" style="flex: 1; background: #e74c3c; color: white; border: none; padding: 15px; border-radius: 10px; font-size: 1rem; font-weight: bold; cursor: pointer;">
                    <i class="fas fa-phone" style="margin-right: 0.5rem;"></i>
                    Call Agent
                </button>
                <button onclick="alert('Email functionality would be implemented here')" style="flex: 1; background: #2c3e50; color: white; border: none; padding: 15px; border-radius: 10px; font-size: 1rem; font-weight: bold; cursor: pointer;">
                    <i class="fas fa-envelope" style="margin-right: 0.5rem;"></i>
                    Email Agent
                </button>
            </div>
        </div>
    `;

  propertyModal.style.display = "block";
  document.body.style.overflow = "hidden";
}

// Close property modal
function closePropertyModal() {
  propertyModal.style.display = "none";
  document.body.style.overflow = "auto";
}

// Toggle mobile menu
function toggleMobileMenu() {
  navMenu.classList.toggle("active");
  navToggle.classList.toggle("active");
}

// Handle contact form submission
function handleContactForm(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const name = e.target[0].value;
  const email = e.target[1].value;
  const phone = e.target[2].value;
  const message = e.target[3].value;

  // Simulate form submission
  const submitBtn = e.target.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;

  submitBtn.innerHTML = '<span class="loading"></span> Sending...';
  submitBtn.disabled = true;

  setTimeout(() => {
    alert("Thank you for your message! We will get back to you soon.");
    e.target.reset();
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }, 2000);
}

// Setup smooth scrolling for navigation links
function setupSmoothScrolling() {
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80; // Account for fixed header

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }

      // Close mobile menu if open
      if (navMenu.classList.contains("active")) {
        toggleMobileMenu();
      }
    });
  });
}

// Handle navbar scroll effect
function handleNavbarScroll() {
  const header = document.querySelector(".header");

  if (window.scrollY > 100) {
    header.style.background = "rgba(255, 255, 255, 0.95)";
    header.style.backdropFilter = "blur(10px)";
  } else {
    header.style.background = "#fff";
    header.style.backdropFilter = "none";
  }
}

// Add some interactive animations
function addScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animatedElements = document.querySelectorAll(
    ".property-card, .feature, .stat, .contact-item"
  );
  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
}

// Initialize scroll animations when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  setTimeout(addScrollAnimations, 100);
});

// Add keyboard navigation support
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && propertyModal.style.display === "block") {
    closePropertyModal();
  }
});

// Add loading states and error handling
function showLoadingState(element) {
  element.innerHTML = '<div class="loading"></div>';
}

function showErrorState(element, message) {
  element.innerHTML = `<div style="text-align: center; color: #e74c3c; padding: 2rem;">${message}</div>`;
}

// Utility function to format currency
function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// Add property comparison functionality (bonus feature)
let comparisonList = [];

function addToComparison(propertyId) {
  if (comparisonList.length >= 3) {
    alert("You can compare up to 3 properties at once.");
    return;
  }

  if (!comparisonList.includes(propertyId)) {
    comparisonList.push(propertyId);
    updateComparisonUI();
  }
}

function removeFromComparison(propertyId) {
  comparisonList = comparisonList.filter((id) => id !== propertyId);
  updateComparisonUI();
}

function updateComparisonUI() {
  // This would update a comparison UI element
  console.log("Properties in comparison:", comparisonList);
}

// Add favorite properties functionality (bonus feature)
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

function toggleFavorite(propertyId) {
  if (favorites.includes(propertyId)) {
    favorites = favorites.filter((id) => id !== propertyId);
  } else {
    favorites.push(propertyId);
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
  updateFavoritesUI();
}

function updateFavoritesUI() {
  // This would update favorite indicators on property cards
  console.log("Favorite properties:", favorites);
}

// Initialize favorites from localStorage
document.addEventListener("DOMContentLoaded", function () {
  updateFavoritesUI();
});
