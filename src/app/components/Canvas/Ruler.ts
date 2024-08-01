// import { Wave } from './Wave';

export class Ruler {
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
    }

    drawRuler() {
        const maxLength = 300;  // in mm
        const startX = 30;
        const startY = 0;
        const cmScale = 75;
        const halfCmScale = 50;
        const mmScale = 30;

        const accentColor= '#F9F871';

        // Draw markings
        for (let i = 0; i <= maxLength; i++) {
            const x = startX + i * this.ratio;
            
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

                this.ctx.font = '32px Arial';
                this.ctx.fillText((i / 10).toString(), x, cmScale + 30);
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

        this.ctx.beginPath();
        this.ctx.lineWidth = 10;
        this.ctx.strokeStyle = accentColor;
        this.ctx.moveTo(startX, startY);
        this.ctx.lineTo(startX + this.input * this.ratio, 0);
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.lineWidth = 5;
        this.ctx.strokeStyle = accentColor;
        this.ctx.moveTo(startX + this.input * this.ratio, startY);
        this.ctx.lineTo(startX + this.input * this.ratio, halfCmScale);
        this.ctx.stroke();
    }
}