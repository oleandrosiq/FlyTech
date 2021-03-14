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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.router = void 0;
var express_1 = require("express");
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
var router = express_1.Router();
exports.router = router;
router.get('/', function (req, res) {
    return res.render('../public/views/home.html');
});
router.post('/create', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                data = req.body;
                if (!(!data.email || !data.pass || !data.name || !data.number || !data.image || !data.bio || !data.disp || !data.min_p || !data.max_p || !data.type)) return [3 /*break*/, 1];
                return [2 /*return*/, res.status(400).send({ error: "Usuário inválido!" })];
            case 1: return [4 /*yield*/, prisma.user.findMany({ where: { email: data.email } })];
            case 2:
                if (!((_a.sent()).length === 0)) return [3 /*break*/, 4];
                return [4 /*yield*/, prisma.user.create({
                        data: {
                            email: data.email,
                            pass: data.pass,
                            bio: data.bio,
                            name: data.name,
                            disp: data.disp,
                            image: data.image,
                            max_p: data.max_p,
                            min_p: data.min_p,
                            type: data.type,
                            number: data.number
                        }
                    }).then(function () {
                        return res.send({ message: "Usuário cadastrado com sucesso!" });
                    })];
            case 3:
                _a.sent();
                return [3 /*break*/, 5];
            case 4: return [2 /*return*/, res.status(400).send({ error: "Usuário já cadastrado" })];
            case 5: return [2 /*return*/];
        }
    });
}); });
router.post('/login', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                data = req.body;
                if (!(!data.email || !data.pass)) return [3 /*break*/, 1];
                return [2 /*return*/, res.status(400).send({ error: "Email e/ou senha não informados!" })];
            case 1: return [4 /*yield*/, prisma.user.findMany({ where: { email: data.email } })];
            case 2:
                if (!((_a.sent()).length === 0)) return [3 /*break*/, 3];
                return [2 /*return*/, res.status(400).send({ error: "Usuário não encontrado!" })];
            case 3: return [4 /*yield*/, prisma.user.findFirst({ where: { email: data.email, pass: data.pass } })];
            case 4:
                if (!_a.sent()) return [3 /*break*/, 6];
                return [4 /*yield*/, prisma.user.findFirst({ where: { email: data.email, pass: data.pass } })];
            case 5:
                user = _a.sent();
                return [2 /*return*/, res.send({ message: "Login feito com sucesso!", user: user })];
            case 6: return [2 /*return*/, res.status(400).send({ error: "Senha incorreta!" })];
        }
    });
}); });
router.post('/update', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, user, newUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                data = req.body;
                if (!(!data.email || !data.pass)) return [3 /*break*/, 1];
                return [2 /*return*/, res.status(400).send({ error: "Impossível fazer alterações" })];
            case 1: return [4 /*yield*/, prisma.user.findFirst({ where: { email: data.email, pass: data.pass } })];
            case 2:
                user = _a.sent();
                if (!user) return [3 /*break*/, 4];
                newUser = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    pass: user.pass,
                    number: user.number,
                    image: user.image,
                    bio: user.bio,
                    disp: user.disp,
                    min_p: user.min_p,
                    max_p: user.max_p,
                    type: user.type,
                    created: user.created
                };
                if (data.number) {
                    newUser.number = data.number;
                }
                if (data.image) {
                    newUser.image = data.image;
                }
                if (data.bio) {
                    newUser.bio = data.bio;
                }
                if (data.disp) {
                    newUser.disp = data.disp;
                }
                if (data.min_p) {
                    newUser.min_p = data.min_p;
                }
                if (data.max_p) {
                    newUser.max_p = data.max_p;
                }
                if (data.type) {
                    newUser.type = data.type;
                }
                return [4 /*yield*/, prisma.user.update({
                        where: {
                            email: user.email
                        },
                        data: {
                            id: newUser.id,
                            name: newUser.name,
                            email: newUser.email,
                            pass: newUser.pass,
                            number: newUser.number,
                            image: newUser.image,
                            bio: newUser.bio,
                            disp: newUser.disp,
                            min_p: newUser.min_p,
                            max_p: newUser.max_p,
                            type: newUser.type
                        }
                    })];
            case 3:
                _a.sent();
                return [2 /*return*/, res.send({ message: "Usuário alterado com sucesso!" })];
            case 4: return [2 /*return*/, res.status(400).send({ error: "Usuário não encontrado!" })];
        }
    });
}); });
router.get('/users', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.user.findMany()];
            case 1:
                users = _a.sent();
                for (user in users) {
                    users[user].pass = "";
                    users[user].id = 0;
                    users[user].email = "";
                }
                return [2 /*return*/, res.send(users)];
        }
    });
}); });
