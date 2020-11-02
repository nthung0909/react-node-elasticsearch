const express=require('express');
const client=require('../../utils/db');


module.exports={
    getAllAccount:()=>{
        return client.search({
            index:"todolist",
            type:"accounts"
        }).then(res=>{
            return res.hits.hits;
        }).catch(err=>{
            throw  err;
        })
    },
    getSingleAccountByUsername:(usn)=>{
        return client.search({
            index:"todolist",
            type:"accounts",
            body: {
                query: {
                    match: {
                        username: usn
                    }
                }
            }
        }).then(res=>{
            console.log(res.hits.hits==0);
            console.log(res.hits.hits);
            return res.hits.hits!=0;
        }).catch(err=>{
            throw err;})
    },
    addAccount:(params)=>{
        return client.index({
            index: 'todolist',
            id: params.id,
            type: 'accounts',
            body: {
                "name": params.name,
                "username":params.username,
                "password":params.password,
                "email":params.email,
                "type": params.type,
            }}).then(res=>{
                console.log(res);
                return res.result==='created';
        }).catch(err=>{return false})
    },
    updateAccount:(params)=>{
        return client.index({
            index: 'todolist',
            id: params.id,
            type: 'accounts',
            body: {
                "name": params.name,
                "username":params.username,
                "password":params.password,
                "email":params.email,
                "type": params.type,
            }}).then(res=>{
            console.log(res);
            return res.result==='updated';
        }).catch(err=>{return false})
    },
    deleteAccount:(index)=>{
        return client.delete({
            index:"todolist",
            id:index,
            type:"accounts"
        }).then(res=>{
            console.log(res);
            if(res.result==='not_found') {
                console.log("return -1");
                return -1;
            }
            else if(res.result==='deleted') {
                console.log("return 1");
                return 1;
            }
            else return 0;
        }).catch(err=>{
            return -1;
        });
    }
}