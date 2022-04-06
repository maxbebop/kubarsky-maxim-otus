const main = (()=>{

    let result = 0;

    const summ = (val) => {
        if(val){
            result += val;
        } else {
            return result;
        }
    }

    function makeSumm(){
        let strRes = '';
        for(let i = 0; i < 10; i++){
            let val = Math.floor(Math.random() * 11);
            strRes += `${val} `;
            summ(val);
        }
        
        console.log(`${strRes}: summ = ${summ()}`);
    }

    function main(){      
        makeSumm();
    }

    return main;
})();
main();