import { useEffect, useState } from "react";
import moment from "moment-timezone"
import { CountdownContainer } from "./countdown.style";
export const Countdown = ({ targetDate }) => {
    const [countdown, setCountdown] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const interval = setInterval(() => {
            const now = moment().tz("Europe/Paris");
            const targetDate = moment.tz("2023-05-22T06:24:00", "Europe/Paris"); // format dateTheure (YYYY-MM-DD)T(HH:MM:SS) 
            if (now.isAfter(targetDate)) {
                clearInterval(interval);
                setCountdown({
                    days: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 0,
                });
            } else {
                const distance = targetDate.diff(now);
                const duration = moment.duration(distance);
                const days = duration.days();
                const hours = duration.hours();
                const minutes = duration.minutes();
                const seconds = duration.seconds();
                setCountdown({days, hours, minutes, seconds });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDate]);

    return (
        <CountdownContainer>
            <div><p className="unity">Jours</p><div className="number">{countdown.days}</div></div>
            <div><p className="unity">Heures</p><div className="number"> {countdown.hours}</div></div>
            <div><p className="unity">Minutes</p><div className="number">{countdown.minutes}</div></div>
            <div><p className="unity">Secondes</p><div className="number"> {countdown.seconds}</div></div>
        </CountdownContainer>
    )
}   