/// <reference types= "cypress" />

describe('Work with Popup', () => {

    it('Check if the popup was opened', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
        cy.window().then(win => {
            cy.stub(win, 'open').as('winOpen')
        })
        cy.get('#buttonPopUp').click()
        cy.get('@winOpen').should('be.called')
    })

    describe.only('Work with Links', () => {

        beforeEach(() => {
            cy.visit('https://wcaquino.me/cypress/componentes.html')
        })

        it('Check popup URL', () => {
            cy.contains('Popup2').should('have.prop', 'href').and('equal', 'https://wcaquino.me/cypress/frame.html')
        })
    
        it('Should access popup dinamically', () => {
            cy.contains('Popup2').then($a => {
                const href = $a.prop('href')
                cy.visit(href)
                cy.get('#tfield').type('teste').should('have.value', 'teste')
            })
        })

        it('Should force link on same page', () => {
            cy.contains('Popup2').invoke('removeAttr', 'target').click()
            cy.get('#tfield').type('teste').should('have.value', 'teste')
        })
    })
})
