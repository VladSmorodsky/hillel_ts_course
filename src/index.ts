const BadgeSize = {
  single: '4x3',
  double: '4x6'
}

const Print = {
  standart: 'color',
  fast: 'zpl'
}

enum BadgeTypesEnum {
  COLOR = 'color',
  MONO = 'mono'
}

type BadgeSizeType = keyof typeof BadgeSize;
type PrintType = keyof typeof Print;

type BadgeSizeAndPrintType = `${BadgeSizeType}_${PrintType}`;

class Student {
  badgeTypeMap: Map<BadgeSizeAndPrintType, BadgeTypesEnum> = new Map<BadgeSizeAndPrintType,  BadgeTypesEnum>([
    [`single_fast`, BadgeTypesEnum.COLOR],
    ['single_standart', BadgeTypesEnum.COLOR],
    ['double_fast', BadgeTypesEnum.MONO],
    ['double_standart', BadgeTypesEnum.MONO]
  ]);

  _firstName: string;
  _lastName:  string;
  _birthYear: number;
  _grades: Grade[] = []; // Опишите, как объект у которого есть поле workName и mark(оценка может быть выполненно или нет)
  _visits: Visit[] = []; // Опишите, как объект у которого есть поле lesson (любое имя) и present

  get fullName(): string {
    return `${this._lastName} ${this._firstName}`;
  }

  set fullName(value) {
    [this._lastName, this._firstName] = value.split(' ');
  }

  get age(): number {
    return new Date().getFullYear() - this._birthYear;
  }

  constructor(firstName, lastName, birthYear) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._birthYear = birthYear;
  }

  setGrade(grade: Grade): void {
    this._grades.push(grade);
  }

  setVisit(visit: Visit): void {
    this._visits.push(visit);
  }

  getPerformanceRating(): number {
    const gradeValues = Object.values(this._grades);

    if (!gradeValues.length) return 0;

    const averageGrade: number = gradeValues.reduce((sum, grade) => sum + grade.mark, 0) / gradeValues.length;
    const attendancePercentage: number = (this._visits.filter(present => present).length / this._visits.length) * 100;

    return (averageGrade + attendancePercentage) / 2;
  }
}

class Grade {
  constructor(private _workName: string, private _mark: MarkEnum) {}

  get workName(): string {
    return this._workName;
  }

  get mark(): MarkEnum {
    return this._mark;
  }
}

class Visit {
  constructor(private _lesson: string, private _present: VisitEnum) {}

  get lesson(): string {
    return this._lesson;
  }

  get present(): VisitEnum {
    return this._present;
  }
}

enum MarkEnum {
  DONE = 100,
  UNDONE = 0
}

enum VisitEnum {
  PRESENT = 'present',
  ABSENT = 'absent'
}
