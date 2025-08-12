describe('Central de Atendimento ao Cliente TAT', () => {
      beforeEach(() => {
        cy.visit('./src/index.html')   
      })

  it('verifica o título da aplicação', () => {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    cy.get('#firstName').type('João')
    cy.get('#lastName').type('Silva')
    cy.get('#email').type('ePpM@example.com')
    cy.get('#open-text-area').type('Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem qui nisi possimus dolore ducimus explicabo, voluptatum tempore illo ipsum doloribus quae. Saepe mollitia alias, deleniti sapiente veniam quisquam! Temporibus, id?', { delay: 0 })
    cy.get('button[type="submit"]').click()

    cy.get('.success strong').should('be.visible').and('contain', 'Mensagem enviada com sucesso.')

  })
  
})
