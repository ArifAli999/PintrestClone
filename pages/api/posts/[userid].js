// API route to fetch users fvt games.
import admin from '../../../lib/firebase';
import useAuthStore from '../../../store/authStore';





export default async function handler(req, res) {

    const { userid } = req.query



    const firebase = admin.firestore()

    return new Promise((resolve, reject) => {
        const coll = firebase
            .doc(`users/${userid}`)
            .listCollections()
            .then((snapshot) => {

                const posts = snapshot.map(col => col.id)


                res.status(200).json({ posts })
                res.end()
                resolve()
            })
            .catch((e) => {
                console.log(e)
                res.status(405).json(e)
                res.end()
                resolve()
            })
    })

    res.status(404)
    res.end()
}
