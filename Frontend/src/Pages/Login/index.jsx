import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import styles from './styles.module.scss';
import { api } from '../../Services/api';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from 'react-icons/fa'; 

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
    
        const user = { email, password };
        const supplier = { email, password };  // Constante para fornecedor
        try {
            // Tenta login para o usuário comum
            const userResponse = await api.post('/users/login', user, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
    
            // Se o login do usuário for bem-sucedido
            localStorage.setItem("token", userResponse.data.token);
            navigate("/home");  // Redireciona para a página de usuário comum
        } catch (userError) {
            // Se o login de usuário comum falhar, tenta o login para fornecedor
            try {
                const supplierResponse = await api.post('/suppliers/login', supplier, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
    
                // Se o login do fornecedor for bem-sucedido
                localStorage.setItem("token", supplierResponse.data.token);
                navigate("/products");  // Redireciona para a página de fornecedores
            } catch (supplierError) {
                // Se o login de fornecedor também falhar
                console.error('Erro ao tentar fazer login como fornecedor:', supplierError.response || supplierError.message);
                alert("Credenciais inválidas para usuário ou fornecedor.");
            }
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
