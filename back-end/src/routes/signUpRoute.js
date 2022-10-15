import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuid} from 'uuid';
import { sendEmail } from '../../util/sendEmail';
import { getDbConnection } from "../db";

export const signUpRoute = {
    path: '/api/signup',
    method: 'post',
    handler: async (req, res) => {
        const { email, password } = req.body;

        const db = getDbConnection('react-auth-db');
        const user = await db.collection('users').findOne({ email });

        if (user) {
            res.sendStatus(409);
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const verificationString = uuid();

        const startingInfo = {
            hairColor: '',
            favoriteFood: '',
            bio: '',
        };

        const result = await db.collection('users').insertOne({
            email,
            passwordHash,
            info: startingInfo,
            isVerified: false,
            verificationString,
        });

        const { insertedId } = result;

        try {
            await sendEmail({
                subject: 'Please verify your email',
                sender: {email:'kazmi.saidmojtaba@gmail.com', name:'Sendinblue'},
                to: [{email: email}],
                htmlContent:`
                    <html>
                        <body>
                            <h1> Thanks for signing up! To verify your email, click here: {{params.bodyMessage}}</h1>
                            <p>http://localhost:3000/verify-email/${verificationString}</p>
                        </body>
                    </html>`,
            })
        } catch (e) {
            console.log(e);
            res.sendStatus(500); 
        }

        jwt.sign({
            id: insertedId,
            email,
            info: startingInfo,
            isVerified: false,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '2d',
        },
        (err, token) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.status(200).json({ token });
        });
    }
}