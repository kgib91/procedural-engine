module.exports = {
    animate: {
        type: 'action',
        name: 'Process Frame',
        description: 'Evaluates a single frame of the simulation',
        connections: [
            {
                type: 'WebGLRenderingContext',
                direction: 'inbound',
                name: 'context',
                constraints: [
                    { name: 'limit', min: 1 }
                ]
            },
            {
                type: 'Float32Array',
                direction: 'inbound',
                name: 'velocityNew',
                constraints: [
                    { name: 'limit', min: 1 }
                ]
            },
            {
                type: 'Float32Array',
                direction: 'inbound',
                name: 'velocityOld',
                constraints: [
                    { name: 'limit', min: 1 }
                ]
            },
            {
                type: 'Float32Array',
                direction: 'inbound',
                name: 'colorNew',
                constraints: [
                    { name: 'limit', min: 1 }
                ]
            },
            {
                type: 'Float32Array',
                direction: 'inbound',
                name: 'colorOld',
                constraints: [
                    { name: 'limit', min: 1 }
                ]
            },
            {
                type: 'Float32Array',
                direction: 'inbound',
                name: 'pressureNew',
                constraints: [
                    { name: 'limit', min: 1 }
                ]
            },
            {
                type: 'Float32Array',
                direction: 'inbound',
                name: 'pressureOld',
                constraints: [
                    { name: 'limit', min: 1 }
                ]
            }
        ],
        property: (ctx, modules) => {
        }
    },
    advect: {
        name: 'Advect Field',
        type: 'action',
        inputs: [
            { type: 'Float32Array', name: 'buffer' }
        ],
        property: (ctx, lib) => {
            console.log('[steps.advect] pure-function:', ctx, lib);
        }
    }
}