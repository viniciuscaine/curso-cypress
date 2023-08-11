/// <reference types= "cypress" />

describe('Work with alerts', () => {
    beforeEach(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    it.only('Alert', () => {
        // cy.get('#alert').click()
        // cy.on('window:alert', msg => {
        //     expect(msg).to.be.equal('Alert Simples')
        // })
        cy.clickAlert('#alert', 'Alert Simples')
    })

    it('Alert with Mock', () => {
        const stub = cy.stub().as('alert')
        cy.on('window:alert', stub)
        cy.get('#alert').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Alert Simples')
        })
    })

    it('Confirm', () => {
        cy.get('#confirm').click()
        cy.on('window:confirm', msg => {
            console.log(msg)
            expect(msg).to.be.equal('Confirm Simples')
        })
        cy.on('window:alert', msg => {
            console.log(msg)
            expect(msg).to.be.equal('Confirmado')
        })
    })


    it('Deny', () => {
        cy.get('#confirm').click()
        cy.on('window:confirm', msg => {
            console.log(msg)
            expect(msg).to.be.equal('Confirm Simples')
            return false
        })
        cy.on('window:alert', msg => {
            console.log(msg)
            expect(msg).to.be.equal('Negado')
        })
    })

    it('Prompt', () => {
        cy.window().then(win => {
            cy.stub(win, 'prompt').returns('42')
        })
        cy.on('window:confirm', msg => {
            console.log(msg)
            expect(msg).to.be.equal('Era 42?')
        })
        cy.on('window:alert', msg => {
            console.log(msg)
            expect(msg).to.be.equal(':D')
        })
        cy.get('#prompt').click()
    })

    it('Register Test', () => {
        const stub = cy.stub().as('alert')
        cy.on('window:alert', stub)

        //Cadastro de nome
        cy.get('#formCadastrar').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Nome eh obrigatorio')
        })
        cy.get('#formNome').type('Vinícius')

        //Cadastro de sobrenome
        cy.get('#formCadastrar').click().then(() => {
            expect(stub.getCall(1)).to.be.calledWith('Sobrenome eh obrigatorio')
        })
        cy.get('[data-cy="dataSobrenome"]').type('Cainé')

        //Cadastro de sexo
        cy.get('#formCadastrar').click().then(() => {
            expect(stub.getCall(2)).to.be.calledWith('Sexo eh obrigatorio')
        })
        cy.get('#formSexoMasc').click()

        //Cadastro final
        cy.get('#formCadastrar').click()
        cy.get('#resultado').should('contain', 'Cadastrado!')
    })
})
