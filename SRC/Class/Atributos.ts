export class Atributos {
    private _nivel: number = 0;
    private _vida: number = 0;
    private _ataque: number = 0;
    private _defesa: number = 0;
    private _classe: string = "";
    private _stamina: number = 0;
    private _mana: number = 0;
    private _poderAtaque: number = 0;
    private _intelecto: number = 0;
    private _armadura: number = 0;
    private _xp: number = 0;

    // Getters e Setters com validações

    get nivel(): number {
        return this._nivel;
    }

    set nivel(value: number) {
        if (value < 0 || value > 100) {
            throw new Error("O nível deve estar entre 0 e 100.");
        }
        this._nivel = value;
    }

    get vida(): number {
        return this._vida;
    }

    set vida(value: number) {
        if (value < 0) {
            throw new Error("A vida não pode ser negativa.");
        }
        this._vida = value;
    }

    get ataque(): number {
        return this._ataque;
    }

    set ataque(value: number) {
        if (value < 0) {
            throw new Error("O ataque não pode ser negativo.");
        }
        this._ataque = value;
    }

    get defesa(): number {
        return this._defesa;
    }

    set defesa(value: number) {
        if (value < 0) {
            throw new Error("A defesa não pode ser negativa.");
        }
        this._defesa = value;
    }

    get classe(): string {
        return this._classe;
    }

    set classe(value: string) {
        if (value.trim() === "") {
            throw new Error("A classe não pode ser vazia.");
        }
        this._classe = value;
    }

    get stamina(): number {
        return this._stamina;
    }

    set stamina(value: number) {
        if (value < 0) {
            throw new Error("A stamina não pode ser negativa.");
        }
        this._stamina = value;
    }

    get mana(): number {
        return this._mana;
    }

    set mana(value: number) {
        if (value < 0) {
            throw new Error("A mana não pode ser negativa.");
        }
        this._mana = value;
    }

    get poderAtaque(): number {
        return this._poderAtaque;
    }

    set poderAtaque(value: number) {
        if (value < 0) {
            throw new Error("O poder de ataque não pode ser negativo.");
        }
        this._poderAtaque = value;
    }

    get intelecto(): number {
        return this._intelecto;
    }

    set intelecto(value: number) {
        if (value < 0) {
            throw new Error("O intelecto não pode ser negativo.");
        }
        this._intelecto = value;
    }

    get armadura(): number {
        return this._armadura;
    }

    set armadura(value: number) {
        if (value < 0) {
            throw new Error("A armadura não pode ser negativa.");
        }
        this._armadura = value;
    }

    get xp(): number {
        return this._xp;
    }

    set xp(value: number) {
        if (value < 0) {
            throw new Error("A experiência (XP) não pode ser negativa.");
        }
        this._xp = value;
    }
}