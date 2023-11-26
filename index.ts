class School {
  // implement 'add area', 'remove area', 'add lecturer', and 'remove lecturer' methods

  _areas: Array<Area> = [];
  _lecturers: Lecturer[] = []; // Name, surname, position, company, experience, courses, contacts

  get areas(): Array<Area> {
    return this._areas;
  }

  get lecturers(): Lecturer[] {
    return this._lecturers;
  }

  addArea(area: Area): void {
    this._areas.push(area)
  }

  addLecturer(lecturer: Lecturer): void {
    this._lecturers.push(lecturer)
  }

  removeArea(area: Area): void {
    this._areas = this._areas.filter((ariaItem: Area) => ariaItem.name !== area.name)
  }

  removeLecturer(lecturer: Lecturer): void {
    this._lecturers = this._lecturers.filter((lecturerItem: Lecturer) => lecturerItem.email !== lecturer.email)
  }
}

class Lecturer {
  constructor(
    private name: string,
    private surname: string,
    private position: Position,
    private company: any,
    private experience: any,
    private courses: any,
    private _email: string,
    private contacts: any,
  ) {
  }

  get email(): string {
    return this._email;
  }
}

class Area {
  // implement getters for fields and 'add/remove level' methods
  _levels: Level[] = [];
  _name: string;

  constructor(name: string) {
    this._name = name;
  }

  get name(): string {
    return this._name;
  }

  get levels(): Level[] {
    return this._levels;
  }

  addLevel(level: Level): void {
    this._levels.push(level);
  }

  removeLevel(level: Level): void {
    this._levels = this._levels.filter((levelItem: Level) => levelItem.name !== level.name)
  }
}

class Level {
  _groups: Group[] = [];

  // implement getters for fields and 'add/remove group' methods

  constructor(private _name: string, private _description: string) {
  }

  get name(): string {
    return this._name;
  }

  get groups(): Group[] {
    return this._groups;
  }

  get description(): string {
    return this._description
  }

  addGroup(group: Group): void {
    this.groups.push(group);
  }

  removeGroup(group: Group): void {
    this._groups = this._groups.filter((groupItem: Group) => groupItem.groupName !== group.groupName)
  }
}

class Group {
  // implement getters for fields and 'add/remove student' and 'set status' methods

  _students: Student[] = [];

  constructor(
    private _groupName: string,
    private _area: Area,
    private _status: GroupStatus,
    private _level: Level
  ) {
  }

  get students(): Student[] {
    return this._students;
  }

  get groupName(): string {
    return this._groupName;
  }

  get area(): Area {
    return this._area;
  }

  get status(): GroupStatus {
    return this._status;
  }

  get level(): Level {
    return this._level;
  }

  addStudent(student: Student): void {
    this._students.push(student);
  }

  removeStudent(student: Student): void {
    this._students = this._students.filter((studentItem: Student) => studentItem.studentId !== student.studentId)
  }

  showPerformance(): Student[] {
    return this.students.sort(
      (a, b) => b.getPerformanceRating() - a.getPerformanceRating()
    );
  }
}

class Student {
  _grades: any = [];
  _visits: Visit[] = [];

  constructor(private _studentId: string, private firstName: string, private lastName: string, private birthYear: number) {
  }

  get studentId(): string {
    return this._studentId;
  }

  get fullName(): string {
    return `${this.lastName} ${this.firstName}`;
  }

  set fullName(value: string) {
    [this.lastName, this.firstName] = value.split(" ");
  }

  get age(): number {
    return new Date().getFullYear() - this.birthYear;
  }

  set visits(visit: Visit) {
    this._visits.push(visit)
  }

  set grades(grade: Grade) {
    this._grades.push(grade);
  }

  getPerformanceRating(): number {
    const gradeValues: number[] = Object.values(this._grades);

    if (!gradeValues.length) return 0;

    const averageGrade: number =
      gradeValues.reduce((sum: number, grade: number) => sum + grade, 0) / gradeValues.length;

    const attendancePercentage: number =
      (this._visits.filter((present: Visit) => present).length /
        this._visits.length) *
      100;

    return (averageGrade + attendancePercentage) / 2;
  }
}

enum GroupStatus {
  INACTIVE = 'active',
  ACTIVE = 'inactive'
}

enum Position {
  DIRECTOR = 'director',
  SALES_MANAGER = 'sales manager',
  DESIGNER = 'designer',
  DEVELOPER = 'developer'
}

enum Grade {
  A = 5,
  B = 4,
  C = 3,
  D = 2,
  E = 1
}

enum Visit {
  PRESENT = 'present',
  ABSENT = 'absent'
}
