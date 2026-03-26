// ══════════════════════════════════════════════
//  TaskFlow — script.js
//  CS4717 Web Technologies I  |  Phase 1
// ══════════════════════════════════════════════

// ── Initial hard-coded tasks (array of objects) ──────
var tasks = [
  {
    id:     1,
    title:  "Set up project structure",
    desc:   "Create folders and base files",
    status: "done",
    due:    "2026-03-10"
  },
  {
    id:     2,
    title:  "Design database schema",
    desc:   "Define tables and relationships",
    status: "done",
    due:    "2026-03-14"
  },
  {
    id:     3,
    title:  "Build UI skeleton",
    desc:   "HTML + CSS layout phase",
    status: "progress",
    due:    "2026-03-26"
  },
  {
    id:     4,
    title:  "Add JavaScript interaction",
    desc:   "DOM events, validation, dynamic UI",
    status: "progress",
    due:    "2026-03-26"
  },
  {
    id:     5,
    title:  "Write project report",
    desc:   "Document design decisions",
    status: "todo",
    due:    "2026-04-02"
  }
];

// Counter for unique task IDs
var nextId = 6;


// ── Render the task list ─────────────────────────────
function renderTasks() {
  var list  = document.getElementById('task-list');
  var count = document.getElementById('task-count');

  // Update the badge counter
  count.textContent = tasks.length;

  // Show empty state when no tasks exist
  if (tasks.length === 0) {
    list.innerHTML = '<li class="empty-state">No tasks yet. Create one!</li>';
    return;
  }

  // Clear the list before re-rendering
  list.innerHTML = '';

  // Loop through tasks array and build each list item
  for (var i = 0; i < tasks.length; i++) {
    var t = tasks[i];

    // Determine badge class and label based on status
    var badgeClass = 'badge-todo';
    var badgeLabel = 'Todo';

    if (t.status === 'progress') {
      badgeClass = 'badge-progress';
      badgeLabel = 'In Progress';
    }

    if (t.status === 'done') {
      badgeClass = 'badge-done';
      badgeLabel = 'Done';
    }

    // Build due date HTML (only if a date exists)
    var dueHTML = t.due
      ? '<span class="due-date">📅 ' + t.due + '</span>'
      : '';

    // Create the <li> element
    var item = document.createElement('li');
    item.className = 'task-item';
    item.setAttribute('data-id', t.id);

    // Set inner HTML for the task item
    item.innerHTML =
      '<div class="task-info">' +
        '<div class="task-title">' + escapeHTML(t.title) + '</div>' +
        '<div class="task-meta">' +
          '<span class="badge ' + badgeClass + '">' + badgeLabel + '</span>' +
          (t.desc ? '<span class="task-desc">' + escapeHTML(t.desc) + '</span>' : '') +
          dueHTML +
        '</div>' +
      '</div>' +
      '<div class="task-actions">' +
        '<button class="btn btn-danger" onclick="deleteTask(' + t.id + ')">Delete</button>' +
      '</div>';

    // Append item to the list
    list.appendChild(item);
  }
}


// ── Add a new task ───────────────────────────────────
function addTask() {
  // Get form field references
  var titleInput  = document.getElementById('task-title');
  var descInput   = document.getElementById('task-desc');
  var statusInput = document.getElementById('task-status');

  var errorMsg    = document.getElementById('title-error');

  var title = titleInput.value.trim();

  // Validation: title must not be empty
  if (title === '') {
    titleInput.classList.add('error');
    errorMsg.classList.add('visible');
    titleInput.focus();
    return;
  }

  // Clear any previous validation state
  titleInput.classList.remove('error');
  errorMsg.classList.remove('visible');

  // Create new task object and push to array
  var newTask = {
    id:     nextId,
    title:  title,
    desc:   descInput.value.trim(),
    status: statusInput.value,
    due:    ''
  };

  tasks.push(newTask);
  nextId++;

  // Re-render the list and clear the form
  renderTasks();
  clearForm();
}


// ── Delete a task by ID ──────────────────────────────
function deleteTask(id) {
  // Find the task index in the array
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === id) {
      tasks.splice(i, 1); // Remove 1 element at index i
      break;
    }
  }

  // Re-render the updated list
  renderTasks();
}


// ── Clear the form fields ────────────────────────────
function clearForm() {
  document.getElementById('task-title').value  = '';
  document.getElementById('task-desc').value   = '';
  document.getElementById('task-status').value = 'todo';

  // Also clear any validation messages
  document.getElementById('task-title').classList.remove('error');
  document.getElementById('title-error').classList.remove('visible');
}


// ── Navbar active state ──────────────────────────────
function setNav(el) {
  // Remove active from all nav links
  var links = document.querySelectorAll('.nav-link');
  for (var i = 0; i < links.length; i++) {
    links[i].classList.remove('active');
  }

  // Set active on clicked link
  el.classList.add('active');
}


// ── Sanitise strings before inserting into HTML ──────
function escapeHTML(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}


// ── Live validation: clear error as user types ───────
document.getElementById('task-title').addEventListener('input', function () {
  if (this.value.trim() !== '') {
    this.classList.remove('error');
    document.getElementById('title-error').classList.remove('visible');
  }
});


// ── Initial render on page load ──────────────────────
renderTasks();
