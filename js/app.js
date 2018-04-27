/* STUDENTS IGNORE THIS FUNCTION
 * All this does is create an initial
 * attendance record if one is not found
 * within localStorage.
 */
((() => {
    if (!localStorage.attendance) {
        console.log('Creating attendance records...');
        function getRandom() {
            return (Math.random() >= 0.5);
        }

        const nameColumns = $('tbody .name-col');
        const attendance = {};

        nameColumns.each(function() {
            const name = this.innerText;
            attendance[name] = [];

            for (let i = 0; i <= 11; i++) {
                attendance[name].push(getRandom());
            }
        });

        localStorage.attendance = JSON.stringify(attendance);
    }
})());

/* STUDENT APPLICATION */

/* Model */

const model = {
    students: [
        { name: 'Slappy the Frog', attendance: [true, true, false, false, false, false, false, false, false, false, false, false]},
        { name: 'Lilly the Lizard', attendance: [false, true, false, false, false, false, false, false, false, false, false, false]},
        { name: 'Paulrus the Walrus', attendance: [true, true, false, false, false, false, false, false, false, false, false, false]},
        { name: 'Gregory the Goat', attendance: [true, true, false, false, false, false, false, false, false, false, false, false]},
        { name: 'Adam the Anaconda', attendance: [false, true, false, false, false, true, false, false, false, false, false, true]}
    ]
};


/* View */

const studentsDom = {
    init: function() {
        this.tbody = document.querySelector('tbody');
        this.renderHTML();
    },

    renderHTML: function() {

        this.tbody.innerHTML = octopus.getStudents().map((student, index) =>

            `<tr id="student${index}">
            <td class="name-col">${student['name']}</td>` +

            student.attendance.map((present, i) => {
                let checked = present ? 'checked' : '';
                return `<td class="attend-col"><input data-day="${i}" type="checkbox" ${checked}></td>`;
            }).join('\n')

            + `<td class="missed-col">` +

            student.attendance.filter(item => item === false).length

            + `</td>
            </tr>`).join('');

    },

};

/* Controller */

const octopus = {
    init: function() {
        studentsDom.init();
    },

    getStudents: function() {
        return model.students;
    }
};

octopus.init();