/// <reference types= "cypress" />
import loc from '../../support/locators'
import '../../support/accountsCommands'
import buildEnv from '../../support/buildEnv'

describe('Account tests', () => {

    beforeEach(() => {
        buildEnv()
        cy.login('viniciuscaine@gmail.com', 'senha errada')
    })

    it('Insert account', () => {
        cy.intercept({
            method: 'POST',
            path: '/contas'
        },
            {
                id: 3,
                nome: 'Conta de teste',
                visivel: true,
                usuario_id: 39529
            }).as('saveConta')

        cy.accessAccounts()

        cy.intercept({
            method: 'GET',
            path: '/contas'
        },
            [{
                id: 1,
                nome: 'Carteira',
                visivel: true,
                usuario_id: 39529
            },
            {
                id: 2,
                nome: "Banco",
                visivel: true,
                usuario_id: 39529
            },
            {
                id: 3,
                nome: "Conta de teste",
                visivel: true,
                usuario_id: 39529
            }]
        ).as('contasSave')

        cy.insertAccount('Conta criada')
        cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso')
    })

    it('Change account', () => {
        cy.intercept({
            method: 'PUT',
            path: '/contas/**'
        },
            {
                id: 1,
                nome: 'Conta alterada',
                visivel: true,
                usuario_id: 39529
            }
        ).as('contas')

        cy.accessAccounts()

        cy.xpath(loc.ACCOUNT.FN_XP_CHANGE('Carteira')).click()
        cy.insertAccount('Conta alterada')
        cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso')
    })

    it('Account with same name', () => {
        cy.intercept({
            method: 'POST',
            path: '/contas'
        },
            {
                "error": "Já existe uma conta com esse nome!",
                statusCode: 400
            }
        ).as('saveContaMesmoNome')

        cy.accessAccounts()
        cy.insertAccount('Conta mesmo nome')
        cy.get(loc.MESSAGE).should('contain', 'Erro: Error: Request failed with status code 400')
    })

    it('Should validate data send to insert account', () => {
        const reqStub = cy.stub()
        cy.intercept({
            method: 'POST',
            path: '/contas'
        },
            {
                id: 3,
                nome: 'Conta de teste',
                visivel: true,
                usuario_id: 39529,
                onRequest: req => {
                    expect(req.request.body.nome).to.be.empty
                    expect(req.request.headers).to.have.propoerty('Authorization')
                }
            }).as('saveConta')

        cy.accessAccounts()

        cy.intercept({
            method: 'GET',
            path: '/contas'
        },
            [{
                id: 1,
                nome: 'Carteira',
                visivel: true,
                usuario_id: 39529
            },
            {
                id: 2,
                nome: "Banco",
                visivel: true,
                usuario_id: 39529
            },
            {
                id: 3,
                nome: "Conta de teste",
                visivel: true,
                usuario_id: 39529
            }]
        ).as('contasSave')

        cy.insertAccount('{CONTROL}')
        // cy.wait('@saveConta').its('request.body.nome').should('not.be.empty')
        cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso')
    })

    it('Should validate responsiveness', () => {
        cy.get('[data-test=menu-home]').should('exist').and('be.visible')
        cy.viewport(500,500)
        cy.get('[data-test=menu-home]').should('exist').and('not.be.visible')
        cy.viewport('iphone-5')
        cy.get('[data-test=menu-home]').should('exist').and('not.be.visible')
        cy.viewport('ipad-2')
        cy.get('[data-test=menu-home]').should('exist').and('be.visible')
    })
})


describe('Movement tests', () => {

    beforeEach(() => {
        buildEnv()
        cy.login('viniciuscaine@gmail.com', 'senha errada')
    })

    it('Insert movement', () => {
        cy.intercept({
            method: 'POST',
            path: '/transacoes'
        },
            {
                "id": 1725903,
                "descricao": "Descrição de teste",
                "envolvido": "Vinicius",
                "observacao": null,
                "tipo": "REC",
                "data_transacao": "2023-08-10T03:00:00.000Z",
                "data_pagamento": "2023-08-10T03:00:00.000Z",
                "valor": "500.00",
                "status": true,
                "conta_id": 1842626,
                "usuario_id": 39529,
                "transferencia_id": null,
                "parcelamento_id": null
            })
            .as('inserirTransacao')

        cy.intercept({
            method: 'GET',
            path: '/extrato/**'
        },
            {
                fixture: 'transactions'
            })
            .as('exibirTransacoes')

        cy.get(loc.MENU.MOVEMENTS).click()
        cy.get(loc.MOVEMENT.TYPE_COST).click()
        cy.get(loc.MOVEMENT.STATUS_PAID).click()
        cy.get(loc.MOVEMENT.DESCRIPTION).type('Descrição de teste')
        cy.get(loc.MOVEMENT.VALUE).type('500')
        cy.get(loc.MOVEMENT.INVOLVED).type('Vinicius')
        cy.get(loc.MOVEMENT.ACCOUNT).select('Banco')
        cy.xpath(loc.MOVEMENT.SAVE).click()
        cy.get(loc.MESSAGE).should('contain', 'Movimentação inserida com sucesso')
        cy.get(loc.MENU.EXTRACT).click()
        cy.get(loc.EXTRACT.LIST).should('contain', 'Descrição de teste')
    })

    it('Balance calculation', () => {
        cy.intercept({
            method: 'GET',
            url: '/transacoes/**'
        },
            {
                "conta": "Conta com movimentacao",
                "id": 1725905,
                "descricao": "Movimentacao de conta",
                "envolvido": "BBB",
                "observacao": null,
                "tipo": "DESP",
                "data_transacao": "2023-08-10T03:00:00.000Z",
                "data_pagamento": "2023-08-10T03:00:00.000Z",
                "valor": "-1500.00",
                "status": true,
                "conta_id": 1842640,
                "usuario_id": 39529,
                "transferencia_id": null,
                "parcelamento_id": null
            }
        )

        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.HOME.FN_XP_ACCOUNT_VALUE('Carteira')).should('contain', '100,00')
        cy.xpath(loc.HOME.XP_TOTAL_VALUE('10.000.100,00')).should('exist')
    })

    it('Delete movement', () => {
        cy.intercept({
            method: 'DELETE',
            url: '/transacoes/**',
        },
            {
                statusCode: 204
            })
            .as('deletarTransacao')

        cy.get(loc.MENU.EXTRACT).click()
        cy.xpath(loc.EXTRACT.FN_XP_DELETE('Movimentacao para exclusao')).click()
        cy.get(loc.MESSAGE).should('contain', 'Movimentação removida com sucesso')
    })
})
