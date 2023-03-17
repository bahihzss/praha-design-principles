class Person {
  constructor(private _name: string, private _startWorkingAt: Date) {}

  get name(): string {
    return this._name;
  }

  get startWorkingAt(): Date {
    return this._startWorkingAt;
  }

  changeName(name: string): Person {
    return new Person(name, this._startWorkingAt)
  }

  fixStartWorkingTime(startWorkingAt: Date) {
    return new Person(this._name, startWorkingAt)
  }
}

class Company {
  constructor(private _people: Person[]) {}

  get people(): Person[] {
    return [...this._people];
  }

  hire(person: Person): Company {
    return new Company([...this._people, person])
  }
}

const company = new Company([
  new Person('a', new Date('2021-01-01')),
  new Person('b', new Date('2021-01-01')),
]);

const firstPerson = company.people[0];
const fixedFirstPerson = firstPerson.fixStartWorkingTime(new Date('2021-01-03'));

console.log(firstPerson, fixedFirstPerson); // companyの中に含まれていたPerson Aの勤務開始日が変わらない！