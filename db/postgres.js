//WIP
const { Client } = require('pg')
const client = new Client()
await client.connect()

const columns = ['datetime', '' ]
const create = 'CREATE TABLE inputs($1, $2)'

const res = await client.query(create, columns)
console.log(res.rows[0].message) // Hello world!

await client.end()



const put = (data) => {
    if(typeof data == 'string')
    await client.connect()
    await client.query('INSERT INTO inputs')
}