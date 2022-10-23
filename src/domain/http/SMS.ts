import { AxiosResponse } from "axios";

export default interface SMS {
    send(userId: string, userPhone: string): Promise<AxiosResponse>;
    validate(userId: string, code: string): Promise<AxiosResponse>;
}
