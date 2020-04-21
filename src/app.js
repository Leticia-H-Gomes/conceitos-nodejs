const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

const repositories = [];

const app = express();

app.use(express.json());
app.use(cors());


app.get("/repositories", (request, response) => 
{

  return response.json(repositories);

});

app.post("/repositories", (request, response) => 
{
  const {title, url, techs} = request.body;
  
  const repository =
  {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0 ,
  };

  repositories.push(repository);

  return response.json(repository);
  
});

app.put("/repositories/:id", (request, response) => {
     
     const {id} = request.params;

     const {title, url, techs} = request.body;

     const repositoryIndex = repositories.findIndex(repos => repos.id === id);
     const repository = repositories.find(repos => repos.id === id);
  
     if(repositoryIndex < 0 )
     {
       return response.status(400).json();
     }

    repository.title = title;
    repository.url = url;
    repository.techs = techs;


     repositories[repositoryIndex] =  repository;

     return response.json(repository);

     
});

app.delete("/repositories/:id", (request, response) => {
     
     const { id } = request.params

     const repIndex = repositories.findIndex(rep => rep.id === id);

     if(repIndex < 0 )
     {
       return response.status(400).json();
     }

     repositories.splice(repIndex,1);

     return response.status(204).json();

});

app.post("/repositories/:id/like", (request, response) => {
  
  const {id} = request.params;
  const repository = repositories.find(repos => repos.id == id);
  
  if(!repository){
    return response.status(400).json();

  }
  
  repository.likes += 1;

  return response.json(repository);

});

module.exports = app;
