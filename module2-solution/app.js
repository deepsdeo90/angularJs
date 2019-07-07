(function () {
'use strict';

angular
.module('ShoppingListCheckOff',[])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService){
    var showList = this;
    showList.items = ShoppingListCheckOffService.gettoBuyList();

    showList.buy = function (itemIndex){
        var item = ShoppingListCheckOffService.getToBuyItem(itemIndex);
        ShoppingListCheckOffService.removeToBuyItem(itemIndex);
        var boughtItem = {name:item.name, quantity: item.quantity};
        
        ShoppingListCheckOffService.addToBoughtList(boughtItem);
    }
    showList.isbuyListEmpty = function(){
        return ShoppingListCheckOffService.isBuyListEmpty();
    }
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService){
    var showBoughtList = this;
    showBoughtList.items = ShoppingListCheckOffService.getBoughtList();
    
    showBoughtList.isBoughtListEmpty = function(){
        return ShoppingListCheckOffService.isGetBoughtListEmpty();
    }
}
function ShoppingListCheckOffService(){
    var service = this;

    var toBuy = [];
    toBuy.push({
        name : "cookies",
        quantity : 5
    });
    toBuy.push({
        name : "chips",
        quantity : 7
    });
    toBuy.push({
        name : "Fruits",
        quantity : 2
    })

    var bought = [];

    service.gettoBuyList = function(){
        return toBuy;
    }
    service.getToBuyItem =function(itemIndex){
        return toBuy[itemIndex];
    }
    service.isBuyListEmpty = function(){
        return toBuy.length>0 ? false: true;
    }

    service.removeToBuyItem = function(itemIndex){
        toBuy.splice(itemIndex, 1);
    }
    service.addToBoughtList = function(item){
        bought.push(item);
    }
    service.getBoughtList = function(){
        return bought;
    }
    service.isGetBoughtListEmpty = function(){
        return bought.length>0 ? false: true;
    }

}

})();


