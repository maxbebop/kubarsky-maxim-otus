const main = ((document)=>{

    const summ = () => {
        let result = 0;
        return (val) => {
            if(val){
                result += val;
            } else {
                return result;
            }
        }
    }

    function init(){
        const refreshBtn = document.getElementById('refreshBtn');
        refreshBtn.addEventListener('click',makeSumm);

    }

    function makeSumm(){
        const summator = summ();
        const sumResult = document.getElementById('sumResult');
        sumResult.textContent  = '';
        let strRes = '';
        for(let i = 0; i < 10; i++){
            let val = Math.floor(Math.random() * 11);
            strRes += `${val};`;
            summator(val);
        }
        
        strRes +=  ` summ: ${summator()};`;
        sumResult.textContent  =strRes;  
    }

    function main(){      
        init();
        makeSumm();
    }

    return main;
})(document);
main();