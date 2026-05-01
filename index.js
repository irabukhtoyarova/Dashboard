const openButton = document.querySelector('.open-button');
const openSidePanel = document.querySelector('.side-panel');
const closeSidePanel = document.querySelector('.toggle-button');
openButton.addEventListener('click', function () {
  openButton.classList.toggle('none');
  openSidePanel.classList.toggle('open');
});
closeSidePanel.addEventListener('click', function () {
  openButton.classList.toggle('none');
  openSidePanel.classList.toggle('open');
});

const projectBtn = document.getElementById('nav-project');
const employeeBtn = document.getElementById('nav-employees');
const projectPage = document.querySelector('.project-content');
const employeePage = document.querySelector('.employees-content');

function showSection(sectionName) {
  localStorage.setItem('activeSection', sectionName);

  if (sectionName === 'employees') {
    employeeBtn.classList.add('active');
    employeePage.classList.add('active');
    projectBtn.classList.remove('active');
    projectPage.classList.add('none');
  } else {
    projectBtn.classList.add('active');
    projectPage.classList.remove('none');
    employeeBtn.classList.remove('active');
    employeePage.classList.remove('active');
  }
}

employeeBtn.addEventListener('click', () => showSection('employees'));
projectBtn.addEventListener('click', () => showSection('projects'));

const addProjectBtn = document.getElementById('add-project-btn');
const AddProjectPanel = document.getElementById('add-project-panel');
const closeAddProjectBtn = document.getElementById('cancel-project-btn-form');
addProjectBtn.addEventListener('click', function () {
  AddProjectPanel.classList.toggle('open');
});
closeAddProjectBtn.addEventListener('click', function () {
  AddProjectPanel.classList.toggle('open');
});

const openDataPopupBtn = document.getElementById('seed-data-btn');
const dataPopup = document.getElementById('seed-data-popup');
const dataBackdrop = document.getElementById('seed-data-backdrop');
const closeDataPopupBtn = document.querySelector('.close-popup-btn');
openDataPopupBtn.addEventListener('click', function () {
  dataPopup.classList.toggle('on');
  dataBackdrop.classList.toggle('on');
  document.getElementById('current-month-display').textContent = getPeriodKey();

  renderSeedTable();
});

window.openShowEmployeesPopup = function (projectIndex) {
  const showEmployeesPopup = document.getElementById('show-employees-popup');
  const dataBackdrop = document.getElementById('seed-data-backdrop');

  const allData = JSON.parse(localStorage.getItem('monthlyData')) || {};
  const period = getPeriodKey();
  const project = allData[period].projects[projectIndex];

  const listBody = document.getElementById('show-employees-table-body');
  listBody.innerHTML = '';

  const employees = project.assignedEmployees || [];

  employees.forEach((emp) => {
    const row = `<tr><td>${emp.name}</td><td>${emp.surname}</td><td>${emp.position}</td></tr>`;
    listBody.insertAdjacentHTML('beforeend', row);
  });

  showEmployeesPopup.classList.add('on');
  dataBackdrop.classList.add('on');
};

function calculateAge(dobString) {
  if (!dobString) return '';
  const dob = new Date(dobString);
  const today = new Date();

  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return age;
}

window.closeShowEmployeesPopup = function () {
  const showEmployeesPopup = document.getElementById('show-employees-popup');
  const dataBackdrop = document.getElementById('seed-data-backdrop');

  showEmployeesPopup.classList.remove('on');
  dataBackdrop.classList.remove('on');
};

function renderSeedTable() {
  const seedTableBody = document.getElementById('seed-data-table-body');
  const allData = JSON.parse(localStorage.getItem('monthlyData')) || {};
  const currentPeriod = getPeriodKey();

  seedTableBody.innerHTML = '';
  Object.keys(allData).forEach((period) => {
    if (period === currentPeriod) return;

    const data = allData[period];
    const [year, month] = period.split('-');

    const totalIncome = data.projects.reduce((sum, p) => sum + Number(p.projectBudget || 0), 0);

    const rowHTML = `
      <tr>
        <td>${year}</td>
        <td>${month}</td>
        <td>${data.projects.length}</td>
        <td>${data.employees.length}</td>
        <td>${totalIncome}</td>
        <td>
          <button class="copy-btn" onclick="copyDataFrom('${period}')">Copy</button>
        </td>
      </tr>
    `;
    seedTableBody.insertAdjacentHTML('beforeend', rowHTML);
  });

  window.copyDataFrom = function (sourcePeriod) {
    const allData = JSON.parse(localStorage.getItem('monthlyData')) || {};
    const targetPeriod = getPeriodKey();

    if (!allData[targetPeriod]) {
      allData[targetPeriod] = { employees: [], projects: [] };
    }

    const sourceData = allData[sourcePeriod];

    allData[targetPeriod].employees = [...allData[targetPeriod].employees, ...sourceData.employees];

    allData[targetPeriod].projects = [...allData[targetPeriod].projects, ...sourceData.projects];

    localStorage.setItem('monthlyData', JSON.stringify(allData));

    dataPopup.classList.remove('on');
    dataBackdrop.classList.remove('on');
    loadAndRender();
  };
}

closeDataPopupBtn.addEventListener('click', function () {
  dataPopup.classList.toggle('on');
  dataBackdrop.classList.toggle('on');
});

const openAddEmployeeBtn = document.getElementById('add-employee-btn');
const AddEmployeePanel = document.getElementById('add-employee-panel');
const closeAddEmployeeBtn = document.getElementById('cancel-employee-btn-form');
openAddEmployeeBtn.addEventListener('click', function () {
  AddEmployeePanel.classList.toggle('open');
});
closeAddEmployeeBtn.addEventListener('click', function () {
  AddEmployeePanel.classList.toggle('open');
});

