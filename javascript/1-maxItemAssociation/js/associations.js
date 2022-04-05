const associations = ((document)=>{

    class Node {
        constructor(value){
            this.value = value;
            this.weight = 0;
            this.associations = [];
            this.addAssociation(value);
        }
        
        addAssociation(value){
            if(!this.associations.find(item => {return item === value})){
                this.associations.push(value);
            }
            
        }

        incWeight(){
            this.weight++;
        }
    }

    const purchaseHistoryArr_1 = [['a','b','c'],['a','f'],['f','c','g','w'],['w','f'],['f','h'],['d']];
    const purchaseHistoryArr_2 =  [['a', 'b'], ['a', 'c'], ['d', 'e']];
    const purchaseHistoryArr_3 = [['q', 'w', 'a'],['a', 'b'],['a', 'c'],['q', 'e'],['q', 'r'],];

    const purchaseHistoryArr = purchaseHistoryArr_1;
    let associationMap = [];

    function maxItemAssociation_v1(buyerHistoryArr){
        let associations = [];
        buyerHistoryArr.forEach(purchaseItem => {
            purchaseHistoryArr.forEach(historyItem => {
                if(historyItem.includes(purchaseItem) && !associations.includes(historyItem)){
                    historyItem.forEach(item => {
                        if (!associations.includes(item) &&  !buyerHistoryArr.includes(item)) {
                            associations.push(item)
                        };
                    });
                    
                }
            });    
        });
        return associations.sort();   
    }

    function maxItemAssociation_v2(buyerHistoryArr){
        let associationArray = [];        
        buyerHistoryArr.forEach(purchaseItem => {
            let mapItem = associationMap.find(item => item.value === purchaseItem);
            if(mapItem){
                mapItem.associations.forEach(item => {
                    if (!associationArray.includes(item)) {
                        associationArray.push(item);
                    };
                });
            }   
        });
        return associationArray.sort(); 
    }

    function initAssociationMap(purchaseHistoryArr){
        associationMap = createAssociationMap(purchaseHistoryArr);
        console.table(associationMap);
    }
    function createAssociationMap(purchaseHistoryArr){
        let weightsArray = createWeightsArray(purchaseHistoryArr);
        console.table(weightsArray);
        sordByWeights(weightsArray, purchaseHistoryArr);
        console.table(purchaseHistoryArr);

        purchaseHistoryArr.forEach(historyItem => {
            let root = null;  
            historyItem.forEach (item =>{
                 if(!root){
                    root  = weightsArray.find(node => {return node.value === item});
                 } else {
                    root.addAssociation(item);
                 }
                 
            });
        });

        return weightsArray;
    }

    function sordByWeights(weightsArray, purchaseHistoryArr){
        purchaseHistoryArr.forEach(historyItem => {
            historyItem.sort((a,b) => {
                let aWeight = weightsArray.find(item => {return item.value === a});
                let bWeight = weightsArray.find(item => {return item.value === b});
                return bWeight.weight - aWeight.weight;
            });    
        }); 
    }
    function createWeightsArray(purchaseHistoryArr){
        let weightArray = [];

        purchaseHistoryArr.forEach(historyItem => {
            historyItem.forEach(item => {
                let node = weightArray.find(node => {return node.value === item});
                if(!node){
                    node = new Node(item);
                    weightArray.push(node);
                }
                node.incWeight();
            });    
        }); 
       return weightArray.sort((a,b) => {return b.weight - a.weight});
    }



    function onSelectBuyerHistory(args){
        
        const recommendationsEl = getRecommendationsEl();
        const i = args.target.value - 1;
        if(i >= 0) {
            const buyerHistoryArr = purchaseHistoryArr[i];
            const association = maxItemAssociation_v1(buyerHistoryArr);
            const association2 = maxItemAssociation_v2(buyerHistoryArr);
            recommendationsEl.innerHTML = `v1: ${association.toString()} <br/> v2: ${association2.toString()}`;
            
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
        initAssociationMap(purchaseHistoryArr);
    }
    
    return associations;

})(document);
associations();