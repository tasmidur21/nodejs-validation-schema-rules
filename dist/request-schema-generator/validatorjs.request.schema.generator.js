"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidatorJsRequestSchemaGenerator = void 0;
const fs = __importStar(require("fs"));
const Handlebars = __importStar(require("handlebars"));
const path = __importStar(require("path"));
const utils_1 = require("../utils/utils");
const CLASS_NAME_SUFFIX = `{{className}}RequestValidator`;
const basePath = `validators`;
const templateSource = fs.readFileSync(path.resolve(__dirname, '../templates/validatorjs.template.hbs'), 'utf8');
class ValidatorJsRequestSchemaGenerator {
    constructor(templateSetting) {
        var _a;
        this.templateSetting = templateSetting;
        this.storeDir = (_a = templateSetting === null || templateSetting === void 0 ? void 0 : templateSetting.stroreDir) !== null && _a !== void 0 ? _a : basePath;
        this.className = (0, utils_1.getClassName)({
            className: (0, utils_1.snakeToCamel)(this.templateSetting.fileName)
        }, CLASS_NAME_SUFFIX);
    }
    buildAndStore() {
        const template = Handlebars.compile(templateSource);
        const content = template({
            className: this.className,
            rules: this.templateSetting.rules
        });
        return (0, utils_1.storeFile)(content, this.className, this.storeDir);
    }
}
exports.ValidatorJsRequestSchemaGenerator = ValidatorJsRequestSchemaGenerator;