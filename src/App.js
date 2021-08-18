import { Component } from 'react';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {current: undefined, location: undefined, error: null, isLoaded: false};
    }


    componentDidMount() {    
        fetch('http://api.weatherapi.com/v1/current.json?key=2672216335b04ccba0054552211808&q=Самара&lang=ru')
        .then(result => result.json())
        .then(
            (result) => {
                this.setState({current : result.current, location: result.location, isLoaded: true});
            },
            (err) => {
                this.setState({error : err, isLoaded: true});
            }
        );
    }
   
    render() {
        let {current, location, error, isLoaded} = this.state;
       
        const dictDay = {
            0: 'Воскресенье',
            1: 'Понедельник',
            2: 'Вторник',
            3: 'Среда',
            4: 'Четверг',
            5: 'Пятница',
            6: 'Суббота'
        };

        const dictMonth = {
            0: 'Январь',
            1: 'Февраль',
            2: 'Март',
            3: 'Апрель',
            4: 'Май',
            5: 'Июнь',
            6: 'Июль',
            7: 'Август',
            8: 'Сентябрь',
            9: 'Октябрь',
            10: 'Ноябрь',
            11: 'Декабрь'
        };

        let dataElement;
        let date = new Date();

        if(error) {
           dataElement = <p> {error} </p>;
        } else if(!isLoaded) {
           dataElement = <p> Загружаем прогноз!</p>;
        } else {
            dataElement = <div className="left_panel">
                            <div className="temperature">{current.temp_c}&#176;</div>
                            <div className="location">    
                                <span className="city">{location.name}</span>              
                                <span className="date"> 
                                    {date.getHours()}:{date.getMinutes()} - {date.getDate()} {dictMonth[date.getMonth()]}, {dictDay[date.getDay()]}
                                </span>
                            </div>
                            <div className="details">{current.condition.text}</div>
                        </div>
        }              
        
        return (
            <div className="weather_app">
                {dataElement}
            </div>
        );
    }
}

export default App;