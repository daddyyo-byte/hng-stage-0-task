// Update the current time display
function updateTime() {
  const timeElement = document.querySelector('[data-testid="test-user-time"]');
  if (timeElement) {
    const now = Date.now();
    timeElement.textContent = now;
    timeElement.setAttribute("datetime", new Date(now).toISOString());
  }
}

// Form validation functions
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showError(fieldId, message) {
  const errorElement = document.querySelector(
    `[data-testid="test-contact-error-${fieldId}"]`
  );
  const inputElement = document.querySelector(
    `[data-testid="test-contact-${fieldId}"]`
  );

  if (errorElement && inputElement) {
    errorElement.textContent = message;
    inputElement.classList.add("error");
  }
}

function clearError(fieldId) {
  const errorElement = document.querySelector(
    `[data-testid="test-contact-error-${fieldId}"]`
  );
  const inputElement = document.querySelector(
    `[data-testid="test-contact-${fieldId}"]`
  );

  if (errorElement && inputElement) {
    errorElement.textContent = "";
    inputElement.classList.remove("error");
  }
}

function validateField(fieldId, value) {
  let isValid = true;
  let errorMessage = "";

  switch (fieldId) {
    case "name":
      if (!value.trim()) {
        isValid = false;
        errorMessage = "Full name is required";
      }
      break;

    case "email":
      if (!value.trim()) {
        isValid = false;
        errorMessage = "Email is required";
      } else if (!validateEmail(value)) {
        isValid = false;
        errorMessage =
          "Please enter a valid email address (e.g., name@example.com)";
      }
      break;

    case "subject":
      if (!value.trim()) {
        isValid = false;
        errorMessage = "Subject is required";
      }
      break;

    case "message":
      if (!value.trim()) {
        isValid = false;
        errorMessage = "Message is required";
      } else if (value.trim().length < 10) {
        isValid = false;
        errorMessage = "Message must be at least 10 characters long";
      }
      break;
  }

  if (isValid) {
    clearError(fieldId);
  } else {
    showError(fieldId, errorMessage);
  }

  return isValid;
}

function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const fields = [
    { id: "name", testId: "test-contact-name" },
    { id: "email", testId: "test-contact-email" },
    { id: "subject", testId: "test-contact-subject" },
    { id: "message", testId: "test-contact-message" },
  ];

  // Add real-time validation on blur
  fields.forEach(({ id, testId }) => {
    const input = document.querySelector(`[data-testid="${testId}"]`);
    if (input) {
      input.addEventListener("blur", () => {
        validateField(id, input.value);
      });

      // Clear error on input
      input.addEventListener("input", () => {
        if (input.classList.contains("error")) {
          clearError(id);
        }
      });
    }
  });

  // Handle form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Hide success message if visible
    const successMessage = document.querySelector(
      '[data-testid="test-contact-success"]'
    );
    if (successMessage) {
      successMessage.style.display = "none";
    }

    // Validate all fields
    let isFormValid = true;
    fields.forEach(({ id, testId }) => {
      const input = document.querySelector(`[data-testid="${testId}"]`);
      if (input) {
        const fieldValid = validateField(id, input.value);
        if (!fieldValid) {
          isFormValid = false;
        }
      }
    });

    // If form is valid, show success message and reset form
    if (isFormValid) {
      if (successMessage) {
        successMessage.style.display = "block";
      }

      // Scroll to success message
      successMessage.scrollIntoView({ behavior: "smooth", block: "center" });

      // Reset form after a short delay
      setTimeout(() => {
        form.reset();
      }, 500);
    } else {
      // Focus on first error field
      const firstErrorField = fields.find(({ id, testId }) => {
        const input = document.querySelector(`[data-testid="${testId}"]`);
        return input && input.classList.contains("error");
      });

      if (firstErrorField) {
        const input = document.querySelector(
          `[data-testid="${firstErrorField.testId}"]`
        );
        if (input) {
          input.focus();
        }
      }
    }
  });
}

// Initialize the profile card when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Update time immediately
  updateTime();

  // Update time every 5 seconds
  setInterval(updateTime, 5000);

  // Initialize contact form if present
  initContactForm();
});
