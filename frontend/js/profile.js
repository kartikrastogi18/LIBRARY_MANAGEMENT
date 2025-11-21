// Profile page logic
const profileName = document.getElementById("profileName");
const profileEmail = document.getElementById("profileEmail");
const profileForm = document.getElementById("profileForm");
const passwordForm = document.getElementById("passwordForm");
const changeAvatarBtn = document.getElementById("changeAvatarBtn");

// Load user profile data
function loadProfile() {
  const userProfile = JSON.parse(localStorage.getItem("userProfile") || "{}");
  
  // Set default values
  const profile = {
    fullName: userProfile.fullName || username,
    email: userProfile.email || "user@example.com",
    phone: userProfile.phone || "",
    address: userProfile.address || "",
    booksBorrowed: userProfile.booksBorrowed || 0,
    booksRead: userProfile.booksRead || 5,
    favorites: userProfile.favorites || 3
  };
  
  // Update header
  profileName.textContent = profile.fullName;
  profileEmail.textContent = profile.email;
  
  // Update stats
  document.querySelectorAll(".stat-number")[0].textContent = profile.booksBorrowed;
  document.querySelectorAll(".stat-number")[1].textContent = profile.booksRead;
  document.querySelectorAll(".stat-number")[2].textContent = profile.favorites;
  
  // Update form fields
  document.getElementById("fullName").value = profile.fullName;
  document.getElementById("email").value = profile.email;
  document.getElementById("phone").value = profile.phone;
  document.getElementById("address").value = profile.address;
  
  // Load preferences
  const preferences = JSON.parse(localStorage.getItem("userPreferences") || "{}");
  document.getElementById("emailNotifications").checked = preferences.emailNotifications !== false;
  document.getElementById("dueDateReminders").checked = preferences.dueDateReminders !== false;
  document.getElementById("newsletter").checked = preferences.newsletter === true;
}

// Save profile information
profileForm.addEventListener("submit", (e) => {
  e.preventDefault();
  
  const userProfile = {
    fullName: document.getElementById("fullName").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    address: document.getElementById("address").value,
    booksBorrowed: parseInt(document.querySelectorAll(".stat-number")[0].textContent),
    booksRead: parseInt(document.querySelectorAll(".stat-number")[1].textContent),
    favorites: parseInt(document.querySelectorAll(".stat-number")[2].textContent)
  };
  
  localStorage.setItem("userProfile", JSON.stringify(userProfile));
  localStorage.setItem("username", userProfile.fullName);
  
  // Update header
  profileName.textContent = userProfile.fullName;
  profileEmail.textContent = userProfile.email;
  
  // Update avatar images
  const newAvatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(userProfile.fullName)}&background=667eea&color=fff&bold=true&size=128`;
  document.getElementById("profileImage").src = newAvatarUrl;
  document.getElementById("profileAvatarLarge").src = newAvatarUrl.replace("size=128", "size=256");
  
  alert("✅ Profile updated successfully!");
});

// Change password
passwordForm.addEventListener("submit", (e) => {
  e.preventDefault();
  
  const currentPassword = document.getElementById("currentPassword").value;
  const newPassword = document.getElementById("newPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  
  if (!currentPassword || !newPassword || !confirmPassword) {
    alert("❌ Please fill in all password fields!");
    return;
  }
  
  if (newPassword !== confirmPassword) {
    alert("❌ New passwords do not match!");
    return;
  }
  
  if (newPassword.length < 6) {
    alert("❌ Password must be at least 6 characters long!");
    return;
  }
  
  // In production, this would call an API to verify current password
  alert("✅ Password updated successfully!");
  
  // Clear password fields
  passwordForm.reset();
});

// Change avatar
changeAvatarBtn.addEventListener("click", () => {
  const newName = prompt("Enter your name to generate a new avatar:", username);
  if (newName && newName.trim()) {
    const newAvatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(newName.trim())}&background=667eea&color=fff&bold=true&size=128`;
    document.getElementById("profileImage").src = newAvatarUrl;
    document.getElementById("profileAvatarLarge").src = newAvatarUrl.replace("size=128", "size=256");
    
    // Update profile name
    document.getElementById("fullName").value = newName.trim();
  }
});

// Save preferences when toggles change
document.querySelectorAll(".toggle-switch input").forEach(toggle => {
  toggle.addEventListener("change", () => {
    const preferences = {
      emailNotifications: document.getElementById("emailNotifications").checked,
      dueDateReminders: document.getElementById("dueDateReminders").checked,
      newsletter: document.getElementById("newsletter").checked
    };
    
    localStorage.setItem("userPreferences", JSON.stringify(preferences));
  });
});

// Initial load
loadProfile();