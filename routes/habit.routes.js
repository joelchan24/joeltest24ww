const router = require("express").Router();
const {verifyToken , checkRole} = require('../middlewares/index')
const {
  allHabits,
  addingHabit,
  updateHabit,
  deleteHabit
}  = require('../controllers/habit.controller')

// read all habits
router.get('/allhabits',verifyToken, allHabits)
// create habit
router.post('/addHabit', verifyToken , checkRole(['Admin']) ,addingHabit)
// update habit
router.patch('/edit-habit/:id', verifyToken , checkRole(['Admin']) ,updateHabit)
// delete habit
router.delete('/delete-habit/:id', verifyToken, checkRole(['Admin']) , deleteHabit)

module.exports = router;
