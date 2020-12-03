/** require */
const express = require('express')
const jwt = require('jsonwebtoken')

/** config */
const app = express()

/** gerando um token */

/** passo 1: criar uma chave que vai servir para criar e ebrir tokens */
const apiPWD = 'cas*(*(9**&¨%$4234234234%¨&UYHFHJhgfhjgf2346476h'

/** passo 3: criar o middleware que vai proteger as rotas que quiser */
function auth(req, res, next)
{
    /** passo 4: fazer as validações necessarias no middleware */
    const authorization = req.headers['authorization']

    if(!authorization)
    {
        res.status(400)
        res.json(
            {
                error: true,
                message: 'token não informado',
                data: null
            }
        )
        return false
    }
    else
    {
        let token = authorization.split(' ')[ 1 ]

        /** passo 5: validar e abrir o token */
        jwt.verify(token, apiPWD, (error, tokenData) => {

            if(error)
            {
                res.status(401)
                res.json(
                    {
                        error: true,
                        message: 'invalid token',
                        data: null
                    }
                )

                return false
            }
            else
            {
                /** criando variáveis na requisição */
                req.usr = tokenData
                next()
            }
        })
    }
}

/** routes */
app.get('/auth', (req, res) => {

    /** passo 2: assinar o token com os dados e configs */
    jwt.sign(

        /** payload */
        {
            id: 1,
            email: 'felipe@gmail.com'
        },

        /** api key */
        apiPWD,

        /** config */
        {
            expiresIn: '1h'
        },

        /** callback */
        (error, token) => {

            if(error)
            {
                res.status(400)
                res.json(
                    {
                        success: false,
                        message: 'Falha na geração do token',
                        data: null
                    }
                )

                return false
            }

            res.status(200)
            res.json(
                {
                    success: true,
                    message: 'token criado',
                    data: { token }
                }
            )
        }
    )
})

app.get('/protected', auth, (req, res) => {

    res.json(
        {
            user: req.usr // só estará disponivel depois de passar pelo middleware
        }
    )
})

/** server */
app.listen(8080, 'localhost', (error) => console.log('running...'))