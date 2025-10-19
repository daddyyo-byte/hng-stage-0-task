// Update the current time display
function updateTime() {
  const timeElement = document.querySelector('[data-testid="test-user-time"]');
  if (timeElement) {
    const now = Date.now();
    timeElement.textContent = now;
    timeElement.setAttribute("datetime", new Date(now).toISOString());
  }
}

// Initialize the profile card when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Update time immediately
  updateTime();

  // Update time every 5 seconds
  setInterval(updateTime, 5000);
});
