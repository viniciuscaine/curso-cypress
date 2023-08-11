import loc from './locators'

Cypress.Commands.add('accessAccounts', () => {
    cy.get(loc.MENU.SETTINGS).click()
    cy.xpath(loc.MENU.ACCOUNTS).click()
})

Cypress.Commands.add('insertAccount', account => {
    cy.get(loc.ACCOUNT.NAME).clear().type(account)
    cy.get(loc.ACCOUNT.SAVE).click()
})
