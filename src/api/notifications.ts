import request, {CookieJar} from "request";

export interface Notification {
    type: string;
    id: number;
    groupId: string;
    groupTitle: string;
    autoGrouping: boolean;
    message: string;
    title: string;
    content: string;
    trigger: string;
    url: string;
    icon: string;
    date: string;
}

export const getNotifications = async (baseUrl: string, session: CookieJar): Promise<Notification[] | undefined> => {
    return new Promise<Notification[]>((resolve, reject) => {
        try {
            request.get({
                timeout: 4000,
                url: baseUrl + '/iserv/user/api/notifications',
                jar: session
            }, (error, response, body) => {
                if (error) {
                    console.log(error);
                    reject(undefined);
                } else if (response.statusCode != 200) {
                    console.log('Request failed: ' + JSON.parse(body));
                    reject(undefined);
                } else {
                    const data = JSON.parse(body);
                    resolve(data.data.notifications || []);
                }
            });
        } catch (e) {
            reject(e);
        }
    });
};