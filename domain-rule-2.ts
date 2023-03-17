interface Purchase {
  userId: string;
  productId: string;
  transaction: {
    succeeded: true;
    completedAt: Date;
  };
}

interface PaymentRecordRepo {
  getPurchasesBy: (userId: string) => Purchase[];
  getPurchasesByProductAndPeriod: (
    userId: string,
    productId: string,
    period: { start: Date; end: Date }
  ) => Purchase[];
}

interface Purchaser {
  purchase(productId: string): void
}

class User implements Purchaser {
  private purchaseLimitDuration = 365 * 24 * 60 * 60 * 1000

  public constructor(private userId: string, private paymentRecordRepo: PaymentRecordRepo) {}

  purchase(productId: string) {
    const now = new Date();
    const limitDurationStart = new Date(now.getTime() - this.purchaseLimitDuration);

    const purchasesWithinLimitDuration = this.paymentRecordRepo.getPurchasesByProductAndPeriod(
      this.userId,
      productId,
      { start: limitDurationStart, end: now }
    );

    if (purchasesWithinLimitDuration.length > 0) {
      throw new Error("この商品はおひとりさま一品限定です！");
    }

    // 購入手続きに進む
  }
}

class PremiumUser implements Purchaser {
  purchase(productId: string) {

  }
}


// アプリケーション層
class PurchaseService {
  public purchase(purchaser: Purchaser, productId: string) {
    purchaser.purchase(productId)
  }
}
