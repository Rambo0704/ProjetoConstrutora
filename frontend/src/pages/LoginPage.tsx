

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Layout from '@/components/Layout';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
  
      const response = await axios.post('http://localhost:8000/api/token/', {
        username,
        password,
      });
      
      console.log('Login bem-sucedido!', response.data);

      localStorage.setItem('accessToken', response.data.access);

      navigate('/admin/dashboard');

    } catch (err) {
      console.error('Falha no login:', err);
      setError('Credenciais inválidas. Por favor, tente novamente.');
    }
  };

  return (
    <Layout>
      <div className="container mx-auto flex justify-center items-center py-20">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center">Acesso do Gestor</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username">Usuário</label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password">Senha</label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600">
              Entrar
            </Button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;