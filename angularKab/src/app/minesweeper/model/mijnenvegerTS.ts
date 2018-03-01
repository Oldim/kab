export class Toestand {
    static readonly geklikt: number = 0;
    static readonly ongeklikt: number = 1;
    static readonly vermoedelijkbom: number = 2;
    static readonly weetniet: number = 3
}

export class Vak {
    private _toestand: number;

    constructor(private _isBom: boolean) {
        this._toestand = Toestand.ongeklikt;
    }

    get isBom(): boolean {
        return this._isBom;
    }

    get toestand(): number {
        return this._toestand;
    }

    klik(): void {
        if (this._toestand != Toestand.vermoedelijkbom) this._toestand = Toestand.geklikt;
    }

    toon(): void {
        this._toestand = Toestand.geklikt;
    }

    zetIsVermoedelijkBom(): boolean {
        if (this._toestand != Toestand.geklikt) this._toestand = Toestand.vermoedelijkbom;
        return false;
    }

    zetWeetNiet(): void {
        if (this._toestand != Toestand.geklikt) this._toestand = Toestand.weetniet;
    }

    zetOngeklikt(): void {
        if (this._toestand != Toestand.geklikt) this._toestand = Toestand.ongeklikt;
    }

    isGeklikt(): boolean {
        return this._toestand == Toestand.geklikt;
    }
    isVermoedelijkBom(): boolean {
        return this._toestand == Toestand.vermoedelijkbom;
    }

    isWeetNiet(): boolean {
        return this._toestand == Toestand.weetniet;
    }

    isOngeklikt(): boolean {
        return this._toestand == Toestand.ongeklikt;
    }
}

export class Bord {
    private vakken: Vak[][];
    private _eindeSpel: boolean;
    private _spelGewonnen: boolean;
    private aantalBommen: number;
    private _seconden: number;
    private timer: any;//NodeJS.Timer;  // TODO: import van type Timer?  (zie https://github.com/Microsoft/TypeScript/issues/842)

    constructor(rijen: number = 10, kolommen: number = 10, aantalBommen: number = 10) {
        this.vakken = [];
        this._eindeSpel = false;
        this._spelGewonnen = false;
        this.initBord(rijen, kolommen, aantalBommen);
        this._seconden = 0;
        this.timer = null;
    }

    get seconden(): number {
        return this._seconden;
    }

    get eindeSpel(): boolean {
        return this._eindeSpel;
    }

    get spelGewonnen(): boolean {
        return this._spelGewonnen;
    }

    initBord(rijen, kolommen, aantalBommen): void {
        for (let rij: number = 0; rij < rijen; rij++) {
            this.vakken[rij] = [];
        }
        this.aantalBommen = 0;
        while (this.aantalBommen < aantalBommen) {
            let rij: number = Math.floor(Math.random() * (rijen - 1));
            let kolom: number = Math.floor(Math.random() * (kolommen - 1));
            if (this.vakken[rij][kolom] == undefined) {
                this.vakken[rij][kolom] = new Vak(true);
                this.aantalBommen++;
            }
        }
        for (let i: number = 0; i < rijen; i++) {
            for (let j: number = 0; j < kolommen; j++) {
                if (this.vakken[i][j] == undefined) this.vakken[i][j] = new Vak(false);
            }
        }
    }

    klikRechts(rij, kolom): boolean {
        if (this.timer == null) {
            this.timer = setInterval(() => { this._seconden++; }, 1000);
        }
        if (!this._eindeSpel) {
            if (this.vakken[rij][kolom].isWeetNiet())
                this.vakken[rij][kolom].zetOngeklikt();
            else if (this.vakken[rij][kolom].isVermoedelijkBom())
                this.vakken[rij][kolom].zetWeetNiet();
            else if (this.vakken[rij][kolom].isOngeklikt())
                this.vakken[rij][kolom].zetIsVermoedelijkBom();
            this.checkSpelGewonnen();
        }
        return false;
    }

    klik(rij, kolom): void {
        if (!this._eindeSpel) {
            if (this.vakken[rij][kolom].isBom) this.spelVerloren();
            else {
                if (this.timer == null) {
                    this.timer = setInterval(() => { this._seconden++; }, 1000);
                }
                this.verwerkKlik(rij, kolom);
                this.checkSpelGewonnen();
            }
        }
    }


