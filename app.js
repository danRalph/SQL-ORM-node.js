const db = require('./db');
const { Movie, Person } = db.models;
const { Op } = db.Sequelize;


(async () => {
    await db.sequelize.sync({ force: true });

    try {
        const movie = await Movie.create({
            title: 'Drive',
            runtime: 95,
            releaseDate: '2011-11-22',
            isAvailableOnVHS: true,
        });
        console.log(movie.toJSON());

        const movie2 = await Movie.create({
            title: 'No Country For Old Men',
            runtime: 123,
            releaseDate: '2007-11-22',
            isAvailableOnVHS: true,
        });
        console.log(movie2.toJSON());

        const person = await Person.create({
            firstName: 'Ryan',
            lastName: 'Gosling',
        });
        console.log(person.toJSON());

        const person2 = await Person.build({
            firstName: 'Tom',
            lastName: 'Holland',
        });
        await person2.save();
        console.log(person2.toJSON());

        const movie3 = await Movie.build({
            title: 'Toy Story 3',
            runtime: 103,
            releaseDate: '2010-06-18',
            isAvailableOnVHS: false,
        });
        await movie3.save();
        console.log(movie3.toJSON());

        const movie4 = await Movie.build({
            title: 'Spiderman: Far From Home',
            runtime: 129,
            releaseDate: '2019-06-27',
            isAvailableOnVHS: false,
        });
        await movie4.save();
        console.log(movie4.toJSON());


        const movies = await Movie.findAll({
            attributes: ['id', 'title'],
            where: {
                releaseDate: {
                    [Op.gte]: '2004-01-01' 
                },
                runtime: {
                    [Op.gt]: 95,
                },
            },
            order: [['releaseDate', 'DESC']]
        });
        console.log(movies.map(movie => movie.toJSON()));

        const toyStory3 = await Movie.findByPk(3);
        toyStory3.isAvailableOnVHS = true;
        await toyStory3.save();

        console.log(toyStory3.get({ plain: true }));

    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            const errors = error.errors.map(err => err.message);
            console.error('Validation errors: ', errors);
        } else {
            throw error;
        }
    }
})();

