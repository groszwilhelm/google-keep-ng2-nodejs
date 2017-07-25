
function getAll() {
    return [
        {
            id: 0,
            title: 'This is data from service 1',
            description: 'Some description goes here',
            color: '#ffffff'
        },
        {
            id: 1,
            title: 'This is data from service 2',
            description: 'Some description goes here',
            color: '#ffffff'
        },
        {
            id: 2,
            title: 'This is data from service 3',
            description: 'Some description goes here',
            color: '#ffffff'
        },
    ]
}

module.exports = {
    readAll: getAll
}