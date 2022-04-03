const associations = ((document)=>{

    const purchaseHistoryArr_1 = [['a','b','c'],['a','f'],['f','c','g','w'],['w','f'],['f','h'],['d']];
    const purchaseHistoryArr_2 =  [['a', 'b'], ['a', 'c'], ['d', 'e']];
    const purchaseHistoryArr_3 = [
        ['q', 'w', 'a'],
        ['a', 'b'],
        ['a', 'c'],
        ['q', 'e'],
        ['q', 'r'],
        ];

    const purchaseHistoryArr = purchaseHistoryArr_3;

    function maxItemAssociation(buyerHistoryArr){
        let associations = [];
        let associationsArr = [];
        buyerHistoryArr.forEach(purchaseItem => {
            purchaseHistoryArr.forEach(historyItem => {
                if(historyItem.includes(purchaseItem) && !associations.includes(historyItem)){
                    associationsArr.push(historyItem);
                    historyItem.forEach(item => {
                        if (!associations.includes(item)) {
                            associations.push(item)
                        };
                    });
                    
                }
            });    
        });
        console.table(associationsArr);
        return associations.sort();   
    }
    
    function onSelectBuyerHistory(args){
        
        const recommendationsEl = getRecommendationsEl();
        const i = args.target.value - 1;
        if(i >= 0) {
            const buyerHistoryArr = purchaseHistoryArr[i];
            const association = maxItemAssociation(buyerHistoryArr);
            recommendationsEl.textContent = association.toString();
            
        } else{
            recommendationsEl.textContent = '';
        }
    }

    function createElement(tag, props, ...childList){
        const element = document.createElement(tag);
    
        Object.keys(props).forEach(key => element[key] = props[key]);
    
        childList.forEach(item => element.appendChild(item));
    
        return element;
    }

    function getBuyerHistoryEl(){
        return document.getElementById('buyerHistory');
    }

    function getRecommendationsEl(){
        return document.getElementById('recommendations');
    }

    function getFullHistoryEl(){
        return document.getElementById('fullHistory');
    }

    function initFullHistoryEl(){
        const fullHistoryEl = getFullHistoryEl();

        purchaseHistoryArr.forEach(item => {
            const div = createElement('div', {textContent: item.toString()});
            fullHistoryEl.appendChild(div);
        });
    }
    function initBuyerHistoryEl(){
        let i = 1;
        let buyerHistory = getBuyerHistoryEl();
        buyerHistory.appendChild(createDefaultBuyerHistoryVal());
        purchaseHistoryArr.forEach(item => {
            const option = createElement('option', {value: i, text: item.toString()});
            buyerHistory.appendChild(option);
            i++;
        });

        buyerHistory.addEventListener('change', onSelectBuyerHistory);
    }

    function createDefaultBuyerHistoryVal(){
        return createElement('option', {value: 0, text: '' });
    }

    function associations(){
        initBuyerHistoryEl();
        initFullHistoryEl();
    }
    
    return associations;

})(document);
associations();