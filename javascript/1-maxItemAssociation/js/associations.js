
    const purchaseHistoryArr_1 = [['a','b','c'],['a','f'],['f','c','g','w'],['w','f'],['f','h'],['d']];
    const purchaseHistoryArr_2 =  [['a', 'b'], ['a', 'c'], ['d', 'e','g']];
    const purchaseHistoryArr_3 = [['w', 'q', 'a'],['a', 'b'],['a', 'c'],['q', 'e'],['q', 'r'],];

    const purchaseHistoryArr = purchaseHistoryArr_3;

    class Node {
        constructor(value){
            this.value = value;
            this.associations = [];
            this.addAssociation(value);
        }

        addAssociation(value){
            if(!this.associations.find(item => {return item === value})){
                this.associations.push(value);
            }

        }

        addAssociationArr(valueArr){
            valueArr.forEach(value => this.addAssociation(value));
        }
    }

    function maxItemAssociation(purchaseHistoryArr){
        let associationMap = createAssociationMap(purchaseHistoryArr);
        let associationArr = [];
        console.log('associationMap 2');
        console.table(associationMap);
        let maxLength = 2;
        associationMap.forEach(item =>{
            if(item.associations.length > maxLength){
                maxLength = item.associations.length ;
                item.associations.sort();
            }
        });

        associationMap.forEach(item =>{
            if(item.associations.length  === maxLength){
                associationArr.push(item.associations);
            }
        });

        associationArr.sort();

        console.log('res');
        console.log(associationArr[0]);
        return associationArr[0];
    }

    
    function createAssociationMap(purchaseHistoryArr){
        let associationMap = createEmptyAssociationMap(purchaseHistoryArr);
        console.log('purchaseHistoryArr');
        console.table(purchaseHistoryArr);
        console.log('associationMap');
        console.table(associationMap);        
        
        purchaseHistoryArr.forEach(historyItem => {
            let root = null;  
            historyItem.forEach (item =>{
                 if(!root){
                    root  = associationMap.find(node => {return node.value === item});
                 } else {
                    root.addAssociation(item);
                 }
            });
        });

        associationMap.forEach(rootNode => {
            associationMap.forEach(node => {
                if(node.value !== rootNode.value && node.associations.includes(rootNode.value) ){
                    node.addAssociationArr(rootNode.associations);
                }
            });
        });

        return associationMap;
    }

    function createEmptyAssociationMap(purchaseHistoryArr){
        let associationMap = [];

        purchaseHistoryArr.forEach(historyItem => {
            historyItem.forEach(item => {
                let node = associationMap.find(node => {return node.value === item});
                if(!node){
                    node = new Node(item);
                    associationMap.push(node);
                }
            });    
        }); 
       return associationMap;
    }


    maxItemAssociation(purchaseHistoryArr);