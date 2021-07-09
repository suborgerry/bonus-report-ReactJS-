import axios from 'axios';
import { useEffect, useState, useMemo } from 'react';

function BonusList(props) {
    // console.log(props.filter);
    
    const [dataBonus, setDataBonus] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    async function getBonus(startDate, finishDate) {
        // console.log(startDate, finishDate);

        try {
            setIsLoading(true);
            const { data } = await axios.post('http://sauna/local/modules/wbs24.booking/get_bonus.php',
            {
                userLogin: 'borgerry',
                userHash: 'f868685e0a0685d82702979fbd0a57df',
                start: startDate,
                finish: finishDate
            }, {
                headers: {
                'Content-Type': 'application/json'
                }
            });
            
            data.bonusArray && setDataBonus(Object.values(data.bonusArray));
            console.log(dataBonus);
            return data;
        } catch(e) {
            console.log(e);
            setIsLoading(false);
            setError('Ошибка в запросе.');
        } finally {
            setIsLoading(false);
        };
    };
    
    // useMemo(() => { props.filter },[]);

    useEffect(() => { getBonus(props.startDate, props.finishDate) },[props.startDate, props.finishDate])

    const bonusRows = dataBonus && dataBonus.map((bonus, index) =>
        bonus.cardNumber.startsWith(props.filter) &&
            <div className="bonusRow" key={index}>
                <p className="bonusColumn">
                {bonus.cardNumber}
                </p>
                <p className="bonusColumn">
                {bonus.name}
                </p>
                <p className="bonusColumn">
                {bonus.percent}
                </p>
                <p className="bonusColumn">
                {bonus.phone}
                </p>
                <p className="bonusColumn">
                {bonus.birthday}
                </p>
                <p className="bonusColumn">
                {bonus.bonusBegin}
                </p>
                <p className="bonusColumn">
                {bonus.bonusСoming}
                </p>
                <p className="bonusColumn">
                {bonus.bonusExpense}
                </p>
                <p className="bonusColumn">
                {bonus.bonusTotal}
                </p>
            </div>
    );

    return (
        <>
            {isLoading ? <p>Загрузка результатов</p> : (
                error ? <div className="error">{error}</div> : <>{bonusRows}</>
            )}
        </>
        
    )
};

export default BonusList