// These values remember your demo workspace on this device only.
const PROFILE_KEY = "morrow-demo-profile";
const TASKS_KEY = "morrow-demo-tasks";

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const contactForm = document.querySelector("#contact-form");
const workspace = document.querySelector("#workspace-app");
const workspaceNotice = document.querySelector("#workspace-notice");
const workspaceName = document.querySelector("#workspace-name");
const workspacePlan = document.querySelector("#workspace-plan");
const taskForm = document.querySelector("#task-form");
const taskList = document.querySelector("#task-list");
const taskCount = document.querySelector("#task-count");
const emptyTasks = document.querySelector("#empty-tasks");
const signupPlan = document.querySelector("#signup-plan");

let profile = null;
let tasks = [];
let selectedPlan = "trial";
let activeFilter = "all";

// Read saved information and show a clear message if this browser blocks storage.
function loadSavedData(key, fallbackValue) {
  try {
    const savedValue = localStorage.getItem(key);
    return savedValue ? JSON.parse(savedValue) : fallbackValue;
  } catch (error) {
    workspaceNotice.textContent = "Your browser could not read the saved demo data. You can still use this workspace until you close this page.";
    return fallbackValue;
  }
}

// Save changes so tasks remain here when the page is refreshed on this device.
function saveData(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    workspaceNotice.textContent = "Demo only — saved in this browser. No online account or payments.";
    return true;
  } catch (error) {
    workspaceNotice.textContent = "Your browser could not save this change. The task will only stay until you close this page.";
    return false;
  }
}

function closeMenu() {
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
  navLinks.classList.remove("is-open");
}

function showWorkspace() {
  document.body.classList.add("workspace-active");
  workspace.hidden = false;
  workspaceName.textContent = profile.name.split(" ")[0];
  workspacePlan.textContent = profile.plan === "team" ? "TEAM PLAN PREVIEW" : "FREE TRIAL PREVIEW";
  renderTasks();
  window.scrollTo(0, 0);
}

function showWebsite() {
  document.body.classList.remove("workspace-active");
  workspace.hidden = true;
  window.scrollTo(0, 0);
}

// Build each task with textContent so typed text is always displayed safely.
function renderTasks() {
  const visibleTasks = tasks.filter((task) => {
    if (activeFilter === "open") return !task.done;
    if (activeFilter === "done") return task.done;
    return true;
  });

  taskList.replaceChildren();
  taskCount.textContent = `${tasks.filter((task) => !task.done).length} to do · ${tasks.filter((task) => task.done).length} completed`;
  emptyTasks.hidden = visibleTasks.length > 0;

  visibleTasks.forEach((task) => {
    const item = document.createElement("li");
    item.className = "task-item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.setAttribute("aria-label", `Mark ${task.title} as ${task.done ? "to do" : "completed"}`);
    checkbox.addEventListener("change", () => {
      task.done = checkbox.checked;
      saveData(TASKS_KEY, tasks);
      renderTasks();
    });

    const title = document.createElement("span");
    title.className = task.done ? "task-title is-done" : "task-title";
    title.textContent = task.title;

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-task";
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";
    deleteButton.setAttribute("aria-label", `Delete task: ${task.title}`);
    deleteButton.addEventListener("click", () => {
      tasks = tasks.filter((savedTask) => savedTask.id !== task.id);
      saveData(TASKS_KEY, tasks);
      renderTasks();
    });

    item.append(checkbox, title, deleteButton);
    taskList.append(item);
  });
}

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  menuToggle.setAttribute("aria-label", isExpanded ? "Open navigation menu" : "Close navigation menu");
  navLinks.classList.toggle("is-open", !isExpanded);
});

navLinks.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
    closeMenu();
    menuToggle.focus();
  }
});

// Pricing buttons choose which demo label appears after the workspace opens.
document.querySelectorAll("[data-workspace-plan]").forEach((button) => {
  button.addEventListener("click", () => {
    selectedPlan = button.dataset.workspacePlan;
    signupPlan.textContent = selectedPlan === "team"
      ? "Team plan preview · $8/person/month · no payment is taken"
      : "Free 14-day trial preview · no payment required";
  });
});

// Create a local demo workspace instead of sending the form to a server.
contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!contactForm.reportValidity()) return;

  profile = {
    name: contactForm.elements.name.value.trim(),
    email: contactForm.elements.email.value.trim(),
    plan: selectedPlan
  };

  saveData(PROFILE_KEY, profile);
  showWorkspace();
});

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!taskForm.reportValidity()) return;

  tasks.unshift({
    id: `${Date.now()}-${Math.random()}`,
    title: taskForm.elements.task.value.trim(),
    done: false
  });

  saveData(TASKS_KEY, tasks);
  taskForm.reset();
  activeFilter = "all";
  document.querySelectorAll("[data-filter]").forEach((button) => {
    const isSelected = button.dataset.filter === activeFilter;
    button.classList.toggle("is-active", isSelected);
    button.setAttribute("aria-pressed", String(isSelected));
  });
  renderTasks();
  taskForm.elements.task.focus();
});

document.querySelectorAll("[data-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;

    document.querySelectorAll("[data-filter]").forEach((filterButton) => {
      const isSelected = filterButton === button;
      filterButton.classList.toggle("is-active", isSelected);
      filterButton.setAttribute("aria-pressed", String(isSelected));
    });

    renderTasks();
  });
});

document.querySelector("#view-site").addEventListener("click", showWebsite);
document.querySelector("#return-to-home").addEventListener("click", showWebsite);

// Reopen the saved demo workspace when this page is revisited on the same device.
profile = loadSavedData(PROFILE_KEY, null);
tasks = loadSavedData(TASKS_KEY, []);

if (profile && typeof profile.name === "string" && Array.isArray(tasks)) {
  showWorkspace();
}
