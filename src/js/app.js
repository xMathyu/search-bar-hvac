// Application state
let selectedTasks = [];
let collapsedCategories = {}; // Track collapsed state

// Modal pagination variables
let modalCurrentPage = 1;
let modalTasksPerPage = CONFIG.MODAL_TASKS_PER_PAGE;
let modalFilteredTasks = [];

// DOM elements cache
const elements = {
  hvacDevice: null,
  searchInput: null,
  tasksDropdown: null,
  dropdownTaskList: null,
  selectedTasksList: null,
  deviceInfo: null,
  totalSummary: null,
  grandTotal: null,
  tasksModal: null,
  modalSearchInput: null,
  modalTasksList: null,
  allTasksButton: null,
  closeModalButton: null,
  modalPrevBtn: null,
  modalNextBtn: null,
  modalShowingFrom: null,
  modalShowingTo: null,
  modalTotalTasks: null,
  modalPageInfo: null,
};

// Initialize the application
function initApp() {
  cacheElements();
  attachEventListeners();
  renderSelectedTasks();
}

// Cache DOM elements for better performance
function cacheElements() {
  elements.hvacDevice = document.getElementById("hvacDevice");
  elements.searchInput = document.getElementById("searchInput");
  elements.tasksDropdown = document.getElementById("tasksDropdown");
  elements.dropdownTaskList = document.getElementById("dropdownTaskList");
  elements.selectedTasksList = document.getElementById("selectedTasksList");
  elements.deviceInfo = document.getElementById("deviceInfo");
  elements.totalSummary = document.getElementById("totalSummary");
  elements.grandTotal = document.getElementById("grandTotal");
  elements.tasksModal = document.getElementById("tasksModal");
  elements.modalSearchInput = document.getElementById("modalSearchInput");
  elements.modalTasksList = document.getElementById("modalTasksList");
  elements.allTasksButton = document.getElementById("allTasksButton");
  elements.closeModalButton = document.getElementById("closeModalButton");
  elements.modalPrevBtn = document.getElementById("modalPrevBtn");
  elements.modalNextBtn = document.getElementById("modalNextBtn");
  elements.modalShowingFrom = document.getElementById("modalShowingFrom");
  elements.modalShowingTo = document.getElementById("modalShowingTo");
  elements.modalTotalTasks = document.getElementById("modalTotalTasks");
  elements.modalPageInfo = document.getElementById("modalPageInfo");
}

// Attach all event listeners
function attachEventListeners() {
  // HVAC device selector
  elements.hvacDevice.addEventListener("change", selectHVACDevice);

  // Search input
  elements.searchInput.addEventListener("click", toggleDropdown);
  elements.searchInput.addEventListener("input", filterDropdownTasks);

  // Modal controls
  elements.allTasksButton.addEventListener("click", (e) => {
    e.stopPropagation();
    openTasksModal();
  });
  elements.closeModalButton.addEventListener("click", closeTasksModal);
  elements.modalSearchInput.addEventListener("input", filterModalTasks);
  elements.modalPrevBtn.addEventListener("click", previousPage);
  elements.modalNextBtn.addEventListener("click", nextPage);

  // Event delegation for dynamic content
  document.addEventListener("click", handleDynamicClicks);
  document.addEventListener("change", handleDynamicChanges);

  // Global event listeners
  document.addEventListener("click", handleOutsideClick);
  document.addEventListener("keydown", handleKeydown);
}

// Handle clicks on dynamically generated content
function handleDynamicClicks(e) {
  const target = e.target.closest("[data-action]");
  if (!target) return;

  const action = target.dataset.action;
  const taskId = parseInt(target.dataset.taskId);
  const categoryKey = target.dataset.categoryKey;
  const searchQuery = target.dataset.searchQuery;

  switch (action) {
    case "select-task-modal":
      selectTaskFromModal(taskId);
      break;
    case "select-task-dropdown":
      selectTask(taskId);
      break;
    case "remove-task":
      removeTask(taskId);
      break;
    case "toggle-category":
      toggleCategory(categoryKey);
      break;
    case "view-more-results":
      openModalWithSearch(searchQuery);
      break;
  }
}

