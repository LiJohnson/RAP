/**
 * by github.com/LiJohnson
 * 2017-11-06
 */
(function(){
    'use strick';
    var param2json = function(list,isResponse){
        var data = {};
        list.forEach( item =>{
            data[item.identifier] = "";
        });
        if( isResponse ){
            data = {
                "msg":"success",
                "errorCode":200,
                "exceptionMsg": "exception",
                "exceptionCode": "PROT0020300102001",
                "bizContent":data
            };
        }
        return JSON.stringify(data,'\t','\t');

    };
    var param2dec = function(list,name){
        var data = [];[];
        data.push(`| 参数      | 类型   | 名称 | 描述 | `);
        data.push(`|:----------|:-------|:---------|:-----|`);
        list.forEach( item =>{
            data.push(`| ${item.identifier}      | ${item.dataType}   | ${item.name} | ${item.remark||'-'} |`);
        });
        return data.join('\n');
    };


    var parse = function(){
        var rapModule = JSON.parse(JSON.parse(document.body.innerText).modelJSON).moduleList[0];
        var POSTMAN = [`# ${rapModule.name}\n`];
        rapModule.pageList.forEach( page =>{

            POSTMAN.push(`# ${page.name}\n`);
            page.introduction && POSTMAN.push(`${page.introduction}\n`);

            page.actionList.forEach(action =>{
                POSTMAN.push(`## ${action.name}

${action.description}

### api

${action.requestUrl}

### 请求参数

${param2dec(action.requestParameterList)}

### 请求 demo

\`\`\`json
${param2json(action.requestParameterList)}
\`\`\`

### 返回参数

${param2dec(action.responseParameterList)}

### 返回 demo

\`\`\`json
${param2json(action.responseParameterList,true)}
\`\`\`

<hr />
`               );
            });

        });


        document.body.innerHTML = '<pre>' +   POSTMAN.join('\n');
    };
    parse();
})();