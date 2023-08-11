/// <reference types= "cypress" />

describe('Dynamic Tests', () => {

    beforeEach(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    const food = ['Carne', 'Frango', 'Pizza', 'Vegetariano']

    food.forEach(food => {
        it(`Registration with the food: ${food}`, () => {
            cy.get('#formNome').type('Usuario')
            cy.get('#formSobrenome').type('Teste')
            cy.get('[name=formSexo][value=M]').click()
            cy.xpath(`//label[contains(., '${food}')]/preceding-sibling::input`).click()
            cy.get('#formEscolaridade').select('Mestrado')
            cy.get('#formEsportes').select('Corrida')
            cy.get('#formCadastrar').click()
            cy.get('#resultado').should('contain', 'Cadastrado!')
        })
    })

    it.only('Should select all food using each', () => {
        cy.get('#formNome').type('Usuario')
        cy.get('#formSobrenome').type('Teste')
        cy.get('[name=formSexo][value=M]').click()
        cy.get('[name=formComidaFavorita]').each($el => {
            if($el.val() != 'vegetariano')
            cy.wrap($el).click()
        })
        cy.get('#formEscolaridade').select('Mestrado')
        cy.get('#formEsportes').select('Corrida')
        cy.get('#formCadastrar').click()
        cy.get('#resultado').should('contain', 'Cadastrado!')
    })
})
