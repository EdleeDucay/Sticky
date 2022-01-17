import React, { useEffect, useState } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {themeOptions} from '../styles/theme'
import { CssBaseline,} from '@mui/material';
import Navbar from '../components/Navbar';
import { BACKEND_BASE_URL } from "../constants";
import axios from 'axios';
import {useAuth} from '../contexts/AuthContext'
import '../styles/sticky.css'
import StickyList from '../components/StickyList';
import {nanoid} from 'nanoid'
import SuccessSnackbar from '../components/SuccessSnackbar';
import DeleteModal from '../components/DeleteModal'

const theme = createTheme(themeOptions);

export default function Homepage() {
    const { currentUser } = useAuth()
    const [notes, setNotes] = useState([])
    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const [delModalOpen, setDelModalOpen] = useState(false);
    const [deleteId, setDeleteId] = useState()

    function createNote() {
        setNotes((prevState) => [...prevState, {id: nanoid(), body: "", unsaved: true}])
    }

    function handleChange(e, id) {
        const noteIndex = notes.findIndex((note => note.id === id))
        notes[noteIndex].body = e.target.value
        setNotes(notes)
    }


    async function handleSaveNote(id) {
        const noteIndex = notes.findIndex((note => note.id === id))
        const newNote = notes[noteIndex]
        const data = {
            userEmail: currentUser.email,
            body: newNote.body
        }

        if (newNote.unsaved) {
            const response = await axios({
                method: 'post',
                url: `${BACKEND_BASE_URL}/sticky/stickies/`,
                data: data
            })
            notes[noteIndex] = response.data
            setNotes(notes)
        } else {
            const response = await axios({
                method: 'put',
                url: `${BACKEND_BASE_URL}/sticky/stickies/${newNote.id}`,
                data: data
            })
            notes[noteIndex] = response.data
            setNotes(notes)
        }

        setSnackbarOpen(true)
    }   

    function handleDeleteModal(id) {
        setDeleteId(id)
        setDelModalOpen(true)
    }

    async function handleDeleteNote() {
        const id = deleteId
        const noteIndex = notes.findIndex((note => note.id === id))
        const newNote = notes[noteIndex]

        // Delete the local sticky
        const arr = notes.filter(note => note.id !== id)
        setNotes(arr)

        // If sticky is in the db delete it
        if (!newNote.unsaved) {
            const response = await axios({
                method: 'delete',
                url: `${BACKEND_BASE_URL}/sticky/stickies/${newNote.id}`,
            })
        }
        setDelModalOpen(false)
    }

    const fetchStickies = async () => {
        const response = await axios({
            method: 'get',
            url: `${BACKEND_BASE_URL}/sticky/stickies/${currentUser.email}`
        })

        setNotes(response.data)
    }

    useEffect(() => {
        fetchStickies();
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Navbar/>
            <SuccessSnackbar open={snackbarOpen} setOpen={setSnackbarOpen}/>
            <DeleteModal open={delModalOpen} setOpen={setDelModalOpen} handleDeleteNote={handleDeleteNote}/>
            <div id="container">
                <StickyList notes={notes} handleSaveNote={handleSaveNote} handleChange={handleChange} handleDeleteNote={handleDeleteModal}/>

                <button class="add-note" type="button" onClick={createNote}>+</button>

            </div>
        </ThemeProvider>
    )
}
