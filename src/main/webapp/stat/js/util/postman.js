/**
 * by github.com/LiJohnson
 * 2017-11-06
 */
(function(){
    'use strick';
    var param2json = function(list){
        var data = {};
        list.forEach( item =>{
            data[item.identifier] = "";
    });
        return JSON.stringify(data,'\t','\t');

    };
    var param2dec = function(list,name){
        var data = [];[];
        data.push(`| 参数      | 类型   | 是否必填 | 描述 | 示例值 |`);
        data.push(`|:----------|:-------|:---------|:-----|:-------|`);
        list.forEach( item =>{
            data.push(`| ${item.identifier}      | ${item.dataType}   | ${item.remark} | ${item.name} |   |`);
        });
        return data.join('\n');
    };


    var parse = function(){
        var rapModule = JSON.parse(JSON.parse(document.body.innerText).modelJSON).moduleList[0];
        var POSTMAN = {
            info:{name:rapModule.name,description:rapModule.description || "description",schema: "https://schema.getpostman.com/json/collection/v2.0.0/collection.json"}};
        console.log(rapModule);

        POSTMAN.item = rapModule.pageList.map( page =>{
            var item = {
                name:page.name,
                description:page.introduction
            };
            item.item = page.actionList.map(action =>{
                var item = {
                    name:action.name,
                    request: {
                        url: `{{host}}/${action.requestUrl}`,
                        method: "POST",
                        header: [
                            {
                                key: "Content-Type",
                                value: "application/json",
                                description: ""
                            }],
                        body: {
                            mode: "raw",
                            raw: `${param2json(action.requestParameterList)}`
                        },
                        description: `${param2dec(action.requestParameterList,action.name)}`
                    },
                    response: []
                };
                return item;
            });
            return item;
        });
        document.body.innerHTML = '<pre>' +   JSON.stringify(POSTMAN, ' ' ,' ');
    };
    parse();
})();