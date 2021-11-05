/// <reference path="../gameobject.ts"/>

class Robot extends GameObject {

    // Inputs
    private downKey : number = 0
    private spaceKey : number = 0
    private spaceKey2 : number = 0

    private duck : boolean = false
    private space : boolean = false

    constructor(xStart: number, yStart: number, name: string, game: Game) {        
        super(xStart, yStart, name, game)

        this.downKey = 83
        this.spaceKey = 32
        this.spaceKey2 = 87


        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))
        window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e))
    }

    protected onKeyDown(e: KeyboardEvent): void{
        switch (e.keyCode){
            case this.leftKey:
                this.left = true
                break;
            case this.rightKey:
                this.right = true
                break;
            case this.downKey:
                this.duck = true
                break;
            case this.spaceKey:
                this.space = true
                break;
            case this.spaceKey2:
                this.space = true
                break;
        }
    }

    protected onKeyUp(e: KeyboardEvent): void{
        switch (e.keyCode){
            case this.leftKey:
                this.left = false
                break;
            case this.rightKey:
                this.right = false
                break;
            case this.downKey:
                this.duck = false
                break;
            case this.spaceKey:
                this.space = false
                break;
            case this.spaceKey2:
                this.space = false
                break;
        }
    }

    public getFutureRectangle(){
        let rect : DOMRect = this._div.getBoundingClientRect() as DOMRect
        rect.x += this.xVelo
        return rect
    }

    public update(){
        // Robot is jumping when on the ground
        if(this.space && this.jumping == false){
            this.yVelo -= 40;
            this.jumping = true;
        }
        // Robot moves left, flip character
        if(this.left){
            this.xscale = -1
        }

        if(this.right){
            this.xscale = 1
        }
        // Change Robot position to ducking
        if(this.duck){
            this._div.classList.add("robot-duck")
        } else {
            this._div.classList.remove("robot-duck")
        }
        // Standard Velocity values for the Robot to move
        this.yVelo += 1.4;
        this._x += this.xVelo;
        this._y += this.yVelo;
        this.xVelo *= 0.9;
        this.yVelo *= 0.95;

        // Stops the Robot when touching the ground
        if(this._y > 600 - 16 -32){
            this.jumping = false;
            this._y = 600 - 16 - 32;
            this.yVelo = 0;
        }

        if(this._x < 0){
            this._x = 0
            this.xVelo = 0
        }

        super.update()
    }
}