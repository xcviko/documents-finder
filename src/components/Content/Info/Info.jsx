import React from 'react';
import s from '../Content.module.css';
import {connect} from "react-redux";
import Paginator from "../../common/Paginator";
import {setPage} from "../../../redux/info-reducer";

const getFormattedJSX = (data) => {
    let formattedData = [];
    for (let i = 0; i < data.length; i++) {
        formattedData.push(
            <div key={data[i].id} className={s.dataBlock}>
                <div className={s.dataBlockHeader}>{data[i].document_name}</div>
                <div className={s.dataBlockContent}>
                    {Object.entries(data[i]).map(el =>
                        (<div key={el[0]} className={s.dataItemsWrapper}>
                            <span>{el[0]}:</span>&nbsp;<span>{el[1]}</span>
                        </div>)
                    )}
                </div>

            </div>)
    }
    return formattedData.map(el => el);
}


const Info = ({page, data, pages, setPage}) => {

    return (
        <div className={s.info}>
            <Paginator current={page} total={pages} select={setPage}/>
            {getFormattedJSX(data)}
        </div>
    );
}


const mapStateToProps = (state) => {
    return ({
        page: state.info.page,
        data: state.searchForm.data,
        pages: state.searchForm.pages
    });
}

export default connect(mapStateToProps, {setPage})(Info);