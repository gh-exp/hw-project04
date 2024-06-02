/// <reference types="cypress"/>

import ToDo from '../pages/project04'

const toDoCom = new ToDo()

describe('Homework04 - Cypress-Project-04', () => {
  beforeEach(() => {
    cy.visit(`${Cypress.env('base_URL')}`)
  })

  it('Test Case 01 - Todo-App Modal Verification', () => {
    toDoCom.getModal().should('be.visible').contains('My Tasks')
    toDoCom.getInputNewToDo().should('be.enabled')
    toDoCom.getAddButton().should('be.enabled')
    toDoCom.getInputSearch().should('be.enabled')
    toDoCom.getTaskList().should('contain', 'No tasks found!')
  })

  it('Test Case 02 - Single Task Addition and Removal', () => {
    let newTask = 'New task'
    let numberTask = 1

    toDoCom.addNewTask(newTask)
    toDoCom.getTaskList().should('contain', newTask)
    toDoCom.validateNumberOfTasks(numberTask)
    toDoCom.markTaskAsCompleted(numberTask)
    toDoCom.validateTaskCompleted(numberTask)
    toDoCom.removeTask(numberTask)
    toDoCom.getTaskList().should('contain', 'No tasks found!')
  })

  it('Test Case 03 - Multiple Task Operations', () => {

    let newTask = ['Task - 1', 'Task - 2', 'Task - 3', 'Task - 4', 'Task - 5']
    let numberTask = 5

    newTask.forEach(task => toDoCom.addNewTask(task));
    newTask.forEach(task => toDoCom.getTaskList().should('contain', task));
    toDoCom.validateNumberOfTasks(numberTask)
    for (let i = 0; i < numberTask; i++) {
      toDoCom.markTaskAsCompleted(i)
    };
    toDoCom.removeCompletedTasks();
    toDoCom.getTaskList().should('contain', 'No tasks found!')

  })

  it('Test Case 04 - Search and Filter Functionality in todo App', () => {

    let newTask = ['Task - 1', 'Task - 2', 'Task - 3', 'Task - 4', 'Task - 5']
    let numberTask = 5

    newTask.forEach(task => toDoCom.addNewTask(task));
    newTask.forEach(task => toDoCom.getTaskList().should('contain', task));
    toDoCom.validateNumberOfTasks(numberTask)
    toDoCom.findTask(newTask[1])
    toDoCom.getTaskList().should('have.length', 1).and('contain', newTask[1])
  })

  it('Test Case 05 - Task Validation and Error Handling', () => {

    let vTask = 'New task'
    let notVTask = 'asdfghjkl wertyuiopxc vbnmfeewww'

    toDoCom.clickAddButton()
    toDoCom.getTaskList().should('contain', 'No tasks found!')
    toDoCom.addNewTask(notVTask)
    toDoCom.getError().should('contain', 'Error: Todo cannot be more than 30 characters!')
    toDoCom.addNewTask(vTask)
    toDoCom.getTaskList().should('have.length', 1).and('contain', vTask)
    toDoCom.addNewTask(vTask)
    toDoCom.getError().should('contain', `Error: You already have ${vTask} in your todo list.`)
  })

})