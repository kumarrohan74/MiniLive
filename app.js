const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');
const path = require('path');
const Admin  = require('./Admin/admin');
const Audio = require('./Audio/audio');
const AudioCategory = require('./Audio/audio_categories');
const Banner = require('./Banners/banners');
const Category = require('./Category/category');
const Challenge = require('./Challenges/challenges');
const ChallengeReward = require('./Challenges/challenge_reward');
const Comment = require('./Comments/comments');
const Energy = require('./Energies/energies');
const SubCategory = require('./Sub_Category/sub_categories');
const Users = require('./Users/users');
const Verification = require('./Verifications/verification');
const Videos = require('./Video/videos');

const app = express();
const router = express.Router();

mongoose.connect('mongodb+srv://kumar_rohan:kumarrohan74@cluster0.myb1i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    .then(() => console.log('Connected'))
    .catch(err => console.log(err));

const port = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'production') {
	app.use(express.static("public"));
}

app.listen(port,console.log(`server started on ${port}`));

app.use(bodyparser.urlencoded({extended : true}));
app.use(bodyparser.json());

app.use(cors());
app.use(router);

router.get('/', (req,res) => {
    res.send("Welcome to MiniLive")
});

/*-------------------------------Admin Api's---------------------------------------------------*/
router.post('/v1/createAdmin', (req,res) => {
    Admin.createAdmin(req.body).then((result) => res.json(result)).catch(err => res.json(err));
});

router.get('/v1/getAdmin', (req,res) => {
    Admin.getAdmin().then((result) => res.json(result)).catch(err => res.json(err));
});

router.post('/v1/editAdmin/:id', (req,res) => {
    Admin.editAdmin(req.body,req.params.id).then((result) => res.json(result)).catch(err => res.json(err));
});

router.post('/v1/deleteAdmin/:id', (req,res) => {
    Admin.deleteAdmin(req.params.id).then((result) => res.json(result)).catch(err => res.json(err));
});



/*-------------------------------Audio Api's---------------------------------------------------*/
router.post('/v1/createAudio', (req,res) => {
    Audio.createAudio(req.body).then((result) => res.json(result)).catch(err => res.json(err));
});

router.get('/v1/getAudio', (req,res) => {
    Audio.getAudio().then((result) => res.json(result)).catch(err => res.json(err));
});

router.post('/v1/editAudio/:id', (req,res) => {
    Audio.editAudio(req.body,req.params.id).then((result) => res.json(result)).catch(err => res.json(err));
});

router.post('/v1/deleteAudio/:id', (req,res) => {
    Audio.deleteAudio(req.params.id).then((result) => res.json(result)).catch(err => res.json(err));
});


/*-------------------------------Audio Category Api's---------------------------------------------------*/
router.post('/v1/createAudioCategory', (req,res) => {
    AudioCategory.createAudioCategory(req.body).then((result) => res.json(result)).catch(err => res.json(err));
});

router.get('/v1/getAudioCategory', (req,res) => {
    AudioCategory.getAudioCategory().then((result) => res.json(result)).catch(err => res.json(err));
});

router.post('/v1/editAudioCategory/:id', (req,res) => {
    AudioCategory.editAudioCategory(req.body,req.params.id).then((result) => res.json(result)).catch(err => res.json(err));
});

router.post('/v1/deleteAudioCategory/:id', (req,res) => {
    AudioCategory.deleteAudioCategory(req.params.id).then((result) => res.json(result)).catch(err => res.json(err));
});


/*-------------------------------Banner Api's---------------------------------------------------*/
router.post('/v1/createBanner', (req,res) => {
    Banner.createBanner(req.body).then((result) => res.json(result)).catch(err => res.json(err));
});

router.get('/v1/getBanners', (req,res) => {
    Banner.getBanner().then((result) => res.json(result)).catch(err => res.json(err));
});

router.post('/v1/editBanner/:id', (req,res) => {
    Banner.editBanner(req.body,req.params.id).then((result) => res.json(result)).catch(err => res.json(err));
});

router.post('/v1/deleteBanner/:id', (req,res) => {
    Banner.deleteBanner(req.params.id).then((result) => res.json(result)).catch(err => res.json(err));
});


/*-------------------------------Category Api's---------------------------------------------------*/
router.post('/v1/createCategory', (req,res) => {
    Category.createCategory(req.body).then((result) => res.json(result)).catch(err => res.json(err));
});

router.get('/v1/getCategories', (req,res) => {
    Category.getCategory().then((result) => res.json(result)).catch(err => res.json(err));
});

router.post('/v1/editCategory/:id', (req,res) => {
    Category.editCategory(req.body,req.params.id).then((result) => res.json(result)).catch(err => res.json(err));
});

router.post('/v1/deleteCategory/:id', (req,res) => {
    Category.deleteCategory(req.params.id).then((result) => res.json(result)).catch(err => res.json(err));
});


/*-------------------------------Challenge Api's---------------------------------------------------*/
router.post('/v1/createChallenge', (req,res) => {
    Challenge.createChallenge(req.body).then((result) => res.json(result)).catch(err => res.json(err));
});

router.get('/v1/getChallenges', (req,res) => {
    Challenge.getChallenge().then((result) => res.json(result)).catch(err => res.json(err));
});

router.post('/v1/editChallenge/:id', (req,res) => {
    Challenge.editChallenge(req.body,req.params.id).then((result) => res.json(result)).catch(err => res.json(err));
});

