const nameOfDays = ["Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat", "Vasárnap"]


export const getACertainWeek = (date) => {
    let week = []
    for (let i = 1; i <= 6; i++) {
        let first = date.getDate() - date.getDay() + i
        let day = new Date(date.setDate(first)).toISOString().slice(0, 10)
        if (new Date(`${day}T23:59`).getTime() >= new Date().getTime()) {
            week.push(day)
        }
    }
    return week
}

export const getNext3Weeks = () => {
    let date = new Date()
    let weeks = [getACertainWeek(date)]
    for (let i = 0; i < 3; i++) {
        date = new Date(date.setDate(date.getDate() + 7))
        weeks.push(getACertainWeek(date))
    }
    return (weeks)
}

export const getWeekNumber = (day) => {
    let date = new Date(day.getTime());
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    let week1 = new Date(date.getFullYear(), 0, 4);
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
}

export function setHoursAndMinutes(date, time) {
    const setHours = new Date(date).setHours(time.slice(0, 2))
    const setMinutes = new Date(setHours).setMinutes(time.slice(3, 5))
    return new Date(setMinutes)
}

export const getNameofDay = (stringDate) => {
    return nameOfDays[new Date(stringDate).getDay() - 1]
}