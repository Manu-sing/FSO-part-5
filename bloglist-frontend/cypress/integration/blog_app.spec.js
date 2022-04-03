
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Superuser',
      username: 'root',
      password: 'comestai'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown after clicking on the LOGIN button', function() {
    cy.contains('Login').click()
    cy.contains('USERNAME')
    cy.contains('PASSWORD')
    cy.contains('Login to the application:')
    cy.contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('Login').click()
      cy.get('#username').type('root')
      cy.get('#password').type('comestai')
      cy.get('#login-button').click()

      cy.contains('\'Superuser\' logged-in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('Login').click()
      cy.get('#username').type('root')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.contains('USERNAME AND PASSWORD MUST BE PROVIDED AND MUST BE AT LEAST 3 CHARACTERS LONG. USERNAME MUST BE UNIQUE.')
    })
  })
  describe('Blog app', function() {


    describe('When logged in', function() {
      beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/login', {
          username: 'root', password: 'comestai'
        }).then(response => {
          localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
          cy.visit('http://localhost:3000')
        })
      })

      it('A blog can be created', function() {
        cy.contains('Add New Blog').click()
        cy.get('#title').type('This is a new article')
        cy.get('#author').type('Tiger Woods')
        cy.get('#url').type('https://fullstackopen.com/en/part5/end_to_end_testing#cypress')
        cy.contains('Save').click()
        cy.contains('This is a new article')

      })

      describe('a blog exists', function() {
        beforeEach(function() {
          cy.contains('Add New Blog').click()
          cy.get('#title').type('This is a new article')
          cy.get('#author').type('Tiger Woods')
          cy.get('#url').type('https://fullstackopen.com/en/part5/end_to_end_testing#cypress')
          cy.contains('Save').click()
        })
        it('and it can be liked', function() {
          cy.contains('Show Details').click()
          cy.get('#like-button').click()
          cy.contains(1)
        })
        it('and it can be deleted by the user who created it', function() {
          cy.get('#delete-button').click()
          cy.get('html').should('not.contain', 'This is a new article')
        })

      })

      describe('there is more than one blog and they are rendered from most to least liked', function() {
        beforeEach( function() {
          cy.contains('Add New Blog').click()
          cy.get('#title').type('Article one')
          cy.get('#author').type('Tiger Woods')
          cy.get('#url').type('www.woods.com')
          cy.contains('Save').click()

          cy.contains('Add New Blog').click()
          cy.get('#title').type('Article two')
          cy.get('#author').type('Bubba Watson')
          cy.get('#url').type('www.watson.com')
          cy.contains('Save').click()

          cy.contains('Add New Blog').click()
          cy.get('#title').type('Article three')
          cy.get('#author').type('Francesco Molinari')
          cy.get('#url').type('www.molinari.com')
          cy.contains('Save').click()
        })
        it('blogs are ordered from most to least liked', function() {
          cy.contains('Bubba').contains('Show Details').click()
          cy.contains('Bubba')
            .next()
            .find('#like-button')
            .click()
          cy.contains('Bubba')
            .next()
            .find('#like-button')
            .click()

          cy.contains('Tiger').contains('Show Details').click()
          cy.contains('Tiger')
            .next()
            .find('#like-button')
            .click()

          cy.contains('Molinari').contains('Show Details').click()
          cy.contains('Molinari')
            .next()
            .find('#like-button')
            .click()
          cy.contains('Molinari')
            .next()
            .find('#like-button')
            .click()
          cy.contains('Molinari')
            .next()
            .find('#like-button')
            .click()

          cy.get('.grid')
            .children()
            .eq(0).contains('Likes: 3')
          cy.get('.grid')
            .children()
            .eq(1).contains('Likes: 2')
          cy.get('.grid')
            .children()
            .eq(2).contains('Likes: 1')
        })
      })
    })
  })
})