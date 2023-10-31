const Router = require('express').Router();
const User = require('../schema');


//fetching all the users
Router.get('/allUsers', async (req, res) => {
    try {
        let allUsers = await User.find();
        res.status(200).json(allUsers);
    } catch (error) {
        res.status(500).send(`error encountered while fetching all the users: ${error.message} `);
    }

});

//fetching the user using the email id passed
Router.get('/findUser', async (req, res) => {
    const passedEmail = req.query.email;
    try {
        const userInDb = await User.findOne({ email: passedEmail.trim() });

        if (!userInDb) {
            res.status(404).send(`no record found which is associated with ${passedEmail}, please create first`);
        }

        res.status(200).json(userInDb);

    } catch (error) {

        res.status(500).json(`server encontered error while finding the record associated with ${passedEmail}. ${error.messaage} `);
    }
})

//put endpoint: to update the user completely with a new record. and patch for partial updates in the record of the user
Router.put('/Update', async (req, res) => {
    try {
        const emailPassed = req.query.email;
        const dataToBeUpdated = req.body;

        const user = await User.findOne({ email: emailPassed.trim() });

        if (!user) {
            return res.status(404).json(`Could not find the user associated with the email: ${emailPassed}`);
        }

        const updatedUser = await User.findByIdAndUpdate(user._id, dataToBeUpdated, { new: true });

        if (!updatedUser) {
            return res.status(404).json(`enocountered error while updating the record associated with email: ${emailPassed}`);
        }

        res.status(200).json(`updation successful for the record associated with ${emailPassed}`);
    } catch (error) {
        res.status(500).send(`Please try again: ${error.message}`);
    }
});

//partial updates
Router.patch('/partialUpdate', async (req, res) => {
    try {
        const emailPassed = req.query.email;
        const dataToBeUpdated = req.body;

        const user = await User.findOne({ email: emailPassed.trim() });

        if (!user) {
            return res.status(404).json(`Could not find the user associated with the email: ${emailPassed}`);
        }

        const updatedUser = await User.findByIdAndUpdate(user._id, dataToBeUpdated, { new: true });

        if (!updatedUser) {
            return res.status(404).json(`enocountered error while updating the record associated with email: ${emailPassed}`);
        }

        res.status(200).json(`updation successful for the record associated with ${emailPassed}`);
    } catch (error) {
        res.status(500).send(`Please try again: ${error.message}`);
    }
})


Router.delete('/Delete', async (req, res) => {
    try {
        const emailPassed = req.query.email;
        console.log(emailPassed)
        const user = await User.findOne({ email: emailPassed.trim() });
        if (!user) {
           return res.status(404).json(`cannot find the record associated with: ${emailPassed}`);
        }
        const deletedUser = await User.findByIdAndDelete(user._id);
     
        if (!deletedUser) {
          return  res.status(500).send('cannot perform the deletion, please try again');
        }
        return res.status(200).send(`record associated with email: ${emailPassed} has been deleted succesfully`);

    } catch (error) {
       return res.status(500).send(`server encountered the error while performing the deletion associated with: ${emailPassed}, ${error.message}`);
    }
})


///event creation
Router.post('/create', async (req, res) => {

    let namePassed = req.body.name;
    let emailPassed = req.body.email;
    let professionPassed = req.body.profession;

    try {
        const newUser = new User(
            {
                name: namePassed,
                email: emailPassed,
                profession: professionPassed
            }
        )

        await newUser.save();

        res.status(200).json('user saved succesfully');

    } catch (error) {
        res.status(500).json(`could not create: ${error.message}`);


    }

});

Router.get('/', (req, res) => {
    res.status(200).send('Hii there, very excited!!!');
});


module.exports = Router;