// Handle changes on dynamically generated content
function handleDynamicChanges(e) {
  if (e.target.dataset.costField && e.target.dataset.taskId) {
    const taskId = parseInt(e.target.dataset.taskId);
    const field = e.target.dataset.costField;
    const value = e.target.value;
    updateTaskCost(taskId, field, value);
  }
}

// Modal functions
function openTasksModal() {
  // Use both methods to ensure visibility
  elements.tasksModal.classList.remove("hidden");
  elements.tasksModal.style.display = "flex";

  modalCurrentPage = 1;
  modalFilteredTasks = [...tasks];
  renderModalTasks();
  document.body.style.overflow = "hidden"; // Prevent background scroll

  // Force display after a small delay to ensure it's not overridden
  setTimeout(() => {
    elements.tasksModal.style.display = "flex";
    elements.tasksModal.classList.remove("hidden");
  }, 10);
}

function openModalWithSearch(searchQuery) {
  // Open modal first
  elements.tasksModal.classList.remove("hidden");
  elements.tasksModal.style.display = "flex";

  // Set the search query in the modal search input immediately
  elements.modalSearchInput.value = searchQuery;

  // Apply the search filter
  modalFilteredTasks = tasks.filter(
    (t) =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.system.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.priority.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.categoryName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  modalCurrentPage = 1;
  renderModalTasks();
  document.body.style.overflow = "hidden"; // Prevent background scroll

  // Close the dropdown
  hideDropdown();

  // Force display and ensure search input value is set after a delay
  setTimeout(() => {
    elements.tasksModal.style.display = "flex";
    elements.tasksModal.classList.remove("hidden");
    // Double-check that the search value is set
    elements.modalSearchInput.value = searchQuery;
    // Focus on the search input to show the user the search term
    elements.modalSearchInput.focus();
    elements.modalSearchInput.blur(); // Remove focus but keep the value visible
  }, 10);
}

function closeTasksModal() {
  elements.tasksModal.classList.add("hidden");
  elements.tasksModal.style.display = "none";
  elements.modalSearchInput.value = "";
  document.body.style.overflow = "auto"; // Restore background scroll
}

function filterModalTasks() {
  const query = elements.modalSearchInput.value.toLowerCase();

  if (query.length === 0) {
    modalFilteredTasks = [...tasks];
  } else {
    modalFilteredTasks = tasks.filter(
      (t) =>
        t.name.toLowerCase().includes(query) ||
        t.system.toLowerCase().includes(query) ||
        t.priority.toLowerCase().includes(query) ||
        t.categoryName.toLowerCase().includes(query)
    );
  }

  modalCurrentPage = 1;
  renderModalTasks();
}

function renderModalTasks() {
  const startIndex = (modalCurrentPage - 1) * modalTasksPerPage;
  const endIndex = startIndex + modalTasksPerPage;
  const paginatedTasks = modalFilteredTasks.slice(startIndex, endIndex);

  if (paginatedTasks.length === 0) {
    elements.modalTasksList.innerHTML =
      '<div class="text-center text-gray-400 py-8">No tasks found</div>';
    updateModalPagination();
    return;
  }

  const groupedTasks = {};
  paginatedTasks.forEach((task) => {
    if (!groupedTasks[task.type]) {
      groupedTasks[task.type] = [];
    }
    groupedTasks[task.type].push(task);
  });

  elements.modalTasksList.innerHTML = Object.keys(groupedTasks)
    .map((categoryKey) => {
      const category = taskCategories[categoryKey];
      const categoryTasks = groupedTasks[categoryKey];

      return `
            <div class="border border-gray-200 rounded-lg overflow-hidden">
                <div class="px-4 py-3 bg-gray-50 border-b border-gray-200">
                    <div class="flex items-center">
                        <div class="w-3 h-3 bg-${
                          category.color
                        }-500 rounded-full mr-3"></div>
                        <span class="font-semibold text-gray-700">${
                          category.name
                        }</span>
                        <span class="ml-2 text-sm text-gray-500">(${
                          categoryTasks.length
                        } ${
        categoryTasks.length === 1 ? "task" : "tasks"
      })</span>
                    </div>
                </div>
                <div class="divide-y divide-gray-200">
                    ${categoryTasks
                      .map((t) => {
                        const isSelected = selectedTasks.some(
                          (st) => st.id === t.id
                        );
                        return `
                            <div class="px-4 py-4 hover:bg-gray-50 cursor-pointer ${
                              isSelected ? "bg-green-50" : ""
                            }" data-action="select-task-modal" data-task-id="${
                          t.id
                        }">
                                <div class="flex items-center justify-between">
                                    <div class="flex-1">
                                        <div class="font-medium text-gray-800">${
                                          t.name
                                        }</div>
                                        <div class="text-sm text-gray-600 mt-1">
                                            <span class="inline-block bg-gray-100 px-2 py-1 rounded text-xs mr-2">${capitalize(
                                              t.system
                                            )}</span>
                                            <span class="inline-block bg-${getPriorityColor(
                                              t.priority
                                            )}-100 text-${getPriorityColor(
                          t.priority
                        )}-800 px-2 py-1 rounded text-xs">${capitalize(
                          t.priority
                        )}</span>
                                        </div>
                                    </div>
                                    ${
                                      isSelected
                                        ? `
                                        <div class="ml-4 text-green-600">
                                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                            </svg>
                                        </div>
                                    `
                                        : `
                                        <div class="ml-4 text-gray-400">
                                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                            </svg>
                                        </div>
                                    `
                                    }
                                </div>
                            </div>
                        `;
                      })
                      .join("")}
                </div>
            </div>
        `;
    })
    .join("");

  updateModalPagination();
}

