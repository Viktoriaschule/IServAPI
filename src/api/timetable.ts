import request, {CookieJar} from "request";

export interface Timetable {
    /** Format unknown yet */
    lastUpdated: string | undefined;
    /** Format unknown yet */
    timetable: any[];
    /** Format unknown yet */
    orphan_changes: any[];
    /** Format unknown yet */
    plain_timetable: any[];
    /** Format unknown yet */
    plain_changes: any[];
}

export interface TimetableFilter {
    /** MM.DD.YYYY **/
    startDate: string;
    /** MM.DD.YYYY **/
    endDate: string;
    /** Format unknown yet **/
    changesUntil: null;
    /** List of the groups to show: like 'Q2', 'Student' **/
    classes: string[];
    /** Result unknown yet **/
    teachers: string[];
    /** Result unknown yet */
    rooms: string[];
}

export const getTimetable = async (baseUrl: string, session: CookieJar, filter: TimetableFilter): Promise<Timetable | undefined> => {
    return new Promise<Timetable>((resolve, reject) => {
        try {
            request.get({
                timeout: 4000,
                url: encodeURI(baseUrl + '/iserv/timetable/data?filter=' + JSON.stringify(filter)),
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
                        resolve({
                            lastUpdated: data.meta["last-updated"],
                            timetable: data.data.timetable,
                            orphan_changes: data.data['orphan-changes'],
                            plain_timetable: data['plain-timetable'],
                            plain_changes: data['plain-changes'],
                        });
                    }
            });
        } catch (e) {
            reject(e);
        }
    });
};