import React, {useEffect} from 'react';
import s from './common.module.css';
import {digitToArr} from "../../utils/utils";

const Paginator = ({current, total, select}) => {
    useEffect(() => {
        if (current > total) {
            select(1)
        }
    }, [total]);
    const prevPage = () => {select(current - 1)}
    const nextPage = () => {select(current + 1)}
    const formatTotals = () => {
        let output = {
            isBiggerThan10: false,
            startMode: false,
            middleInput: false,
            firstPack: [],
            secondPack: [],
            buttons: {
                prev: false,
                next: false
            }
        }
        if (Math.sign(current - 1) === 1) {
            output.buttons.prev = true;
        }
        if (current !== total && total !== 0) {
            output.buttons.next = true;
        }
        if (total > 8) {
            output.isBiggerThan8 = true;

            if (total - current > 7) {
                output.startMode = true;
                output.middleInput = true;
                for (let i = current; i <= current + 3; i++) {
                    output.firstPack.push(i);
                }
                for (let i = total - 3; i <= total; i++) {
                    output.secondPack.push(i);
                }
            } else {
                for (let i = total - 7; i <= total; i++) {
                    output.firstPack.push(i);
                }
            }
        }
        return output;
    }
    return (
        <div className={s.paginator}>
            <button className={`${s.navigationBtn} ${!formatTotals().buttons.prev && s.disabled}`} onClick={prevPage}>Предыдущая</button>
            <div className={s.pages}>
                {formatTotals().isBiggerThan8
                    ? (formatTotals().startMode
                            ? <>
                                {(formatTotals().firstPack.map(el =>
                                    (<button key={el}
                                             className={`${s.page} ${el === current ? s.active : ''}`}
                                             onClick={ () => {select(el)} }>{el}</button>)
                                ))}
                                <div>...</div>
                                {(formatTotals().secondPack.map(el =>
                                    (<button key={el}
                                             className={`${s.page} ${el === current ? s.active : ''}`}
                                             onClick={ () => {select(el)} }>{el}</button>)
                                ))}
                            </>
                            : <>
                                <div style={{marginLeft: '3px'}}>...</div>
                                {(formatTotals().firstPack.map(el =>
                                    (<button key={el}
                                             className={`${s.page} ${el === current ? s.active : ''}`}
                                             onClick={ () => {select(el)} }>{el}</button>)
                                ))}
                            </>
                    )
                    : digitToArr(total).map(el =>
                        (<button key={el}
                                 className={`${s.page}
                              ${el === current && s.active}`}
                                 onClick={ () => {select(el)} }>{el}</button>)
                    )
                }
            </div>
            <button className={`${s.navigationBtn} ${!formatTotals().buttons.next && s.disabled}`} onClick={nextPage}>Следующая</button>
        </div>
    );
}

export default Paginator;