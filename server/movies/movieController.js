const moment = require('moment');
const { isEmpty } = require('lodash');
const { Op } = require('sequelize');


const { Movie } = require('../../model');

const createNewMovie = async (req, res) => {
    const { title, year, length, actors } = req.body;
    const movieRecord = {
        movieId: `MV-${moment().unix()}`,
        title,
        year,
        length,
        actors
    }

    const result = await Movie.create(movieRecord);

    console.log(result.toJSON());
    if (!isEmpty(result)) {
        res.send(result);
    }
    else {
        res.json("Error in Creating Movie ....");
    }
}
const listMovies = async (req, res) => {
    const movies = await Movie.findAll();
    const formattedMovies = movies.map(r => r.get({ "plain": true }));

    console.log(formattedMovies);
    if (!isEmpty(formattedMovies)) {
        res.send(formattedMovies);
    }
    else {
        res.json("Error in Listing Movies ....");
    }
}

const searchMovieTitle = async (req, res) => {
    const { title } = req.params;

    const searchResult = await Movie.findAll({
        where: {
            title: {
                [Op.like]: `%${title}%`,
            }
        },
        raw: true
    });

    console.log(searchResult);

    if (isEmpty(searchResult)) {
        res.send({ message: 'Movie does not exist' });
    } else if (!isEmpty(searchResult)) {
        res.send(searchResult);
    }
}


const updateMovie = async (req, res) => {
    const { title } = req.params;
    const {year}=req.body;
    console.log(title);
    const updatedMovie = await Movie.update({  "year":year }, {
        where: {
            "title": title
        }
    }

    );

    console.log(updatedMovie);
    if (!isEmpty(updatedMovie)) {
        res.json("Movie Updated Successfully...");
    }
    else {
        res.json("Error in updating the     Movie ....");
    }


}
    console.log(updatedMovie);
    if (!isEmpty(updatedMovie)) {
        res.json("Movie Updated Successfully...");
    }
    else {
        res.json("Error in updating the     Movie ....");
    }


}

const deleteMovie = async (req, res) => {
    const { title } = req.params;
    console.log(title);
    const deletedMovie = await Movie.destroy({
        where: {
            "title": title
        }
    });

    console.log(deletedMovie);
    if (isEmpty(deletedMovie)) {
        res.json("Movie Deleted Successfully...");
    }
    else {
        res.json("Error in deleting the Movie ....");
    }


}




module.exports = { createNewMovie, searchMovieTitle, listMovies, updateMovie, deleteMovie };
