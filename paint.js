class paint{
    constructor(){
        this.canvas = document.getElementById('board');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = 800;
        this.canvas.height = 500;

        this.color = '#ff0000' //Red
        this.tool = 'pen'; //pencil, line, rectangle
        this.lineWidth = 5;

        this.currentPos = {
            x: 0, 
            y: 0
        }

        this.startPos = {
            x: 0, 
            y: 0
        }

        this.oldImage = null;
        this.newImage = null;

        this.drawing = false;

        //listen mouse event
        this.listenEvent();

        this.drawBackground();

        //test line
    //    this.drawLine(10, 10, 400, 400);
    }

    getMousePos(evt) {
        var rect = this.canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
    }

    mousedown(){
        this.oldImage = new Image;
        this.oldImage.src = this.canvas.toDataURL("image/bmp");  
        // document.body.appendChild(this.oldImage);

        let mousePos = this.getMousePos(event);
        this.startPos = this.getMousePos(event);
        this.drawing = true;
    }
    mousemove(){
        let mousePos = this.getMousePos(event);
        if(this.drawing){
            switch(this.tool){
                case 'pen': 
                    this.drawLine(this.currentPos, mousePos);
                break;   
                case 'line': 
                    this.undo();
                    this.drawLine(this.startPos, mousePos);
                break;
                case 'rect': 
                    this.undo();
                    this.drawRect(this.startPos, mousePos);
                break; 
            }
        }
        this.currentPos = mousePos;
    }
    mouseup(){
        this.drawing = false;
    }

    listenEvent(){
        this.canvas.addEventListener('mousedown', (event) => this.mousedown(event));
        this.canvas.addEventListener('mousemove', (event) => this.mousemove(event));
        this.canvas.addEventListener('mouseup', (event) => this.mouseup(event));
    }

    undo(){
        //save current Image = newImage
        this.newImage = new Image;
        this.newImage.src = this.canvas.toDataURL("image/bmp");  
        //get oldImage
        this.ctx.drawImage(this.oldImage, 0, 0, 800, 500);
    }

    redo(){
        //get oldImage
        this.ctx.drawImage(this.newImage, 0, 0, 800, 500);
    }

    drawLine(startPos, endPos){
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.strokeStyle = this.color;
        this.ctx.beginPath(); 
        this.ctx.moveTo(startPos.x, startPos.y);
        this.ctx.lineTo(endPos.x, endPos.y);
        this.ctx.stroke();
    }

    drawRect(startPos, endPos){
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.strokeStyle = this.color;
        this.ctx.beginPath(); 
        this.ctx.rect(startPos.x, startPos.y, endPos.x - startPos.x, endPos.y - startPos.y);
        this.ctx.stroke();
    }

    drawBackground(){
        this.ctx.fillStyle = '#ffffff'; //white
        this.ctx.fillRect(0, 0, 800, 500);
    }
}
var p = new paint();