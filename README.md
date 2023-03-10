# 課題１
## SOLID 原則の各要素

SOLID 原則とは、オブジェクト指向でプログラミングを行う場合に守ると良いとされている５つの原則です。

### Single Responsibility - 単一責任の原則

まずは、単一責任の原則。
オブジェクト指向の言語では、意味的に関係の深い変数と関数をまとめて記述できるクラスという機能があります。

単一責任の原則では、ひとつのクラスが複数の責任を持たないようにすることを推奨しています。

よくある例として、業務システムにおいて管理者と利用者がいる場合を考えます。
単一責任原則で考えると、同じ User クラスで扱うのではなく AdminUser と User に分けた方がいいということになります。

こうすることで、利用者に対する変更は管理者には影響しなくなるので、  
知らないうちに利用者が管理者の機能を一部使えるようになってしまっていた。。。  
なんて悲劇を防げます。

### Open-Closed - オープン・クローズドの原則

既に書いたコードを変更せずに、新しくコードを書き足すだけでソフトウェアを拡張できるようにするべきという原則。  
ex) open-closed.ts

### Liskov Substitution - リスコフの置換原則

親クラスやインターフェースにあるメソッドは、継承されるクラスですべて実装しようという原則です。

```typescript
interface Player {
  play(): void
}

class BasicPlayer implements Player {
  play() {
    console.log("Playing...");
  }
}

class HlsPlayer implements Player {
  play() {
    console.log("Playing HLS...");
  }
}

class DashPlayer implements Player {
  // LSP違反
  play() {
    throw new Error("Dash is not supported.");
  }
}

const player: Player = new DashPlayer();
player.play(); // Error: Dash is not supported.
```

上記の例はリスコフの置換原則に違反している例で、こうなってしまうと安心して Player インターフェースを使えません。

### Interface Segregation - インターフェース分離の原則

インターフェイス分離の原則とは、インターフェイスとクライアント（インターフェイスの利用者）がいるときに、インターフェイスに用意されてある不必要なメソッドやプロパティ（利用するクライアントにとって不必要）にクライアントが依存しなくてもよいように、分割できるインターフェイスは分割するべきであるという原則です。

```typescript
interface Breathable {
  breathe(): void;
}

interface Eatable {
  eat(): void;
}

interface Runnable {
  run(): void;
}

interface Speakable {
  speak(): void;
}

interface Swimmable {
  swim(): void;
}

class Human implements Breathable, Eatable, Runnable, Speakable, Swimmable {
  breathe() {
    console.log("I am breathing");
  }

  eat() {
    console.log("I am eating");
  }

  run() {
    console.log("I am running");
  }

  speak() {
    console.log("I am speaking");
  }

  swim() {
    console.log("I am swimming");
  }
}

class Fish implements Breathable, Eatable, Swimmable {
  breathe() {
    console.log("I am breathing underwater");
  }

  eat() {
    console.log("I am eating");
  }

  swim() {
    console.log("I am swimming");
  }
}

class EatBreakfastService {
  constructor(private members: Eatable[]) {
  }

  start() {
    this.members.forEach((member) => {
      member.eat()
    })
  }
}

const eatBreakfastService = new EatBreakfastService([new Human(), new Fish()])
eatBreakfastService.start()
```

朝食にとって必要なのは食べる能力を持った生物であることのみです。
インターフェースを分離することによって、クライアント側である EatBreakfastService は食卓を囲むメンバーが食べる能力をもつという情報以外を持たないので朝食中に泳ぎ出すといったことを防げます。

### Dependency Inversion - 依存性逆転の原則

実際のモジュールではなく抽象化されたインターフェースに依存させようという原則。
これによって同じインターフェースを満たすモジュールであれば代替できるようになり、テストダブルへの置き換えが簡単になります。

メソッド内で new したものを使用している場合などがこの原則を適用するポイントになります。

## デメテルの法則

「オブジェクトのメンバのメンバを直接参照しない」ことでクライアント側が必要以上の情報を知らないでいいようにすること。

そもそも、どうしてもネストしたデータを取らないといけない構造になったいる場合は設計から見直す必要がある場合もある。

ネストしたメンバを呼び出すと、その構造に依存してしまうので密結合になる。
デメテルの法則を守ることで疎結合な状態を保てる。

### 例の新人のコードに保守性に対して効果がない理由

getter, setter を用いれば「オブジェクトのメンバのメンバを直接参照しない」は守れるが、
Tell, Don't Ask を用いてモジュール側にロジックを持たせないと同じロジックがいろんなところに重複するため。