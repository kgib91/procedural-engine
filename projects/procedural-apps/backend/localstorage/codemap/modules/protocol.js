module.exports = {
    trigger: {
        type: 'region',
        name: 'Protocol',
        description: 'Given the input and nested flow diagram, describe the pathways between some current state and future state.'
    },
    conditional: {
        type: 'prototype',
        name: 'Conditional',
        description: 'Sequential of action executions'
    },
    while: {
        type: 'prototype',
        name: 'While',
        description: 'Sequential of action executions'
    },
    for: {
        type: 'prototype',
        name: 'For',
        description: 'Sequential of action executions'
    },
    foreach: {
        type: 'prototype',
        name: 'Foreach',
        description: 'Sequential of action executions'
    },
    sequence: {
        type: 'prototype',
        name: 'Sequence',
        description: 'Sequential of action executions'
    }
}