export class Ruler {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private bgWidth: number;
    private bgHeight: number;
    private scale: number = 0;
    private ratio: number;
    private input: number;

    constructor(canvas: HTMLCanvasElement, width: number, height: number, unit: string, ratio: number, input: number) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d')!;
        this.bgWidth = width;
        this.bgHeight = height;

        this.ratio = ratio;
        this.input = input;
        console.log(`this.input is: ${this.input}`);

        // window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        if (unit === 'mm') {
            this.drawMmRuler();
        } else if (unit === 'inch') {
            this.drawInchRuler();
        }
    }

    resize() {
        this.scale = window.devicePixelRatio; // Get the device pixel ratio
        this.canvas.width = this.bgWidth * this.scale;
        this.canvas.height = this.bgHeight * this.scale;
        this.ctx.scale(this.scale, this.scale);
    }

    drawMmRuler() {
        const MAXLENGTH = 300;  // in mm
        const startX = 30;
        const startY = 0;
        const cmScale = 25;
        const halfCmScale = 15;
        const mmScale = 8;

        const MAINCOLOR = '#C6FCED';
        const ACCENTCOLOR= '#F9F871';

        // Draw markings
        for (let i = 0; i <= MAXLENGTH; i++) {
            const x = startX + i * this.ratio;
            
            this.ctx.strokeStyle = MAINCOLOR;
            // Centimeter markings
            this.ctx.beginPath();
            this.ctx.moveTo(x, startY);
            this.ctx.lineTo(x, startY + mmScale);
            this.ctx.stroke();

            // Add numbers for every cm
            if (i % 10 == 0) {
                this.ctx.beginPath();
                // this.ctx.lineWidth = 3;
                this.ctx.moveTo(x, startY);
                this.ctx.lineTo(x, startY + cmScale);
                this.ctx.stroke();

                this.ctx.fillStyle = MAINCOLOR;
                this.ctx.font = `20px Arial`;
                this.ctx.fillText((i / 10).toString(), x, cmScale + 20);
            }

            // Add extra length every 5mm
            if (i % 5 == 0) {
                this.ctx.beginPath();
                // this.ctx.lineWidth = 3;
                this.ctx.moveTo(x, startY);
                this.ctx.lineTo(x, startY + halfCmScale);
                this.ctx.stroke();
            }
        }
        // start part
        this.ctx.beginPath();
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = ACCENTCOLOR;
        this.ctx.moveTo(startX, startY);
        this.ctx.lineTo(startX, halfCmScale);
        this.ctx.stroke();
        // end part
        this.ctx.beginPath();
        this.ctx.moveTo(startX + this.input * this.ratio, startY);
        this.ctx.lineTo(startX + this.input * this.ratio, halfCmScale);
        this.ctx.stroke();
        // target scale
        this.ctx.beginPath();
        this.ctx.lineWidth = 4;
        this.ctx.moveTo(startX, startY);
        this.ctx.lineTo(startX + this.input * this.ratio, 0);
        this.ctx.stroke();
    }

    drawInchRuler() {
        const inchRatio = this.ratio * 25.4 / 16;
        const MAXLENGTH = 192;  // 12inch * 16
        const startX = 30;
        const startY = 0;
        const topScaleLength = 35;
        const top2ScaleLength = 25;
        const midScaleLength = 15;
        const botScaleLength = 8;

        const MAINCOLOR = '#C6FCED';
        const ACCENTCOLOR= '#F9F871';

        // Draw markings for every 1/16 inch
        for (let i = 0; i <= MAXLENGTH; i++) {
            const x = startX + i * inchRatio;
            
            this.ctx.strokeStyle = MAINCOLOR;
            // Centimeter markings
            this.ctx.beginPath();
            this.ctx.moveTo(x, startY);
            this.ctx.lineTo(x, startY + botScaleLength);
            this.ctx.stroke();

            // Add numbers for every 1 inch
            if (i % 16 == 0) {
                this.ctx.beginPath();
                // this.ctx.lineWidth = 3;
                this.ctx.moveTo(x, startY);
                this.ctx.lineTo(x, startY + topScaleLength);
                this.ctx.stroke();

                this.ctx.fillStyle = MAINCOLOR;
                this.ctx.font = `20px Arial`;
                this.ctx.fillText((i / 16).toString(), x, topScaleLength + 20);
            }

            // Add extra length every 1/4
            if (i % 4 == 0) {
                this.ctx.beginPath();
                this.ctx.moveTo(x, startY);
                this.ctx.lineTo(x, startY + top2ScaleLength);
                this.ctx.stroke();

                this.ctx.fillStyle = MAINCOLOR;
                this.ctx.font = `12px Arial`;
                if (i % 16 == 8) {
                    this.ctx.fillText(`1/2`, x, top2ScaleLength + 10);
                }

                if (i % 8 == 4) {
                    // Use modulo to alternate between 1/4 and 3/4
                    if (i % 12 == 0) {
                        this.ctx.fillText(`3/4`, x, top2ScaleLength + 10);
                    } else {
                        this.ctx.fillText(`1/4`, x, top2ScaleLength + 10);
                    }
                }
            }

            // Add extra length every 1/8
            if (i % 2 == 0) {
                this.ctx.beginPath();
                this.ctx.moveTo(x, startY);
                this.ctx.lineTo(x, startY + midScaleLength);
                this.ctx.stroke();
            }
        }
        // start part
        this.ctx.beginPath();
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = ACCENTCOLOR;
        this.ctx.moveTo(startX, startY);
        this.ctx.lineTo(startX, top2ScaleLength);
        this.ctx.stroke();
        // end part
        this.ctx.beginPath();
        this.ctx.moveTo(startX + this.input * inchRatio, startY);
        this.ctx.lineTo(startX + this.input * inchRatio, top2ScaleLength);
        this.ctx.stroke();
        // target scale
        this.ctx.beginPath();
        this.ctx.lineWidth = 4;
        this.ctx.moveTo(startX, startY);
        this.ctx.lineTo(startX + this.input * inchRatio, 0);
        this.ctx.stroke();
    }
}