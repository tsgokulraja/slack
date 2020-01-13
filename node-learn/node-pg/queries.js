const Pool = require('pg').Pool
const pool = new Pool({
  user: 'gokul',
  host: 'localhost',
  database: 'slack',
  password: '123',
  port: 5432,
})

const getUsers = (request, response) => {
    pool.query('SELECT email,password,name FROM chatusers', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  const getUserById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  const createUser = (request, response) => {

    const { email,password,name} = request.body
    console.log(email,password,name)
    const date= new Date();
    const updated_at = date;
    const created_at = date;
    const status = "active";
    pool.query('INSERT INTO chatusers (email,password,name,created_at,updated_at,status) VALUES ($1, $2 ,$3,$4,$5,$6)', [email,password,name,created_at,updated_at,status], (error, results) => {
      if (error) {
        throw error
      }
      response.status(400);
      console.log("User Added to Database")
    })
  }
  // const updateUser = (request, response) => {
  //   const id = parseInt(request.params.id)
  //   const { name, email } = request.body
  
  //   pool.query(
  //     'UPDATE users SET name = $1, email = $2 WHERE id = $3',
  //     [name, email, id],
  //     (error, results) => {
  //       if (error) {
  //         throw error
  //       }
  //       response.status(200).send(`User modified with ID: ${id}`)
  //     }
  //   )
  // }





  // const deleteUser = (request, response) => {
  //   const id = parseInt(request.params.id)
  
  //   pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
  //     if (error) {
  //       throw error
  //     }
  //     response.status(200).send(`User deleted with ID: ${id}`)
  //   })
  // }
const getGroupMsg =(request,response)=>{
  console.log("group called")
  pool.query('SELECT * FROM chatgroup', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
const sendGroupMsg = (request, response) => {
  console.log("Messsage sent")
  const { email,name,message} = request.body
  console.log(email,name,message);
  const date= new Date();
    const created_at = date;
  pool.query('INSERT INTO chatgroup (email,name,message,created_at) VALUES ($1, $2 ,$3,$4)', [email,name,message,created_at], (error, results) => {
    if (error) {
      throw error
    }
    response.status(400);
    console.log("Group Message Added to Database");
  })
}


const sendIndMsg = (request, response) => {
  console.log("Individual Messsage sent")
  const { sender,receiver,message} = request.body
  const date= new Date();
    const updated_at = date;
    const created_at=date;
    const status="active";
  pool.query('INSERT INTO chatdb (sender,receiver,message,created_at,updated_at,status) VALUES ($1, $2 ,$3,$4,$5,$6)', [sender,receiver,message,created_at,updated_at,status], (error, results) => {
    if (error) {
      throw error
    }
    response.status(400);
    
  })
}
const getChatMsg =(request,response) =>{
  console.log("Receiving Chat Messages");
  const sender= request.query.sender;
  const receiver=request.query.receiver;
  pool.query('select sender,receiver,message from chatdb where (sender= $1 and receiver=$2) or (receiver=$1 and sender=$2) ORDER BY created_at asc',[sender,receiver], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
  module.exports = {
    getUsers,
    getUserById,
    createUser,
    // updateUser,
    // deleteUser,
    getGroupMsg,
    sendGroupMsg,
    sendIndMsg,
    getChatMsg
  }