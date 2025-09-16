/// <reference types="cypress"/>

import constantes from "../fixtures/constantes.json";
import { faker } from "@faker-js/faker";

describe("Login", () => {
  describe("Quando deixo campos de Login e Senha vazios", () => {
    it("Então deve ser exibida a mensagem de erro", () => {
      cy.visit(constantes.baseURL);
      cy.contains("Entrar").click()
      cy.contains("Email é obrigatório").should("be.visible")
      cy.contains("Password é obrigatório").should("be.visible")
    })
  })
  describe("Quando preencho o formulário corretamente", () => {
    it("Então o usuário deve ser logado com sucesso", () => {
      cy.visit(constantes.baseURL);

      // Preenche email e senha errados
      cy.getByTestId("email").type("usuarioinvalido@test.com");
      cy.getByTestId("senha").type("senhaErrada123");

      // Clica no botão entrar
      cy.getByTestId("entrar").click();

      cy.contains("Email e/ou senha inválidos")
        .should("be.visible");
    })
  })
})
describe("Cadastro", () => {
  describe("Quando preencho formulário corretamente", () => {
    it("Então o usuário deve ser cadastrado com sucesso", () => {
      // Gera dados dinâmicos
      const nome = faker.person.fullName();
      const email = faker.internet.email();
      const senha = faker.internet.password({ length: 8 });

      cy.visit(constantes.baseURL);
      cy.contains("Cadastre-se").click();

      // Preenche os campos
      cy.getByTestId("nome").type(nome);
      cy.getByTestId("email").type(email);
      cy.getByTestId("password").type(senha);

      // Submete o formulário
      cy.getByTestId("cadastrar").click();

      // Valida mensagem de sucesso
      cy.get(".alert")
        .should("be.visible")
        .and("contain", "Cadastro realizado com sucesso");
    })
  })
})


