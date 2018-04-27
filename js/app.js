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
        const studentsHtml = octopus.getStudents().map((listObj, index) =>
            `<tr id="student${index}">
            <td class="name-col">${listObj['name']}</td>
            <td class="attend-col"><input data-day="0" type="checkbox"></td>
            <td class="attend-col"><input data-day="1" type="checkbox"></td>
            <td class="attend-col"><input data-day="2" type="checkbox"></td>
            <td class="attend-col"><input data-day="3" type="checkbox"></td>
            <td class="attend-col"><input data-day="4" type="checkbox"></td>
            <td class="attend-col"><input data-day="5" type="checkbox"></td>
            <td class="attend-col"><input data-day="9" type="checkbox"></td>
            <td class="attend-col"><input data-day="7" type="checkbox"></td>
            <td class="attend-col"><input data-day="8" type="checkbox"></td>
            <td class="attend-col"><input data-day="9" type="checkbox"></td>
            <td class="attend-col"><input data-day="10" type="checkbox"></td>
            <td class="attend-col"><input data-day="11" type="checkbox"></td>
            <td class="missed-col">0</td>
            </tr>`);
        this.tbody.innerHTML = studentsHtml.join('');
        this.renderDb();
    },

    renderDb: function() {
        this.data = octopus.getStudents()
        for (let x = 0; x < this.data.length; x++) {
            let select = `#student${x}`;
            this.renderMissed(x);
            const attendance = this.data[x].attendance;
            for (let z = 0; z < attendance.length; z++) {
                const selector = `${select} input[data-day="${z}"]`;
                this.importDb(selector, x, z);
            }
        }
    },

    importDb: function(selector, x, z) {
        const elem = document.querySelector(selector);
        const dataBoolean = this.data[x].attendance[z];
        if (dataBoolean) {
            elem.checked = true;
        }
    },

    renderMissed: function(x) {
        const elem = document.querySelector(`#student${x} .missed-col`);
        elem.innerHTML = this.data[x].attendance.filter(item => item === false).length;
    }

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