import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { api } from '../../Services/api';
import styles from './styles.module.scss';
import NavBar from "../components/navbar";

export default function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    console.log("Token não encontrado.");
                    return;
                }

                const response = await api.get('/products', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setProducts(response.data);
            } catch (error) {
                console.log('Erro ao carregar os produtos:', error);
            }
        }

        fetchProducts();
    }, []);

    const handleAddToCart = async (productId) => {
        const token = localStorage.getItem("token");

        if (!token) {
            console.log("Token não encontrado.");
            return;
        }

        try {
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            const userId = decodedToken.id;

            const cartItem = {
                userId: userId,
                productId: productId,
                quantity: 1
            };

            const response = await api.post('/cart/add', cartItem, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            // Opcionalmente, você pode atualizar a UI ou mostrar uma mensagem de sucesso
        } catch (error) {
            console.error("Erro ao adicionar produto ao carrinho!", error);
        }
    };

    return (
        <div style={{ overflow: 'hidden' }}>
            <NavBar />
            <div className={styles.homePage}>
                {products.map(product => (
                    <Card key={product.id} className={styles.card}>
                        <Card.Img variant="top" src={product.imageUrl} className={styles.cardImage} />
                        <Card.Body>
                            <Card.Title className={styles.cardTitle}>{product.name}</Card.Title>
                            <Card.Text>{product.description}</Card.Text>
                            <Card.Text><strong>Preço:</strong> R${product.price.toFixed(2)}</Card.Text>
                            <Card.Text><strong>Quantidade:</strong> {product.quantity}</Card.Text>
                            <button
                                className={styles.addButton}
                                onClick={() => handleAddToCart(product.id)}
                            >
                                Adicionar ao Carrinho
                            </button>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </div>
    );
}
