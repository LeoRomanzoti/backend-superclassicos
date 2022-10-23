import { AxiosResponse } from "axios";

import SMS from "../http/SMS";

export default class SendSMS {
    constructor(readonly serviceClient: SMS) {}

    async execute(userId: string, userPhone: string): Promise<AxiosResponse> {
        const response = await this.serviceClient.send(userId, userPhone);
        return response;
    }
}
