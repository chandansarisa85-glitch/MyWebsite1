const STORAGE_KEY = "vistagram.social.v2";
const AUTH_SESSION_KEY = "vistagram.auth.session.v1";
const FIREBASE_CONFIG_KEY = "vistagram.firebase.config.v1";
const REGISTRATION_COMPLETED_KEY = "vistagram.registration.completed.v1";
const PENDING_GOOGLE_PROFILE_KEY = "vistagram.pending.google.profile.v1";
const MEDIA_DB_NAME = "vistagram.media";
const MEDIA_STORE_NAME = "uploads";
const CHAT_SYNC_CHANNEL = "vistagram.chat.sync.v1";

const defaultAvatars = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=160&q=80",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=160&q=80",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&q=80",
  "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=160&q=80"
];

const fallbackPhoto = "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1200&q=82";

const seedState = {
  currentUserId: "u-chandra",
  users: [
    {
      id: "u-chandra",
      username: "chandra.designs",
      name: "Chandra",
      avatar: defaultAvatars[0],
      bio: "Designing calm little internet places.",
      followers: 12800,
      following: ["u-mina", "u-rhea"]
    },
    {
      id: "u-mina",
      username: "mina.moves",
      name: "Mina",
      avatar: defaultAvatars[1],
      bio: "Dance, city light, tiny rituals.",
      followers: 8400,
      following: ["u-chandra", "u-jonas"]
    },
    {
      id: "u-jonas",
      username: "jonas.table",
      name: "Jonas",
      avatar: defaultAvatars[2],
      bio: "Food notes from wherever I land.",
      followers: 5100,
      following: ["u-mina"]
    },
    {
      id: "u-rhea",
      username: "rhea.roams",
      name: "Rhea",
      avatar: defaultAvatars[3],
      bio: "Trails, lakes, and patient mornings.",
      followers: 19200,
      following: ["u-chandra", "u-mina"]
    }
  ],
  posts: [
    {
      id: "p-mina-1",
      userId: "u-mina",
      location: "Brooklyn, NY",
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=82",
      caption: "Golden hour turned the whole block into a movie set.",
      createdAt: Date.now() - 1000 * 60 * 24,
      likedBy: ["u-chandra", "u-rhea"],
      savedBy: [],
      comments: [
        { id: "c-1", userId: "u-chandra", text: "The light is unreal.", createdAt: Date.now() - 1000 * 60 * 8 },
        { id: "c-2", userId: "u-rhea", text: "Frame this one.", createdAt: Date.now() - 1000 * 60 * 5 }
      ]
    },
    {
      id: "p-jonas-1",
      userId: "u-jonas",
      location: "Lisbon, Portugal",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=82",
      caption: "Tiny restaurant, huge memory. Save the corner table.",
      createdAt: Date.now() - 1000 * 60 * 92,
      likedBy: ["u-mina"],
      savedBy: ["u-chandra"],
      comments: [
        { id: "c-3", userId: "u-mina", text: "Adding this to my list.", createdAt: Date.now() - 1000 * 60 * 45 }
      ]
    },
    {
      id: "p-rhea-1",
      userId: "u-rhea",
      location: "Banff National Park",
      image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=82",
      caption: "No filter, just altitude and a lucky morning.",
      createdAt: Date.now() - 1000 * 60 * 200,
      likedBy: ["u-chandra", "u-mina", "u-jonas"],
      savedBy: ["u-mina", "u-jonas"],
      comments: []
    }
  ],
  chats: [
    {
      id: "m-mina-1",
      threadId: "u-chandra--u-mina",
      senderId: "u-mina",
      text: "I just posted a new dance clip.",
      createdAt: Date.now() - 1000 * 60 * 14
    },
    {
      id: "m-rhea-1",
      threadId: "u-chandra--u-rhea",
      senderId: "u-rhea",
      text: "Are you uploading a reel today?",
      createdAt: Date.now() - 1000 * 60 * 8
    }
  ]
};

const state = loadState();

const feed = document.querySelector("#feed");
const dialog = document.querySelector("#createDialog");
const authDialog = document.querySelector("#authDialog");
const captionInput = document.querySelector("#captionInput");
const photoInput = document.querySelector("#photoInput");
const mediaFileInput = document.querySelector("#mediaFileInput");
const locationInput = document.querySelector("#locationInput");
const publishButton = document.querySelector("#publishButton");
const stories = document.querySelector("#stories");
const profileSummary = document.querySelector("#profileSummary");
const statsStrip = document.querySelector("#statsStrip");
const suggestions = document.querySelector("#suggestionsList");
const authAccounts = document.querySelector("#authAccounts");
const signInInput = document.querySelector("#signInInput");
const createNameInput = document.querySelector("#createNameInput");
const createUsernameInput = document.querySelector("#createUsernameInput");
const createAvatarInput = document.querySelector("#createAvatarInput");
const authMessage = document.querySelector("#authMessage");
const appShell = document.querySelector("#appShell");
const registrationScreen = document.querySelector("#registrationScreen");
const registrationForm = document.querySelector("#registrationForm");
const registerProfileName = document.querySelector("#registerProfileName");
const registerEmail = document.querySelector("#registerEmail");
const registerPassword = document.querySelector("#registerPassword");
const googleRegisterButton = document.querySelector("#googleRegisterButton");
const registrationFirebaseSetupButton = document.querySelector("#registrationFirebaseSetupButton");
const showLoginButton = document.querySelector("#showLoginButton");
const registrationMessage = document.querySelector("#registrationMessage");
const loginScreen = document.querySelector("#loginScreen");
const loginForm = document.querySelector("#loginForm");
const loginIdentifier = document.querySelector("#loginIdentifier");
const loginPassword = document.querySelector("#loginPassword");
const loginMessage = document.querySelector("#loginMessage");
const googleLoginButton = document.querySelector("#googleLoginButton");
const facebookLoginButton = document.querySelector("#facebookLoginButton");
const openCreateLoginButton = document.querySelector("#openCreateLoginButton");
const openFirebaseSetupButton = document.querySelector("#openFirebaseSetupButton");
const firebaseDialog = document.querySelector("#firebaseDialog");
const firebaseApiKeyInput = document.querySelector("#firebaseApiKeyInput");
const firebaseAuthDomainInput = document.querySelector("#firebaseAuthDomainInput");
const firebaseProjectIdInput = document.querySelector("#firebaseProjectIdInput");
const firebaseAppIdInput = document.querySelector("#firebaseAppIdInput");
const saveFirebaseConfigButton = document.querySelector("#saveFirebaseConfigButton");
const firebaseSetupMessage = document.querySelector("#firebaseSetupMessage");
const googleSwitchDialog = document.querySelector("#googleSwitchDialog");
const googleAccounts = document.querySelector("#googleAccounts");
const googleSwitchButton = document.querySelector("#googleSwitchButton");
const googleOtherAccountButton = document.querySelector("#googleOtherAccountButton");
const googleSetupButton = document.querySelector("#googleSetupButton");
const googleSwitchMessage = document.querySelector("#googleSwitchMessage");
const searchDialog = document.querySelector("#searchDialog");
const profileSearchInput = document.querySelector("#profileSearchInput");
const profileSearchResults = document.querySelector("#profileSearchResults");
const reelUploadDialog = document.querySelector("#reelUploadDialog");
const reelFileInput = document.querySelector("#reelFileInput");
const reelPreview = document.querySelector("#reelPreview");
const reelCaptionInput = document.querySelector("#reelCaptionInput");
const reelLocationInput = document.querySelector("#reelLocationInput");
const reelUploadMessage = document.querySelector("#reelUploadMessage");
const publishReelButton = document.querySelector("#publishReelButton");
const messagesDialog = document.querySelector("#messagesDialog");
const chatContacts = document.querySelector("#chatContacts");
const chatRecipientName = document.querySelector("#chatRecipientName");
const chatThread = document.querySelector("#chatThread");
const chatInput = document.querySelector("#chatInput");
const sendChatButton = document.querySelector("#sendChatButton");
const moreDialog = document.querySelector("#moreDialog");

