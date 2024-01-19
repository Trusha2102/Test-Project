const Joi = require('joi');
const Employee = require('../models/employees');

const employeeController = {
    // Get all employees
    getAllEmployees: async (req, res) => {
        try {
            const employees = await Employee.findAll();
            res.json(employees);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Get employee by ID
    getEmployeeById: async (req, res) => {
        const { id } = req.params;
        try {
            const employee = await Employee.findByPk(id);
            if (employee) {
                res.json(employee);
            } else {
                res.status(404).json({ error: 'Employee not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Create a new employee
    createEmployee: async (req, res) => {
        try {
            // Joi Validation is used here
            const schema = Joi.object({
                name: Joi.string()
                    .regex(/^[a-zA-Z]+(?: [a-zA-Z'\-]+)*$/)
                    .error((errors) => {
                        errors.forEach((err) => {
                            switch (err.type) {
                                case 'string.pattern.base':
                                    err.message = 'Name must contain only letters, spaces, hyphens, and apostrophes';
                                    break;
                            }
                        });
                        return errors;
                    }),
                date_of_birth: Joi.date().iso().required().error(() => new Error('Invalid date_of_birth format')),
                age: Joi.number().integer().required().error(() => new Error('Age must be an integer')),
                salary: Joi.number().required().error(() => new Error('Salary must be a number')),
            });

            const { error } = schema.validate(req.body);
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }

            // If validation passes, create employee
            const employee = await Employee.create(req.body);
            res.json(employee);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Update an existing employee
    updateEmployee: async (req, res) => {
        const { id } = req.params;
        try {
            // Joi Validation is used here
            const schema = Joi.object({
                name: Joi.string()
                    .regex(/^[a-zA-Z]+(?: [a-zA-Z'\-]+)*$/)
                    .error((errors) => {
                        errors.forEach((err) => {
                            switch (err.type) {
                                case 'string.pattern.base':
                                    err.message = 'Name must contain only letters, spaces, hyphens, and apostrophes';
                                    break;
                            }
                        });
                        return errors;
                    }),
                date_of_birth: Joi.date().iso().required().error(() => new Error('Invalid date_of_birth format')),
                age: Joi.number().integer().required().error(() => new Error('Age must be an integer')),
                salary: Joi.number().required().error(() => new Error('Salary must be a number')),
            });

            const { error } = schema.validate(req.body);
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }

            // If validation passes, update employee
            const [updated] = await Employee.update(req.body, {
                where: { id: id },
            });
            if (updated) {
                const updatedEmployee = await Employee.findByPk(id);
                res.json(updatedEmployee);
            } else {
                res.status(404).json({ error: 'Employee not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Delete an employee by ID
    deleteEmployee: async (req, res) => {
        const { id } = req.params;
        try {
            const deleted = await Employee.destroy({
                where: { id: id },
            });
            if (deleted) {
                res.json({ message: 'Employee deleted successfully' });
            } else {
                res.status(404).json({ error: 'Employee not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

module.exports = employeeController;
