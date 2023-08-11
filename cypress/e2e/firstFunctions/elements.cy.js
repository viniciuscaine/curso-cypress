/// <reference types= "cypress" />

describe('Work with basic elements', () => {
    beforeEach(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    it('Text', () => {
        cy.get('body').should('contain', 'Cuidado')
        cy.get('span').should('contain', 'Cuidado')
        cy.get('.facilAchar').should('contain', 'Cuidado')
        cy.get('.facilAchar').should('have.text', 'Cuidado onde clica, muitas armadilhas...')
    })

    it('Links', () => {
        cy.get('[href="#"]').click()
        cy.get('#resultado').should('have.text', 'Voltou!')

        cy.reload()

        cy.get('#resultado').should('have.not.text', 'Voltou!')
        cy.contains('Voltar').click()
        cy.get('#resultado').should('have.text', 'Voltou!')
    })

    it('TextFields', () => {
        cy.get('#formNome')
            .type('Vinícius')
            .should('have.value', 'Vinícius')

        cy.get('#elementosForm\\:sugestoes')
            .type('Teste Cypress')
            .should('have.value', 'Teste Cypress')

        cy.get('#tabelaUsuarios > :nth-child(2) > :nth-child(1) > :nth-child(6) > input')
            .type('Input teste')
            .should('have.value', 'Input teste')

        cy.get('[data-cy="dataSobrenome"]')
            .type('Cainé12345{backspace}{backspace}')
            .should('have.value', 'Cainé123')

        cy.get('#elementosForm\\:sugestoes')
            .clear()
            .type('Erro{selectall}Acerto', { delay: 100 })
            .should('have.value', 'Acerto')
    })

    it('Radio', () => {
        cy.get('#formSexoFem').click().should('be.checked')
        cy.get('#formSexoMasc').should('not.be.checked')
        cy.get("[name='formSexo']").should('have.length', 2)
    })

    it('Checkbox', () => {
        cy.get('#formComidaPizza').click().should('be.checked')
        cy.get('[name=formComidaFavorita]').click({ multiple: true })
        cy.get('#formComidaPizza').should('not.be.checked')
        cy.get('#formComidaCarne').should('be.checked')

    })

    it('Combo', () => {
        cy.get('[data-test="dataEscolaridade"]').select('Superior').should('have.value', 'superior')
        cy.get('[data-test="dataEscolaridade"]').select('1graucomp').should('have.value', '1graucomp')

        cy.get('[data-test="dataEscolaridade"] option').should('have.length', 8)
        cy.get('[data-test="dataEscolaridade"] option').then($arr => {
            const values = []
            $arr.each(function () {
                values.push(this.innerHTML)
            })
            expect(values).to.include.members(["Superior", "Mestrado"])
        })
    })

    it.only('Multiple Combo', () => {
        cy.get('[data-testid="dataEsportes"]').select(['futebol', 'Karate'])
        cy.get('[data-testid="dataEsportes"]').then($el => {
            expect($el.val()).to.be.deep.equal(['futebol', 'Karate'])
            expect($el.val()).to.have.length(2)
        })
        cy.get('[data-testid="dataEsportes"]').invoke('val').should('eql', ['futebol', 'Karate'])
    })
})
