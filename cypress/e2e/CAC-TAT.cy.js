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

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('João')
    cy.get('#lastName').type('Silva')
    cy.get('#email').type('ePpM@example')
    cy.get('#open-text-area').type('mensagem de teste')
    cy.get('button[type="submit"]').click()

    cy.get('.error strong').should('be.visible').and('contain', 'Valide os campos obrigatórios!')
  })

  it('Campo telefone não aceita letras', () => {
    cy.get('#firstName').type('João')
    cy.get('#lastName').type('Silva')
    cy.get('#email').type('ePpM@example.com')
    cy.get('#phone').type('abcdefghij')
    cy.get('#open-text-area').type('mensagem de teste')
    cy.get('button[type="submit"]').click()

    cy.get('.success strong').should('be.visible').and('contain', 'Mensagem enviada com sucesso.')
  })

   it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('João')
    cy.get('#lastName').type('Silva')
    cy.get('#email').type('ePpM@example.com')
    cy.get('#phone-checkbox').click()  
    cy.get('#open-text-area').type('mensagem de teste')
    cy.get('button[type="submit"]').click()

    cy.get('.error strong').should('be.visible').and('contain', 'Valide os campos obrigatórios!')
  })

   it('prepreenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName').type('João').should('have.value', 'João').clear().should('have.value', '')
    cy.get('#lastName').type('Silva').should('have.value', 'Silva').clear().should('have.value', '')
    cy.get('#email').type('ePpM@example.com').should('have.value', 'ePpM@example.com').clear().should('have.value', '')   
  
  })

   it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    
     cy.get('button[type="submit"]').click()

    cy.get('.error strong').should('be.visible').and('contain', 'Valide os campos obrigatórios!')
  
  })  

  it.only('envia o formuário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit('João', 'Silva', 'ePpM@example.com', 'mensagem de teste')    
  })
  
})
