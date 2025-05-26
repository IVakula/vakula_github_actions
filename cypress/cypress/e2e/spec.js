describe('My new tests', () => {
  beforeEach(() => {
    cy.visit('', {
      auth: {
        username: 'guest',
        password: 'welcome2qauto'
      }
    })
  });

  it('checks the base url', () => {
    cy.url().should('eq', 'https://qauto.forstudy.space/');
  });

  context('Header logo and buttons tests', () => {
    it('checks the HillelAuto logo', () => {
      cy.get('a.header_logo svg').should('be.visible');
    });

    it('checks the Home button', () => {
      cy.contains('a.btn.header-link', 'Home').should('be.visible');
      //cy.get('.btn.header-link').contains('Home').should('be.visible');
    });

    it('checks the About button', () => {
      cy.contains('button.btn.header-link', 'About').should('be.visible').should('be.enabled');
    });

    it('checks the Contacts button', () => {
      cy.contains('button.btn.header-link', 'Contacts').should('be.visible').should('be.enabled');
    });

    it('checks the Guest log in button', () => {
      cy.contains('button.header-link.-guest', 'Guest log in').should('be.visible').should('be.enabled');
    });

    it('checks the Sign in button', () => {
      cy.contains('button.btn.btn-outline-white.header_signin', 'Sign In').should('be.visible').should('be.enabled');
    });
  });

  context('Body elements tests', () => {
    it('checks the Sign up button', () => {
      cy.contains('button', 'Sign up').should('be.visible').should('be.enabled');
    });
  })

  context('Footer elements tests', () => {
    it('checks Social contacts', () => {
      cy.get('.contacts_socials.socials').children().should('have.length', '5');
    })

    it('checks Social contact Facebook', () => {
      cy.get('.contacts_socials.socials').children().eq(0).should('have.attr', 'href').and('equal', 'https://www.facebook.com/Hillel.IT.School');
      cy.get('.contacts_socials.socials').children().eq(0).should('be.visible');
      cy.get('.contacts_socials.socials').children().eq(0).invoke('removeAttr', 'target');
      cy.get('.socials_icon.icon.icon-facebook').click();
      cy.origin('www.facebook.com', () => {
        cy.url().should('equal', 'https://www.facebook.com/Hillel.IT.School')
      });
    });

    it('checks Social contact Telegram', () => {
      cy.get('.contacts_socials.socials').children().eq(1).should('have.attr', 'href').and('equal', 'https://t.me/ithillel_kyiv');
      cy.get('.contacts_socials.socials').children().eq(1).should('be.visible');
    });

    it('checks Social contact Youtube', () => {
      cy.get('.contacts_socials.socials').children().eq(2).should('have.attr', 'href').and('equal', 'https://www.youtube.com/user/HillelITSchool?sub_confirmation=1');
      cy.get('.contacts_socials.socials').children().eq(2).should('be.visible');
    });

    it('checks Social contact Instagram', () => {
      cy.get('.contacts_socials.socials').children().eq(3).should('have.attr', 'href').and('equal', 'https://www.instagram.com/hillel_itschool/');
      cy.get('.contacts_socials.socials').children().eq(3).should('be.visible');
    });

    it('checks Social contact Linkedin', () => {
      cy.get('.contacts_socials.socials').children().eq(4).should('have.attr', 'href').and('equal', 'https://www.linkedin.com/school/ithillel/');
      cy.get('.contacts_socials.socials').children().eq(4).should('be.visible');
    });

    it('checks Contacts link HillelAuto', () => {
      cy.get('a.contacts_link.display-4').should('have.attr', 'href').and('equal', 'https://ithillel.ua');
      cy.get('a.contacts_link.display-4').should('be.visible').and('have.text', 'ithillel.ua');
    });

    it('checks Contacts link Support ITHillel', () => {
      cy.get('a.contacts_link.h4').should('have.attr', 'href').and('equal', 'mailto:developer@ithillel.ua');
      cy.get('a.contacts_link.h4').should('be.visible').and('have.text', 'support@ithillel.ua');
    });
  });
});