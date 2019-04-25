module.exports = {
    view: {
        type: 'region',
        name: 'View',
        description: 'Identify a group of query components'
    },
    join: {
        type: 'prototype',
        name: 'Join',
        description: 'Enumerable clause filtering subset of indexes'
    },
    where: {
        type: 'prototype',
        name: 'Where',
        description: 'Enumerable clause filtering subset of indexes'
    },
    select: {
        type: 'prototype',
        name: 'Select',
        description: 'Enumerable clause filtering subset of indexes'
    },
    skip: {
        type: 'prototype',
        name: 'Skip',
        description: 'Enumerable clause filtering subset of indexes'
    },
    take: {
        type: 'prototype',
        name: 'Take',
        description: 'Enumerable clause filtering subset of indexes'
    },
    orderby: {
        type: 'prototype',
        name: 'OrderBy',
        description: 'Enumerable clause filtering subset of indexes'
    },
    orderbydescending: {
        type: 'prototype',
        name: 'OrderByDescending',
        description: 'Enumerable clause filtering subset of indexes'
    }
}