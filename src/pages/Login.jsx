import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from "react-bootstrap/Alert";
import { useNavigate } from 'react-router-dom';
import {useState, useEffect} from 'react';

const url = "http://localhost:5000/usuarios";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  
  const [alertaClass, setAlertaClass] = useState("mb-3 d-none");
  const [alertaMensagem, setAlertaMensagem] = useState("");
  const [alertaVariant, setAlertaVariant] = useState("danger");

  const [usuarios, setUsuarios] = useState([]);
  
  // Função para navegar para a página de produtos
  let navigate = useNavigate(); 
  const routeChange = () => { 
    let path = `/src/pages/Produtos.jsx`; 
    navigate(path);
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(url);
        const users = await res.json();
        setUsuarios(users);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchData();
    console.log(usuarios);
    // eslint-disable-next-line
  }, []);

  const gravarLocalStorage = (usuario) =>{
    localStorage.setItem("userName", usuario.nome)
    localStorage.setItem("userEmail", usuario.email)   
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    const user = { email, senha };

    const userToFind = usuarios.find(
      (userFind) => userFind.email === user.email
    );

    if (email !== "") {
      if (senha !== "") {
        if (userToFind !== undefined && userToFind.senha === senha) {
          console.log(userToFind);
          setAlertaClass("mb-3");
          gravarLocalStorage(userToFind)
          alert("Login efetuado com Sucesso");
          setAlertaMensagem("Login efetuado com Sucesso");
          setAlertaVariant("success");
        } else {
          setAlertaClass("mb-3");
          setAlertaMensagem("Usuário ou senha inválidos");
        }
      } else {
        setAlertaClass("mb-3");
        setAlertaMensagem("O campo senha não pode ser vazio");
      }
    } else {
      setAlertaClass("mb-3");
      setAlertaMensagem("O campo email não pode ser vazio");
    }
  };

  return (
    <Form className='container' onSubmit={handleLogin}>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => {setEmail(e.target.value)}} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={senha} onChange={(e) => {setSenha(e.target.value)}}/>
      </Form.Group>
      
      <Alert key="danger" variant={alertaVariant} className={alertaClass}> 
        {alertaMensagem}
        </Alert>
      
      <Button variant="primary" type='submit' onClick={routeChange}>Logar</Button>
    </Form>
  );
}

export default Login;