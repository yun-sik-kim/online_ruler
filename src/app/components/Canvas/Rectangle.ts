export class Rectangle {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private bgWidth: number;
    private bgHeight: number;
    private scale: number = 0;
    private ratio: number;
    private inputWidth: number;
    private inputHeight: number;

    constructor(canvas: HTMLCanvasElement, width: number, height: number, unit: string, ratio: number, inputWidth: number, inputHeight: number) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d')!;
        this.bgWidth = width;
        this.bgHeight = height;

        this.ratio = ratio;
        this.inputWidth = inputWidth;
        this.inputHeight = inputHeight;

        this.resize();

        // window.addEventListener('resize', this.resize.bind(this), false);
        this.drawRuler();
        // requestAnimationFrame(this.animate.bind(this));
    }

    resize() {
        this.scale = window.devicePixelRatio; // Get the device pixel ratio
        this.canvas.width = this.bgWidth * this.scale;
        this.canvas.height = this.bgHeight * this.scale;
        this.ctx.scale(this.scale, this.scale);
    }

    drawRuler() {
        const MAXLENGTH = 30;
        const startX = 10;
        const startY = 50;
        const cmScale = 15;
        const halfCmScale = 10;
        const mmScale = 5;
        const radius = 9;

        const customXstart = (this.canvas.width / 4) - (this.inputWidth * this.ratio / 2)
        const customXend = customXstart + (this.inputWidth * this.ratio);
        const customYstart = startY;
        const customYend = startY + (this.inputHeight * this.ratio);
        const gap = 20;

        const MAINCOLOR = '#C6FCED';
        const BACKGROUNDCOLOR = '#8EB8EC';
        const accentColor= '#F9F871';

        // Draw rectangle
        this.ctx.fillStyle = 'white';

        this.ctx.roundRect(customXstart, startY, (this.inputWidth * this.ratio), (this.inputHeight * this.ratio), [radius]);
        this.ctx.fill();    //roundRect needs fill to activate.

        // Draw Width guide line
        this.ctx.beginPath();
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = 'white';
        this.ctx.moveTo(customXstart, customYend + gap);
        this.ctx.lineTo(customXend, customYend + gap);
        this.ctx.stroke();

        this.ctx.moveTo(customXstart, customYend + gap * 0.5);
        this.ctx.lineTo(customXstart, customYend + gap * 1.5);
        this.ctx.moveTo(customXend, customYend + gap * 0.5);
        this.ctx.lineTo(customXend, customYend + gap * 1.5);
        this.ctx.stroke();

        this.ctx.font = '20px Arial';
        this.ctx.fillText(`${this.inputWidth.toString()}mm`, customXstart + (customXend - customXstart) / 2 - 20, customYend + gap + 30);

        // Draw Width scale
        for (let i = 0; i <= this.inputWidth; i++) {
            const x = customXstart + i * this.ratio;
            
            // Centimeter markings
            this.ctx.clearRect(x, customYstart, 1, mmScale);

            // Add numbers for every cm
            if (i % 10 == 0) {
                this.ctx.clearRect(x, customYstart, 2, cmScale);

                this.ctx.fillStyle = BACKGROUNDCOLOR;
                this.ctx.font = `16px Arial`;
                this.ctx.fillText((i / 10).toString(), x, customYstart + 30);
            }

            // Add extra length every 5mm
            if (i % 5 == 0) {
                this.ctx.clearRect(x, customYstart, 1, halfCmScale);
            }
        }

        // Draw Height
        this.ctx.beginPath();
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = 'white';
        this.ctx.moveTo(customXend + gap, customYstart);
        this.ctx.lineTo(customXend + gap, customYend);
        this.ctx.stroke();

        this.ctx.moveTo(customXend + gap * 0.5, customYstart);
        this.ctx.lineTo(customXend + gap * 1.5, customYstart);
        this.ctx.moveTo(customXend + gap * 0.5, customYend);
        this.ctx.lineTo(customXend + gap * 1.5, customYend);
        this.ctx.stroke();

        this.ctx.fillStyle = 'white';
        this.ctx.font = '20px Arial';
        this.ctx.fillText(`${this.inputHeight.toString()}mm`, customXend + gap + 10, customYstart + (customYend - customYstart) / 2);

         // Draw Height scale
         for (let i = 0; i <= this.inputHeight; i++) {
            const y = customYstart + i * this.ratio;
            
            // Centimeter markings
            this.ctx.clearRect(customXstart, y, mmScale, 1);

            // Add numbers for every cm
            if (i % 10 == 0) {
                this.ctx.clearRect(customXstart, y, cmScale, 2);

                this.ctx.fillStyle = BACKGROUNDCOLOR;
                this.ctx.font = `16px Arial`;
                this.ctx.fillText((i / 10).toString(), customXstart + 30, y);
            }

            // Add extra length every 5mm
            if (i % 5 == 0) {
                this.ctx.clearRect(customXstart, y, halfCmScale, 1);
            }
        }
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