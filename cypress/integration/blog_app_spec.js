describe('Blog ', function() {
  beforeEach(function() {
    // cy.request('POST', 'http://localhost:8003/api/testing/reset')
    // const user = {
    //   name: 'Daniel Stafford',
    //   username: 'dstafford',
    //   password: 'salasana'
    // }
    // cy.request('POST', 'http://localhost:8003/api/users/', user)
    cy.visit('http://localhost:8000')
  })
  it('front page can be opened', function() {
    cy.contains('Blog')
  })

  it('login form can be opened', function() {
    cy.get('#username').type('dstafford')
    cy.get('#password').type('salasana')
    cy.contains('login').click()
  })
})
