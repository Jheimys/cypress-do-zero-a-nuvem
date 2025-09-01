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
    cy.get('#phone-checkbox').check()  
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

  it('envia o formuário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit('João', 'Silva', 'ePpM@example.com', 'mensagem de teste')    
  })

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product').select('YouTube').should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product').select('mentoria').should('have.value', 'mentoria')
  })

   it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product').select(1).should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]').check().should('have.value', 'feedback')
  })

  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]').each(($el) => {
      cy.wrap($el).check().should('be.checked')
    })
  })

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('#email-checkbox').check().should('be.checked')
    cy.get('#phone-checkbox').check().should('be.checked')
    cy.get('#phone-checkbox').uncheck().should('not.be.checked')
  })

   it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json')
      .should((input) => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
      
  })

  
  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
      .should((input) => {
        expect(input[0].files[0].name).to.equal('example.json')
      })   
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('sampleFile')
    cy.get('#file-upload')
      .selectFile('@sampleFile')
      .should((input) => {
        expect(input[0].files[0].name).to.equal('example.json')
      })   
  })
  
  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.get('#privacy a')
    .should('have.attr', 'href', 'privacy.html')
    .and('have.attr', 'target', '_blank')
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.get('#privacy a')
      .invoke('removeAttr', 'target')
      .click()
    
    cy.contains('h1','CAC TAT - Política de Privacidade').should('be.visible')
  })

  it('testa a página da política de privacidade de forma independente.', () => {
    cy.visit('./src/privacy.html')
    cy.contains('CAC TAT - Política de Privacidade').should('be.visible')
  })
  
  
  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios explorando os comandos clock e tick', () => {
    cy.clock()

    cy.get('button[type="submit"]').click()

    cy.get('.error strong')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')

    cy.tick(3000)

    cy.get('.error strong')
      .should('not.be.visible')
  
  })  


  it('envia o formuário com sucesso usando um comando customizado  explorando os comandos clock e tick', () => {
    cy.clock()

    cy.fillMandatoryFieldsAndSubmit('João', 'Silva', 'ePpM@example.com', 'mensagem de teste')    

    cy.tick(3000)

    cy.get('.success strong')
      .should('not.be.visible')
      
  })

  Cypress._.times(3, () => {
    it('envia o formuário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit('João', 'Silva', 'ePpM@example.com', 'mensagem de teste')    
    })
  })

  it('exibe e oculta as mensagens de sucesso e erro usando .invoke()', () => {
  cy.get('.success')
    .should('not.be.visible')
    .invoke('show')
    .should('be.visible')
    .and('contain', 'Mensagem enviada com sucesso.')
    .invoke('hide')
    .should('not.be.visible')
  cy.get('.error')
    .should('not.be.visible')
    .invoke('show')
    .should('be.visible')
    .and('contain', 'Valide os campos obrigatórios!')
    .invoke('hide')
    .should('not.be.visible')
})

  it('preenche o campo da área de texto usando o comando invoke.', () => {
    
    const longText = Cypress._.repeat('0123456789', 20)

    cy.get('#open-text-area')
      .invoke('val', longText)
      .should('have.value', longText)
    })

  it('faz uma requisição HTTP', () => {
    cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
     .as('getRequest')
     .its('status')
     .should('be.equal', 200)

    cy.get('@getRequest')
     .its('statusText')
     .should('be.equal', 'OK')

    cy.get('@getRequest')
     .its('body')
     .should('include', 'CAC TAT')

  })

  it('encontra o gato escondido', () => {
    cy.contains('🐈').should('exist')
  })

  it('encontra o gato escondido - usando o comando invoke', () => {
    cy.get('#cat')
      .invoke('show')
      .should('be.visible')
  })  


})
