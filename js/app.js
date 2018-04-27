/* Model */

const model = {
    students: [
        { name: 'Slappy the Frog', attendance: [false, false, false, false, false, false, false, false, false, false, false, false]},
        { name: 'Lilly the Lizard', attendance: [false, false, false, false, false, false, false, false, false, false, false, false]},
        { name: 'Paulrus the Walrus', attendance: [false, false, false, false, false, false, false, false, false, false, false, false]},
        { name: 'Gregory the Goat', attendance: [false, false, false, false, false, false, false, false, false, false, false, false]},
        { name: 'Adam the Anaconda', attendance: [false, false, false, false, false, false, false, false, false, false, false, false]}
    ]
};

/* View */

const studentsDom = {

    init: function() {
        const tbody = document.querySelector('tbody');
        tbody.innerHTML = octopus.getStudents().map((student, index) =>

            `<tr id="student${index}">
            <td class="name-col">${student['name']}</td>` +

            student.attendance.map((present, i) => {
                let checked = present ? 'checked' : '';
                return `<td class="attend-col"><input data-student="${index}" data-day="${i}" type="checkbox" ${checked} onclick="octopus.updateModel(this.dataset.student,this.dataset.day);"></td>`;
            }).join('\n')

            + `<td class="missed-col">` +

            octopus.countMissed(index)

            + `</td>
            </tr>`).join('');
    }

};

/* Controller */

const octopus = {
    init: function(model) {
        this.model = localStorage.attendance ? JSON.parse(localStorage.attendance) : model;
        studentsDom.init();
    },

    getStudents: function() {
        return this.model.students;
    },

    countMissed: function(i) {
        return this.model.students[i].attendance.filter(item => item === false).length;
    },

    updateModel: function(student, day) {
        this.model.students[student].attendance[day] = !this.model.students[student].attendance[day];
        const missedTd = document.querySelector(`#student${student} .missed-col`);
        missedTd.innerHTML = this.countMissed(student);
        this.saveLocally(this.model);
    },

    saveLocally: function(data) {
        localStorage.setItem('attendance', JSON.stringify(data));
    }

};

octopus.init(model);