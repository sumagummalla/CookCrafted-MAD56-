/**
 * CookCrafted - Main JavaScript
 * Comprehensive functionality for the CookCrafted website
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('All components initialized successfully!');
    
    // Initialize all components
    initializeHeader();
    initializeMobileMenu();
    initializePageNavigation();
    initializeChefFilters();
    initializeBookingSystem();
    initializeAuthModals();
    initializeFormValidation();
    initializePasswordToggle();
    initializeDateInput();
    initializeBackToTop();
    initializeEmailJS();
    initializeFormAutoScroll();
    
    // Check if we have a hash in the URL and navigate to that page
    if (window.location.hash) {
        const pageName = window.location.hash.substring(1);
        navigateToPage(pageName);
    }
});

/**
 * Prevent form auto scrolling
 */
function initializeFormAutoScroll() {
    // Get all form elements
    const formInputs = document.querySelectorAll('input, select, textarea, button');
    
    formInputs.forEach(input => {
        // Prevent default focus behavior that causes scrolling
        input.addEventListener('focus', function(e) {
            // Store current scroll position
            const scrollPos = window.scrollY;
            
            // Restore scroll position after a slight delay
            setTimeout(() => {
                window.scrollTo(0, scrollPos);
            }, 5);
        });
        
        // Prevent scrolling on click 
        input.addEventListener('click', function(e) {
            // Store current scroll position
            const scrollPos = window.scrollY;
            
            // Restore scroll position after a slight delay
            setTimeout(() => {
                window.scrollTo(0, scrollPos);
            }, 5);
        });
        
        // Prevent scrolling specifically for radio buttons and checkboxes
        if (input.type === 'radio' || input.type === 'checkbox') {
            input.addEventListener('change', function(e) {
                // Store current scroll position
                const scrollPos = window.scrollY;
                
                // Restore scroll position after a slight delay
                setTimeout(() => {
                    window.scrollTo(0, scrollPos);
                }, 5);
            });
        }
    });
    
    // Get the booking form
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        // Prevent the form from scrolling on any input event
        bookingForm.addEventListener('input', function(e) {
            // Store current scroll position
            const scrollPos = window.scrollY;
            
            // Restore scroll position after a slight delay
            setTimeout(() => {
                window.scrollTo(0, scrollPos);
            }, 5);
        });
        
        // Also prevent scrolling on form submission
        bookingForm.addEventListener('submit', function(e) {
            // Don't prevent the default submit behavior
            
            // Store current scroll position
            const scrollPos = window.scrollY;
            
            // Restore scroll position after a slight delay
            setTimeout(() => {
                window.scrollTo(0, scrollPos);
            }, 5);
        });
    }
}

/**
 * Header scroll behavior
 */
function initializeHeader() {
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/**
 * Mobile menu functionality
 */
function initializeMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
        
        // Close mobile menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    }
}

/**
 * Page navigation functionality - shows/hides sections based on navigation
 */
function initializePageNavigation() {
    const navLinks = document.querySelectorAll('[data-page]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetPage = this.getAttribute('data-page');
            navigateToPage(targetPage);
            
            // Update URL hash without page reload
            window.location.hash = targetPage;
        });
    });

    // Handle "Book Now" buttons
    const bookChefButtons = document.querySelectorAll('.book-chef');
    bookChefButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const chefName = this.getAttribute('data-chef');
            navigateToPage('contact');
            window.location.hash = 'contact';
            
            // Set the selected chef in the contact form
            if (chefName) {
                const selectedChefContainer = document.getElementById('selected-chef-container');
                const selectedChefName = document.getElementById('selected-chef-name');
                
                if (selectedChefContainer && selectedChefName) {
                    selectedChefName.textContent = chefName;
                    selectedChefContainer.style.display = 'block';
                }
            }
        });
    });

    // Initialize Find Chefs button
    const findChefsBtn = document.getElementById('find-chefs-btn');
    if (findChefsBtn) {
        findChefsBtn.addEventListener('click', function() {
            navigateToPage('chefs');
            window.location.hash = 'chefs';
            
            // Apply search filters if available
            const cuisineSelect = document.getElementById('search-cuisine');
            const serviceSelect = document.getElementById('search-service');
            
            if (cuisineSelect && cuisineSelect.value) {
                const cuisineFilter = document.getElementById('cuisine-filter');
                if (cuisineFilter) {
                    cuisineFilter.value = cuisineSelect.value;
                    // Trigger change event to apply filter
                    const event = new Event('change');
                    cuisineFilter.dispatchEvent(event);
                }
            }
        });
    }

    // Cuisine filter buttons
    const cuisineFilterBtns = document.querySelectorAll('.cuisine-filter-btn');
    cuisineFilterBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const cuisine = this.getAttribute('data-cuisine');
            navigateToPage('chefs');
            window.location.hash = 'chefs';
            
            // Apply cuisine filter
            const cuisineFilter = document.getElementById('cuisine-filter');
            if (cuisineFilter && cuisine) {
                cuisineFilter.value = cuisine;
                // Trigger change event to apply filter
                const event = new Event('change');
                cuisineFilter.dispatchEvent(event);
            }
        });
    });
}

