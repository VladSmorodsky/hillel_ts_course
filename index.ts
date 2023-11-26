class School {
  directions: Direction[] = [];

  addDirection(direction: Direction): void {
    this.directions.push(direction);
  }
}

class Direction {
  levels: Level[] = [];

  constructor(private _name: string) {}

  get name(): string {
    return this._name;
  }

  addLevel(level: Level): void {
    this.levels.push(level);
  }
}

class Level {
  groups: Group[] = [];

  constructor(private _name: string, private _program: unknown) {}

  get name(): string {
    return this._name;
  }

  get program(): unknown {
    return this._program;
  }

  addGroup(group): void {
    this.groups.push(group);
  }
}

class Group {
  _students: Student[] = [];

  get students(): Student[] {
    return this._students;
  }

  constructor(private direction: Direction, private level: Level) {}

  addStudent(student: Student): void {
    this._students.push(student);
  }

  showPerformance(): Student[] {
    return this.students.sort(
      (a, b) => b.getPerformanceRating() - a.getPerformanceRating()
    );
  }
}

class Student {
  grades: any = {};
  attendance: any[] = [];

  constructor(private firstName: string, private lastName: string, private birthYear: number) {}

  get fullName(): string {
    return `${this.lastName} ${this.firstName}`;
  }

  set fullName(value: string) {
    [this.lastName, this.firstName] = value.split(" ");
  }

  get age(): number {
    return new Date().getFullYear() - this.birthYear;
  }

  setGrade(subject: any, grade: number): void {
    this.grades[subject] = grade;
  }

  markAttendance(present: any): void {
    this.attendance.push(present);
  }

  getPerformanceRating(): number {
    const gradeValues: number[] = Object.values(this.grades);

    if (gradeValues.length === 0) return 0;

    const averageGrade: number =
      gradeValues.reduce((sum: number, grade: number) => sum + grade, 0) / gradeValues.length;

    const attendancePercentage: number =
      (this.attendance.filter((present) => present).length /
        this.attendance.length) *
      100;

    return (averageGrade + attendancePercentage) / 2;
  }
}
