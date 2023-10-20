import { useEffect, useState } from "react";
import moment from "moment-timezone";
import { CountdownContainer } from "./countdown.style";
import { HashLoader } from "react-spinners";

export const Countdown = (props) => {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [loading, setLoading] = useState(true);

  console.log(props.theme === "Dark Theme" ? "dark" : "white");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = moment().tz("Europe/Paris");
      const targetDate = moment.utc(props.endTime).tz("Europe/Paris");
      if (now.isAfter(targetDate)) {
        clearInterval(interval);
        setCountdown({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        setLoading(false);
      } else {
        const distance = targetDate.diff(now);
        const duration = moment.duration(distance);
        const days = duration.days();
        const hours = duration.hours();
        const minutes = duration.minutes();
        const seconds = duration.seconds();

        if (
          !isNaN(days) &&
          !isNaN(hours) &&
          !isNaN(minutes) &&
          !isNaN(seconds)
        ) {
          setCountdown({ days, hours, minutes, seconds });
          setLoading(false);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [props.endTime]);

  return (
    <CountdownContainer style={{ paddingBottom: "8px" }}>
      <div>
        <p className="unity">DAYS</p>
        <div className="number">
          {loading ? (
            <HashLoader
              color={props.theme === "Dark Theme" ? "#ffffff" : "#1d9bf0"}
              loading={true}
              size={40}
            />
          ) : (
            countdown.days
          )}
        </div>
      </div>
      <div>
        <p className="unity">&nbsp;HRS</p>
        <div className="number">
          {loading ? (
            <HashLoader
              color={props.theme === "Dark Theme" ? "#ffffff" : "#1d9bf0"}
              loading={true}
              size={40}
            />
          ) : (
            countdown.hours
          )}
        </div>
      </div>
      <div>
        <p className="unity">MINS</p>
        <div className="number">
          {loading ? (
            <HashLoader
              color={props.theme === "Dark Theme" ? "#ffffff" : "#1d9bf0"}
              loading={true}
              size={40}
            />
          ) : (
            countdown.minutes
          )}
        </div>
      </div>
      <div>
        <p className="unity">SECS</p>
        <div className="number">
          {loading ? (
            <HashLoader
              color={props.theme === "Dark Theme" ? "#ffffff" : "#1d9bf0"}
              loading={true}
              size={40}
            />
          ) : (
            countdown.seconds
          )}
        </div>
      </div>
    </CountdownContainer>
  );
};
