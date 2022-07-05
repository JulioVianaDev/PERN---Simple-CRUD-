const express = require('express');
const app = express()
const cors = require('cors')
const pool = require('./db')

//midlewares
app.use(cors())
app.use(express.json())

//rotas
app.post('/todos', async (req, res)=>{
  try {
    const { description } = req.body;
    const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *",
    [description]
    )
    res.json(newTodo.rows[0]);
  } catch (error) {
    console.log("erro no post: ", error)
  }
})
//listar um item
app.get('/todos/:id', async (req, res)=>{
  try {
    const {id} = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id])
    res.json(todo.rows[0]);
  } catch (error) {
    console.log("erro no get: ",error)
  }
})
//listar todos os itens
app.get('/todos', async (req, res)=>{
  try {
    const {id} = req.params;
    const todo = await pool.query("SELECT * FROM todo ")
    res.json(todo.rows);
  } catch (error) {
    console.log("erro no get: ",error)
  }
})
//update item da lista
app.put('/todos/:id', async (req, res)=>{
  try {
    const {id} = req.params;
    const {description} = req.body;
    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE id = $2",
      [description,id]
    )
    res.json("item atualizado")
  } catch (error) {
    console.log('erro no update: ',error);
  }
})
//deletar item da lista
app.delete('/todos/:id', async (req, res)=>{
  try {
    const {id} = req.params;
    const deleteTodo = await pool.query(
      "DELETE FROM todo WHERE id = $1",[id]
    )
    res.json("Deletado com sucesso")
  } catch (error) {
    console.log("Erro no delete: ", error)
  }
})

app.listen(5000,()=>{
  console.log('serv iniciou na porta 5000')
})