function selectTaskFromModal(taskId) {
  const task = tasks.find((t) => t.id === taskId);
  const isAlreadySelected = selectedTasks.some((t) => t.id === taskId);

  if (task) {
    if (isAlreadySelected) {
      selectedTasks = selectedTasks.filter((t) => t.id !== taskId);
    } else {
      selectedTasks.push(task);
    }

    renderSelectedTasks();
    renderModalTasks(); // Update modal display
  }
}

function updateModalPagination() {
  const totalTasks = modalFilteredTasks.length;
  const totalPages = Math.ceil(totalTasks / modalTasksPerPage);
  const startIndex = (modalCurrentPage - 1) * modalTasksPerPage + 1;
  const endIndex = Math.min(modalCurrentPage * modalTasksPerPage, totalTasks);

  elements.modalShowingFrom.textContent = totalTasks > 0 ? startIndex : 0;
  elements.modalShowingTo.textContent = endIndex;
  elements.modalTotalTasks.textContent = totalTasks;
  elements.modalPageInfo.textContent = `Page ${modalCurrentPage} of ${totalPages}`;

  elements.modalPrevBtn.disabled = modalCurrentPage === 1;
  elements.modalNextBtn.disabled =
    modalCurrentPage === totalPages || totalPages === 0;
}

function previousPage() {
  if (modalCurrentPage > 1) {
    modalCurrentPage--;
    renderModalTasks();
  }
}

function nextPage() {
  const totalPages = Math.ceil(modalFilteredTasks.length / modalTasksPerPage);
  if (modalCurrentPage < totalPages) {
    modalCurrentPage++;
    renderModalTasks();
  }
}

// Dropdown functions
function toggleDropdown() {
  elements.tasksDropdown.classList.toggle("hidden");

  if (!elements.tasksDropdown.classList.contains("hidden")) {
    elements.searchInput.removeAttribute("readonly");
    elements.searchInput.focus();
    // Don't show all tasks immediately, wait for user to type at least 3 characters
    elements.dropdownTaskList.innerHTML =
      '<li class="px-4 py-3 text-gray-400 text-center">Type at least 3 characters to search...</li>';
  } else {
    elements.searchInput.setAttribute("readonly", true);
    elements.searchInput.value = "";
  }
}

function hideDropdown() {
  elements.tasksDropdown.classList.add("hidden");
  elements.searchInput.setAttribute("readonly", true);
  elements.searchInput.value = "";
}

function filterDropdownTasks() {
  const query = elements.searchInput.value.toLowerCase();

  // Only filter if query has 3 or more characters, otherwise show message
  if (query.length < CONFIG.MIN_SEARCH_CHARACTERS) {
    elements.dropdownTaskList.innerHTML =
      '<li class="px-4 py-3 text-gray-400 text-center">Type at least 3 characters to search...</li>';
    return;
  }

  const filtered = tasks.filter((t) => t.name.toLowerCase().includes(query));
  renderDropdownTasks(filtered, query);
}

