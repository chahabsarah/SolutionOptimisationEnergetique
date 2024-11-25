const yup = require("yup");


const validateUpdate = async (req, res, next) => {
    try {
        const Schema = yup.object().shape({
            firstname: yup.string()
                .required('First name is required')
                .matches(/^[A-Za-z]+$/, 'First name must contain only letters')
                .min(3, 'First name must be at least 3 characters long')
                .matches(/^[^\d!@#$%^&*(),.?":{}|<>\/]+$/, 'First name cannot contain special characters'),
            lastname: yup.string()
                .required('Last name is required')
                .matches(/^[A-Za-z]+$/, 'Last name must contain only letters')
                .min(3, 'Last name must be at least 3 characters long')
                .matches(/^[^\d!@#$%^&*(),.?":{}|<>\/]+$/, 'Last name cannot contain special characters'),

            phone_number: yup.string()
                .required('Phone number is required')
                .matches(/^\d{11}$/, 'Please enter a valid phone number'),
           
        });
        await Schema.validate(req.body);
        next();
    } catch (error) {
        res.status(400).json({ error: error.errors });
    }
};

module.exports = validateUpdate;