enum Channel {
  AMAZON = 'Amazon',
  RAKUTEN = 'Rakuten',
  YAHOO = 'Yahoo',
  SHOPIFY = 'Shopify',
}

class IShop {
  channel: Channel;
  calcHandle: (sales: number) => number;
}

class Amazon implements IShop {
  private HANDLE_RATE = 0.08;
  channel = Channel.AMAZON;

  calcHandle(sales: number) {
    return sales * this.HANDLE_RATE;
  }
}

class Rakuten implements IShop {
  private HANDLE_RATE = 0.07;
  channel = Channel.RAKUTEN;

  calcHandle(sales: number) {
    return sales * this.HANDLE_RATE;
  }
}

class Yahoo implements IShop {
  private HANDLE_RATE = 0.05;
  channel = Channel.YAHOO;

  calcHandle(sales: number) {
    return sales * this.HANDLE_RATE;
  }
}

class Shopify implements IShop {
  private HANDLE_RATE = 0.03;
  channel = Channel.SHOPIFY;

  calcHandle(sales: number) {
    return sales * this.HANDLE_RATE;
  }
}

class HandleFeeService {
  constructor(private shop: IShop) {
  }

  calculate(sales: number) {
    return this.shop.calcHandle(sales);
  }
}

const shopA = new Amazon();
const shopB = new Rakuten();
const shopC = new Yahoo();
const shopD = new Shopify();


const shopAHandleFeeService = new HandleFeeService(shopA);
console.log(shopAHandleFeeService.calculate(5000));

const shopBHandleFeeService = new HandleFeeService(shopB);
console.log(shopBHandleFeeService.calculate(6000));