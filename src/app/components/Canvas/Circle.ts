export class Circle {
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

        this.resize();

        // window.addEventListener('resize', this.resize.bind(this), false);
        if (unit === 'mm') {
            this.drawCircle();
        } else if (unit === 'inch') {
            console.log('you selected inch!!')
        }
        
        // requestAnimationFrame(this.animate.bind(this));
    }

    resize() {
        this.scale = window.devicePixelRatio; // Get the device pixel ratio
        // this.canvas.width = this.canvas.width * this.scale;
        // this.canvas.height = this.canvas.height * this.scale;
        this.canvas.width = this.bgWidth * this.scale;
        this.canvas.height = this.bgHeight * this.scale;
        this.ctx.scale(this.scale, this.scale);
    }

    drawCircle() {
        const MAXLENGTH = 300;  // in mm
        const startX = 10;
        const startY = 50;
        const cmScale = 15;
        const halfCmScale = 10;
        const mmScale = 5;

        const centerXstart = (this.canvas.width / 4);
        const centerYstart = startY + this.input * this.ratio;
        const gap = 20;

        const MAINCOLOR = '#C6FCED';
        const BACKGROUNDCOLOR = '#8EB8EC';
        const ACCENTCOLOR= '#F9F871';

        // Draw Circle
        this.ctx.fillStyle = 'white';
        this.ctx.beginPath();
        this.ctx.arc(centerXstart, centerYstart, this.input * this.ratio, 0, 2 * Math.PI);
        this.ctx.fill();

        this.ctx.fillStyle = BACKGROUNDCOLOR;
        this.ctx.beginPath();
        this.ctx.arc(centerXstart, centerYstart, this.input * this.ratio * 0.01, 0, 2 * Math.PI);
        this.ctx.fill();

        // Draw Width guide line
        this.ctx.fillStyle = 'white';
        this.ctx.beginPath();
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = 'white';
        this.ctx.moveTo(centerXstart + this.input * this.ratio, centerYstart + this.input * this.ratio + gap);
        this.ctx.lineTo(centerXstart - this.input * this.ratio, centerYstart + this.input * this.ratio + gap);

        this.ctx.moveTo(centerXstart - this.input * this.ratio, centerYstart + this.input * this.ratio + gap * 0.5);
        this.ctx.lineTo(centerXstart - this.input * this.ratio, centerYstart + this.input * this.ratio + gap * 1.5);
        this.ctx.moveTo(centerXstart + this.input * this.ratio, centerYstart + this.input * this.ratio + gap * 0.5);
        this.ctx.lineTo(centerXstart + this.input * this.ratio, centerYstart + this.input * this.ratio + gap * 1.5);
        this.ctx.stroke();

        this.ctx.font = '24px Arial';
        this.ctx.fillText(`${(this.input * 2).toString()}mm`, centerXstart - 30, centerYstart + this.input * this.ratio + gap + 45);

        // Draw Height guide line
        this.ctx.beginPath();
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = 'white';
        this.ctx.moveTo(centerXstart + this.input * this.ratio + gap, centerYstart - this.input * this.ratio);
        this.ctx.lineTo(centerXstart + this.input * this.ratio + gap, centerYstart + this.input * this.ratio);

        this.ctx.moveTo(centerXstart + this.input * this.ratio + gap * 0.5, centerYstart - this.input * this.ratio);
        this.ctx.lineTo(centerXstart + this.input * this.ratio + gap * 1.5, centerYstart - this.input * this.ratio);
        this.ctx.moveTo(centerXstart + this.input * this.ratio + gap * 0.5, centerYstart + this.input * this.ratio);
        this.ctx.lineTo(centerXstart + this.input * this.ratio + gap * 1.5, centerYstart + this.input * this.ratio);
        this.ctx.stroke();

        this.ctx.fillText(`${(this.input * 2)}mm`, centerXstart + this.input * this.ratio + gap + 20, centerYstart);

        // Draw radius scale
        for (let i = 0; i <= this.input; i++) {
            // const startPoint = centerXstart - (this.ratio * this.input);
            const startPoint = centerXstart;
            const r = startPoint + i * this.ratio;
            
            // Centimeter markings
            this.ctx.clearRect(r, centerYstart, 0.5, mmScale);

            // Add numbers for every cm
            if (i % 10 == 0) {
                this.ctx.clearRect(r, centerYstart, 1, cmScale);

                this.ctx.fillStyle = BACKGROUNDCOLOR;
                this.ctx.font = `20px Arial`;
                this.ctx.fillText((i / 10).toString(), r, centerYstart + 35);
            }

            // Add extra length every 5mm
            if (i % 5 == 0) {
                this.ctx.clearRect(r, centerYstart, 0.5, halfCmScale);
            }
        }
        this.ctx.fillStyle = BACKGROUNDCOLOR;
        this.ctx.font = `20px Arial`;
        this.ctx.fillText(`${(this.input)}mm`, centerXstart + (this.input * this.ratio) / 2 - gap, centerYstart - 20);
    }
}