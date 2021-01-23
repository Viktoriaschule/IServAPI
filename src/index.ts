import {getSession} from "./api/login";
import config from "./utils/config";
import {getTimetable} from "./api/timetable";
import {getNotifications} from "./api/notifications";


const main = async () => {
    const session = await getSession(config.baseUrl, config.username, config.password);

    const date = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 7);
    const timetable = await getTimetable(config.baseUrl, session, {
        startDate: date.toLocaleString().split(',')[0].split('/').join('.'),
        endDate: endDate.toLocaleString().split(',')[0].split('/').join('.'),
        changesUntil: null,
        classes: ['Q2', 'Schüler'],
        teachers: [],
        rooms: [],
    });

    console.log(timetable);

    const notifications = await getNotifications(config.baseUrl, session);
    console.log(notifications);
}

main();