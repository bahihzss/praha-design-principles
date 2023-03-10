enum Channel {
  AMAZON = 'Amazon',
  RAKUTEN = 'Rakuten',
  YAHOO = 'Yahoo',
  SHOPIFY = 'Shopify',
}

class IShop {
  channel: Channel;
  handleRate: () => number;
}

class Amazon implements IShop {
  private HANDLE_RATE = 0.08;
  channel = Channel.AMAZON;

  handleRate() {
    return this.HANDLE_RATE;
  }
}

class Rakuten implements IShop {
  private HANDLE_RATE = 0.07;
  channel = Channel.RAKUTEN;

  handleRate() {
    return this.HANDLE_RATE;
  }
}

class Yahoo implements IShop {
  private HANDLE_RATE = 0.05;
  channel = Channel.YAHOO;

  handleRate() {
    return this.HANDLE_RATE;
  }
}

class Shopify implements IShop {
  private HANDLE_RATE = 0.03;
  channel = Channel.SHOPIFY;

  handleRate() {
    return this.HANDLE_RATE;
  }
}

class HandleFeeService {
  calculate(shop: IShop, sales: number) {
    return sales * shop.handleRate();
  }
}

const shopA = new Amazon();
const shopB = new Rakuten();
const shopC = new Yahoo();
const shopD = new Shopify();


const handleFeeService = new HandleFeeService();
console.log(handleFeeService.calculate(shopA, 5000));
console.log(handleFeeService.calculate(shopB, 6000));
console.log(handleFeeService.calculate(shopC, 7000));
console.log(handleFeeService.calculate(shopD, 8000));