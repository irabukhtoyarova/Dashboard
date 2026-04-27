const openButton = document.querySelector(".open-button");
const openSidePanel = document.querySelector(".side-panel");
const closeSidePanel = document.querySelector(".toggle-button");
openButton.addEventListener("click", function () {
  openButton.classList.toggle("none");
  openSidePanel.classList.toggle("open");
});
closeSidePanel.addEventListener("click", function () {
  openButton.classList.toggle("none");
  openSidePanel.classList.toggle("open");
});

const projectBtn = document.getElementById("nav-project");
const employeeBtn = document.getElementById("nav-employees");
const projectPage = document.querySelector(".project-content");
const employeePage = document.querySelector(".employees-content");
employeeBtn.addEventListener("click", function () {
  employeeBtn.classList.toggle("active");
  employeePage.classList.toggle("active");
  projectPage.classList.toggle("none");
  projectBtn.classList.toggle("active");
});
projectBtn.addEventListener("click", function () {
  projectPage.classList.toggle("none");
  projectBtn.classList.toggle("active");
  employeeBtn.classList.toggle("active");
  employeePage.classList.toggle("active");
});

const addProjectBtn = document.getElementById("add-project-btn");
const AddProjectPanel = document.getElementById("add-project-panel");
const closeAddProjectBtn = document.getElementById("cancel-project-btn-form");
addProjectBtn.addEventListener("click", function () {
  AddProjectPanel.classList.toggle("open");
});
closeAddProjectBtn.addEventListener("click", function () {
  AddProjectPanel.classList.toggle("open");
});

const openDataPopupBtn = document.getElementById("seed-data-btn");
const dataPopup = document.getElementById("seed-data-popup");
const dataBackdrop = document.getElementById("seed-data-backdrop");
const closeDataPopupBtn = document.querySelector(".close-popup-btn");
openDataPopupBtn.addEventListener("click", function () {
  dataPopup.classList.toggle("on");
  dataBackdrop.classList.toggle("on");
});
closeDataPopupBtn.addEventListener("click", function () {
  dataPopup.classList.toggle("on");
  dataBackdrop.classList.toggle("on");
});

const openAddEmployeetBtn = document.getElementById("add-employee-btn");
const AddEmployeePanel = document.getElementById("add-employee-panel");
const closeAddEmployeeBtn = document.getElementById("cancel-employee-btn-form");
openAddEmployeetBtn.addEventListener("click", function () {
  AddEmployeePanel.classList.toggle("open");
});
closeAddEmployeeBtn.addEventListener("click", function () {
  AddEmployeePanel.classList.toggle("open");
});
