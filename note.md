	npm i --save jsonwebtoken : lib para trabalhar com jwt

	const jwt = require('jsonwebtoken')

	criando um token:

	criar uma senha da app:

	const secretKeyApp = '¨&*()_!@#$%¨{}^:><?"!@#$%¨&ftwyjedfgtrd'

	login()
	{
		nota: geração de token leva um tempo pelo fato de envolver criptografia e processamento em CPU.
		por tanto, essa geração é asíncrona.

		jwt.sign(
			{
				informacoes_essenciais: 'nao armazenar dados sensiveis demais'
			},

			secretKeyApp,

			{
				expiresIn: '48h'
			},

			(error, token) => {
				if(error) console.log('...') res.json(...)

				res.json( {token} )
			}
		)
	}

	validando um token:

	Melhor maneira é trabalhando com middleware

	ex:

	function middlewareAuth(req, res, next)
	{
		const token = req.headers['authorization']
	}

	app.get('dashboard', middlewareAuth, (req, res) => {
		code...
	})
