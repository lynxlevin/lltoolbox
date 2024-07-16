import { cityList } from '../utils/city_list';

const WeatherReports = () => {
    return (
        <div>
            <a style={{ fontSize: '32px', lineHeight: '64px' }} href={cityList.tp.city} target='_blank' rel='noreferrer'>
                tenki
            </a>
            <br />
            <a style={{ fontSize: '32px', lineHeight: '64px' }} href={cityList.wn.city} target='_blank' rel='noreferrer'>
                WN
            </a>
            <br />
            <a style={{ fontSize: '32px', lineHeight: '64px' }} href={cityList.yt.city} target='_blank' rel='noreferrer'>
                Y
            </a>
            <br />
        </div>
    );
};

export default WeatherReports;
