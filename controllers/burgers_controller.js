const express = require('express');

const router = express.Router();

const burger = require('../models/burger.js');

router.get('/', (req, res) => {
    burger.all((data) => {
        const hbsObject = {
            burger: data,
        };
        console.log(data);
        res.render('index', {burger: data});

        console.log(hbsObject);
        res.render('index', hbsObject);
    });
});

router.post('/api/burgers', (req, res) => {
    console.log(req.body.burger_name);
    burger.create(['burger_name', 'devoured'], [req.body.burger_name, false], (result) => {
        console.log(result);
        res.json({id: result.insertId});
    });
});

router.put('api/burgers/:id', (req, res) => {
    const condition = `id = ${req.params.id}`;
    console.log('condition', condition);

    burger.update(
        {
            devoured: req.body.devoured,
        },
        condition,
        (result) => {
            if (result.changedRows === 0) {
                return res.status(404).end();
            }
            res.status(200).end();
        }
    );
});

module.exports = router;