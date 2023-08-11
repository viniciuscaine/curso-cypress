/// <reference types= "cypress" />
const dayjs = require('dayjs')

describe('Account tests', () => {
    before(() => {
        cy.getToken('viniciuscaine@gmail.com', 'caine123')
    })

    beforeEach(() => {
        cy.resetRest()
    })

    it('Insert account', () => {
        cy.request({
            method: 'POST',
            url: '/contas',
            body: {
                "nome": "Conta via Rest"
            }
        }).as('response')

        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(201)
            expect(res.body).to.have.property('id')
            expect(res.body).to.have.property('nome', 'Conta via Rest')
        })
    })

    it('Change account', () => {
        cy.request({
            method: 'GET',
            url: '/contas',
            qs: {
                nome: 'Conta para alterar'
            }
        }).then(res => {
            cy.request({
                url: `/contas/${res.body[0].id}`,
                method: 'PUT',
                body: {
                    "nome": "Conta alterada via Rest"
                }
            }).as('response')
        })
        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(200)
            expect(res.body).to.have.property('nome', 'Conta alterada via Rest')
        })
    })

    it('Account with same name', () => {
        cy.request({
            failOnStatusCode: false,
            method: 'POST',
            url: '/contas',
            body: {
                "nome": "Conta mesmo nome"
            }
        }).as('response')

        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(400)
            expect(res.body).to.have.property('error', 'Já existe uma conta com esse nome!')
        })
    })
})


describe('Movement tests', () => {

    before(() => {
        cy.getToken('viniciuscaine@gmail.com', 'caine123')
    })

    beforeEach(() => {
        cy.resetRest()
    })

    it('Insert transaction', () => {
        cy.getAccountID('Conta para movimentacoes')
            .then(contaID => {
                cy.request({
                    method: 'POST',
                    url: '/transacoes',
                    body: {
                        "tipo": "REC",
                        "data_transacao": dayjs().format('DD/MM/YYYY'),
                        "data_pagamento": dayjs().add(1, 'day').format('DD/MM/YYYY'),
                        "descricao": "Movimentação via Rest",
                        "valor": "500",
                        "envolvido": "Vinicius",
                        "conta_id": contaID,
                        "status": true
                    }
                })
            }).as('response')
        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(201)
            expect(res.body).to.have.property('id')
            expect(res.body.descricao).to.be.equal('Movimentação via Rest')
        })
    })

    it('Balance calculation', () => {
        cy.request({
            url: '/saldo',
            method: 'GET'
        }).then(res => {
            let accountBalance = null
            res.body.forEach(account => {
                if (account.conta === 'Conta para saldo') accountBalance = account.saldo
            })
            expect(accountBalance).to.be.equal('534.00')
        })

        cy.request({
            method: 'GET',
            url: '/transacoes',
            qs: { descricao: 'Movimentacao 1, calculo saldo' }
        }).then(res => {
            cy.request({
                url: `/transacoes/${res.body[0].id}`,
                method: 'PUT',
                body: {
                    status: true,
                    data_transacao: dayjs(res.body[0].data_transacao).format('DD/MM/YYYY'),
                    data_pagamento: dayjs(res.body[0].data_pagamento).format('DD/MM/YYYY'),
                    descricao: res.body[0].descricao,
                    envolvido: res.body[0].envolvido,
                    valor: res.body[0].valor,
                    conta_id: res.body[0].conta_id
                }
            }).its('status').should('be.equal', 200)
        })

        cy.request({
            // headers: { Authorization: `JWT ${token}` },
            url: '/saldo',
            method: 'GET'
        }).then(res => {
            let accountBalance = null
            res.body.forEach(account => {
                if (account.conta === 'Conta para saldo') accountBalance = account.saldo
            })
            expect(accountBalance).to.be.equal('4034.00')
        })
    })

    it('Delete movement', () => {
        cy.request({
            method: 'GET',
            url: '/transacoes',
            qs: { descricao: 'Movimentacao para exclusao' }
        }).then(res => {
            cy.request({
                url: `/transacoes/${res.body[0].id}`,
                method: 'DELETE',
            }).its('status').should('be.equal', 204)
        })
    })
})
