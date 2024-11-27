import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { api } from '../../Services/api';
import styles from './styles.module.scss';
import NavBar from "../components/navbar";
import { useNavigate } from "react-router-dom";

export default function Cart() {
    const [cart, setCart] = useState([]);
    const [cartId, setCartId] = useState(0);
    const navigate = useNavigate();

    async function fetchCart() {
        const token = localStorage.getItem("token");

        if (!token) {
            console.log("Token não encontrado.");
            return;
        }

        try {
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            const userId = decodedToken.id;
            setCartId(userId);

            const response = await api.get(`/cart?cartId=${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setCart(response.data);
        } catch (error) {
            console.log("Erro ao buscar o carrinho:", error);
        }
    }

    useEffect(() => {
        fetchCart();
    }, []);

    const handleRemoveFromCart = async (productId) => {
        const token = localStorage.getItem("token");

        if (!token) {
            console.log("Token não encontrado.");
            return;
        }

        try {
            const response = await api.delete(`/cart/remove?userId=${cartId}&productId=${productId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            if (response.status === 200) {
                fetchCart();
            }
            
        } catch (error) {
            console.error("Erro ao remover produto ao carrinho!", error);
        }
    };

    async function handlePayPix(){
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                console.log("Token não encontrado.");
                return;
            }

            const response = await api.post("/payment/pix", { "userId": cartId }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })

            localStorage.setItem("paymentId", response.data.id);
            navigate("/payment");

        } catch (error) {
            console.error(error);
        }
    }

    async function handlePayCredit(){
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                console.log("Token não encontrado.");
                return;
            }

            const response = await api.post("/payment/credit-card", { "userId": cartId }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })

            localStorage.setItem("paymentId", response.data.id);
            navigate("/payment");

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <NavBar />
            <div className={styles.cartPage}>
                <Card className="text-center">
                    <Card.Header>Carrinho</Card.Header>
                    <Card.Body>
                        {cart.map((product) => (
                            <div key={product.id}>
                                <Card.Title>{product.productId} - <strong>Preço:</strong> R${product.value} <strong>Quantidade:</strong> {product.quantity}</Card.Title>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleRemoveFromCart(product.productId)}
                                >
                                    Remover produto
                                </button>
                            </div>
                        ))}
                    </Card.Body>
                    <button
                        className="btn btn-primary"
                        onClick={() => handlePayPix()}
                    >
                        Pagar por pix
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={() => handlePayCredit()}
                    >
                        Pagar por cartão
                    </button>
                </Card>
            </div>
        </>
    );
}
