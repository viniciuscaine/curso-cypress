/// <reference types= "cypress" />

describe('Synchronism', () => {
    beforeEach(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    it('Wait for Element be Avaiable', () => {
        cy.get('#novoCampo').should('not.exist')
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo').should('not.exist')
        cy.get('#novoCampo').should('exist').type('Teste').should('have.value', 'Teste')
    })

    it('Find Element', () => {
        cy.get('#buttonList').click();
        cy.get('#lista li').find('span').should('contain', 'Item 1').should('contain', 'Item 2')

        cy.get('#buttonList').click();
        cy.get('#lista li').find('span').should('have.text', 'Item 1Item 2')
    })

    it('Timeout', () => {
        // cy.get('#buttonDelay').click()
        // cy.get('#novoCampo').should('exist')

        // cy.get('#buttonList').click();
        // cy.get('#lista li span', { timeout: 30000 }).should('contain', 'Item 2')

        cy.get('#buttonList').click();
        cy.get('#lista li span').should('have.length', 1)
        cy.get('#lista li span').should('have.length', 2)

    })

    it('Click Retry', () => {
        cy.get('#buttonCount').click().should('have.value', 1)
        cy.get('#buttonCount').click().should('have.value', 11)
        cy.get('#buttonCount').click().click().should('have.value', 111)

    })

    it.only('Should vs Then', () => {
        cy.get('#buttonList').then($el => {
            // console.log($el)
            expect($el).to.have.length(1)
            cy.get('#buttonList')
        })
    })
})
