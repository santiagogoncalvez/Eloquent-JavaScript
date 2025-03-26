// Módulos commonsJs

const ordinal = require("./Packages/node_modules/ordinal");

const { days, months } = require("./Packages/node_modules/date-names");

exports.formatDate = function (date, format) {
    return format.replace(/YYYY|M(MMM)?|Do?|dddd/g, tag => {
        if (tag == "YYYY") return date.getFullYear();
        if (tag == "M") return date.getMonth();
        if (tag == "MMMM") return months[date.getMonth()];
        if (tag == "D") return date.getDate();
        if (tag == "Do") return ordinal(date.getDate());
        if (tag == "dddd") return days[date.getDay()];

    });
};

console.log(exports.formatDate(new Date(2017, 9, 13), "dddd the Do"))
