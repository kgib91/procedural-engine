import * as React from 'react';
import "./imageviewport.scss";

export interface ImageViewportProps {
    image: String | HTMLImageElement | HTMLCanvasElement;
    opacity?: number;
}

export interface ImageViewportState {
    opacity: number;
}

export class ImageViewport extends React.Component<ImageViewportProps, ImageViewportState> {
    private renderCanvas: HTMLCanvasElement;

    constructor(props: ImageViewportProps) {
        super(props);
        this.renderCanvas = null;
        this.state = {
            opacity: this.props.opacity || 128
        };
    }

    renderViewer() {
        if(
            this.props.image == null
        ) {
            return;
        }
        
        var ctx = this.renderCanvas.getContext('2d');
        ctx.fillStyle = 'transparent';
        ctx.rect(0, 0, this.renderCanvas.width, this.renderCanvas.height);
        ctx.fill();

        if(this.props.image instanceof HTMLCanvasElement) {
            this.renderCanvas.width = this.props.image.width;
            this.renderCanvas.height = this.props.image.height;
            ctx.fillStyle = `rgba(255, 255, 255, ${this.state.opacity/255})`;
            ctx.rect(0, 0, this.renderCanvas.width, this.renderCanvas.height);
            ctx.fill();
            ctx.drawImage(this.props.image as HTMLCanvasElement, 0, 0);
        } else if(this.props.image instanceof HTMLImageElement) {
            this.renderCanvas.width = this.props.image.width;
            this.renderCanvas.height = this.props.image.height;
            ctx.fillStyle = `rgba(255, 255, 255, ${this.state.opacity/255})`;
            ctx.rect(0, 0, this.renderCanvas.width, this.renderCanvas.height);
            ctx.fill();
            ctx.drawImage(this.props.image as HTMLImageElement, 0, 0);
        } else if(this.props.image instanceof String) {
            console.log('is string:', this.props.image);
        }
    }
    
    setOpacity(value: number) {
        this.setState({ opacity: value });
        this.renderViewer();
    }

    setupCanvas(canvas: HTMLCanvasElement) {
        this.renderCanvas = canvas;
        if(this.renderCanvas == null) {
            return;
        }
        this.renderViewer();
    }

    render() {
        return (
            <div className='imageViewport'>
                <canvas ref={(canvas) => this.setupCanvas(canvas)} />
            </div>
        )
    }
}