const router = require('express').Router();
const { filterByQuery, createNewNote, validateNote, deleteNote } = require('../../lib/notes');
let notes = require('../../Develop/db/db.json');

router.get('/notes', (req, res) => {
  let results = notes;
  // if (req.query) {
  //   results = filterByQuery(req.query, results);
  // }
  res.json(results);
});

router.post('/notes', (req, res) => {
  req.body.id = notes.length.toString();
  if (!validateNote(req.body)) {
    res.status(400).send('The note is not properly formatted.');
  } else {
    const note = createNewNote(req.body, notes);
    res.json(note);
  }
});

router.delete('/notes/:id', (req, res) => {
  const id = req.params.id;
  notes = deleteNote(filterByQuery(id, notes))
  res.json(notes)
});


module.exports = router;