let activeChatUserId = "";
const chatChannel = "BroadcastChannel" in window ? new BroadcastChannel(CHAT_SYNC_CHANNEL) : null;

function loadState() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return structuredClone(seedState);

  try {
    const parsed = JSON.parse(stored);
    if (!parsed.users?.length || !parsed.posts) return structuredClone(seedState);
    return normalizeState(parsed);
  } catch {
    return structuredClone(seedState);
  }
}

function normalizeState(savedState) {
  const normalized = {
    ...structuredClone(seedState),
    ...savedState,
    users: savedState.users.map((user, index) => ({
      id: user.id || makeId("u"),
      username: user.username || `user.${index + 1}`,
      name: user.name || user.username || "Vistagram User",
      email: user.email || "",
      password: user.password || "",
      avatar: user.avatar || defaultAvatars[index % defaultAvatars.length],
      bio: user.bio || "Vistagram account",
      followers: Number(user.followers) || 0,
      following: Array.isArray(user.following) ? user.following : []
    })),
    posts: savedState.posts.map((post) => {
      const mediaUrl = post.mediaUrl || post.image || "";
      const mediaType = post.mediaType || (/\.(mp4|webm|ogg|mov)$/i.test(mediaUrl) ? "video" : "image");
      return {
        id: post.id || makeId("p"),
        userId: post.userId || savedState.currentUserId || seedState.currentUserId,
        location: post.location || "Just now",
        image: post.image || mediaUrl || fallbackPhoto,
        mediaUrl,
        mediaId: post.mediaId || "",
        mediaType,
        caption: post.caption || "",
        createdAt: Number(post.createdAt) || Date.now(),
        likedBy: Array.isArray(post.likedBy) ? post.likedBy : [],
        savedBy: Array.isArray(post.savedBy) ? post.savedBy : [],
        comments: Array.isArray(post.comments) ? post.comments : []
      };
    }),
    chats: Array.isArray(savedState.chats)
      ? savedState.chats.map((message) => ({
        id: message.id || makeId("m"),
        threadId: message.threadId || conversationId(message.senderId, savedState.currentUserId || seedState.currentUserId),
        senderId: message.senderId || savedState.currentUserId || seedState.currentUserId,
        text: message.text || "",
        createdAt: Number(message.createdAt) || Date.now()
      }))
      : structuredClone(seedState.chats)
  };

  if (!normalized.users.some((user) => user.id === normalized.currentUserId)) {
    normalized.currentUserId = normalized.users[0].id;
  }

  return normalized;
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function currentUser() {
  return state.users.find((user) => user.id === state.currentUserId) || state.users[0];
}

function userById(id) {
  return state.users.find((user) => user.id === id);
}

function userByUsername(username) {
  return state.users.find((user) => user.username.toLowerCase() === username.toLowerCase());
}

function usernameToId(username) {
  return username.trim().toLowerCase().replace(/^@/, "");
}

function profileNameKey(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/^@/, "")
    .replace(/[^a-z0-9]/g, "");
}

function profileNameToUsername(value) {
  const username = String(value || "")
    .trim()
    .toLowerCase()
    .replace(/^@/, "")
    .replace(/[^a-z0-9._]/g, ".")
    .replace(/\.+/g, ".")
    .replace(/^\.|\.$/g, "")
    .slice(0, 20);

  return username.length >= 3 ? username : "";
}

function profileNameTaken(profileName, userId = "") {
  const desiredKey = profileNameKey(profileName);
  return state.users.some((user) => {
    if (user.id === userId) return false;
    return profileNameKey(user.username) === desiredKey || profileNameKey(user.name) === desiredKey;
  });
}

function validateProfileName(profileName, userId = "") {
  const cleanName = profileName.trim();
  const username = profileNameToUsername(cleanName);

  if (!cleanName) return { error: "Choose a profile name." };
  if (!username) return { error: "Profile name needs at least 3 letters or numbers." };
  if (profileNameTaken(cleanName, userId)) return { error: "That profile name is already taken." };

  return { cleanName, username };
}

function usernameFromIdentity(value, fallback) {
  const base = String(value || fallback || "new.user")
    .split("@")[0]
    .toLowerCase()
    .replace(/[^a-z0-9._]/g, ".")
    .replace(/\.+/g, ".")
    .replace(/^\.|\.$/g, "")
    .slice(0, 18);

  return base.length >= 3 ? base : `${base || "user"}.app`;
}

function uniqueUsername(base, userId) {
  let username = base;
  let count = 2;
  while (state.users.some((user) => user.username.toLowerCase() === username.toLowerCase() && user.id !== userId)) {
    username = `${base}.${count}`;
    count += 1;
  }
  return username;
}

function makeId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function conversationId(firstUserId, secondUserId) {
  return [firstUserId, secondUserId].filter(Boolean).sort().join("--");
}

function openMediaDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(MEDIA_DB_NAME, 1);

    request.onupgradeneeded = () => {
      request.result.createObjectStore(MEDIA_STORE_NAME);
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function saveMediaBlob(id, file) {
  const db = await openMediaDb();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(MEDIA_STORE_NAME, "readwrite");
    transaction.objectStore(MEDIA_STORE_NAME).put(file, id);
    transaction.oncomplete = () => {
      db.close();
      resolve();
    };
    transaction.onerror = () => {
      db.close();
      reject(transaction.error);
    };
  });
}

