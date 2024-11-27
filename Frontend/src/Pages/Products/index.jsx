import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import styles from './styles.module.scss';
import { api } from '../../Services/api';
import Card from 'react-bootstrap/Card';
import NavBar from "../components/navbar";

export default function Products() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0.0);
    const [quantity, setQuantity] = useState(0);
    const [productId, setProductId] = useState(0);

    async function handleSubmit(e) {
        e.preventDefault();
        const product = { name, description, price, quantity };
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                console.log("Token não encontrado.");
                return;
            }

            const headers = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            };

            if (productId) {
                await api.put(`products?id=${productId}`, product, { headers });
            } else {
                await api.post('/products', product, { headers });
            }

            // Clear fields after submission
            setName('');
            setDescription('');
            setPrice(0.0);
            setQuantity(0);
            setProductId(0);
        } catch (error) {
            console.error('Erro ao cadastrar ou atualizar produto!', error);
        }
    }

    async function deleteSubmit(e) {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                console.log("Token não encontrado.");
                return;
            }

            const headers = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            };
            await api.delete(`products?id=${productId}`, { headers });

            // Clear fields after deletion
            setProductId(0);
        } catch (error) {
            console.error('Erro ao deletar produto!', error);
        }
    }

    return (
        <>
            <NavBar />
            <div className={styles.productPage}>
                <Card className="text-center">
                    <Card.Header>Create Product</Card.Header>
                    <Card.Body>
                        <Form onSubmit={handleSubmit}>
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                value={name}
                                type="text"
                                placeholder="Nome do produto"
                                onChange={(e) => setName(e.target.value)}
                                required
                            />

                            <Form.Label>Descrição</Form.Label>
                            <Form.Control
                                value={description}
                                type="text"
                                placeholder="Descrição do produto"
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />

                            <Form.Label>Preço</Form.Label>
                            <Form.Control
                                value={price}
                                type="number"
                                placeholder="Preço"
                                onChange={(e) => setPrice(e.target.value)}
                                required
                                step="0.01"
                            />

                            <Form.Label>Quantidade</Form.Label>
                            <Form.Control
                                value={quantity}
                                type="number"
                                placeholder="Quantidade"
                                onChange={(e) => setQuantity(e.target.value)}
                                required
                            />

                            <Button variant="primary" type="submit" className={styles.button}>
                                Create Product
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>

                <Card className="text-center">
                    <Card.Header>Update Product</Card.Header>
                    <Card.Body>
                        <Form onSubmit={handleSubmit}>
                            <Form.Label>Id</Form.Label>
                            <Form.Control
                                value={productId}
                                type="number"
                                placeholder="ID do produto"
                                onChange={(e) => setProductId(e.target.value)}
                                required
                            />

                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                value={name}
                                type="text"
                                placeholder="Nome do produto"
                                onChange={(e) => setName(e.target.value)}
                                required
                            />

                            <Form.Label>Descrição</Form.Label>
                            <Form.Control
                                value={description}
                                type="text"
                                placeholder="Descrição do produto"
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />

                            <Form.Label>Preço</Form.Label>
                            <Form.Control
                                value={price}
                                type="number"
                                placeholder="Preço"
                                onChange={(e) => setPrice(e.target.value)}
                                required
                                step="0.01"
                            />

                            <Form.Label>Quantidade</Form.Label>
                            <Form.Control
                                value={quantity}
                                type="number"
                                placeholder="Quantidade"
                                onChange={(e) => setQuantity(e.target.value)}
                                required
                            />

                            <Button variant="primary" type="submit" className={styles.button}>
                                Update Product
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>

                <Card className="text-center">
                    <Card.Header>Delete Product</Card.Header>
                    <Card.Body>
                        <Form onSubmit={deleteSubmit}>
                            <Form.Label>Id</Form.Label>
                            <Form.Control
                                value={productId}
                                type="number"
                                placeholder="ID do produto"
                                onChange={(e) => setProductId(e.target.value)}
                                required
                            />

                            <Button variant="danger" type="submit" className={styles.button}>
                                Delete Product
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </>
    );
}
