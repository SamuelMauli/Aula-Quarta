import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import styles from './styles.module.scss';
import { api } from '../../Services/api';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from 'react-icons/fa'; // ícones para email e senha

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        const user = { email, password };
        try {
            const response = await api.post('/users/login', user, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            localStorage.setItem("token", response.data.token);
            navigate("/home");
        } catch (error) {
            console.error('Erro ao tentar fazer login:', error.response || error.message);
        }
    }

    return (
        <div className={styles.loginPage}>
            <Card className={styles.card}>
                <Card.Header className={styles.cardHeader}>Login</Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="email">
                            <Form.Label className={styles.label}>
                                <FaEnvelope className={styles.icon} /> E-mail
                            </Form.Label>
                            <Form.Control
                                className={styles.input}
                                value={email}
                                type="email"
                                placeholder="nome@gmail.com"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="password">
                            <Form.Label className={styles.label}>
                                <FaLock className={styles.icon} /> Senha
                            </Form.Label>
                            <Form.Control
                                className={styles.input}
                                value={password}
                                type="password"
                                placeholder="Insira sua senha"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <div className={styles.buttonDiv}>
                            <Button variant="primary" type="submit" className={styles.button}>
                                Login
                            </Button>
                            <Button variant="secondary" type="button" className={styles.button} onClick={() => navigate("/register")}>
                                Register
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}
