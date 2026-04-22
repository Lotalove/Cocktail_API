import 'dotenv/config';
import cors from 'cors';
import express  from 'express'
const app = express();
app.use(express.json());
const port = 3001;
import sql from './db.js';


app.use(cors());
app.get('/', async (req, res) => {
  const result = await sql`SELECT * FROM public."Drinks"`;
  res.json(result)

});

app.post('/addDrink',async(req,res)=>{
  try {
    const data = req.body
    console.log('Received data:', data)
    
    await sql`INSERT INTO public."Drinks" (name,category,method,ingredients) VALUES(${data.name},${"User Submitted"},${data.instructions},${data.ingredients})`
    
    res.status(200).json({ success: true, message: "Successfully added your drink" })
  } catch (error) {
    console.error('Error adding drink:', error)
    res.status(500).json({ success: false, error: error.message })
  }
})

app.post('/editDrink',async(req,res)=>{
  try {
    const data = req.body
    console.log('Received data:', data)
    
    await sql`UPDATE public."Drinks" SET name = ${data.name}, category = ${"User Submitted"}, method = ${data.instructions}, ingredients = ${data.ingredients} WHERE id = ${data.id}`
    
    res.status(200).json({ success: true, message: "Successfully updated your drink" })
  } catch (error) {
    console.error('Error updating drink:', error)
    res.status(500).json({ success: false, error: error.message })
  }
})

app.post('/deleteDrink',async(req,res)=>{
  try {
    const data = req.body
    console.log('Received data:', data)
    
    await sql`Delete from public."Drinks" WHERE id = ${data.id}`
    
    res.status(200).json({ success: true, message: "Successfully deleted your drink" })
  } catch (error) {
    console.error('Error deleting drink:', error)
    res.status(500).json({ success: false, error: error.message })
  }
})
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
