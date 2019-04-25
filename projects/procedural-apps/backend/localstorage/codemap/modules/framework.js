require("jquery")
require("mithril")

module.exports = {
    parameter: {
        type: 'variable',
        name: 'Parameter',
        description: 'Expected target for end rasterization'
    },
    start: {
        type: 'event',
        name: 'Ready',
        description: 'Manages application lifecycle'
    },
    service: {
        type: 'region',
        name: 'Service',
        editor_class: 'contract_schema',
        description: 'Container for a service'
    },
    close: {
        type: 'event',
        name: 'Stopping',
        description: 'Triggers action execution when the application begins to close'
    },
    log: {
        type: 'action',
        name: 'Log Message',
        description: 'Write useful information between different channels either to a local or remote target.',
    }
}