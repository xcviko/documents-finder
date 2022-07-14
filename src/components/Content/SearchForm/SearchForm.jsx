import React, {useEffect, useRef, useState} from 'react';
import s from '../Content.module.css'
import {useForm} from 'react-hook-form';
import {connect} from "react-redux";
import {getData, removeSort, setOrder, setParams, setSort} from "../../../redux/searchForm-reducer";
import Input from "../../common/Input";

const inputsData = {
    main: [
        {name: 'main.id', header: 'ID документа',
            warning: <span>
                        Если заполнено поле
                        <span style={{fontWeight: 'bold'}}>{' ID документа'}</span>,
                        все остальные поля будут проигнорированы
                     </span>
        },
        {name: 'main.document_name', header: 'Название документа'}
    ],
    additional: [
        {name: 'additional.creation_date', header: 'Создан', placeholder: 'YYYY/MM/DD'},
        {name: 'additional.email', header: 'Email', placeholder: 'example@gmail.com'},
        {name: 'additional.first_name', header: 'Имя', placeholder: 'Mark'},
        {name: 'additional.last_name', header: 'Фамилия', placeholder: 'Zuckerberg'}
    ]
}

const SearchForm = ({params, methods, page, limit, getData, setParams, setSort, removeSort, setOrder}) => {
    useEffect(() => {
        getData(params, methods, page, limit)
    }, [params, methods, page]);

    const {
        register,
        handleSubmit
    } = useForm({
        mode: "onChange"
    });
    const onSubmit = (data) => {
        setParams(data);
        setOrder(data.orderBy);
    }
    const getMethodsPickers = () => {
        let names = []
        let resultArr = []
        Object.keys(params.additional).map(el => names.push(el));
        names.map(el => methods.sortBy.indexOf(el) === -1 && resultArr.push(el))
        return resultArr;
    }
    const getHeader = (name) => (inputsData.additional.map(el => el.name === `additional.${name}` && el.header))

    return (
        <div className={s.searchForm}>
            <form onChange={handleSubmit(onSubmit)}>
                {/*main params*/}
                {inputsData.main.map(el =>
                    (<Input key={`${el.name}_main`}
                            register={register}
                            name={el.name}
                            header={el.header}
                            warning={el.warning}/>)
                )}

                {/*additional params*/}
                <div className={s.additionalParams}>
                    <div className={s.title}>Сортировка</div>
                    <div className={s.methodPickersWrapper}>
                        <select {...register('orderBy')}>
                            <option value="asc">По возрастанию</option>
                            <option value="desc">По убыванию</option>
                        </select>
                        <div className={s.paramsWrapper}>
                            {getMethodsPickers().length
                                ? getMethodsPickers().map(el =>
                                    (<button key={`${el}_methodPicker`}
                                             className={s.methodPicker}
                                             onClick={() => {setSort(el)}}>
                                        {getHeader(el)}
                                    </button>)
                                )
                                : <div>нет доступных параметров...</div>
                            }
                        </div>
                    </div>
                    {inputsData.additional.map(el =>
                        (methods.sortBy.map(methodsEl =>
                            (el.name.split('.')[1] === methodsEl
                                && <Input key={`${el.name}_additional`}
                                       register={register}
                                       name={el.name}
                                       header={el.header}
                                       placeholder={el.placeholder}
                                       removeSort={removeSort} />)
                        ))
                    )}
                </div>
            </form>
            <div className={s.line}></div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return ({
        params: state.searchForm.params,
        methods: state.searchForm.queryMethods,
        page: state.info.page,
        limit: state.searchForm.limit
    });
}

export default connect(mapStateToProps, {getData, setParams, setSort, removeSort, setOrder})(SearchForm);