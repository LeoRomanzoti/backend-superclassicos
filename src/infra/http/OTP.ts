import { Axios } from "axios";

import SMS from "../../domain/http/SMS";

export default class OTP implements SMS {
    url: string;
    timeout: object;
    constructor(readonly connectionService: Axios) {
        this.url = process.env.OTP_URL || "";
        this.timeout = { timeout: 5000 };
    }

    async send(userId: string, userPhone: string): Promise<any> {
        const payload = {
            user_id: userId,
            user_phone: userPhone,
        };
        const response = await this.connectionService.post(
            `${this.url}/codes`,
            payload,
            this.timeout
        );
        return response;
    }

    async validate(userId: string, code: string): Promise<any> {
        const payload = {
            code,
        };
        const response = await this.connectionService.post(
            `${this.url}/codes/${userId}/validations`,
            payload,
            this.timeout
        );
        return response;
    }
}
