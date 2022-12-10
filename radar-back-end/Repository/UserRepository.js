const express = require('express')
const db = require('../Database')
module.exports = {

    async findAll(filter) {
        if (String(filter) && String(filter).length){
            const client = await db();
            const res = await client.query(`SELECT * from users where name like '%${filter}%'`);
            client.release()
            return res.rows;
        } else {
            const client = await db();
            const res = await client.query('SELECT * FROM users');
            client.release()
            return res.rows;
        }
    },


    async insert(customer) {
        const client = await db();
        const sql = 'INSERT INTO users(name,sex,datebirthday, phone, email) VALUES ($1,$2,$3,$4,$5) returning user_id';
        const values = [customer.name, customer.sex, customer.datebirthday, customer.phone, customer.email];
        const result = await client.query(sql, values);
        client.release()
        return result
    },


    async update(id, customer) {
        const client = await db();
        const sql = 'UPDATE users SET name=$2, sex=$3, datebirthday=$4, phone=$5, email=$6 WHERE user_id=$1';
        const values = [id, customer.name, customer.sex, customer.datebirthday, customer.phone, customer.email];
        const result = await client.query(sql, values);
        client.release()
        return result;
    },

    async delete(id) {
        const client = await db();
        const sql = 'DELETE FROM users where user_id=$1;';
        const result = await client.query(sql, [id]);
        client.release()
        return result
    }
}