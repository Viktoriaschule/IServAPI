import request, {CookieJar} from "request";

export const getSession = async (baseUrl: string, username: string, password: string): Promise<CookieJar> => {
    return new Promise((resolve, reject) => {
        const cookieJar = request.jar();
        try {
            request.get({
                timeout: 4000,
                url: baseUrl,
                jar: cookieJar
            }, () => {
                try {
                    request.post({
                        timeout: 4000,
                        url: baseUrl + '/iserv/app/login',
                        jar: cookieJar,
                        form: {
                            _username: username,
                            _password: password
                        }
                    }, (error, response, body) => {
                        if (error) {
                            console.log(error);
                            reject(cookieJar);
                        } else if (response.statusCode != 302) {
                            console.log('Request failed');
                            reject(cookieJar);
                        } else {
                            resolve(cookieJar);
                        }
                    });
                } catch (e) {
                    reject(e);
                }
            });
        } catch (e) {
            reject(e);
        }
    });
};