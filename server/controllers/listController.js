module.exports = {
    addToList: async (req, res) => {
        const {title, backdrop_path, overview, id} = req.body;
        const db = req.app.get('db');
        const user_id = req.session.user.id;

        console.log(req.body)

        db.add_to_list([
                title, 
                backdrop_path, 
                overview, 
                id, 
                user_id
            ])
            .then(response => res.status(200).json(response))
            .catch (error => {
                res.status(500).send(error)
            })
    },

    getList: (req, res) => {
        const db = req.app.get('db');
        const user_id = req.session.user.id;
        db.get_list(user_id)
        .then(response => {
            console.log(response)
            res.status(200).json(response)
            })
        .catch(error => {
          console.log(error);
          res.status(500).send(error);
        })
    },

    deleteFromList: (req, res) => {
        const db = req.app.get('db');
        let id = req.params.id
        let user_id = req.session.user.user_id;
        db.delete_from_list([user_id, id])
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
          res.status(500).send("Error");
        });
    }
}
