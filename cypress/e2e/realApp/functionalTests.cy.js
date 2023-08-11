/// <reference types= "cypress" />
import loc from '../../support/locators'
import '../../support/accountsCommands'

describe('Account test', () => {

    beforeEach(() => {
        cy.login('viniciuscaine@gmail.com', 'caine123')
        cy.resetData()
    })

    it('Insert account', () => {
        cy.accessAccounts()
        cy.insertAccount('Conta criada')
        cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso')
    })

    it('Change account', () => {
        cy.accessAccounts()
        cy.xpath(loc.ACCOUNT.FN_XP_CHANGE('Conta para alterar')).click()
        cy.insertAccount('Conta para alterar')
        cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso')
    })

    it('Account with same name', () => {
        cy.accessAccounts()
        cy.insertAccount('Conta mesmo nome')
        cy.get(loc.MESSAGE).should('contain', 'Erro: Error: Request failed with status code 400')
    })
})

describe('Movement tests', () => {

    beforeEach(() => {
        cy.login('viniciuscaine@gmail.com', 'caine123')
        cy.resetData()
    })

    it('Insert movement', () => {
        cy.get(loc.MENU.MOVEMENTS).click()
        cy.get(loc.MOVEMENT.TYPE_COST).click()
        cy.get(loc.MOVEMENT.STATUS_PAID).click()
        cy.get(loc.MOVEMENT.DESCRIPTION).type('Descrição de teste')
        cy.get(loc.MOVEMENT.VALUE).type('500')
        cy.get(loc.MOVEMENT.INVOLVED).type('Vinicius')
        cy.get(loc.MOVEMENT.ACCOUNT).select('Conta para movimentacoes')
        cy.xpath(loc.MOVEMENT.SAVE).click()
        cy.get(loc.MESSAGE).should('contain', 'Movimentação inserida com sucesso')
        cy.get(loc.MENU.EXTRACT).click()
        cy.get(loc.EXTRACT.LIST).should('contain', 'Descrição de teste')
    })

    it('Balance calculation', () => {
        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.HOME.FN_XP_ACCOUNT_VALUE('Conta para movimentacoes')).should('contain', '1.500,00')
        cy.xpath(loc.HOME.XP_TOTAL_VALUE('2.686,00')).should('exist')
    })

    it('Delete movement', () => {
        cy.get(loc.MENU.EXTRACT).click()
        cy.xpath(loc.EXTRACT.FN_XP_DELETE('Movimentacao para exclusao')).click()
        cy.get(loc.MESSAGE).should('contain', 'Movimentação removida com sucesso')
    })
})
