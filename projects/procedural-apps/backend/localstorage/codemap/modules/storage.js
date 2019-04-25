module.exports = {
    trigger: {
        type: 'region',
        name: 'Bucket',
        description: 'Collection of strorage entities.'
    },
    request: {
        type: 'action',
        name: 'Read',
        description: 'Reads data rom the storage entity.'
    },
    response: {
        type: 'action',
        name: 'Write',
        description: 'Write data back to the storage entity.'
    }
}