
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (nome, sobrenome, email, mensagem) => {
        cy.get('#firstName').type(nome)
        cy.get('#lastName').type(sobrenome)
        cy.get('#email').type(email)
        cy.get('#open-text-area').type(mensagem)
        cy.contains('.button', 'Enviar').click()

        cy.get('.success strong').should('be.visible').and('contain', 'Mensagem enviada com sucesso.')
    },
)