function renderDropdownTasks(list, searchQuery = "") {
  if (list.length === 0) {
    elements.dropdownTaskList.innerHTML =
      '<li class="px-4 py-3 text-gray-400 text-center">No matching tasks</li>';
    return;
  }

  const maxDropdownResults = 10;
  const displayTasks = list.slice(0, maxDropdownResults);
  const hasMoreResults = list.length > maxDropdownResults;

  const groupedTasks = {};
  displayTasks.forEach((task) => {
    if (!groupedTasks[task.type]) {
      groupedTasks[task.type] = [];
    }
    groupedTasks[task.type].push(task);
  });

  let dropdownContent = Object.keys(groupedTasks)
    .map((categoryKey) => {
      const category = taskCategories[categoryKey];
      const categoryTasks = groupedTasks[categoryKey];

      return `
            <li class="border-b border-gray-100 last:border-b-0">
                <div class="px-4 py-2 bg-gray-50 border-b border-gray-100">
                    <div class="flex items-center">
                        <div class="w-2 h-2 bg-${
                          category.color
                        }-500 rounded-full mr-2"></div>
                        <span class="text-sm font-semibold text-gray-700">${
                          category.name
                        }</span>
                    </div>
                </div>
                ${categoryTasks
                  .map((t) => {
                    const isSelected = selectedTasks.some(
                      (st) => st.id === t.id
                    );
                    return `
                        <div class="px-6 py-3 hover:bg-gray-100 cursor-pointer ${
                          isSelected ? "bg-green-50" : ""
                        }" data-action="select-task-dropdown" data-task-id="${
                      t.id
                    }">
                            <div class="flex items-center justify-between">
                                <div class="flex-1">
                                    <div class="font-medium text-gray-800">${
                                      t.name
                                    }</div>
                                    <div class="text-xs text-gray-500 mt-1">${capitalize(
                                      t.system
                                    )} | ${capitalize(t.priority)}</div>
                                </div>
                                ${
                                  isSelected
                                    ? `
                                    <div class="ml-3 text-green-600">
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                    </div>
                                `
                                    : ""
                                }
                            </div>
                        </div>
                    `;
                  })
                  .join("")}
            </li>
        `;
    })
    .join("");

  // Add "View more results" button if there are more results
  if (hasMoreResults) {
    const remainingCount = list.length - maxDropdownResults;
    // Escape HTML characters in search query to prevent issues
    const escapedSearchQuery = searchQuery
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
    dropdownContent += `
      <li class="border-t border-gray-200">
        <div class="px-4 py-3 bg-blue-50 hover:bg-blue-100 cursor-pointer text-center" data-action="view-more-results" data-search-query="${escapedSearchQuery}">
          <div class="flex items-center justify-center gap-2 text-blue-600 font-medium">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
            </svg>
            View more results (${remainingCount})
          </div>
        </div>
      </li>
    `;
  }

  elements.dropdownTaskList.innerHTML = dropdownContent;
}

// Task selection and management
function selectTask(taskId) {
  const task = tasks.find((t) => t.id === taskId);
  const isAlreadySelected = selectedTasks.some((t) => t.id === taskId);

  if (task) {
    if (isAlreadySelected) {
      // Deselect the task
      selectedTasks = selectedTasks.filter((t) => t.id !== taskId);
    } else {
      // Select the task
      selectedTasks.push(task);
    }

    renderSelectedTasks();

    // Only re-render dropdown if search query has 3+ characters
    const query = elements.searchInput.value.toLowerCase();
    if (query.length >= CONFIG.MIN_SEARCH_CHARACTERS) {
      const filtered = tasks.filter((t) =>
        t.name.toLowerCase().includes(query)
      );
      renderDropdownTasks(filtered);
    }
  }
}

function removeTask(taskId) {
  selectedTasks = selectedTasks.filter((t) => t.id !== taskId);
  renderSelectedTasks();

  if (!elements.tasksDropdown.classList.contains("hidden")) {
    const query = elements.searchInput.value.toLowerCase();
    if (query.length >= CONFIG.MIN_SEARCH_CHARACTERS) {
      const filtered = tasks.filter((t) =>
        t.name.toLowerCase().includes(query)
      );
      renderDropdownTasks(filtered);
    }
  }
}

