const locators = {

    LOGIN: {
        USER: '[data-test="email"]',
        PASSWORD: '[data-test="passwd"]',
        LOGIN: '.btn'
    },

    MENU: {
        SETTINGS: '[data-test="menu-settings"]',
        ACCOUNTS: "//li/div/a[contains(., 'Contas')]",
        MOVEMENTS: '[data-test="menu-movimentacao"]',
        RESET: "//li/div/a[contains(., 'Resetar')]",
        HOME: '[data-test="menu-home"]',
        EXTRACT: '[data-test="menu-extrato"]'
    },

    ACCOUNT: {
        NAME: '[data-test="nome"]',
        SAVE: '.btn',
        FN_XP_CHANGE: name => `//td[contains(., '${name}')]/following-sibling::td//i[contains(@class, 'far fa-edit')]`,
    },

    MOVEMENT: {
        TYPE_COST: '[data-test="tipo-despesa"]',
        STATUS_PAID: '[data-test="status"]',
        DESCRIPTION: '[data-test="descricao"]',
        VALUE: '[data-test="valor"]',
        INVOLVED: '[data-test="envolvido"]',
        ACCOUNT: '[data-test="conta"]',
        SAVE: "//button[contains(., 'Salvar')]"
    },

    EXTRACT: {
        LIST: '[data-test="mov-row"]',
        FN_XP_DELETE: name => `//span[contains(., '${name}')]/../../following-sibling::div//a[contains(@href, '#')]`,
        FN_XP_LINE: desc => `//span[contains(., '${desc}')]/../../../..`
    },

    HOME: {
        FN_XP_ACCOUNT_VALUE: name  => `//td[contains(., '${name}')]/../td[2]`,
        XP_TOTAL_VALUE: value => `//td[contains(., 'Total')]/following-sibling::td[contains(., '${value}')]`
    },

    MESSAGE: '#toast-container'

}

export default locators;