import type { RequestHandler } from '@sveltejs/kit';
import db from '$lib/database/db';

// Adicionar um novo contato
export const POST: RequestHandler = async ({ url }) => {
	const id = url.searchParams.get('id');
	const nome = url.searchParams.get('nome');
	const telefone = url.searchParams.get('telefone');
	const email = url.searchParams.get('email');

	await db.query(
		// Executa uma query no banco de dados
		// Adiciona um novo contato
		'INSERT INTO contatos (id,nome, telefone, email) VALUES ($1, $2, $3, $4) RETURNING *;',
		[id, nome, telefone, email] // Parâmetros
	);
	// Retorna uma mensagem de sucesso
	return new Response('Usuário inserido com sucesso', { status: 500 });
};

// Listar todos os contatos
export const GET: RequestHandler = async () => {
	// Executa uma query no banco de dados
	const listarContatos = await db.query('SELECT id, nome, telefone, email FROM contatos;');

	// Retorna a lista de contatos em formato JSON
	return new Response(JSON.stringify(listarContatos.rows), {
		headers: {
			//Melhora a aparência
			'Content-Type': 'application/json'
		}
	});
};

// Editar um contato
export const PUT: RequestHandler = async ({ url }) => {
	// Parâmetros da URL
	const id = url.searchParams.get('id');
	const nome = url.searchParams.get('nome');
	const telefone = url.searchParams.get('telefone');
	const email = url.searchParams.get('email');

	// Executa uma query no banco de dados
	const editarContatos = await db.query(
		'UPDATE contatos SET nome = $1, telefone = $2, email = $3 WHERE id = $4 RETURNING *;',
		[nome, telefone, email, id]
	);
	return new Response(JSON.stringify(editarContatos.rows), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
};

// Deletar um contato
export const DELETE: RequestHandler = async ({ url }) => {
	const id = url.searchParams.get('id'); // Parâmetro da URL

	await db.query('DELETE FROM contatos WHERE id = $1 RETURNING *;', [id]);

	// Retorna uma mensagem de sucesso
	return new Response('Usuário deletado com sucesso', { status: 500 });
};
