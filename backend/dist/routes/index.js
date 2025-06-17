"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("./auth"));
const properties_1 = __importDefault(require("./properties"));
const tenants_1 = __importDefault(require("./tenants"));
const maintenance_1 = __importDefault(require("./maintenance"));
const users_1 = __importDefault(require("./users"));
const router = (0, express_1.Router)();
// Mount routes
router.use('/auth', auth_1.default);
router.use('/properties', properties_1.default);
router.use('/tenants', tenants_1.default);
router.use('/maintenance', maintenance_1.default);
router.use('/users', users_1.default);
exports.default = router;
