import { Atributos } from "./Atributos";
import { fakerBR } from "../Main";
import { Util } from "../Util/Util";

export class Personagem {
    private _nome: string = "";
    private _raca: string = "";
    private _atributos: Atributos = new Atributos();

    // Getters e Setters
    get nome(): string {
        return this._nome;
    }

    set nome(value: string) {
        if (value.trim() === "") {
            throw new Error("O nome não pode ser vazio.");
        }
        this._nome = value;
    }

    get raca(): string {
        return this._raca;
    }

    set raca(value: string) {
        if (value.trim() === "") {
            throw new Error("A raça não pode ser vazia.");
        }
        this._raca = value;
    }

    get atributos(): Atributos {
        return this._atributos;
    }

    // Métodos
    treinarAtaque(numeroHoras: number): string {
        if (numeroHoras <= 0) {
            throw new Error("O número de horas deve ser maior que zero.");
        }

        const numeroGerado: number = Util.randomizar(15, 30);
        const novoAtaque = 10 + ((this.atributos.ataque * 1.1) * numeroHoras);
        this.atributos.ataque = novoAtaque;
        this.atributos.vida -= numeroGerado * numeroHoras;

        if (this.atributos.vida < 0) {
            throw new Error(`${this.nome} morreu!`);
        }

        return `${this.nome} treinou ataque por ${numeroHoras} horas e perdeu ${numeroGerado * numeroHoras} de vida!`;
    }

    treinarDefesa(numeroHoras: number): string {
        if (numeroHoras <= 0) {
            throw new Error("O número de horas deve ser maior que zero.");
        }

        const numeroGerado: number = Util.randomizar(15, 30);
        const novaDefesa = 10 + ((this.atributos.defesa * 1.1) * numeroHoras);
        this.atributos.defesa = novaDefesa;
        this.atributos.vida -= numeroGerado * numeroHoras;

        if (this.atributos.vida < 0) {
            throw new Error(`${this.nome} morreu!`);
        }

        return `${this.nome} treinou defesa por ${numeroHoras} horas e perdeu ${numeroGerado * numeroHoras} de vida!`;
    }

    descansar(numeroHoras: number): string {
        if (numeroHoras <= 0) {
            throw new Error("O número de horas deve ser maior que zero.");
        }

        const numeroGerado: number = Util.randomizar(15, 30);
        this.atributos.vida += numeroGerado * numeroHoras;

        if (this.atributos.vida > 100) {
            const energiaExcedida: number = this.atributos.vida - 100;
            this.atributos.vida = 100;
            const percentual: number = energiaExcedida / 100;
            this.atributos.defesa -= this.atributos.defesa * percentual;
            this.atributos.ataque -= this.atributos.ataque * percentual;
        }

        return `${this.nome} descansou por ${numeroHoras} horas e ganhou ${numeroGerado * numeroHoras} de vida!`;
    }

    desafiar(nivel: number): string {
        if (nivel <= 0) {
            throw new Error("O nível do oponente deve ser maior que zero.");
        }

        const nomeOponente = fakerBR.person.firstName();
        const oponente: Personagem = new Personagem();
        oponente.nome = nomeOponente;
        oponente.raca = fakerBR.person.firstName();
        oponente.atributos.classe = fakerBR.person.firstName();
        oponente.atributos.nivel = nivel;
        oponente.atributos.vida = Util.randomizar(50, 100);
        oponente.atributos.ataque = Util.randomizar(10, 20) * nivel;
        oponente.atributos.defesa = Util.randomizar(10, 20) * nivel;

        let mensagem: string = "";

        while (true) {
            const dado: number = Util.randomizar(1, 2);
            if (dado === 1) {
                const dano = this.calcularDano(this.atributos.ataque, oponente.atributos.defesa);
                oponente.atributos.vida -= dano;
                console.log(`${this.nome} atacou ${oponente.nome} e causou ${dano} de dano!`);
            } else {
                const dano = this.calcularDano(oponente.atributos.ataque, this.atributos.defesa);
                this.atributos.vida -= dano;
                console.log(`${oponente.nome} atacou ${this.nome} e causou ${dano} de dano!`);
            }

            if (this.atributos.vida <= 0) {
                mensagem = `${this.nome} foi derrotado!`;
                break;
            }

            if (oponente.atributos.vida <= 0) {
                mensagem = `${oponente.nome} foi derrotado!`;
                break;
            }
        }

        if (this.atributos.vida > 0) {
            this.atributos.xp += oponente.atributos.xp * 0.1;
            mensagem += `\n${this.nome} ganhou 10% de XP!`;
        } else {
            oponente.atributos.xp += this.atributos.xp * 0.1;
            mensagem += `\n${oponente.nome} ganhou 10% de XP!`;
        }

        return mensagem;
    }

    private calcularDano(ataque: number, defesa: number): number {
        return Math.max(1, ataque - defesa);
    }
}