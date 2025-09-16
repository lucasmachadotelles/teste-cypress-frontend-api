import { faker } from '@faker-js/faker';

describe('Usuarios', () => {
  let userId
  before(() => {
    const usuario = {
      nome: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      administrador: "true"
    };

    cy.request('POST', 'https://serverest.dev/usuarios', usuario)
      .then((response) => {
        userId = response.body._id
      });
  })
  describe('GET /usuarios/{_id}', () => {
    describe("Quando eu passar um id de um usuário existente", () => {
      it("Então deve ser retornado um usuário", () => {
        cy.request('GET', `https://serverest.dev/usuarios/${userId}`)
          .then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.nome).to.exist;
          });
      })

    })
    describe("Quando eu passar um id de um usuário não existente", () => {
      it("Então deve retornar mensagem de usuário não encontrado", () => {
        cy.request({
          method: "GET",
          url: `https://serverest.dev/usuarios/1234567812345678`,
          failOnStatusCode: false,
        })

          .then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.message).to.eq("Usuário não encontrado");
          });
      })

    })
  })
  describe('PUT /usuarios/{_id}', () => {
    describe("Quando tento alterar um nome", () => {
      it("Então deve exibir uma mensagem de sucesso", () => {
        const usuario = {
          nome: "lucas",
          email: "mariokart@qa.com.br",
          password: "teste",
          administrador: "true"

        };

        cy.request('PUT', `https://serverest.dev/usuarios/${userId}`, usuario)
          .then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.message).to.eq('Registro alterado com sucesso');
          });
      })
    })

  })
  after(() => {
    cy.request('DELETE', `https://serverest.dev/usuarios/${userId}`)
  })
})