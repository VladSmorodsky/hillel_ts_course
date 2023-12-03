var BadgeSize = {
    single: '4x3',
    double: '4x6'
};
var Print = {
    standart: 'color',
    fast: 'zpl'
};
var BadgeTypesEnum;
(function (BadgeTypesEnum) {
    BadgeTypesEnum["COLOR"] = "color";
    BadgeTypesEnum["MONO"] = "mono";
})(BadgeTypesEnum || (BadgeTypesEnum = {}));
var Student = /** @class */ (function () {
    function Student(firstName, lastName, birthYear) {
        this.badgeTypeMap = new Map([
            ["single_fast", BadgeTypesEnum.COLOR],
            ['single_standart', BadgeTypesEnum.COLOR],
            ['double_fast', BadgeTypesEnum.MONO],
            ['double_standart', BadgeTypesEnum.MONO]
        ]);
        this._grades = []; // Опишите, как объект у которого есть поле workName и mark(оценка может быть выполненно или нет)
        this._visits = []; // Опишите, как объект у которого есть поле lesson (любое имя) и present
        this._firstName = firstName;
        this._lastName = lastName;
        this._birthYear = birthYear;
    }
    Object.defineProperty(Student.prototype, "fullName", {
        get: function () {
            return "".concat(this._lastName, " ").concat(this._firstName);
        },
        set: function (value) {
            var _a;
            _a = value.split(' '), this._lastName = _a[0], this._firstName = _a[1];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Student.prototype, "age", {
        get: function () {
            return new Date().getFullYear() - this._birthYear;
        },
        enumerable: false,
        configurable: true
    });
    Student.prototype.setGrade = function (grade) {
        this._grades.push(grade);
    };
    Student.prototype.setVisit = function (visit) {
        this._grades.push(visit);
    };
    Student.prototype.getPerformanceRating = function () {
        var gradeValues = Object.values(this._grades);
        if (!gradeValues.length)
            return 0;
        var averageGrade = gradeValues.reduce(function (sum, grade) { return sum + grade.mark; }, 0) / gradeValues.length;
        var attendancePercentage = (this._visits.filter(function (present) { return present; }).length / this._visits.length) * 100;
        return (averageGrade + attendancePercentage) / 2;
    };
    return Student;
}());
var Grade = /** @class */ (function () {
    function Grade(_workName, _mark) {
        this._workName = _workName;
        this._mark = _mark;
    }
    Object.defineProperty(Grade.prototype, "workName", {
        get: function () {
            return this._workName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Grade.prototype, "mark", {
        get: function () {
            return this._mark;
        },
        enumerable: false,
        configurable: true
    });
    return Grade;
}());
var Visit = /** @class */ (function () {
    function Visit(_lesson, _present) {
        this._lesson = _lesson;
        this._present = _present;
    }
    Object.defineProperty(Visit.prototype, "lesson", {
        get: function () {
            return this._lesson;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Visit.prototype, "present", {
        get: function () {
            return this._present;
        },
        enumerable: false,
        configurable: true
    });
    return Visit;
}());
var MarkEnum;
(function (MarkEnum) {
    MarkEnum[MarkEnum["DONE"] = 100] = "DONE";
    MarkEnum[MarkEnum["UNDONE"] = 0] = "UNDONE";
})(MarkEnum || (MarkEnum = {}));
var VisitEnum;
(function (VisitEnum) {
    VisitEnum["PRESENT"] = "present";
    VisitEnum["ABSENT"] = "absent";
})(VisitEnum || (VisitEnum = {}));
