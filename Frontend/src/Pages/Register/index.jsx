import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import styles from './styles.module.scss';
import { api } from '../../Services/api';
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaBirthdayCake } from 'react-icons/fa'; // Ícones adicionados

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [dataNasc, setDataNasc] = useState("");
    
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        const user = { email, password, dataNasc };
        try {
            const response = await api.post('/users/newUser', user, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            navigate("/"); // Redireciona para a página de login
        } catch (error) {
            console.error('Erro ao registrar usuário:', error.response || error.message);
        }
    }

    return (
        <div className={styles.registerPage}>
            <Card className={styles.card}>
                <Card.Header className={styles.cardHeader}>Registro</Card.Header>
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
                                placeholder="Crie uma senha"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="dataNasc">
                            <Form.Label className={styles.label}>
                                <FaBirthdayCake className={styles.icon} /> Data de Nascimento
                            </Form.Label>
                            <Form.Control
                                className={styles.input}
                                value={dataNasc}
                                type="date"
                                onChange={(e) => setDataNasc(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <div className={styles.buttonDiv}>
                            <Button variant="primary" type="submit" className={styles.button}>
                                Registrar
                            </Button>
                            <Button 
                                variant="secondary" 
                                type="button"
                                className={styles.button} 
                                onClick={() => navigate("/")}>
                                Já tenho uma conta
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}
