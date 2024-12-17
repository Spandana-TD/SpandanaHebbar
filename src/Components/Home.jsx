import { Box, Grid2, Paper, Typography } from '@mui/material'
import React, { useState } from 'react'
import InsertForm from './InsertForm'
import List from './List'
import P from "./im.png";

export default function Home() {
    let initialValue;
    if (localStorage.getItem("notes")==null) {
        initialValue=[]
    } else {
        initialValue=JSON.parse(localStorage.getItem("notes"))
    }
    const[notes,setNotes]= useState(initialValue)
    const DeleteNote=(id)=>{
        console.log(id)
        let remainingNotes=notes.filter((item)=>item.id!=id)
        localStorage.setItem("notes",JSON.stringify(remainingNotes))
        setNotes(remainingNotes)
    }
    const updateNote=(note)=>{
        console.log(note)
        let status;
        if (note.completed) {
            status=false
            
        } else {
            status=true
            
        }
        let modifiedNote={...note,completed:status}
        console.log(modifiedNote)
        let noteIndex=notes.findIndex((item)=>item.id==note.id)
        console.log(noteIndex)
        let modifiedCompleteNote=[...notes
        ]
        modifiedCompleteNote.splice(noteIndex,1,modifiedNote)
        localStorage.setItem("notes",JSON.stringify(modifiedCompleteNote))
        setNotes(modifiedCompleteNote)
    }
  return (
   <Box 
   sx={{
    
    backgroundColor:"pink",
    width:"100%",
    height:"100vh",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    backgroundPosition:"center",
     backgroundSize:"cover",
   backgroundImage: `url(${P})`
   }}
   >
    <Paper sx={{p:2,borderRadius:"3%",border:"2px solid grey"}}>
       <Box  >
        <Grid2 container spacing={2}>
            <Grid2 size={{xs:12}}>
                <Typography sx={{textAlign:"center",
                fontWeight:"600",
                    color:"black",
                    textTransform:"Uppercase"}}>
                    To Do List
                </Typography>
            </Grid2>
            <Grid2 size={{xs:12}}>
                <InsertForm notes={notes} setNotes={setNotes}/>
            </Grid2>
            <Grid2 size={{xs:12}}>
                <Box sx={{maxHeight:"40vh",overflow:"auto"}}>
                    
                    {notes.length>0?
                    notes.map((note,index)=>(
                     <List 
                     updateNote={updateNote}
                     DeleteNote={DeleteNote} 
                     key={index} 
                     note={note}/>
                    )):(
<Box sx={{P:2}}>
            <Typography color="success" sx={{textAlign:"center"}}>No Notes Found!</Typography>
            </Box>
                    )}
                
                </Box>
            </Grid2>
        </Grid2>
        </Box> 
        
    </Paper>
   </Box>
  )
}
