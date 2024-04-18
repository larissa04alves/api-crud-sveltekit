import pkg from 'pg';
const { Pool } = pkg;

// Configuração de conexão com o banco de dados
const config = {
	database: import.meta.env.POSTGRES_DB || 'api_contatos', // Nome do banco de dados
	user: import.meta.env.POSTGRES_USER || 'postgres', // Usuário
	password: import.meta.env.POSTGRES_PASSWORD || 'admin', // Senha
	host: import.meta.env.POSTGRES_HOST || 'localhost', // Host
	port: parseInt(import.meta.env.POSTGRES_PORT) || 5432 // Porta
};

// Cria uma nova conexão com o banco de dados
const db = new Pool(config);

// Função para conectar ao banco de dados
export const conectarDB = async () => await db.connect();

// Exporta a conexão com o banco de dados
export default db;
