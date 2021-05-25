const express = require('express');
const app = express();
const methodOverride = require('method-override');
const { v4: uuid } = require('uuid');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));

let blog = [
    {
        id:uuid(),
        Title:'Sambher',
        Image:'https://images.unsplash.com/photo-1501822810445-bba370e517ab?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8NnNNVmpUTFNrZVF8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        body:" This is a text.",
        Author: "Shubham"
    }
]

app.get('/blog',(req,res) => {
    res.render('blog/index',{ blog });
})


app.get('/blog/new',(req,res) =>{
   res.render('blog/new')
})

app.post('/blog',(req,res) =>{
   
   const {Title,Image,body,Author} = req.body;
   const id = uuid();
    blog.push({id,Title,Image,body,Author});
    res.redirect('/blog');

})

app.get('/blog/:id', (req,res) => {
    const {id}= req.params;
    const foundblog = blog.find(c => c.id === id )
    res.render('blog/show',{ b:foundblog } );
})

app.get('/blog/:id/edit', (req,res) => {
    const {id}= req.params;
    const foundblog = blog.find(c => c.id === id );
    res.render('blog/edit', { blog:foundblog });

})

app.patch('/blog/:id',(req,res) =>{
    
   const {id} =req.params;
   const foundblog = blog.find(c => c.id === id )
   const {Title,Image,body}=req.body
   foundblog.Title =Title;
   foundblog.Image = Image;
   foundblog.body = body;
   res.redirect('/blog');

})

app.delete('/blog/:id', (req,res) => {
    const { id } = req.params;
    const temp = blog.filter( c => c.id != id);
    blog= temp;
    res.redirect('/blog');
})


app.get('/',(req,res) => {
    res.send('This is the root route');
})


app.listen(3000,() =>{
    console.log('Server started at port 3000');
})