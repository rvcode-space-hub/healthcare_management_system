"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const config_module_1 = require("./congif/config.module");
const auth_module_1 = require("./auth/auth.module");
const doctors_module_1 = require("./doctors/doctors.module");
const patients_module_1 = require("./patients/patients.module");
const slots_module_1 = require("./slots/slots.module");
const appointments_module_1 = require("./appointments/appointments.module");
const mailer_1 = require("@nestjs-modules/mailer");
const mail_service_1 = require("./mail/mail.service");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'public'),
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                useFactory: config_module_1.default,
            }),
            mailer_1.MailerModule.forRoot({
                transport: {
                    host: 'smtp.gmail.com',
                    port: 465,
                    secure: true,
                    auth: {
                        user: process.env.EMAIL_USER,
                        pass: process.env.EMAIL_PASS,
                    },
                    tls: {
                        rejectUnauthorized: false,
                    },
                },
                defaults: {
                    from: process.env.MAIL_FROM || '"Schedula" <infowebservices2024@gmail.com>',
                },
            }),
            auth_module_1.AuthModule,
            doctors_module_1.DoctorsModule,
            patients_module_1.PatientsModule,
            slots_module_1.SlotsModule,
            appointments_module_1.AppointmentsModule,
        ],
        providers: [mail_service_1.MailService, app_service_1.AppService],
        exports: [mail_service_1.MailService],
        controllers: [app_controller_1.AppController],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map