function renderSelectedTasks() {
  if (selectedTasks.length === 0) {
    elements.selectedTasksList.innerHTML =
      '<li class="text-gray-400 text-center py-4">No tasks selected</li>';
    return;
  }

  const groupedTasks = {};
  selectedTasks.forEach((task) => {
    if (!groupedTasks[task.type]) {
      groupedTasks[task.type] = [];
    }
    groupedTasks[task.type].push(task);
  });

  elements.selectedTasksList.innerHTML = Object.keys(groupedTasks)
    .map((categoryKey) => {
      const category = taskCategories[categoryKey];
      const categoryTasks = groupedTasks[categoryKey];

      return `
            <li class="mb-6">
                <div class="flex items-center mb-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors" data-action="toggle-category" data-category-key="${categoryKey}">
                    <div class="w-3 h-3 bg-${
                      category.color
                    }-500 rounded-full mr-2"></div>
                    <h4 class="font-semibold text-gray-800 text-lg">${
                      category.name
                    }</h4>
                    <span class="ml-2 text-sm text-gray-500">(${
                      categoryTasks.length
                    } ${categoryTasks.length === 1 ? "task" : "tasks"})</span>
                    <svg id="chevron-${categoryKey}" class="w-5 h-5 ml-auto text-gray-400 transition-transform duration-200 ${
        collapsedCategories[categoryKey] ? "rotate-[-90deg]" : ""
      }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </div>
                <div id="category-${categoryKey}" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 transition-all duration-300 ${
        collapsedCategories[categoryKey] ? "hidden" : ""
      }">
                    ${categoryTasks
                      .map(
                        (t) => `
                        <div class="p-4 bg-${
                          category.color
                        }-50 rounded-lg border border-${
                          category.color
                        }-200 relative">
                            <button data-action="remove-task" data-task-id="${
                              t.id
                            }" class="absolute top-2 right-2 text-red-500 hover:text-red-700 p-1">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                            
                            <div class="mb-3 pr-6">
                                <div class="font-medium text-gray-800 text-sm leading-tight">${
                                  t.name
                                }</div>
                                <div class="text-xs text-gray-600 mt-1">${capitalize(
                                  t.system
                                )} | ${capitalize(t.priority)}</div>
                            </div>
                            
                            <div class="space-y-2 mb-3">
                                <div>
                                    <label class="block text-xs font-medium text-gray-600 mb-1">Parts ($)</label>
                                    <input type="number" step="0.01" placeholder="0.00" 
                                           class="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-${
                                             category.color
                                           }-400 focus:outline-none"
                                           value="${t.partCost || ""}" 
                                           data-cost-field="partCost" data-task-id="${
                                             t.id
                                           }">
                                </div>
                                <div>
                                    <label class="block text-xs font-medium text-gray-600 mb-1">Hours</label>
                                    <input type="number" step="0.5" placeholder="0" 
                                           class="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-${
                                             category.color
                                           }-400 focus:outline-none"
                                           value="${t.laborHours || ""}" 
                                           data-cost-field="laborHours" data-task-id="${
                                             t.id
                                           }">
                                </div>
                                <div>
                                    <label class="block text-xs font-medium text-gray-600 mb-1">Fee ($)</label>
                                    <input type="number" step="0.01" placeholder="0.00" 
                                           class="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-${
                                             category.color
                                           }-400 focus:outline-none"
                                           value="${t.flatFee || ""}" 
                                           data-cost-field="flatFee" data-task-id="${
                                             t.id
                                           }">
                                </div>
                            </div>
                            
                            <div class="pt-2 border-t border-${
                              category.color
                            }-200 text-center">
                                <span class="text-xs text-gray-600">Total: </span>
                                <span class="font-semibold text-green-600 text-sm">$${calculateTotal(
                                  t
                                ).toFixed(2)}</span>
                            </div>
                        </div>
                    `
                      )
                      .join("")}
                </div>
            </li>
        `;
    })
    .join("");

  updateGrandTotal();
}