    checkSpelGewonnen(): void {
        let aantalGevondenBommen: number = 0;
        for (let i: number = 0; i < this.vakken.length; i++) {
            for (let j: number = 0; j < this.vakken[0].length; j++) {
                if (this.vakken[i][j].isBom && this.vakken[i][j].isVermoedelijkBom()) {
                    aantalGevondenBommen++;
                }
            }
        }
        if (aantalGevondenBommen == this.aantalBommen) {
            this._eindeSpel = true;
            this._spelGewonnen = true;
            /**/ clearInterval(this.timer);
            /**/ this.timer = null;
        }
    }

    spelVerloren(): void {
        this._eindeSpel = true;
        this._spelGewonnen = false;
        /**/ clearInterval(this.timer);
        /**/ this.timer = null;
        for (let i: number = 0; i < this.vakken.length; i++) {
            for (let j: number = 0; j < this.vakken[0].length; j++) {
                if (this.vakken[i][j].isBom) this.vakken[i][j].toon();
            }
        }
    }

    verwerkKlik(rij, kolom): void {
        if (!this.vakken[rij][kolom].isGeklikt()) {
            this.vakken[rij][kolom].klik();
            if (this.vakken[rij][kolom].isGeklikt() &&
                this.geefAantalBomBuren(rij, kolom) == 0) {
                let rijMin: number = Math.max(rij - 1, 0);
                let rijMax: number = Math.min(rij + 1, this.vakken.length - 1);
                let kolomMin: number = Math.max(kolom - 1, 0);
                let kolomMax: number = Math.min(kolom + 1, this.vakken[0].length - 1);
                for (var i = rijMin; i <= rijMax; i++) {
                    for (var j = kolomMin; j <= kolomMax; j++) {
                        if (i != rij || j != kolom) {
                            this.verwerkKlik(i, j);
                        }
                    }
                }
            }
        }
    }

    isBom(rij, kolom): boolean {
        return this.vakken[rij][kolom].isBom;
    }

    geefAantalVermoedelijkeBommen(): number {
        let aantalVermoedelijkeBommen: number = 0;
        for (let i: number = 0; i < this.vakken.length; i++) {
            for (let j: number = 0; j < this.vakken[0].length; j++) {
                if (this.vakken[i][j].isVermoedelijkBom())
                    aantalVermoedelijkeBommen++;
            }
        }
        return aantalVermoedelijkeBommen;
    }

    geefAantalBomBuren(rij, kolom): number {
        let aantalBomBuren: number = 0;
        let rijMin: number = Math.max(rij - 1, 0);
        let rijMax: number = Math.min(rij + 1, this.vakken.length - 1);
        let kolomMin: number = Math.max(kolom - 1, 0);
        let kolomMax: number = Math.min(kolom + 1, this.vakken[0].length - 1);
        for (let i = rijMin; i <= rijMax; i++) {
            for (let j = kolomMin; j <= kolomMax; j++) {
                if (i != rij || j != kolom) {
                    if (this.vakken[i][j].isBom) aantalBomBuren++;
                }
            }
        }
        return aantalBomBuren;
    }

    toString(): string {
        let result: string = "";
        for (let rij: number = 0; rij < this.vakken.length; rij++) {
            for (let kolom: number = 0; kolom < this.vakken[0].length; kolom++) {
                switch (this.vakken[rij][kolom].toestand) {
                    case Toestand.ongeklikt: result += "."; break;
                    case Toestand.vermoedelijkbom: result += "V"; break;
                    case Toestand.weetniet: result += "?"; break;
                    default: // geklikt
                        result += this.vakken[rij][kolom].isBom ? "X" : this.geefAantalBomBuren(rij, kolom);
                }
                result += " ";
            }
            result += "\n";
        }
        return result;
    }

    get aantalGevondenBommen(): number {
        return this.vakken.map(this.aantalGevondenBommenInrij).reduce((prev: number, cur: number) => prev + cur);
    }

    private aantalGevondenBommenInrij(rij: Vak[]) {
        return rij.filter((vak: Vak) => vak.isVermoedelijkBom()).length;
    }
}