const addNewEmployeeBtn = document.getElementById('add-employee-btn-form');
const addNewEmployeeForm = document.getElementById('add-employee-form');
addNewEmployeeForm.addEventListener('input', () => {
  if (addNewEmployeeForm.checkValidity()) {
    addNewEmployeeBtn.disabled = false;
  } else {
    addNewEmployeeBtn.disabled = true;
  }
});

const addNewProjectBtn = document.getElementById('add-project-btn-form');
const addNewProjectForm = document.getElementById('add-project-form');
addNewProjectForm.addEventListener('input', () => {
  if (addNewProjectForm.checkValidity()) {
    addNewProjectBtn.disabled = false;
  } else {
    addNewProjectBtn.disabled = true;
  }
});

const projectTableBody = document.getElementById('projects-table-body');
const employeeTableBody = document.getElementById('employee-table-body');
addNewEmployeeForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const employeeData = {
    name: document.getElementById('name').value,
    surname: document.getElementById('surname').value,
    dob: document.getElementById('dob').value,
    position: document.getElementById('position').value,
    salary: document.getElementById('salary').value,
  };

  saveToLocalStorage(employeeData);
  loadAndRender();
  addNewEmployeeForm.reset();
  addNewEmployeeBtn.disabled = true;
});

const monthSelect = document.getElementById('month-select');
const yearSelect = document.getElementById('year-select');

function getPeriodKey() {
  const month = document.getElementById('month-select').value;
  const year = document.getElementById('year-select').value;
  return `${year}-${month}`;
}

function saveToLocalStorage(newEmployee) {
  const allData = JSON.parse(localStorage.getItem('monthlyData')) || {};
  const period = `${yearSelect.value}-${monthSelect.value}`;

  if (!allData[period]) {
    allData[period] = { employees: [], projects: [] };
  }

  allData[period].employees.push(newEmployee);

  localStorage.setItem('monthlyData', JSON.stringify(allData));
}

function loadAndRender() {
  const allData = JSON.parse(localStorage.getItem('monthlyData')) || {};
  const period = getPeriodKey();

  const monthData = allData[period] || { employees: [], projects: [] };

  renderEmployees(monthData.employees);
  renderProjects(monthData.projects);
}

[monthSelect, yearSelect].forEach((select) => {
  select.addEventListener('change', loadAndRender);
});

function renderEmployees(employees) {
  employeeTableBody.innerHTML = '';

  employees.forEach((emp, index) => {
    const age = calculateAge(emp.dob);
    const employee = `
      <tr>
        <td>${emp.name}</td>
        <td>${emp.surname}</td>
        <td>${age} years</td>
        <td>${emp.position}</td>
        <td>${emp.salary}</td>
        <td></td>
        <td></td>
        <td></td>
        <td>
        <button>Availability</button>
        <button>Assign</button>
        <button class="delete-btn" onclick="deleteEmployee(${index})">Delete</button>
        </td>
      </tr>
    `;
    employeeTableBody.insertAdjacentHTML('beforeend', employee);
  });
}

function renderProjects(projects) {
  projectTableBody.innerHTML = '';

  projects.forEach((proj, index) => {
    const projects = `
      <tr>
        <td>${proj.projectName}</td>
        <td>${proj.companyName}</td>
        <td>${proj.projectBudget}</td>
        <td>${proj.employeeCapacity}</td>
        <td><button onclick='openShowEmployeesPopup(${index})'>Show Employees</button></td>
        <td></td>
        <td><button class="delete-btn" onclick="deleteProject(${index})">Delete</button></td>

      </tr>
    `;
    projectTableBody.insertAdjacentHTML('beforeend', projects);
  });
}

function saveProjectToLocalStorage(newProject) {
  const allData = JSON.parse(localStorage.getItem('monthlyData')) || {};
  const period = `${yearSelect.value}-${monthSelect.value}`;

  if (!allData[period]) {
    allData[period] = { employees: [], projects: [] };
  }

  allData[period].projects.push(newProject);

  localStorage.setItem('monthlyData', JSON.stringify(allData));
}

addNewProjectForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const projectData = {
    projectName: document.getElementById('project-name').value,
    companyName: document.getElementById('company-name').value,
    projectBudget: document.getElementById('project-budget').value,
    employeeCapacity: document.getElementById('employee-capacity').value,
  };

  saveProjectToLocalStorage(projectData);
  addNewProjectForm.reset();
  addNewProjectBtn.disabled = true;
});

[monthSelect, yearSelect].forEach((select) => {
  select.addEventListener('change', () => {
    localStorage.setItem('selectedMonth', monthSelect.value);
    localStorage.setItem('selectedYear', yearSelect.value);
  });
});

const savedMonth = localStorage.getItem('selectedMonth');
const savedYear = localStorage.getItem('selectedYear');

if (savedMonth) {
  monthSelect.value = savedMonth;
}
if (savedYear) {
  yearSelect.value = savedYear;
}

const savedSection = localStorage.getItem('activeSection') || 'employees';

showSection(savedSection);

window.deleteEmployee = function (index) {
  const allData = JSON.parse(localStorage.getItem('monthlyData')) || {};
  const period = getPeriodKey();

  if (allData[period] && allData[period].employees) {
    allData[period].employees.splice(index, 1);

    localStorage.setItem('monthlyData', JSON.stringify(allData));

    loadAndRender();
  }
};

window.deleteProject = function (index) {
  const allData = JSON.parse(localStorage.getItem('monthlyData')) || {};
  const period = getPeriodKey();

  if (allData[period] && allData[period].projects) {
    allData[period].projects.splice(index, 1);

    localStorage.setItem('monthlyData', JSON.stringify(allData));

    loadAndRender();
  }
};

loadAndRender();
