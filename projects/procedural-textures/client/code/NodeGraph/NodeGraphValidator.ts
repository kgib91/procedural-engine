export class NodeGraphValidator {
    static validateType(object: any, type: string): boolean {
        switch(type) {
            case 'sampler2d':
                return (object instanceof HTMLCanvasElement);
        }
        return false;
    }
}