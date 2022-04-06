const main = (()=>{

    let result = 0;

    const sum = (val) => {
        if(val){
            result += val;
        } else {
            return result;
        }
    }

    function makeSum(){
        let strRes = '';
        for(let i = 0; i < 10; i++){
            let val = Math.floor(Math.random() * 11);
            strRes += `${val} `;
            sum(val);
        }
        
        console.log(`${strRes}: sum = ${sum()}`);
    }

    function main(){      
        makeSum();
    }

    return main;
})();
main();