router.post('/v1/deleteChallenge/:id', (req,res) => {
    Challenge.deleteChallenge(req.params.id).then((result) => res.json(result)).catch(err => res.json(err));
});


/*-------------------------------Challenge Reward Api's---------------------------------------------------*/
router.post('/v1/createChallengeReward', (req,res) => {
    ChallengeReward.createChallengeReward(req.body).then((result) => res.json(result)).catch(err => res.json(err));
});

router.get('/v1/getChallengeRewards', (req,res) => {
    ChallengeReward.getChallengeReward().then((result) => res.json(result)).catch(err => res.json(err));
});

router.post('/v1/editChallengereward/:id', (req,res) => {
    ChallengeReward.editChallengeReward(req.body,req.params.id).then((result) => res.json(result)).catch(err => res.json(err));
});

router.post('/v1/deleteChallengeReward/:id', (req,res) => {
    ChallengeReward.deleteChallengeReward(req.params.id).then((result) => res.json(result)).catch(err => res.json(err));
});

/*-------------------------------Comment Api's---------------------------------------------------*/
router.post('/v1/createComment', (req,res) => {
    Comment.createComment(req.body).then((result) => res.json(result)).catch(err => res.json(err));
});

router.get('/v1/getComments', (req,res) => {
    Comment.getComment().then((result) => res.json(result)).catch(err => res.json(err));
});

router.post('/v1/editComment/:id', (req,res) => {
    Comment.editComment(req.body,req.params.id).then((result) => res.json(result)).catch(err => res.json(err));
});

router.post('/v1/deleteComment/:id', (req,res) => {
    Comment.deleteComment(req.params.id).then((result) => res.json(result)).catch(err => res.json(err));
});

/*-------------------------------Energies Api's---------------------------------------------------*/
router.post('/v1/createEnergy', (req,res) => {
    Energy.createEnergies(req.body).then((result) => res.json(result)).catch(err => res.json(err));
});

router.get('/v1/getEnergies', (req,res) => {
    Energy.getEnergies().then((result) => res.json(result)).catch(err => res.json(err));
});

router.post('/v1/editEnergy/:id', (req,res) => {
    Energy.editEnergies(req.body,req.params.id).then((result) => res.json(result)).catch(err => res.json(err));
});

router.post('/v1/deleteEnergies/:id', (req,res) => {
    Energy.deleteEnergies(req.params.id).then((result) => res.json(result)).catch(err => res.json(err));
});

/*-------------------------------SubCategory Api's---------------------------------------------------*/
router.post('/v1/createSubCategory', (req,res) => {
    SubCategory.createSubCategory(req.body).then((result) => res.json(result)).catch(err => res.json(err));
});

router.get('/v1/getSubCategories', (req,res) => {
    SubCategory.getSubCategory().then((result) => res.json(result)).catch(err => res.json(err));
});

router.post('/v1/editSubCategory/:id', (req,res) => {
    SubCategory.editSubCategory(req.body,req.params.id).then((result) => res.json(result)).catch(err => res.json(err));
});

router.post('/v1/deleteSubCategory/:id', (req,res) => {
    SubCategory.deleteSubCategory(req.params.id).then((result) => res.json(result)).catch(err => res.json(err));
});

/*-------------------------------User Api's---------------------------------------------------*/
router.post('/v1/createUser', (req,res) => {
    Users.createUsers(req.body).then((result) => res.json(result)).catch(err => res.json(err));
});

router.post('/v1/editUser/:id', (req,res) => {
    Users.editUsers(req.body,req.params.id).then((result) => res.json(result)).catch(err => res.json(err));
});

router.get('/v1/getUsers', (req,res) => {
    Users.getUsers().then((result) => res.json(result)).catch(err => res.json(err));
});

router.get('/v1/getUserDetails/:id', (req,res) => {
    Users.getUseById(req.params.id).then((result) => res.json(result)).catch(err => res.json(err));
});

router.post('/v1/deleteUser/:id', (req,res) => {
    Users.deleteUser(req.params.id).then((result) => res.json(result)).catch(err => res.json(err));
});
/*-------------------------------Verifications Api's---------------------------------------------------*/
router.post('/v1/createVerification', (req,res) => {
    Verification.createVerification(req.body).then((result) => res.json(result)).catch(err => res.json(err));
});

router.get('/v1/getVerifications', (req,res) => {
    Verification.getVerification().then((result) => res.json(result)).catch(err => res.json(err));
});

router.post('/v1/editVerification/:id', (req,res) => {
    Verification.editVerification(req.body,req.params.id).then((result) => res.json(result)).catch(err => res.json(err));
});

router.post('/v1/deleteVerification/:id', (req,res) => {
    Verification.deleteVerification(req.params.id).then((result) => res.json(result)).catch(err => res.json(err));
});

/*-------------------------------Video Api's---------------------------------------------------*/
router.post('/v1/postVideo', (req,res) => {
    Videos.createVideos(req.body).then((result) => res.json(result)).catch(err => res.json(err));
});

router.get('/v1/getUserVideo/:user_id', (req,res) => {
    Videos.getUserVideos(req.params.user_id).then((result) => res.json(result)).catch(err => res.json(err));
});

router.post('/v1/editUserVideo/:id', (req,res) => {
    Videos.editVideos(req.body,req.params.id).then((result) => res.json(result)).catch(err => res.json(err));
});

router.post('/v1/deleteVideos/:id', (req,res) => {
    Videos.deleteVideos(req.params.id).then((result) => res.json(result)).catch(err => res.json(err));
});




