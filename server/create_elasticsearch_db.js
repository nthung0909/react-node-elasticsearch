const elasticsearch=require('elasticsearch');
const client=require('./utils/db')


client.index({
    index: 'todolist',
    id: 1,
    type: 'accounts',
    body: {
        "name": "admin",
        "username": "admin",
        "password": "123",
        "email": "admin@gmail.com",
        "type": 1,
    }
});

client.index({
    index: 'todolist',
    id: 1,
    type: 'accounts',
    body: {
        "name": "nthung",
        "username": "nthung",
        "password": "123",
        "email": "hung@gmail.com",
        "type": 2,
    }
});
client.index({
    index: 'todolist',
    id: 1,
    type: 'accounts',
    body: {
        "name": "abc",
        "username": "abc",
        "password": "123",
        "email": "abc@gmail.com",
        "type": 2,
    }
});