async function getMediaBlob(id) {
  const db = await openMediaDb();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(MEDIA_STORE_NAME, "readonly");
    const request = transaction.objectStore(MEDIA_STORE_NAME).get(id);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
    transaction.oncomplete = () => db.close();
  });
}

async function deleteMediaBlob(id) {
  if (!id) return;
  const db = await openMediaDb();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(MEDIA_STORE_NAME, "readwrite");
    transaction.objectStore(MEDIA_STORE_NAME).delete(id);
    transaction.oncomplete = () => {
      db.close();
      resolve();
    };
    transaction.onerror = () => {
      db.close();
      reject(transaction.error);
    };
  });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatNumber(value) {
  return new Intl.NumberFormat("en", {
    notation: value > 9999 ? "compact" : "standard",
    maximumFractionDigits: 1
  }).format(value);
}

function relativeTime(time) {
  const minutes = Math.max(1, Math.round((Date.now() - time) / 60000));
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h`;
  return `${Math.round(hours / 24)}d`;
}

function icon(name) {
  return `<i data-lucide="${name}"></i>`;
}

function renderIcons() {
  if (window.lucide) window.lucide.createIcons();
}

function showToast(message) {
  let toast = document.querySelector("#appToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "appToast";
    toast.className = "app-toast";
    document.body.append(toast);
  }

  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.hideTimer);
  showToast.hideTimer = setTimeout(() => toast.classList.remove("show"), 1800);
}

function closeDialog(element) {
  if (!element) return;
  if (typeof element.close === "function" && element.open) {
    element.close();
    return;
  }
  element.removeAttribute("open");
  element.classList.remove("fallback-open");
}

function openDialog(element) {
  if (!element) return;
  document.querySelectorAll("dialog[open]").forEach((dialogElement) => {
    if (dialogElement !== element) closeDialog(dialogElement);
  });
  try {
    if (typeof element.showModal === "function" && !element.open) {
      element.showModal();
    } else {
      element.setAttribute("open", "");
      element.classList.add("fallback-open");
    }
  } catch {
    element.setAttribute("open", "");
    element.classList.add("fallback-open");
  }
}

function openCreateDialog({ preferReel = false } = {}) {
  openDialog(dialog);

  requestAnimationFrame(() => {
    if (preferReel) {
      mediaFileInput.focus();
      showToast("Choose a video file, then publish your reel.");
      return;
    }
    captionInput.focus();
  });
}

function setActiveNav(action) {
  document.querySelectorAll("[data-nav-action]").forEach((button) => {
    button.classList.toggle("active", button.dataset.navAction === action);
  });
}

function handleNavAction(action) {
  setActiveNav(action);

  if (action === "home") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  if (action === "reels") {
    openReelUploadDialog();
    return;
  }

  if (action === "search" || action === "explore") {
    openSearchDialog();
    return;
  }

  if (action === "messages") {
    openMessagesDialog();
    return;
  }

  if (action === "more") {
    openDialog(moreDialog);
    renderIcons();
    return;
  }

  const labels = {
    activity: "No new activity right now."
  };
  showToast(labels[action] || "This section is ready for the next update.");
}

function renderGoogleSwitch() {
  const user = currentUser();
  const googleUsers = state.users.filter((person) => person.id.startsWith("google-"));
  const accounts = googleUsers.length ? googleUsers : [user];

  googleAccounts.innerHTML = accounts.map((person) => `
    <button class="google-account-choice ${person.id === user.id ? "current" : ""}" type="button" data-google-user-id="${person.id}">
      <img src="${escapeHtml(person.avatar)}" alt="">
      <span>
        <strong>${escapeHtml(person.name)}</strong>
        <small>${escapeHtml(person.username)}${person.id === user.id ? " - Current" : ""}</small>
      </span>
      <b>G</b>
    </button>
  `).join("");

  googleSwitchMessage.textContent = firebaseConfigReady()
    ? ""
    : "Add Firebase keys to use the real Google account picker.";
  renderIcons();
}

function openGoogleSwitchDialog() {
  renderGoogleSwitch();
  openDialog(googleSwitchDialog);
}

function openSearchDialog() {
  renderProfileSearch(profileSearchInput.value);
  openDialog(searchDialog);
  requestAnimationFrame(() => profileSearchInput.focus());
}

function renderProfileSearch(query = "") {
  const user = currentUser();
  const needle = query.trim().toLowerCase();
  const results = state.users
    .filter((person) => person.id !== user.id)
    .filter((person) => {
      if (!needle) return true;
      return [person.name, person.username, person.bio].some((value) => String(value).toLowerCase().includes(needle));
    });

  profileSearchResults.innerHTML = results.length ? results.map((person) => {
    const following = user.following.includes(person.id);
    return `
      <article class="profile-result" data-user-id="${person.id}">
        <img src="${escapeHtml(person.avatar)}" alt="">
        <div>
          <strong>${escapeHtml(person.username)}</strong>
          <span>${escapeHtml(person.name)}</span>
          <p>${escapeHtml(person.bio)}</p>
        </div>
        <button class="ghost-button search-follow-button ${following ? "following" : ""}" type="button" data-search-action="follow">
          ${following ? "Following" : "Follow"}
        </button>
        <button class="icon-button" type="button" data-search-action="message" aria-label="Message ${escapeHtml(person.username)}">${icon("message-circle")}</button>
      </article>
    `;
  }).join("") : `<p class="empty-panel">No profiles found.</p>`;

  renderIcons();
}

function openReelUploadDialog() {
  reelUploadMessage.textContent = "";
  openDialog(reelUploadDialog);
  requestAnimationFrame(() => reelFileInput.focus());
}

function resetReelUpload() {
  reelFileInput.value = "";
  reelCaptionInput.value = "";
  reelLocationInput.value = "";
  reelPreview.removeAttribute("src");
  reelPreview.classList.add("is-hidden");
  reelUploadMessage.textContent = "";
}

function previewReelFile() {
  const file = reelFileInput.files[0];
  if (!file) {
    reelPreview.removeAttribute("src");
    reelPreview.classList.add("is-hidden");
    return;
  }

  reelPreview.src = URL.createObjectURL(file);
  reelPreview.classList.remove("is-hidden");
}

async function publishDeviceReel() {
  const user = currentUser();
  const file = reelFileInput.files[0];

  if (!file) {
    reelUploadMessage.textContent = "Choose a video from your device first.";
    return;
  }

  if (!file.type.startsWith("video/")) {
    reelUploadMessage.textContent = "Reels need a video file.";
    return;
  }

  const mediaId = makeId("media");
  publishReelButton.disabled = true;
  publishReelButton.textContent = "Publishing...";

  try {
    await saveMediaBlob(mediaId, file);
    state.posts.unshift({
      id: makeId("p"),
      userId: user.id,
      location: reelLocationInput.value.trim() || "Original audio",
      image: "",
      mediaUrl: "",
      mediaId,
      mediaType: "video",
      caption: reelCaptionInput.value.trim() || "New reel from my device.",
      createdAt: Date.now(),
      likedBy: [user.id],
      savedBy: [],
      comments: []
    });

    saveState();
    closeDialog(reelUploadDialog);
    resetReelUpload();
    renderApp();
    window.scrollTo({ top: 0, behavior: "smooth" });
    showToast("Reel uploaded.");
  } catch {
    reelUploadMessage.textContent = "That video could not be saved. Try a smaller reel.";
  } finally {
    publishReelButton.disabled = false;
    publishReelButton.textContent = "Publish reel";
  }
}

function chatContactsList() {
  const user = currentUser();
  return state.users.filter((person) => person.id !== user.id);
}

function openMessagesDialog(userId = "") {
  const contacts = chatContactsList();
  activeChatUserId = userId || activeChatUserId || contacts[0]?.id || "";
  renderMessages();
  openDialog(messagesDialog);
  requestAnimationFrame(() => chatInput.focus());
}

function renderMessages() {
  const user = currentUser();
  const contacts = chatContactsList();

  chatContacts.innerHTML = contacts.map((person) => `
    <button class="chat-contact ${person.id === activeChatUserId ? "active" : ""}" type="button" data-chat-user-id="${person.id}">
      <span class="online-wrap"><img src="${escapeHtml(person.avatar)}" alt=""><b></b></span>
      <span><strong>${escapeHtml(person.name)}</strong><small>@${escapeHtml(person.username)}</small></span>
    </button>
  `).join("");

  const recipient = userById(activeChatUserId) || contacts[0];
  if (!recipient) {
    chatRecipientName.innerHTML = "";
    chatThread.innerHTML = `<p class="empty-panel">No people to message yet.</p>`;
    return;
  }

  activeChatUserId = recipient.id;
  chatRecipientName.innerHTML = `
    <img src="${escapeHtml(recipient.avatar)}" alt="">
    <span><strong>${escapeHtml(recipient.name)}</strong><small>Online now</small></span>
  `;

  const threadId = conversationId(user.id, recipient.id);
  const messages = state.chats
    .filter((message) => message.threadId === threadId)
    .sort((a, b) => a.createdAt - b.createdAt);

  chatThread.innerHTML = messages.length ? messages.map((message) => `
    <p class="chat-bubble ${message.senderId === user.id ? "mine" : ""}">
      ${escapeHtml(message.text)}
      <small>${relativeTime(message.createdAt)}</small>
    </p>
  `).join("") : `<p class="empty-panel">Start a live chat with ${escapeHtml(recipient.name)}.</p>`;

  chatThread.scrollTop = chatThread.scrollHeight;
}

function sendChatMessage() {
  const user = currentUser();
  const recipient = userById(activeChatUserId);
  const text = chatInput.value.trim();
  if (!recipient || !text) return;

  state.chats.push({
    id: makeId("m"),
    threadId: conversationId(user.id, recipient.id),
    senderId: user.id,
    text,
    createdAt: Date.now()
  });
  chatInput.value = "";
  saveState();
  renderMessages();
  chatChannel?.postMessage({ type: "chat", threadId: conversationId(user.id, recipient.id) });
}

function syncFromStorage() {
  const latest = loadState();
  Object.assign(state, latest);
  if (messagesDialog.open) renderMessages();
  renderSessionChrome();
}

function handleMoreAction(action) {
  const user = currentUser();
  if (action === "saved") {
    const savedCount = state.posts.filter((post) => post.savedBy.includes(user.id)).length;
    showToast(`${savedCount} saved post${savedCount === 1 ? "" : "s"}.`);
    return;
  }
  if (action === "activity") {
    closeDialog(moreDialog);
    handleNavAction("activity");
    return;
  }
  if (action === "settings") {
    showToast("Settings are up to date.");
    return;
  }
  if (action === "theme") {
    document.body.classList.toggle("vivid-theme");
    showToast(document.body.classList.contains("vivid-theme") ? "Theme changed." : "Theme restored.");
    return;
  }
  if (action === "google") {
    closeDialog(moreDialog);
    openGoogleSwitchDialog();
    return;
  }
  if (action === "logout") {
    localStorage.removeItem(AUTH_SESSION_KEY);
    closeDialog(moreDialog);
    showLogin("Logged out.");
  }
}

function storedFirebaseConfig() {
  try {
    return JSON.parse(localStorage.getItem(FIREBASE_CONFIG_KEY) || "{}");
  } catch {
    return {};
  }
}

function firebaseConfig() {
  return {
    ...(window.VISTAGRAM_FIREBASE_CONFIG || {}),
    ...storedFirebaseConfig()
  };
}

function firebaseConfigReady() {
  const config = firebaseConfig();
  return Boolean(config.apiKey && config.authDomain && config.projectId && config.appId);
}

function showRegistration(message = "") {
  appShell.classList.add("is-hidden");
  loginScreen.classList.add("is-hidden");
  registrationScreen.classList.remove("is-hidden");
  registrationMessage.textContent = message;
  renderIcons();
}

function showLogin(message = "") {
  appShell.classList.add("is-hidden");
  registrationScreen.classList.add("is-hidden");
  loginScreen.classList.remove("is-hidden");
  loginMessage.textContent = message;
  renderIcons();
}

function showApp() {
  registrationScreen.classList.add("is-hidden");
  loginScreen.classList.add("is-hidden");
  appShell.classList.remove("is-hidden");
  loginMessage.textContent = "";
  renderApp();
}

function persistSession(userId, provider) {
  localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify({ userId, provider, signedInAt: Date.now() }));
}

function restoreSession() {
  try {
    const session = JSON.parse(localStorage.getItem(AUTH_SESSION_KEY) || "null");
    if (session?.userId && userById(session.userId)) {
      state.currentUserId = session.userId;
      saveState();
      return true;
    }
  } catch {
    return false;
  }
  return false;
}

function ensureUserFromIdentity(identity) {
  const userId = `${identity.provider}-${identity.id}`;
  const existing = userById(userId);
  const profile = identity.profileName ? validateProfileName(identity.profileName, userId) : null;
  if (profile?.error) {
    throw new Error(profile.error);
  }
  const username = profile?.username || uniqueUsername(usernameFromIdentity(identity.email || identity.name, identity.provider), userId);
  const name = profile?.cleanName || identity.name || username;

  if (existing) {
    existing.name = name || existing.name;
    existing.avatar = identity.avatar || existing.avatar;
    existing.username = existing.username || username;
    return existing;
  }

  const newUser = {
    id: userId,
    username,
    name,
    avatar: identity.avatar || defaultAvatars[state.users.length % defaultAvatars.length],
    bio: `${identity.providerLabel} account`,
    followers: 0,
    following: []
  };
  state.users.push(newUser);
  return newUser;
}

function completeLogin(user, provider) {
  state.currentUserId = user.id;
  localStorage.setItem(REGISTRATION_COMPLETED_KEY, "true");
  persistSession(user.id, provider);
  saveState();
  closeDialog(authDialog);
  closeDialog(googleSwitchDialog);
  showApp();
}

function authErrorMessage(error, providerLabel = "Google") {
  const message = String(error?.message || error || "");
  if (message.includes("auth/configuration-not-found")) {
    return `Firebase Authentication is not enabled/configured. Enable ${providerLabel} in Firebase Authentication.`;
  }
  if (message.includes("auth/unauthorized-domain")) {
    return "This domain is not authorized in Firebase. Add 127.0.0.1 and localhost.";
  }
  if (message.includes("auth/popup-blocked")) {
    return "Popup was blocked. Try again, or allow popups for this site.";
  }
  return error?.message || `${providerLabel} login could not start.`;
}

async function loadFirebaseAuth() {
  const [{ initializeApp, getApps }, authModule] = await Promise.all([
    import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js"),
    import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js")
  ]);
  const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig());
  return { app, ...authModule };
}

async function signInWithSocialProvider(providerName, options = {}) {
  const providerLabel = providerName === "google" ? "Google" : "Facebook";
  const messageTarget = options.messageElement || loginMessage;
  messageTarget.textContent = `Opening ${providerLabel} sign in...`;
  const profileName = options.profileName?.trim();

  if (profileName) {
    const profile = validateProfileName(profileName);
    if (profile.error) {
      messageTarget.textContent = profile.error;
      return;
    }
    localStorage.setItem(PENDING_GOOGLE_PROFILE_KEY, profile.cleanName);
  }

  if (!firebaseConfigReady()) {
    messageTarget.textContent = `Real ${providerLabel} login needs Firebase keys.`;
    if (profileName) localStorage.removeItem(PENDING_GOOGLE_PROFILE_KEY);
    return;
  }

  try {
    const {
      getAuth,
      signInWithPopup,
      signInWithRedirect,
      setPersistence,
      browserLocalPersistence,
      GoogleAuthProvider,
      FacebookAuthProvider
    } = await loadFirebaseAuth();
    const auth = getAuth();
    await setPersistence(auth, browserLocalPersistence);
    const provider = providerName === "google" ? new GoogleAuthProvider() : new FacebookAuthProvider();
    if (providerName === "google" && options.forceAccountChoice) {
      provider.setCustomParameters({ prompt: "select_account" });
    }
    try {
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;
      const user = ensureUserFromIdentity({
        provider: providerName,
        providerLabel,
        id: firebaseUser.uid,
        profileName,
        name: profileName || firebaseUser.displayName || firebaseUser.email || `${providerLabel} User`,
        email: firebaseUser.email,
        avatar: firebaseUser.photoURL || defaultAvatars[state.users.length % defaultAvatars.length]
      });
      localStorage.removeItem(PENDING_GOOGLE_PROFILE_KEY);
      completeLogin(user, providerName);
    } catch (popupError) {
      const popupMessage = String(popupError?.message || popupError);
      if (
        popupError?.code === "auth/popup-blocked" ||
        popupError?.code === "auth/popup-closed-by-user" ||
        popupMessage.includes("auth/popup-blocked") ||
        popupMessage.includes("auth/popup-closed-by-user")
      ) {
        messageTarget.textContent = `Popup blocked. Trying ${providerLabel} redirect...`;
        await signInWithRedirect(auth, provider);
        return;
      }
      throw popupError;
    }
  } catch (error) {
    if (profileName) localStorage.removeItem(PENDING_GOOGLE_PROFILE_KEY);
    messageTarget.textContent = authErrorMessage(error, providerLabel);
  }
}

async function handleFirebaseRedirectResult() {
  if (!firebaseConfigReady()) return;

  try {
    const { getAuth, getRedirectResult } = await loadFirebaseAuth();
    const result = await getRedirectResult(getAuth());
    if (!result?.user) return;

    const providerId = result.providerId || result.user.providerData[0]?.providerId || "google.com";
    const providerName = providerId.includes("facebook") ? "facebook" : "google";
    const providerLabel = providerName === "google" ? "Google" : "Facebook";
    const firebaseUser = result.user;
    const pendingProfileName = localStorage.getItem(PENDING_GOOGLE_PROFILE_KEY) || "";
    const user = ensureUserFromIdentity({
      provider: providerName,
      providerLabel,
      id: firebaseUser.uid,
      profileName: pendingProfileName,
      name: pendingProfileName || firebaseUser.displayName || firebaseUser.email || `${providerLabel} User`,
      email: firebaseUser.email,
      avatar: firebaseUser.photoURL || defaultAvatars[state.users.length % defaultAvatars.length]
    });
    localStorage.removeItem(PENDING_GOOGLE_PROFILE_KEY);
    completeLogin(user, providerName);
  } catch (error) {
    loginMessage.textContent = authErrorMessage(error);
  }
}

function registerWithEmail(event) {
  event.preventDefault();
  const profile = validateProfileName(registerProfileName.value);
  const email = registerEmail.value.trim().toLowerCase();
  const password = registerPassword.value.trim();

  if (profile.error) {
    registrationMessage.textContent = profile.error;
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    registrationMessage.textContent = "Enter a valid email address.";
    return;
  }
  if (password.length < 6) {
    registrationMessage.textContent = "Password needs at least 6 characters.";
    return;
  }
  if (state.users.some((user) => user.email?.toLowerCase() === email)) {
    registrationMessage.textContent = "That email is already registered. Log in instead.";
    return;
  }

  const newUser = {
    id: makeId("email"),
    username: profile.username,
    name: profile.cleanName,
    email,
    password,
    avatar: defaultAvatars[state.users.length % defaultAvatars.length],
    bio: "New here and ready to post.",
    followers: 0,
    following: []
  };

  state.users.push(newUser);
  registerProfileName.value = "";
  registerEmail.value = "";
  registerPassword.value = "";
  registrationMessage.textContent = "";
  completeLogin(newUser, "email");
}

function registerWithGoogle() {
  const profile = validateProfileName(registerProfileName.value);
  if (profile.error) {
    registrationMessage.textContent = profile.error;
    return;
  }

  signInWithSocialProvider("google", {
    forceAccountChoice: true,
    messageElement: registrationMessage,
    profileName: profile.cleanName
  });
}

function renderSessionChrome() {
  const user = currentUser();
  document.querySelectorAll("[data-current-avatar]").forEach((img) => {
    img.src = user.avatar;
  });

  profileSummary.innerHTML = `
    <img class="profile-photo" src="${escapeHtml(user.avatar)}" alt="">
    <div>
      <strong>${escapeHtml(user.username)}</strong>
      <span>${escapeHtml(user.name)}</span>
    </div>
    <button class="switch-account" type="button">Switch</button>
  `;

  const postCount = state.posts.filter((post) => post.userId === user.id).length;
  statsStrip.innerHTML = `
    <div><strong>${formatNumber(postCount)}</strong><span>Posts</span></div>
    <div><strong>${formatNumber(user.followers)}</strong><span>Followers</span></div>
    <div><strong>${formatNumber(user.following.length)}</strong><span>Following</span></div>
  `;
}

function renderStories() {
  const user = currentUser();
  const others = state.users.filter((person) => person.id !== user.id);
  stories.innerHTML = `
    <button class="story-card add-story create-trigger" type="button">
      <span class="story-ring"><img src="${escapeHtml(user.avatar)}" alt=""></span>
      <span>Your story</span>
    </button>
    ${others.map((person, index) => `
      <button class="story-card" type="button">
        <span class="story-ring ${index === 0 ? "live" : ""}"><img src="${escapeHtml(person.avatar)}" alt=""></span>
        <span>${escapeHtml(person.name)}</span>
      </button>
    `).join("")}
  `;
}

function renderSuggestions() {
  const user = currentUser();
  const candidates = state.users.filter((person) => person.id !== user.id);
  suggestions.innerHTML = candidates.map((person) => {
    const following = user.following.includes(person.id);
    return `
      <div class="suggestion" data-user-id="${person.id}">
        <img src="${escapeHtml(person.avatar)}" alt="">
        <div><strong>${escapeHtml(person.username)}</strong><span>${escapeHtml(person.bio)}</span></div>
        <button class="follow-button ${following ? "following" : ""}" type="button">${following ? "Following" : "Follow"}</button>
      </div>
    `;
  }).join("");
}

function renderPosts() {
  const user = currentUser();
  const orderedPosts = [...state.posts].sort((a, b) => b.createdAt - a.createdAt);

  feed.innerHTML = orderedPosts.map((post) => {
    const author = userById(post.userId);
    if (!author) return "";
    const liked = post.likedBy.includes(user.id);
    const saved = post.savedBy.includes(user.id);
    const comments = post.comments.slice(-2);
    const mediaType = post.mediaType || "image";
    const mediaSource = post.mediaUrl || post.image || fallbackPhoto;
    const mediaLabel = mediaType === "video" ? "reel" : "post";
    const mediaMarkup = mediaType === "video"
      ? `<video ${post.mediaId ? `data-media-id="${escapeHtml(post.mediaId)}"` : ""} src="${post.mediaId ? "" : escapeHtml(mediaSource)}" controls playsinline preload="metadata"></video>`
      : `<img ${post.mediaId ? `data-media-id="${escapeHtml(post.mediaId)}"` : ""} src="${post.mediaId ? "" : escapeHtml(mediaSource)}" alt="">`;
    return `
      <article class="post" data-post-id="${post.id}">
        <header class="post-header">
          <img src="${escapeHtml(author.avatar)}" alt="">
          <div>
            <strong>${escapeHtml(author.username)}</strong>
            <span>${escapeHtml(post.location)} - ${relativeTime(post.createdAt)}</span>
          </div>
          ${post.userId === user.id ? `<button class="icon-button delete-post" type="button" aria-label="Delete post">${icon("trash-2")}</button>` : `<button class="icon-button" type="button" aria-label="More options">${icon("more-horizontal")}</button>`}
        </header>
        <div class="post-media ${mediaType === "video" ? "reel-media" : ""}" role="button" tabindex="0" aria-label="Like ${escapeHtml(author.username)}'s ${mediaLabel}">
          ${mediaMarkup}
          ${mediaType === "video" ? `<span class="reel-badge">${icon("clapperboard")} Reel</span>` : ""}
          <div class="heart-pop">${icon("heart")}</div>
        </div>
        <div class="post-actions">
          <button class="icon-button like-button ${liked ? "active" : ""}" type="button" aria-label="Like post">${icon("heart")}</button>
          <button class="icon-button focus-comment" type="button" aria-label="Comment">${icon("message-circle")}</button>
          <button class="icon-button" type="button" aria-label="Share">${icon("send")}</button>
          <span></span>
          <button class="icon-button save-button ${saved ? "active" : ""}" type="button" aria-label="Save post">${icon(saved ? "bookmark-check" : "bookmark")}</button>
        </div>
        <div class="post-body">
          <p class="likes"><strong>${formatNumber(post.likedBy.length)} likes</strong></p>
          <p class="caption"><strong>${escapeHtml(author.username)}</strong> ${escapeHtml(post.caption)}</p>
          <div class="comments">
            ${comments.map((comment) => {
              const commenter = userById(comment.userId);
              return `<p><strong>${escapeHtml(commenter?.username || "someone")}</strong> ${escapeHtml(comment.text)}</p>`;
            }).join("")}
          </div>
          <button class="view-comments" type="button">${post.comments.length ? `View all ${post.comments.length} comments` : "No comments yet"}</button>
        </div>
        <form class="comment-row">
          <input aria-label="Add a comment" placeholder="Add a comment as ${escapeHtml(user.username)}...">
          <button type="submit">Post</button>
        </form>
      </article>
    `;
  }).join("");

  renderIcons();
  hydrateUploadedMedia();
}

async function hydrateUploadedMedia() {
  const mediaElements = feed.querySelectorAll("[data-media-id]");
  await Promise.all([...mediaElements].map(async (element) => {
    try {
      const blob = await getMediaBlob(element.dataset.mediaId);
      if (!blob) return;
      element.src = URL.createObjectURL(blob);
    } catch {
      element.removeAttribute("src");
    }
  }));
}

function renderAuth() {
  authAccounts.innerHTML = state.users.map((user) => `
    <button class="account-choice" type="button" data-user-id="${user.id}">
      <img src="${escapeHtml(user.avatar)}" alt="">
      <span><strong>${escapeHtml(user.username)}</strong><small>${escapeHtml(user.name)}</small></span>
    </button>
  `).join("");
}

function renderApp() {
  renderSessionChrome();
  renderStories();
  renderSuggestions();
  renderPosts();
  renderAuth();
  bindCreateTriggers();
}

function bindCreateTriggers() {
  document.querySelectorAll(".create-trigger").forEach((button) => {
    button.onclick = () => openCreateDialog();
  });
}

function setCurrentUser(userId) {
  state.currentUserId = userId;
  persistSession(userId, "local");
  closeDialog(authDialog);
  closeDialog(googleSwitchDialog);
  saveState();
  showApp();
}

function toggleLike(postElement) {
  const post = state.posts.find((item) => item.id === postElement.dataset.postId);
  const user = currentUser();
  if (!post) return;

  const liked = post.likedBy.includes(user.id);
  post.likedBy = liked ? post.likedBy.filter((id) => id !== user.id) : [...post.likedBy, user.id];
  saveState();
  renderPosts();

  const updatedPost = feed.querySelector(`[data-post-id="${post.id}"]`);
  if (!liked && updatedPost) requestAnimationFrame(() => updatedPost.classList.add("liked"));
}

function toggleSave(postElement) {
  const post = state.posts.find((item) => item.id === postElement.dataset.postId);
  const user = currentUser();
  if (!post) return;

  const saved = post.savedBy.includes(user.id);
  post.savedBy = saved ? post.savedBy.filter((id) => id !== user.id) : [...post.savedBy, user.id];
  saveState();
  renderPosts();
}

function toggleFollow(userId) {
  const user = currentUser();
  const target = userById(userId);
  if (!target || target.id === user.id) return;

  const following = user.following.includes(userId);
  user.following = following ? user.following.filter((id) => id !== userId) : [...user.following, userId];
  target.followers += following ? -1 : 1;
  saveState();
  renderApp();
}

async function publishPost() {
  const user = currentUser();
  const caption = captionInput.value.trim() || "A quiet little moment worth keeping.";
  const mediaUrl = photoInput.value.trim();
  const mediaFile = mediaFileInput.files[0];
  const mediaType = mediaFile?.type.startsWith("video/") || /\.(mp4|webm|ogg|mov)$/i.test(mediaUrl) ? "video" : "image";
  const image = mediaUrl || fallbackPhoto;
  const location = locationInput.value.trim() || "Just now";
  const mediaId = mediaFile ? makeId("media") : "";

  if (mediaFile && !mediaFile.type.startsWith("image/") && !mediaFile.type.startsWith("video/")) {
    alert("Choose an image or video file to upload.");
    return;
  }

  publishButton.disabled = true;
  publishButton.textContent = "Publishing...";

  try {
    if (mediaFile) {
      await saveMediaBlob(mediaId, mediaFile);
    }

    state.posts.unshift({
      id: makeId("p"),
      userId: user.id,
      location,
      image,
      mediaUrl,
      mediaId,
      mediaType,
      caption,
      createdAt: Date.now(),
      likedBy: [user.id],
      savedBy: [],
      comments: []
    });

    captionInput.value = "";
    photoInput.value = "";
    mediaFileInput.value = "";
    locationInput.value = "";
    saveState();
    closeDialog(dialog);
    renderApp();
    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch {
    alert("That reel could not be saved in this browser. Try a smaller video file.");
  } finally {
    publishButton.disabled = false;
    publishButton.textContent = "Publish";
  }
}

async function deletePost(postId) {
  const post = state.posts.find((item) => item.id === postId);
  state.posts = state.posts.filter((item) => item.id !== postId);
  saveState();
  if (post?.mediaId) await deleteMediaBlob(post.mediaId);
  renderApp();
}

function createAccount() {
  const name = createNameInput.value.trim();
  const profileName = createUsernameInput.value.trim();
  const profile = validateProfileName(profileName);
  const avatar = createAvatarInput.value.trim() || defaultAvatars[state.users.length % defaultAvatars.length];

  if (!name || !profileName) {
    authMessage.textContent = "Add a name and profile name to create an account.";
    return;
  }

  if (profile.error) {
    authMessage.textContent = profile.error;
    return;
  }

  const newUser = {
    id: makeId("u"),
    username: profile.username,
    name,
    avatar,
    bio: "New here and ready to post.",
    followers: 0,
    following: []
  };

  state.users.push(newUser);
  createNameInput.value = "";
  createUsernameInput.value = "";
  createAvatarInput.value = "";
  authMessage.textContent = "";
  setCurrentUser(newUser.id);
}

function signInByUsername() {
  const username = usernameToId(signInInput.value);
  const user = state.users.find((person) => person.username.toLowerCase() === username);
  if (!user) {
    authMessage.textContent = "No account found with that username.";
    return;
  }
  signInInput.value = "";
  authMessage.textContent = "";
  setCurrentUser(user.id);
}

function openFirebaseSetup() {
  const config = firebaseConfig();
  firebaseApiKeyInput.value = config.apiKey || "";
  firebaseAuthDomainInput.value = config.authDomain || "";
  firebaseProjectIdInput.value = config.projectId || "";
  firebaseAppIdInput.value = config.appId || "";
  firebaseSetupMessage.textContent = "";
  openDialog(firebaseDialog);
}

function saveFirebaseConfig() {
  const config = {
    apiKey: firebaseApiKeyInput.value.trim(),
    authDomain: firebaseAuthDomainInput.value.trim(),
    projectId: firebaseProjectIdInput.value.trim(),
    appId: firebaseAppIdInput.value.trim()
  };

  if (!config.apiKey || !config.authDomain || !config.projectId || !config.appId) {
    firebaseSetupMessage.textContent = "All four Firebase fields are required for real Google login.";
    return;
  }

  localStorage.setItem(FIREBASE_CONFIG_KEY, JSON.stringify(config));
  firebaseSetupMessage.textContent = "Saved. You can now use Continue with Google.";
  loginMessage.textContent = "Firebase config saved. Try Continue with Google.";
}

function loginWithIdentifier(event) {
  event.preventDefault();
  const identifier = loginIdentifier.value.trim();
  const password = loginPassword.value.trim();

  if (!identifier || !password) {
    loginMessage.textContent = "Enter a username/email and password.";
    return;
  }

  const username = usernameToId(identifier.includes("@") ? identifier.split("@")[0] : identifier);
  const user = identifier.includes("@")
    ? state.users.find((person) => person.email?.toLowerCase() === identifier.toLowerCase())
    : userByUsername(username);

  if (!user) {
    loginMessage.textContent = "No account found. Create one first.";
    return;
  }
  if (user.password && user.password !== password) {
    loginMessage.textContent = "That password does not match this account.";
    return;
  }

  loginIdentifier.value = "";
  loginPassword.value = "";
  completeLogin(user, "password");
}

document.addEventListener("click", (event) => {
  const closeButton = event.target.closest('button[value="close"]');
  if (closeButton) {
    event.preventDefault();
    closeDialog(closeButton.closest("dialog"));
    return;
  }

  const navButton = event.target.closest("[data-nav-action]");
  if (navButton) {
    handleNavAction(navButton.dataset.navAction);
  }

  if (event.target.closest(".switch-account")) {
    openGoogleSwitchDialog();
    return;
  }

  const googleChoice = event.target.closest(".google-account-choice");
  if (googleChoice) {
    setCurrentUser(googleChoice.dataset.googleUserId);
    closeDialog(googleSwitchDialog);
    return;
  }

  const profileResult = event.target.closest(".profile-result");
  const searchAction = event.target.closest("[data-search-action]");
  if (profileResult && searchAction?.dataset.searchAction === "follow") {
    toggleFollow(profileResult.dataset.userId);
    renderProfileSearch(profileSearchInput.value);
    return;
  }
  if (profileResult && searchAction?.dataset.searchAction === "message") {
    closeDialog(searchDialog);
    openMessagesDialog(profileResult.dataset.userId);
    return;
  }

  const chatContact = event.target.closest(".chat-contact");
  if (chatContact) {
    activeChatUserId = chatContact.dataset.chatUserId;
    renderMessages();
    return;
  }

  const moreAction = event.target.closest("[data-more-action]");
  if (moreAction) {
    handleMoreAction(moreAction.dataset.moreAction);
    return;
  }

  const accountChoice = event.target.closest(".account-choice");
  if (accountChoice) {
    setCurrentUser(accountChoice.dataset.userId);
  }

  const followButton = event.target.closest(".follow-button");
  if (followButton) {
    toggleFollow(followButton.closest(".suggestion").dataset.userId);
  }
});

feed.addEventListener("click", (event) => {
  const post = event.target.closest(".post");
  if (!post) return;

  if (event.target.closest(".like-button") || (event.target.closest(".post-media") && !event.target.closest("video"))) {
    toggleLike(post);
  }

  if (event.target.closest(".save-button")) {
    toggleSave(post);
  }

  if (event.target.closest(".focus-comment")) {
    post.querySelector(".comment-row input").focus();
  }

  if (event.target.closest(".delete-post")) {
    deletePost(post.dataset.postId);
  }
});

feed.addEventListener("keydown", (event) => {
  const media = event.target.closest(".post-media");
  if (!media || (event.key !== "Enter" && event.key !== " ")) return;
  event.preventDefault();
  toggleLike(media.closest(".post"));
});

feed.addEventListener("submit", (event) => {
  event.preventDefault();
  const postElement = event.target.closest(".post");
  const input = event.target.querySelector("input");
  const text = input.value.trim();
  const post = state.posts.find((item) => item.id === postElement.dataset.postId);
  if (!text || !post) return;

  post.comments.push({
    id: makeId("c"),
    userId: currentUser().id,
    text,
    createdAt: Date.now()
  });
  input.value = "";
  saveState();
  renderPosts();
});

publishButton.addEventListener("click", publishPost);
registrationForm.addEventListener("submit", registerWithEmail);
registerProfileName.addEventListener("input", () => {
  const profileName = registerProfileName.value.trim();
  if (!profileName) {
    registrationMessage.textContent = "";
    return;
  }
  const profile = validateProfileName(profileName);
  registrationMessage.textContent = profile.error || "Profile name is available.";
});
googleRegisterButton.addEventListener("click", registerWithGoogle);
registrationFirebaseSetupButton.addEventListener("click", openFirebaseSetup);
showLoginButton.addEventListener("click", () => showLogin());
document.querySelector("#createAccountButton").addEventListener("click", createAccount);
document.querySelector("#signInButton").addEventListener("click", signInByUsername);
document.querySelector("#logoutButton").addEventListener("click", () => {
  localStorage.removeItem(AUTH_SESSION_KEY);
  showLogin("Logged out.");
});
document.querySelectorAll(".logout-trigger").forEach((button) => {
  button.addEventListener("click", () => {
    localStorage.removeItem(AUTH_SESSION_KEY);
    showLogin("Logged out.");
  });
});
document.querySelectorAll(".utility-dialog form, .messages-dialog form").forEach((form) => {
  form.addEventListener("submit", (event) => event.preventDefault());
});
loginForm.addEventListener("submit", loginWithIdentifier);
googleLoginButton.addEventListener("click", () => signInWithSocialProvider("google"));
facebookLoginButton.addEventListener("click", () => signInWithSocialProvider("facebook"));
googleSwitchButton.addEventListener("click", () => signInWithSocialProvider("google", {
  forceAccountChoice: true,
  messageElement: googleSwitchMessage
}));
googleOtherAccountButton.addEventListener("click", () => signInWithSocialProvider("google", {
  forceAccountChoice: true,
  messageElement: googleSwitchMessage
}));
googleSetupButton.addEventListener("click", () => {
  closeDialog(googleSwitchDialog);
  openFirebaseSetup();
});
profileSearchInput.addEventListener("input", () => renderProfileSearch(profileSearchInput.value));
reelFileInput.addEventListener("change", previewReelFile);
publishReelButton.addEventListener("click", publishDeviceReel);
sendChatButton.addEventListener("click", sendChatMessage);
chatInput.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") return;
  event.preventDefault();
  sendChatMessage();
});
openCreateLoginButton.addEventListener("click", () => {
  openDialog(authDialog);
  createNameInput.focus();
});
openFirebaseSetupButton.addEventListener("click", openFirebaseSetup);
saveFirebaseConfigButton.addEventListener("click", saveFirebaseConfig);

document.querySelector("#resetDemoButton").addEventListener("click", () => {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(AUTH_SESSION_KEY);
  localStorage.removeItem(FIREBASE_CONFIG_KEY);
  localStorage.removeItem(REGISTRATION_COMPLETED_KEY);
  Object.assign(state, structuredClone(seedState));
  saveState();
  closeDialog(authDialog);
  showRegistration("Demo data reset. Create a new account.");
});

window.addEventListener("storage", (event) => {
  if (event.key === STORAGE_KEY) syncFromStorage();
});
chatChannel?.addEventListener("message", syncFromStorage);

if (restoreSession()) {
  showApp();
} else if (!localStorage.getItem(REGISTRATION_COMPLETED_KEY)) {
  showRegistration();
  handleFirebaseRedirectResult();
} else {
  showLogin();
  handleFirebaseRedirectResult();
}
saveState();
