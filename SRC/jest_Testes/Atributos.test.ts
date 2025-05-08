import { Atributos } from "../Class/Atributos";

describe("Classe Atributos", () => {
  let atributos: Atributos;

  beforeEach(() => {
    atributos = new Atributos();
  });

  it("Deve permitir definir e obter valores válidos para os atributos", () => {
    atributos.vida = 100;
    expect(atributos.vida).toBe(100);

    atributos.mana = 50;
    expect(atributos.mana).toBe(50);
  });

  it("Deve lançar erro ao definir valores inválidos para os atributos", () => {
    expect(() => (atributos.vida = -10)).toThrow("A vida não pode ser negativa.");
    expect(() => (atributos.mana = -5)).toThrow("A mana não pode ser negativa.");
  });

  it("Deve respeitar os limites de validação para atributos específicos", () => {
    expect(() => (atributos.nivel = 101)).toThrow("O nível deve estar entre 0 e 100.");
    expect(() => (atributos.nivel = -1)).toThrow("O nível deve estar entre 0 e 100.");
  });
});