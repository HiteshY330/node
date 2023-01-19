import express from "express";
import StudendCont from "../controllers/studentCont.js";
import UserCont from "../controllers/userContro.js";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";

const router = express();

router.get('/', StudendCont.getAllDoc)
router.post('/', StudendCont.createDoc)
router.get('/edit/:id', StudendCont.editDoc)
router.post('/update/:id', StudendCont.updateDocById)
router.get('/delete/:id', [auth,admin], StudendCont.deleteDocById)
router.get('/user', UserCont.getUser)
router.post('/user', UserCont.createUser)

router.get('/login', async (req, res) => {
    res.render("login.ejs")
});

router.post('/login', UserCont.userLogin)
router.get('/me', auth, UserCont.currUser)

router.get('/user/:id',[auth, admin], UserCont.userDelete)

export default router;