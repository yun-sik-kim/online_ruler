// import { Wave } from './Wave';

export class Rectangle {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private scale: number;
    private ratio: number;
    private input: number;

    constructor(canvas: HTMLCanvasElement, unit: string, ratio: number, input: number) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d')!;

        this.ratio = ratio;
        this.input = input;

        this.scale = window.devicePixelRatio; // Get the device pixel ratio
        this.canvas.width = this.canvas.width * this.scale;
        this.canvas.height = this.canvas.height * this.scale;
        this.ctx.scale(this.scale, this.scale);

        this.drawRuler();
        // requestAnimationFrame(this.animate.bind(this));
    }

    drawRuler() {
        const MAXLENGTH = 30;
        const startX = 10;
        const startY = 0;
        const cmScale = 30;
        const halfCmScale = 20;
        const mmScale = 10;
        const radius = 9;

        // Draw rectangle
        this.ctx.fillStyle = 'white';
        this.ctx.roundRect(startX, startY, 200, 200, radius);


        // // Draw the main line
        // this.ctx.beginPath();
        // this.ctx.moveTo(startX, startY);
        // this.ctx.lineTo((this.ratio * (maxLength)), startY);
        // this.ctx.stroke();
        
        // increase resolution
        // this.ctx.scale(this.scale, this.scale);

        // Draw markings
        // for (let i = 0; i <= MAXLENGTH; i++) {
        //     const x = startX + i * this.ratio;
            
        //     // Centimeter markings
        //     this.ctx.beginPath();
        //     this.ctx.moveTo(x, startY);
        //     this.ctx.lineTo(x, startY + cmScale);
        //     this.ctx.stroke();
            
        //     // Add numbers for every 5cm
        //     if (i < MAXLENGTH) {
        //         this.ctx.font = '12px Arial';
        //         this.ctx.fillText(i.toString(), x, cmScale + 10);
        //     }
            
        //     // Millimeter markings
        //     if (i < 30) {
        //         for (let j = 1; j < 10; j++) {
        //             const smallX = x + (j * this.ratio / 10);
        //             const height = j === 5 ? halfCmScale : mmScale;
        //             this.ctx.beginPath();
        //             this.ctx.moveTo(smallX, startY);
        //             this.ctx.lineTo(smallX, height);
        //             this.ctx.stroke();
        //         }
        //     }
        // }
    }

    // resize() {
    //     this.logicalWidth = this.canvas.offsetWidth;
    //     this.logicalHeight = this.canvas.offsetHeight;
    //     this.canvas.width = this.logicalWidth * this.scale;
    //     this.canvas.height = this.logicalHeight * this.scale;

    //     this.ctx.scale(this.scale, this.scale);
    // }

    // animate() {
    //     this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
    //     this.ctx.beginPath();
    //     this.ctx.moveTo(0, 50);
    //     this.ctx.lineTo(this.canvas.width, 50);
    //     this.ctx.stroke();
        
    //     // Draw markings
    //     for (let i = 0; i <= 30; i++) {
    //         const x = i * this.scale;
            
    //         // Centimeter markings
    //         this.ctx.beginPath();
    //         this.ctx.moveTo(x, 20);
    //         this.ctx.lineTo(x, 50);
    //         this.ctx.stroke();
            
    //         // Add numbers for every 5cm
    //         if (i % 5 === 0) {
    //             this.ctx.font = '12px Arial';
    //             this.ctx.fillText(i.toString(), x - 3, 15);
    //         }
            
    //         // Millimeter markings
    //         if (i < 30) {
    //             for (let j = 1; j < 10; j++) {
    //                 const smallX = x + (j *this.scale / 10);
    //                 const height = j === 5 ? 40 : 45;
    //                 this.ctx.beginPath();
    //                 this.ctx.moveTo(smallX, height);
    //                 this.ctx.lineTo(smallX, 50);
    //                 this.ctx.stroke();
    //             }
    //         }
    //     }

    //     requestAnimationFrame(this.animate.bind(this));
    // }
}