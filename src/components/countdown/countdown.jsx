import { useEffect, useState } from "react";
import moment from "moment-timezone"
import { CountdownContainer } from "./countdown.style";
export const Countdown = ({ endTime }) => {
    const [countdown, setCountdown] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const interval = setInterval(() => {
            const now = moment().tz("Europe/Paris");
            const targetDate = moment.utc(endTime).tz("Europe/Paris");
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
                setCountdown({days, hours, minutes, seconds});
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [endTime]);

    return (
        <CountdownContainer>
            <div><p className="unity">Jours</p><div className="number">{countdown.days ? countdown.days : 0}</div></div>
            <div><p className="unity">Heures</p><div className="number"> {countdown.hours ? countdown.hours : 0}</div></div>
            <div><p className="unity">Minutes</p><div className="number">{countdown.minutes ? countdown.minutes : 0}</div></div>
            <div><p className="unity">Secondes</p><div className="number"> {countdown.seconds ? countdown.seconds : 0}</div></div>
        </CountdownContainer>
    )
}   