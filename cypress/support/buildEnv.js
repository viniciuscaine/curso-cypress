const buildEnv = () => {

    cy.intercept(
        {
            method: 'POST',
            path: '/signin'
        },
        {
            id: 1000,
            nome: 'Usuario Falso',
            token: 'Uma string muito grande que nao deveria ser aceita mas na verdade vai'
        })
        .as('signin')


    cy.intercept({
        method: 'GET',
        path: '/saldo'
    },
        [{
            conta_id: 99999,
            conta: 'Carteira',
            saldo: '100.00'
        },
        {
            conta_id: 99909,
            conta: 'Banco',
            saldo: '10000000.00'
        }])
        .as('saldo')


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
        }]
    ).as('contas')


    cy.intercept({
        method: 'GET',
        path: '/extrato/**'
    },
        [
            {
                "conta": "Conta para movimentacoes",
                "id": 1725904,
                "descricao": "Movimentacao para exclusao",
                "envolvido": "AAA",
                "observacao": null,
                "tipo": "DESP",
                "data_transacao": "2023-08-10T03:00:00.000Z",
                "data_pagamento": "2023-08-10T03:00:00.000Z",
                "valor": "-1500.00",
                "status": true,
                "conta_id": 1842639,
                "usuario_id": 39529,
                "transferencia_id": null,
                "parcelamento_id": null
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
            },
            {
                "conta": "Conta para saldo",
                "id": 1725906,
                "descricao": "Movimentacao 1, calculo saldo",
                "envolvido": "CCC",
                "observacao": null,
                "tipo": "REC",
                "data_transacao": "2023-08-10T03:00:00.000Z",
                "data_pagamento": "2023-08-10T03:00:00.000Z",
                "valor": "3500.00",
                "status": false,
                "conta_id": 1842641,
                "usuario_id": 39529,
                "transferencia_id": null,
                "parcelamento_id": null
            },
            {
                "conta": "Conta para saldo",
                "id": 1725907,
                "descricao": "Movimentacao 2, calculo saldo",
                "envolvido": "DDD",
                "observacao": null,
                "tipo": "DESP",
                "data_transacao": "2023-08-10T03:00:00.000Z",
                "data_pagamento": "2023-08-10T03:00:00.000Z",
                "valor": "-1000.00",
                "status": true,
                "conta_id": 1842641,
                "usuario_id": 39529,
                "transferencia_id": null,
                "parcelamento_id": null
            },
            {
                "conta": "Conta para saldo",
                "id": 1725908,
                "descricao": "Movimentacao 3, calculo saldo",
                "envolvido": "EEE",
                "observacao": null,
                "tipo": "REC",
                "data_transacao": "2023-08-10T03:00:00.000Z",
                "data_pagamento": "2023-08-10T03:00:00.000Z",
                "valor": "1534.00",
                "status": true,
                "conta_id": 1842641,
                "usuario_id": 39529,
                "transferencia_id": null,
                "parcelamento_id": null
            },
            {
                "conta": "Conta para extrato",
                "id": 1725909,
                "descricao": "Movimentacao para extrato",
                "envolvido": "FFF",
                "observacao": null,
                "tipo": "DESP",
                "data_transacao": "2023-08-10T03:00:00.000Z",
                "data_pagamento": "2023-08-10T03:00:00.000Z",
                "valor": "-220.00",
                "status": true,
                "conta_id": 1842642,
                "usuario_id": 39529,
                "transferencia_id": null,
                "parcelamento_id": null
            }
        ]).as('inserirTransacao')
}

export default buildEnv
