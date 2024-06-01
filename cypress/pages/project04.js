/// <reference types="cypress"/>

class ToDo {

  // Locators 

  getModal() {
    return cy.get('.panel')
  }

  getInputNewToDo() {
    return cy.get('.input').first()
  }

  getInputSearch() {
    return cy.get('.input').last()
  }
  getTask() {
    return cy.get('.fa-circle-check')
  }

  getAddButton() {
    return cy.get('.Button_c_button__TmkRS')
  }

  getTaskList() {
    return cy.get('.todo-item')
  }
  getTrashAll() {
    return cy.get('.destroy')
  }

  getRemoveCompletedTask() {
    return cy.get('#clear')
  }
  getError() {
    return cy.get('.is-danger')
  }
  // Methods

  clickAddButton() {
    this.getAddButton().click();
  }

  addNewTask(taskText) {
    this.getInputNewToDo().clear().type(taskText);
    this.getAddButton().click();
  }

  findTask(taskText) {
    this.getInputSearch().clear().type(taskText);  
  }

  validateNumberOfTasks(expectedCount) {
    this.getTaskList().should('have.length', expectedCount);
  }

  markTaskAsCompleted(i) {
    this.getTask().eq(i - 1).click();
  }

  validateTaskCompleted(i) {
    this.getTaskList().find('span').eq(i - 1).should('have.class', 'has-text-success');
  }

  removeTask(i) {
    this.getTrashAll().eq(i - 1).click();
  }
  
  removeCompletedTasks() {
    this.getRemoveCompletedTask().click();
  }

}
export default ToDo


