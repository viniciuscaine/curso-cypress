/// <reference types= "cypress" />

describe('Cypress basics', () => {
    beforeEach('Visit Page', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    it.only('Should visit a page and assert title', () => {
        cy.title().should('be.equal', 'Campo de Treinamento')

        let syncTitle

        cy.title().then(title => {
            console.log(title)
            cy.get('#formNome').type(title)

            syncTitle = title
        })

        cy.get('[data-cy="dataSobrenome"]').then($el => {
            $el.val(syncTitle)
        })

        cy.get('#elementosForm\\:sugestoes').then($el => {
            cy.wrap($el).type(syncTitle)
        })
    })

    it('Find and interact with an element', () => {
        cy.get('#buttonSimple').click().should('have.value', 'Obrigado!')
    })
})
