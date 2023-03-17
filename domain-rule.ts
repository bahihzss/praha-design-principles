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

class PurchaseService {
  public constructor(private paymentRecordRepo: PaymentRecordRepo) {}

  public purchase(userId: string, productId: string) {
    const now = new Date();
    const oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
    const purchasesWithinOneYear = this.paymentRecordRepo.getPurchasesByProductAndPeriod(
      userId,
      productId,
      { start: oneYearAgo, end: now }
    );

    if (purchasesWithinOneYear.length > 0) {
      throw new Error("この商品はおひとりさま一品限定です！");
    }

    // 購入手続きに進む
  }
}
