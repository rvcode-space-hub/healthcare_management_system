"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
let AppService = class AppService {
    getHello() {
        return `
    <html>
      <head>
        <title>Healthcare APIs</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <style>
          body {
            font-family: "Segoe UI", Arial, sans-serif;
            background: #f1f5f9;
            margin: 0;
          }

          .header {
            background: white;
            padding: 18px 30px;
            box-shadow: 0 3px 10px rgba(0,0,0,0.08);
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 14px;
            position: sticky;
            top: 0;
            z-index: 100;
          }

          .logo {
            width: 75px;
            height: 75px;
            border-radius:50%;
            object-fit: contain;
          }

          .title-text {
            font-size: 30px;
            font-weight: 700;
            color: #0747dc;
          }

          .container {
            max-width: 900px;
            margin: auto;
            padding: 30px 20px;
          }

          h2 {
            color: #334155;
            margin-top: 40px;
            border-left: 5px solid #3b82f6;
            padding-left: 12px;
          }

          .api {
            background: white;
            padding: 16px 20px;
            margin-top: 12px;
            border-radius: 12px;
            box-shadow: 0 6px 14px rgba(0,0,0,0.06);
            display: flex;
            justify-content: space-between;
            align-items: center;
            transition: 0.18s ease;
          }

          .api:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.12);
          }

          .method {
            font-weight: bold;
            padding: 6px 12px;
            border-radius: 6px;
            color: white;
            font-size: 13px;
            letter-spacing: .5px;
          }

          .GET { background: #22c55e; }
          .POST { background: #3b82f6; }
          .PATCH { background: #f59e0b; }

          .path {
            font-family: monospace;
            color: #0f172a;
            font-size: 14px;
            word-break: break-all;
          }

          /* Mobile */
          @media(max-width:600px){
            .api{
              flex-direction: column;
              align-items: flex-start;
              gap:6px;
            }

            .title-text{
              font-size:20px;
            }

            .logo{
              width:42px;
              height:42px;
            }
          }
        </style>
      </head>

      <body>

        <div class="header">
          <img src="/logo.jpg" class="logo"/>
          <div class="title-text">Healthcare Management System</div>
        </div>

        <div class="container">

          <h2>Authentication</h2>
          ${this.row('POST', '/auth/login')}
          ${this.row('POST', '/auth/register/doctor')}
          ${this.row('POST', '/auth/register/patient')}
          ${this.row('POST', '/auth/patient/logout')}
          ${this.row('POST', '/auth/doctor/logout')}
          ${this.row('GET', '/auth/patient')}
          ${this.row('GET', '/auth/patient/profile')}
          ${this.row('GET', '/auth/doctor/profile')}

          <h2>Doctors</h2>
          ${this.row('GET', '/doctors')}
          ${this.row('PATCH', '/doctors/:id')}

          <h2>Patients</h2>
          ${this.row('GET', '/patients')}
          ${this.row('GET', '/patients/:id')}
          ${this.row('PATCH', '/patients/:id')}

          <h2>Slots</h2>
          ${this.row('POST', '/slots')}
          ${this.row('GET', '/slots')}
          ${this.row('GET', '/slots/doctor/:id')}
          ${this.row('PATCH', '/slots/:id')}
          ${this.row('PATCH', '/slots/:id/unavailable')}

          <h2>Appointments</h2>
          ${this.row('POST', '/appointments/book')}
          ${this.row('GET', '/appointments')}
          ${this.row('GET', '/appointments/patient/:id')}
          ${this.row('PATCH', '/appointments/cancel/:id')}
          ${this.row('PATCH', '/appointments/reschedule')}
          ${this.row('PATCH', '/appointments/:id/attend')}

        </div>
      </body>
    </html>
    `;
    }
    row(method, path) {
        return `
      <div class="api">
        <span class="method ${method}">${method}</span>
        <span class="path">${path}</span>
      </div>
    `;
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
//# sourceMappingURL=app.service.js.map