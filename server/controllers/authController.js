const bcrypt = require('bcryptjs');

module.exports = {
    register: async (req, res) => {
        const {username, password} = req.body;
        const db = req.app.get('db');
        const result = await db.get_user([username]);
        const existingUser = result[0];
         if(existingUser) {
             return res.status(409).send("Username Taken.")
         } 

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const registeredUser = await db.register_user([username, hash]);
        const user = registeredUser[0]

        req.session.user = {
            id: user.id,
            username: user.username
        }

        res.status(201).send(req.session.user);
    },
    login: async (req, res) => {
        const {username, password} = req.body;
        const foundUser = await req.app.get('db').get_user([username])
        const user = foundUser[0];
        if(!user) {
            return res.status(401).send('User not found. Please register as a new user before logging in.')
        }
        const isAuthenticated = bcrypt.compareSync(password, user.hash);
        if(!isAuthenticated) {
            return res.status(403).send('Incorrect password.')
        } else {
            req.session.user = {
                id: user.id,
                username: user.username
            }
            return res.json(req.session.user);
        }

    },
    logout: async (req, res) => {
        req.session.destroy()
        return res.send('You have been logged out.')
    },
    getUser: (req, res) => {
        if(req.session.user) {
            return res.json(req.session.user)
        } 
    },
    updateUsername: (req, res) => {
        const db = req.app.get('db');
        const {updateUsername} = req.body
        const username = req.params.username
        db.update_username([username, updateUsername])
        .then(() => {
            db.get_user(updateUsername)
            .then(response => {
                console.log(response)
            res.status(200).json(response)
        })})
        .catch(err => {
            res.status(500).send("Error");
        });
    }
} 
