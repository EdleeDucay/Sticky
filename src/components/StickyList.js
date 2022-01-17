import { NotInterested } from '@mui/icons-material'
import React, {useEffect} from 'react'
import StickyNote from './StickyNote'

export default function StickyList({
    notes,
    handleDeleteNote,
    handleSaveNote,
    handleChange
}) {
    return (
        <>
            {notes.map((note, index) => (
                <StickyNote
                    index={index}
                    note={note}
                    handleDeleteNote={handleDeleteNote}
                    handleSaveNote={handleSaveNote}
                    handleChange={handleChange}
                />
            ))}
        </>
    )
}
