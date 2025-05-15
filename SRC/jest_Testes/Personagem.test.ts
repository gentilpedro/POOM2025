import { Personagem } from "../Class/Personagem";

// Mock de Util.randomizar
jest.mock("../Util/Util", () => ({
  Util: {
    randomizar: jest.fn()
        // Para treinarAtaque, treinarDefesa, descansar e desafiar
        .mockImplementation((min: number, max: number) => {
          if (min === 1 && max === 2) return 1; // Para o dado do desafiar
          if (min === 50 && max === 100) return 60; // Vida do oponente
          if (min === 10 && max === 20) return 10; // Ataque/Defesa do oponente
          if (min === 15 && max === 30) return 20; // Para treinar/descansar
          return min;
        })
  }
}));

// Mock do fakerBR
jest.mock("../Main", () => ({
  fakerBR: {
    person: {
      firstName: jest.fn().mockReturnValue("Oponente")
    }
  }
}));

describe("Classe Personagem", () => {
  let personagem: Personagem;

  beforeEach(() => {
    personagem = new Personagem();
    personagem.nome = "Edécio";
    personagem.raca = "Morto-vivo";
    personagem.atributos.vida = 100;
    personagem.atributos.ataque = 10;
    personagem.atributos.defesa = 5;
    jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("Deve permitir treinar ataque e modificar os atributos corretamente", () => {
    const mensagem = personagem.treinarAtaque(2);
    expect(mensagem).toContain("treinou ataque por 2 horas");
    expect(personagem.atributos.ataque).toBeGreaterThan(10);
    expect(personagem.atributos.vida).toBeLessThan(100);
  });

  it("Deve lançar erro ao tentar treinar ataque com número de horas inválido", () => {
    expect(() => personagem.treinarAtaque(0)).toThrow("O número de horas deve ser maior que zero.");
  });

  it("Deve permitir descansar e recuperar vida corretamente", () => {
    personagem.atributos.vida = 50;
    const mensagem = personagem.descansar(2);
    expect(mensagem).toContain("descansou por 2 horas");
    expect(personagem.atributos.vida).toBeGreaterThan(50);
  });

  it("Deve criar um oponente e alternar ataques no método desafiar", () => {
    const mensagem = personagem.desafiar(5);
    expect(mensagem).toMatch(/foi derrotado|ganhou 10% de XP/);
  });
});