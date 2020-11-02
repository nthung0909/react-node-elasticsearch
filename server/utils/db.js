const config=require("../config/default.json");
const elasticsearch=require('elasticsearch');


client= new elasticsearch.Client({
    hosts:config.elasticSearch.hosts,
    requestTimeout:config.elasticSearch.requestTimeout
});

module.exports=client;