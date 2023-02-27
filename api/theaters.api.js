const { Router } = require('express');
const { Theaters } = require('../models/theaters');

const router = Router();

router.get("/theaters", async (req, res) => {
    const { address_city, address_zipcode, latitude, longitude } = req.query;

    const dbQuery = {};
   
    if (address_city) {
        dbQuery["location.address.city"] = address_city;
       }

    if (address_zipcode) {
        dbQuery["location.address.zipcode"] = address_zipcode;
       }

    if (latitude) {
        dbQuery["location.geo.coordinates"] = latitude;
       }

    if (longitude) {
        dbQuery["location.geo.coordinates"] = longitude;
       }

    const docs = await Theaters.find(dbQuery);
    return res.status(200).send(docs);
   });

router.get("/theaters/:theaterId", async (req, res) => {
    const theaterId = req.params.theaterId;

    const dbQuery = {};

    if (theaterId) {
        dbQuery.theaterId = theaterId;
      }

    const docs = await Theaters.findOne(dbQuery);
    return res.status(200).send(docs);
   });

module.exports = { router };