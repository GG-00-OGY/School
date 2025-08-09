const validator = require('fastest-validator');

const v = new validator();

const schema = {
    first_name: {
        type: "string",
        empty: false,
        optional: false,
        min: 3,
        max: 20
    },
    last_name: {
        type: "string",
        empty: false,
        optional: false,
        min: 3,
        max: 20
    },
    elementary_school_name: {
        type: "string",
        empty: false,
        optional: false,
        min: 2,
        max: 30
    },
    sixth_grade_teacher_name: {
        type: "string",
        empty: false,
        optional: false,
        min: 3,
        max: 30
    },
    father_phone: {
        type: "string",
        empty: false,
        optional: false,
        min: 11,
        max: 11,
        pattern: /^09\d{9}$/

    },
    mother_phone: {
        type: "string",
        empty: false,
        optional: false,
        min: 11,
        max: 11,
        pattern: /^09\d{9}$/
    },
    home_phone: {
        type: "string",
        empty: false,
        optional: false,
        min: 8,
        max: 8,
        pattern: /^\d{8}$/

    },
    notes: {
        type: "string",
        optional: false
    },
    $$strict: true

}

const check = v.compile(schema);

module.exports = check;