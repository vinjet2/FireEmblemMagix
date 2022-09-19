class Byleth {
    constructor() {
        this.node = document.createElement("div");
        this.node.id = "byleth";

        document.getElementById("chibi_byleth").appendChild(this.node);

        let columnCount = 6;
        let rowCount = 8;
        let refreshDelay = 275;
        let loopCol = true;
        let scale = 1.0;

        this.tiledImage = new TiledImage("images/Sprites/Byleth_Canvas.png", columnCount, rowCount, refreshDelay, loopCol, scale, "byleth");
        this.tiledImage.changeRow(6);
        this.tiledImage.changeMinMaxInterval(0,2);

        this.x = ((window.innerWidth - 64)/2);
        this.y = (window.innerHeight - 110);
    }

    changeGender() {
        console.log("GenderChanged!");
        if (this.gender == 0) {
            this.gender = 1;
            document.getElementById("Background").style.backgroundImage="url('images/Background/F!Byleth_Background.png')";
        }
        else {
            this.gender = 0;
            document.getElementById("Background").style.backgroundImage="url('images/Background/M!Byleth_Background.png')";
        }

    }

    // Jump() {
    //     console.log("Jump");
    //     if (this.gender == 0)
    //         this.tiledImage.changeRow(0);
    //     else
    //         this.tiledImage.changeRow(1);
    //     this.tiledImage.changeMinMaxInterval(0,5);
    //     setTimeout(function(){}, 500);
    // }

    tick() {
        if (leftArrowOn) {
            this.x--;
            if(this.gender == 0)
                this.tiledImage.changeRow(4);
            else
                this.tiledImage.changeRow(5);
            //this.tiledImage.changeMinMaxInterval(0,3);
            this.tiledImage.setFlipped(true); 
        }

        if (rightArrowOn) {
            this.x++;
            if (this.gender == 0)
                this.tiledImage.changeRow(4);
            else
                this.tiledImage.changeRow(5);
            //this.tiledImage.changeMinMaxInterval(0,3);
            this.tiledImage.setFlipped(false);
        }

        if (leftArrowOn == false && rightArrowOn == false) {
            if (this.gender == 0) 
                this.tiledImage.changeRow(6);
            else
                this.tiledImage.changeRow(7);

            this.tiledImage.setFlipped(false);

            if (this.tiledImage.changeMinMaxInterval =! (0,2))
                this.tiledImage.changeMinMaxInterval(0,2);  
        }

        this.tiledImage.tick(this.x,this.y);

        return true;
    }
}