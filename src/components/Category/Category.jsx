import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetProductsQuery } from '../../features/api/apiSlice'

import styles from './Category.module.scss';
import { Products } from "../Products/Products";
import { useSelector } from "react-redux";

export const Category = () => {
    const { id } = useParams();
    const { list } = useSelector(({ categories }) => categories);
    const defaultValues = {
        title: '',
        price_min: 0,
        price_max: 0,
    };

    const defaultParams = {
        categoryId: id,
        limit: 5,
        offset: 0,
        ...defaultValues
    };

    const [isEnd, setEnd] = useState(false);
    const [cat, setCat] = useState('');
    const [items, setItems] = useState([]);
    const [values, setValues] = useState(defaultValues);
    const [params, setParams] = useState(defaultParams);
    const { data, isLoading, isSuccess } = useGetProductsQuery(params);

    useEffect(() => {
        if (!id) return;
        setValues(defaultValues);
        setItems([]);
        setEnd(false);
        setParams({ ...defaultParams, categoryId: id });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        if (isLoading) return;
        if (!data.length) return setEnd(true);
        setItems((_items) => [..._items, ...data]);
    }, [data, isLoading]);

    useEffect(() => {
        if (!id || !list.length) return;
        const category = list.find((item) => item.id === id * 1);
        setCat(category);
    }, [list, id])

    const handleChange = ({ target: { value, name } }) => {
        setValues({ ...values, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setItems([]);
        setEnd(false);
        setParams({ ...defaultParams, ...values })
    }

    const handleReset = () => {
        setValues(defaultValues);
        setParams(defaultParams);
        setEnd(false);
    };

    return (
        <section className={styles.category}>
            <h2 className={styles.categoryTitle}>{cat?.name}</h2>
            <form
                className={styles.categoryFilters}
                onSubmit={handleSubmit}
            >
                <div className={styles.categoryFilter}>
                    <input
                        type="text"
                        name="title"
                        onChange={handleChange}
                        placeholder="Product name"
                        value={values.title}

                    />
                </div>
                <div className={styles.categoryFilter}>
                    <input
                        type="number"
                        name="price_min"
                        onChange={handleChange}
                        placeholder="0"
                        value={values.price_min}
                    />
                    <span>Price from</span>
                </div>
                <div className={styles.categoryFilter}>
                    <input
                        type="number"
                        name="price_max"
                        onChange={handleChange}
                        placeholder="0"
                        value={values.price_max}
                    />
                    <span>Price to</span>
                </div>
                <button type="submit" hidden />
            </form>
            {isLoading ? (
                <div className={styles.categoryPreloader}>
                    Loading...
                </div>
            ) :
                !isSuccess || !items.length ? (
                    <div className={styles.categoryBack}>
                        <span>No results</span>
                        <button onClick={handleReset}>Reset</button>
                    </div>
                )
                    : (
                        <Products
                            title=''
                            products={items}
                            style={{ padding: 0 }}
                            amount={items.length}
                        />
                    )
            }
            {!isEnd && (
                <div className={styles.categoryMore}>
                    <button onClick={
                        () => setParams({ ...params, offset: params.offset + params.limit })
                    }>
                        See more
                    </button>
                </div>
            )}
        </section>
    )
}