"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmployee = exports.updateEmployee = exports.createEmployee = exports.getEmployeeById = exports.getEmployees = exports.loginEmployee = void 0;
const employeeService_1 = require("../services/employeeService");
const loginEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { full_name, password } = req.body;
    try {
        const token = yield employeeService_1.employeeService.login(full_name, password);
        if (!token) {
            res.status(401).json({ message: 'Invalid full name or password' });
        }
        else {
            res.status(200).json({ token });
        }
    }
    catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.loginEmployee = loginEmployee;
const getEmployees = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employee = yield employeeService_1.employeeService.getAllEmployee();
        if (employee) {
            res.status(201).json(employee);
        }
        else {
            res.status(404).json({ message: 'Sin registros' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getEmployees = getEmployees;
const getEmployeeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employee = yield employeeService_1.employeeService.getEmployeeById(parseInt(req.params.employee_id, 10));
        if (employee) {
            res.status(201).json(employee);
        }
        else {
            res.status(404).json({ message: 'No se encontró el empleado' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getEmployeeById = getEmployeeById;
const createEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newEmployee = yield employeeService_1.employeeService.addEmployee(req.body);
        if (newEmployee) {
            res.status(201).json(newEmployee);
        }
        else {
            res.status(404).json({ message: 'Algo salió mal' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.createEmployee = createEmployee;
const updateEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedEmployee = yield employeeService_1.employeeService.modifyEmployee(parseInt(req.params.employee_id, 10), req.body);
        if (updatedEmployee) {
            res.status(201).json(updatedEmployee);
        }
        else {
            res.status(404).json({ message: 'Algo salió mal' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.updateEmployee = updateEmployee;
const deleteEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield employeeService_1.employeeService.deleteEmployee(parseInt(req.params.employee_id, 10));
        if (deleted) {
            res.status(201).json({ message: 'Se eliminó el empleado.' });
        }
        else {
            res.status(404).json({ message: 'Algo salió mal' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deleteEmployee = deleteEmployee;
