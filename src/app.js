const express = require('express');
const bodyParser = require('body-parser');
const employeeController = require('./controllers/employeeController');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Routes
app.get('/employees', employeeController.getAllEmployees);
app.get('/employees/:id', employeeController.getEmployeeById);
app.post('/employees', employeeController.createEmployee);
app.put('/employees/:id', employeeController.updateEmployee);
app.delete('/employees/:id', employeeController.deleteEmployee);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