// Function to navigate between pages
function navigateToPage(pageName) {
    // Hide all page sections
    const pageSections = document.querySelectorAll('.page-section');
    pageSections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show the target page section
    const targetSection = document.querySelector(`.page-section[data-page="${pageName}"]`);
    if (targetSection) {
        targetSection.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Update navigation active states
    const navLinks = document.querySelectorAll('[data-page]');
    navLinks.forEach(link => {
        if (link.getAttribute('data-page') === pageName) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/**
 * Chef filtering functionality
 */
function initializeChefFilters() {
    const cuisineFilter = document.getElementById('cuisine-filter');
    const specialityFilter = document.getElementById('speciality-filter');
    const ratingFilter = document.getElementById('rating-filter');
    const filterReset = document.getElementById('filter-reset');
    
    if (cuisineFilter && specialityFilter && ratingFilter) {
        cuisineFilter.addEventListener('change', applyFilters);
        specialityFilter.addEventListener('change', applyFilters);
        ratingFilter.addEventListener('change', applyFilters);
        
        if (filterReset) {
            filterReset.addEventListener('click', function() {
                cuisineFilter.value = 'all';
                specialityFilter.value = 'all';
                ratingFilter.value = 'all';
                applyFilters();
            });
        }
    }
    
    function applyFilters() {
        const chefCards = document.querySelectorAll('.chef-card');
        
        chefCards.forEach(card => {
            const cuisineValue = cuisineFilter.value;
            const specialityValue = specialityFilter.value;
            const ratingValue = ratingFilter.value;
            
            const cardCuisines = card.getAttribute('data-cuisine') ? card.getAttribute('data-cuisine').split(',') : [];
            const cardSpecialities = card.getAttribute('data-speciality') ? card.getAttribute('data-speciality').split(',') : [];
            const cardRating = card.getAttribute('data-rating');
            
            let showCard = true;
            
            if (cuisineValue !== 'all' && !cardCuisines.includes(cuisineValue)) {
                showCard = false;
            }
            
            if (specialityValue !== 'all' && !cardSpecialities.includes(specialityValue)) {
                showCard = false;
            }
            
            if (ratingValue !== 'all' && parseInt(cardRating) < parseInt(ratingValue)) {
                showCard = false;
            }
            
            if (showCard) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
}

/**
 * Booking system functionality
 */
function initializeBookingSystem() {
    const bookingForm = document.getElementById('booking-form');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            if (validateForm(bookingForm)) {
                // Collect form data
                const formData = new FormData(bookingForm);
                const bookingData = {};
                
                for (const [key, value] of formData.entries()) {
                    bookingData[key] = value;
                }
                
                // Check if a chef is selected
                const selectedChefName = document.getElementById('selected-chef-name');
                if (selectedChefName && selectedChefName.textContent) {
                    bookingData.chef = selectedChefName.textContent;
                }
                
                // Send booking email
                sendBookingEmail(bookingData);
                
                // Reset form and show success message
                bookingForm.reset();
                const selectedChefContainer = document.getElementById('selected-chef-container');
                if (selectedChefContainer) {
                    selectedChefContainer.style.display = 'none';
                }
                
                showSuccessModal('Your booking request has been submitted successfully! Our team will contact you within 24 hours to confirm your booking.');
            }
        });
    }
}

/**
 * Authentication modals functionality
 */
function initializeAuthModals() {
    // Login Modal
    const loginButton = document.getElementById('login-button');
    const mobileLoginButton = document.getElementById('mobile-login-button');
    const loginModal = document.getElementById('login-modal');
    const closeLogin = document.getElementById('close-login');
    
    // Register Modal
    const registerButton = document.getElementById('register-button');
    const mobileRegisterButton = document.getElementById('mobile-register-button');
    const registerModal = document.getElementById('register-modal');
    const closeRegister = document.getElementById('close-register');
    
    // Forgot Password Modal
    const forgotPasswordLink = document.getElementById('forgot-password-link');
    const forgotPasswordModal = document.getElementById('forgot-password-modal');
    const closeForgot = document.getElementById('close-forgot');
    
    // Success Modal
    const successModal = document.getElementById('success-modal');
    const closeSuccess = document.getElementById('close-success');
    const successOk = document.getElementById('success-ok');
    
    // Modal redirects
    const registerRedirect = document.getElementById('register-redirect');
    const loginRedirect = document.getElementById('login-redirect');
    const backToLogin = document.getElementById('back-to-login');
    
    // Login Modal Events
    if (loginButton && loginModal && closeLogin) {
        loginButton.addEventListener('click', function() {
            loginModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        if (mobileLoginButton) {
            mobileLoginButton.addEventListener('click', function() {
                loginModal.classList.add('active');
                document.body.style.overflow = 'hidden';
                
                // Close mobile menu
                const mobileMenu = document.getElementById('mobile-menu');
                if (mobileMenu) {
                    mobileMenu.classList.remove('active');
                }
            });
        }
        
        closeLogin.addEventListener('click', function() {
            loginModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Register Modal Events
    if (registerButton && registerModal && closeRegister) {
        registerButton.addEventListener('click', function() {
            registerModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        if (mobileRegisterButton) {
            mobileRegisterButton.addEventListener('click', function() {
                registerModal.classList.add('active');
                document.body.style.overflow = 'hidden';
                
                // Close mobile menu
                const mobileMenu = document.getElementById('mobile-menu');
                if (mobileMenu) {
                    mobileMenu.classList.remove('active');
                }
            });
        }
        
        closeRegister.addEventListener('click', function() {
            registerModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Forgot Password Modal Events
    if (forgotPasswordLink && forgotPasswordModal && closeForgot) {
        forgotPasswordLink.addEventListener('click', function(e) {
            e.preventDefault();
            loginModal.classList.remove('active');
            forgotPasswordModal.classList.add('active');
        });
        
        closeForgot.addEventListener('click', function() {
            forgotPasswordModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    // Success Modal Events
    if (successModal && closeSuccess && successOk) {
        closeSuccess.addEventListener('click', function() {
            successModal.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        successOk.addEventListener('click', function() {
            successModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Modal Redirects
    if (registerRedirect) {
        registerRedirect.addEventListener('click', function(e) {
            e.preventDefault();
            loginModal.classList.remove('active');
            registerModal.classList.add('active');
        });
    }
    
    if (loginRedirect) {
        loginRedirect.addEventListener('click', function(e) {
            e.preventDefault();
            registerModal.classList.remove('active');
            loginModal.classList.add('active');
        });
    }
    
    if (backToLogin) {
        backToLogin.addEventListener('click', function(e) {
            e.preventDefault();
            forgotPasswordModal.classList.remove('active');
            loginModal.classList.add('active');
        });
    }
    
    // Handle Login Form Submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(loginForm)) {
                const email = document.getElementById('login-email').value;
                const password = document.getElementById('login-password').value;
                
                // Simulate login success
                loginModal.classList.remove('active');
                document.body.style.overflow = '';
                showSuccessMessage('Logged in successfully!');
            }
        });
    }
    
    // Handle Registration Form Submission
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(registerForm)) {
                const username = document.getElementById('username').value;
                const email = document.getElementById('register-email').value;
                const password = document.getElementById('register-password').value;
                
                // Send registration email
                sendRegistrationEmail({
                    username: username,
                    email: email
                });
                
                // Simulate registration success
                registerModal.classList.remove('active');
                document.body.style.overflow = '';
                showSuccessModal('Your account has been created successfully! Please check your email for verification.');
            }
        });
    }
    
    // Handle Forgot Password Form Submission
    const forgotPasswordForm = document.getElementById('forgot-password-form');
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(forgotPasswordForm)) {
                const email = document.getElementById('forgot-email').value;
                
                // Simulate password reset email sent
                forgotPasswordModal.classList.remove('active');
                document.body.style.overflow = '';
                showSuccessModal('Password reset instructions have been sent to your email address.');
            }
        });
    }
}

/**
 * Form validation
 */
function initializeFormValidation() {
    // Add any custom validation if needed
}

// Generic form validation function
function validateForm(form) {
    let isValid = form.checkValidity();
    
    // Check if any of the required fields are empty
    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('error');
            isValid = false;
            
            // Add error message if not exists
            const errorElement = field.parentElement.querySelector('.error-message');
            if (!errorElement) {
                const errorMessage = document.createElement('div');
                errorMessage.className = 'error-message';
                errorMessage.textContent = 'This field is required';
                field.parentElement.appendChild(errorMessage);
            }
        } else {
            field.classList.remove('error');
            
            // Remove error message if exists
            const errorElement = field.parentElement.querySelector('.error-message');
            if (errorElement) {
                errorElement.remove();
            }
        }
    });
    
    // Password confirmation validation
    const passwordField = form.querySelector('#register-password');
    const confirmPasswordField = form.querySelector('#confirm-password');
    if (passwordField && confirmPasswordField) {
        if (passwordField.value !== confirmPasswordField.value) {
            confirmPasswordField.classList.add('error');
            isValid = false;
            
            // Add error message if not exists
            const errorElement = confirmPasswordField.parentElement.querySelector('.error-message');
            if (!errorElement) {
                const errorMessage = document.createElement('div');
                errorMessage.className = 'error-message';
                errorMessage.textContent = 'Passwords do not match';
                confirmPasswordField.parentElement.appendChild(errorMessage);
            }
        }
    }
    
    return isValid;
}

/**
 * Password visibility toggle
 */
function initializePasswordToggle() {
    const toggleButtons = document.querySelectorAll('.toggle-password');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const passwordField = this.previousElementSibling;
            const icon = this.querySelector('i');
            
            if (passwordField.type === 'password') {
                passwordField.type = 'text';
                icon.setAttribute('data-feather', 'eye-off');
            } else {
                passwordField.type = 'password';
                icon.setAttribute('data-feather', 'eye');
            }
            
            // Re-initialize feather icons
            feather.replace();
        });
    });
}

/**
 * Initialize date input to only allow future dates
 */
function initializeDateInput() {
    const dateInput = document.getElementById('event_date');
    
    if (dateInput) {
        // Set min date to tomorrow
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        // Format date as YYYY-MM-DD for the input min attribute
        const year = tomorrow.getFullYear();
        const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
        const day = String(tomorrow.getDate()).padStart(2, '0');
        const tomorrowFormatted = `${year}-${month}-${day}`;
        
        dateInput.setAttribute('min', tomorrowFormatted);
        
        // Set the default value to tomorrow's date
        dateInput.value = tomorrowFormatted;
        
        // This prevents focus issues
        dateInput.addEventListener('mousedown', function(e) {
            // This prevents the default focus behavior which can cause scrolling
            e.preventDefault();
            this.focus();
            // Open the date picker after focusing
            this.showPicker();
        });
        
        // This prevents scrolling when the date picker is used
        dateInput.addEventListener('focus', function(e) {
            // Store current scroll position
            const scrollPos = window.scrollY;
            
            // This delays the execution to ensure normal focus operation is completed
            setTimeout(() => {
                // Restore scroll position
                window.scrollTo(0, scrollPos);
            }, 0);
        });
        
        // Add change handler to validate selected date
        dateInput.addEventListener('change', function() {
            const selectedDate = new Date(this.value);
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Reset time part for proper comparison
            
            if (selectedDate <= today) {
                this.setCustomValidity('Please select a future date');
                
                // Add error message
                const errorElement = this.parentElement.querySelector('.error-message');
                if (!errorElement) {
                    const errorMessage = document.createElement('div');
                    errorMessage.className = 'error-message';
                    errorMessage.textContent = 'Please select a future date';
                    this.parentElement.appendChild(errorMessage);
                }
            } else {
                this.setCustomValidity('');
                
                // Remove error message if exists
                const errorElement = this.parentElement.querySelector('.error-message');
                if (errorElement) {
                    errorElement.remove();
                }
            }
            
            // Prevent form from scrolling after date selection
            const scrollPos = window.scrollY;
            setTimeout(() => {
                window.scrollTo(0, scrollPos);
            }, 0);
        });
        
        // When clicking anywhere outside the date input, restore scroll position
        document.addEventListener('click', function(e) {
            if (e.target !== dateInput && window.innerWidth > 768) {
                const scrollPos = window.scrollY;
                setTimeout(() => {
                    window.scrollTo(0, scrollPos);
                }, 0);
            }
        });
    }
}

/**
 * Back to top button functionality
 */
function initializeBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');
    
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

/**
 * Initialize EmailJS for email sending
 */
function initializeEmailJS() {
    // Initialize EmailJS with your user ID
    emailjs.init("YOUR_USER_ID"); // Replace with your EmailJS user ID
}

