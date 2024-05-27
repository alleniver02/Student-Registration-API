const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

let students = [
    { id: 1, name: 'Allen Iver Gutierrez', age: 22, course: 'Computer Science' },
    { id: 2, name: 'Lance Buan', age: 21, course: 'Java Script' },
    { id: 3, name: 'Allen Sarmianto', age: 22, course: 'Python' }
];

app.get('/students', (req, res) => {
    res.json(students);
});

app.post('/students', (req, res) => {
    const student = req.body;
    students.push(student);
    res.status(201).send('Student added successfully');
});

app.put('/students/:id', (req, res) => {
    const { id } = req.params;
    const updatedStudent = req.body;
    let student = students.find(s => s.id === parseInt(id));
    if (student) {
        Object.assign(student, updatedStudent);
        res.send('Student updated successfully');
    } else {
        res.status(404).send('Student not found');
    }
});

app.delete('/students/:id', (req, res) => {
    const { id } = req.params;
    const studentIndex = students.findIndex(s => s.id === parseInt(id));
    if (studentIndex !== -1) {
        students.splice(studentIndex, 1);
        res.send('Student deleted successfully');
    } else {
        res.status(404).send('Student not found');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
