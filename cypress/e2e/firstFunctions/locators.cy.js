/// <reference types= "cypress" />

describe('Work with locators', () => {

    beforeEach(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    it('Using jquery selector', () => {
        cy.get('[onclick*="Francisco"]').click()

        cy.get('#tabelaUsuarios td:contains("Doutorado"):eq(0) ~td:eq(3) > input').type('teste')
        cy.get('#tabelaUsuarios tr:contains("Doutorado"):eq(0) td:eq(6) > input').type('teste 2')
    })

    it('Using xpath', () => {
        cy.xpath('//input[contains(@onclick, "Francisco")]').click()
        cy.xpath("//table[@id='tabelaUsuarios']//td[contains(., 'Francisco')]/..//input[@type='button']").click()
        cy.xpath("(//table[@id='tabelaUsuarios']//td[contains(., 'Doutorado')])[1]/..//input[@type='text']").type('text')
        cy.xpath("//td[contains(., 'Usuario A')]/following-sibling::td[contains(., 'Mestrado')]/..//input[@type='text']").type('text2')
    })
})
