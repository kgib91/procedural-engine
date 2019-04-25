module.exports = {
    trigger: {
        type: 'region',
        name: 'Controller',
        description: 'Collection of actions relevant to one another.'
    },
    request: {
        type: 'event',
        name: 'Request',
        description: 'Triggers the execution of incomming request from controller.'
    },
    response: {
        type: 'action',
        name: 'Response',
        description: 'Emits a message back to the client.'
    }
}