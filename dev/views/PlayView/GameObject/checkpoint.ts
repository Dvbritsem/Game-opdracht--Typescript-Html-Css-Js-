class Checkpoint extends GameObject {

    public reached : boolean = false

    constructor(xStart: number, yStart: number, name : string, game:Game) {
        super(xStart,yStart,name, game)
    }
    
    public update() : void {
        // When Checkpoint is reached, add class.
        if(this.reached) {
            console.log("collected")
            this._div.classList.add("green")
            this.reached = false
        }

        super.update()
    }
}