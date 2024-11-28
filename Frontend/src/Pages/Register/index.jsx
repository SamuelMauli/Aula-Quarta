import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import styles from './styles.module.scss';
import { api } from '../../Services/api';
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaBirthdayCake, FaUserTie, FaBuilding } from 'react-icons/fa';

export default function Register() {
    const [typeUser, setTypeUser] = useState("user"); // tipo de usuário, 'user' ou 'supplier'
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [dataNasc, setDataNasc] = useState("");
    const [cnpj, setCnpj] = useState("");
    const [nomeFornecedor, setNomeFornecedor] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); // Estado para armazenar a mensagem de erro

    const navigate = useNavigate();

    // Variável que será usada para armazenar o tipo de usuário antes de enviar para o servidor
    const [selectedType, setSelectedType] = useState("user");

    const handleTypeChange = (type) => {
        setSelectedType(type); // Atualiza o tipo de usuário com o tipo selecionado
        setTypeUser(type); // Atualiza o estado do tipo de usuário para renderizar o formulário corretamente
    };

    async function handleSubmit(e) {
        e.preventDefault();

        const user = { 
            email, 
            password, 
            dataNasc, 
            type_user: selectedType,  // Usa o tipo de usuário selecionado
            ...(selectedType === "supplier" && { cnpj, nomeFornecedor })  // Adiciona os dados do fornecedor se for fornecedor
        };

        const url = selectedType === "supplier" ? '/suppliers/newsupplier' : '/users/newUser';

        try {
            const response = await api.post(url, user, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            navigate("/");  // Redireciona para a página de login
        } catch (error) {
            // Exibe a mensagem de erro se houver
            setErrorMessage(error.response?.data?.error || 'Erro ao registrar usuário.'); // Mensagem de erro do backend
            console.error('Erro ao registrar usuário:', error.response || error.message);
        }
    }

    return (
        <div className={styles.registerPage}>
            <Card className={styles.card}>
                <Card.Header className={styles.cardHeader}>Registro</Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="typeUser">
                            <Form.Label className={styles.label}>
                                Tipo de Conta
                            </Form.Label>
                            <div className={styles.typeUserGroup}>
                                <Form.Check
                                    inline
                                    label="Usuário"
                                    type="radio"
                                    name="typeUser"
                                    id="user"
                                    value="user"
                                    checked={selectedType === "user"}  // Controle local de tipo de usuário
                                    onChange={() => handleTypeChange("user")}
                                />
                                <Form.Check
                                    inline
                                    label="Fornecedor"
                                    type="radio"
                                    name="typeUser"
                                    id="supplier"
                                    value="supplier"
                                    checked={selectedType === "supplier"}  // Controle local de tipo de usuário
                                    onChange={() => handleTypeChange("supplier")}
                                />
                            </div>
                        </Form.Group>

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

                        {selectedType === "supplier" && (
                            <>
                                <Form.Group controlId="nomeFornecedor">
                                    <Form.Label className={styles.label}>
                                        <FaUserTie className={styles.icon} /> Nome do Fornecedor
                                    </Form.Label>
                                    <Form.Control
                                        className={styles.input}
                                        value={nomeFornecedor}
                                        type="text"
                                        placeholder="Nome do Fornecedor"
                                        onChange={(e) => setNomeFornecedor(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="cnpj">
                                    <Form.Label className={styles.label}>
                                        <FaBuilding className={styles.icon} /> CNPJ
                                    </Form.Label>
                                    <Form.Control
                                        className={styles.input}
                                        value={cnpj}
                                        type="text"
                                        placeholder="00.000.000/0000-00"
                                        onChange={(e) => setCnpj(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                            </>
                        )}

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

                        {errorMessage && (
                            <div className={styles.errorMessage}>
                                <strong>{errorMessage}</strong>
                            </div>
                        )}

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
