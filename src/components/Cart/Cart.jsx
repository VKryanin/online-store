import React from "react";
import styles from './Cart.module.scss'

import { useDispatch, useSelector } from "react-redux";
import { sumBy } from "../../utils/common";
import { addItemToCart, removeItemFromCart } from "../../features/user/userSlice";

export const Cart = () => {
    const dispatch = useDispatch();
    const { cart } = useSelector(({ user }) => user);
    const changeQuantity = (item, quantity) => {
        dispatch(addItemToCart({ ...item, quantity }))
    }

    const removeItem = (id) => {
        dispatch(removeItemFromCart(id))
    }
    return (
        <section className={styles.cart}>
            <h2 className={styles.cartTitle}>
                Your cart
            </h2>

            {!cart.length
                ? (<p className={styles.cartSubtitle}>Here is empty </p>)
                : (<>
                    <ul className={styles.cartList}>
                        {cart.map((item) => {
                            const { title, category, images, price, id, quantity } = item
                            return <li className={styles.cartItem} key={id}>
                                <div
                                    className={styles.cartImage}
                                    style={{ backgroundImage: `url(${images[0]})` }}
                                />
                                <div className={styles.cartInfo}>
                                    <h3 className={styles.cartName}>{title}</h3>
                                    <p className={styles.cartCategory}>{category.name}</p>
                                </div>
                                <p className={styles.cartPrice}>{price}$</p>
                                <div className={styles.cartQuantity}>
                                    <div
                                        className={styles.cartMinus}
                                        onClick={() => changeQuantity(item, Math.max(1, quantity - 1))}
                                    >
                                        <svg className="icon">
                                            <use
                                                xlinkHref={`${process.env.PUBLIC_URL}/icons.svg#minus`}
                                            />
                                        </svg>
                                    </div>
                                    <span>{quantity}</span>
                                    <div
                                        className={styles.cartPlus}
                                        onClick={() => changeQuantity(item, Math.max(1, quantity + 1))}
                                    >
                                        <svg className="icon">
                                            <use
                                                xlinkHref={`${process.env.PUBLIC_URL}/icons.svg#plus`}
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <div className={styles.cartTotal}>{price * quantity}$</div>
                                <div
                                    className={styles.cartClose}
                                    onClick={() => removeItem(item.id)}
                                >
                                    <svg className="icon">
                                        <use
                                            xlinkHref={`${process.env.PUBLIC_URL}/icons.svg#close`}
                                        />
                                    </svg>
                                </div>
                            </li>
                        })}
                    </ul>

                    <div className={styles.cartActions}>
                        <div className={styles.cartTotal}>
                            Total PRICE: {' '}
                            <span>{sumBy(cart.map(({ quantity, price }) => quantity * price))}$</span>
                        </div>
                        <button className={styles.cartProceed}>Proceed to checkout</button>
                    </div>
                </>
                )
            }
        </section>
    )
}