// HVAC device selection
function selectHVACDevice() {
  const selectedDevice = elements.hvacDevice.value;

  if (!selectedDevice) {
    // Clear all selected tasks if no device is selected
    selectedTasks = [];
    elements.deviceInfo.classList.add("hidden");
    renderSelectedTasks();
    return;
  }

  const device = hvacDevices[selectedDevice];
  if (device) {
    // Show device info
    elements.deviceInfo.classList.remove("hidden");
    elements.deviceInfo.querySelector("span").textContent = device.name;

    // Clear current selection
    selectedTasks = [];

    // Add default tasks for this device
    device.defaultTasks.forEach((taskId) => {
      const task = tasks.find((t) => t.id === taskId);
      if (task && !selectedTasks.some((t) => t.id === taskId)) {
        selectedTasks.push(task);
      }
    });

    // Re-render selected tasks
    renderSelectedTasks();

    // Update dropdown only if it's open and has 3+ characters
    if (!elements.tasksDropdown.classList.contains("hidden")) {
      const query = elements.searchInput.value.toLowerCase();
      if (query.length >= CONFIG.MIN_SEARCH_CHARACTERS) {
        const filtered = tasks.filter((t) =>
          t.name.toLowerCase().includes(query)
        );
        renderDropdownTasks(filtered);
      }
    }
  }
}

// Cost calculation functions
function updateTaskCost(taskId, field, value) {
  const task = selectedTasks.find((t) => t.id === taskId);
  if (task) {
    task[field] = parseFloat(value) || 0;
    renderSelectedTasks();
  }
}

function calculateTotal(task) {
  const partCost = parseFloat(task.partCost) || 0;
  const laborHours = parseFloat(task.laborHours) || 0;
  const flatFee = parseFloat(task.flatFee) || 0;

  return partCost + laborHours * CONFIG.LABOR_RATE + flatFee;
}

function updateGrandTotal() {
  if (selectedTasks.length === 0) {
    elements.totalSummary.classList.add("hidden");
    return;
  }

  const grandTotal = selectedTasks.reduce(
    (sum, task) => sum + calculateTotal(task),
    0
  );
  elements.grandTotal.textContent = `$${grandTotal.toFixed(2)}`;
  elements.totalSummary.classList.remove("hidden");
}

// UI utility functions
function toggleCategory(categoryKey) {
  const categoryDiv = document.getElementById(`category-${categoryKey}`);
  const chevron = document.getElementById(`chevron-${categoryKey}`);

  // Toggle the collapsed state
  collapsedCategories[categoryKey] = !collapsedCategories[categoryKey];

  if (collapsedCategories[categoryKey]) {
    categoryDiv.classList.add("hidden");
    chevron.style.transform = "rotate(-90deg)";
  } else {
    categoryDiv.classList.remove("hidden");
    chevron.style.transform = "rotate(0deg)";
  }
}

function getPriorityColor(priority) {
  switch (priority) {
    case "critical":
      return "red";
    case "high":
      return "orange";
    case "medium":
      return "yellow";
    case "low":
      return "green";
    default:
      return "gray";
  }
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Event handlers
function handleOutsideClick(e) {
  // Close dropdown when clicking outside
  if (
    !elements.tasksDropdown.contains(e.target) &&
    !elements.searchInput.contains(e.target)
  ) {
    elements.tasksDropdown.classList.add("hidden");
    elements.searchInput.value = "";
    elements.searchInput.setAttribute("readonly", true);
  }

  // Close modal when clicking outside
  const modalContent = elements.tasksModal.querySelector(".bg-white");
  const allTasksButton = e.target.closest('button[id="allTasksButton"]');

  // Don't close if clicking the "All Tasks" button
  if (allTasksButton) {
    return;
  }

  if (
    elements.tasksModal &&
    elements.tasksModal.style.display === "flex" &&
    !modalContent.contains(e.target)
  ) {
    closeTasksModal();
  }
}

function handleKeydown(e) {
  // Close modal with Escape key
  if (e.key === "Escape") {
    if (elements.tasksModal.style.display === "flex") {
      closeTasksModal();
    }
  }
}

// Initialize the application when the DOM is loaded
document.addEventListener("DOMContentLoaded", initApp);
