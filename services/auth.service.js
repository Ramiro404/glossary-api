const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const { config } = require('../config/config');
const UserService = require('./user.service');
const service = new UserService();

class AuthService {
    async getUser(email, password) {
        const user = await service.findByEmail(email);
        if (!user) {
            throw boom.unauthorized('You are not allowed');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw boom.unauthorized('You are not allowed');
        }
        delete user.dataValues.password;
        delete user.dataValues.recoveryToken;
        return user;
    }

    signToken(user) {
        const payload = {
            sub: user.id,
            role: user.role
        };
        const jwtConfig = {
            expiresIn: "3d"
        }
        const token = jwt.sign(payload, config.jwtSecret, jwtConfig);
        return {
            user,
            token
        }
    }

    async changePassword(token, newPassword){
        try {
            const payload = await jwt.verify(token, config.recoveryKey);
            const user = await service.findOne(payload.sub);
            if(user.recoveryToken !== token){
                throw boom.unauthorized();
            }

            const hash = await bcrypt.hash(newPassword, 10);
            await service.update(user.id, {recoveryToken: null, password: hash});
            return { message: 'Password changed'};
        } catch (error) {
            throw boom.unauthorized();
        }
    }

    async sendRecovery(email) {
        const user = await service.findByEmail(email);
        if (!user) {
            throw boom.unauthorized();
        }

        const payload = { sub: user.id };
        const token = jwt.sign(payload, config.recoveryKey, { expiresIn: '15min' });
        const link = `https://localhost:4200/auth/recovery-password?token=${token}`;
        await service.update(user.id, { recoveryToken: token });
        const mail =
        {
            from: `"Recuperar contraseña" <${config.googleMail}>`, // sender address
            to: `${email}`, // list of receivers
            subject: "Cambio de contraseña", // Subject line
            text: "Entra al siguiente enlace para cambiar su contraseña", // plain text body
            html: `<h2>Recibio este correo por el motivo de cambio de contraseña</h2>
                    Ingrese a este link para recuperar tu contraseña ${link}`, // html body
        }
        const rta = await this.sendMail(mail);
        return rta;
    }

    async sendMail(infoMail) {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: config.gmailMail, // generated ethereal user
                pass: config.gmailPassword, // generated ethereal password
            },
        });
        await transporter.sendMail(infoMail);
        return { message: 'Email sent' }
    }
}

module.exports = AuthService;