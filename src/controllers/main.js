module.exports = {
    main: async (req, res) => {
        try {
            res.json("Hola mundo");
        } catch (error) {
            res.json({message: error});
        }
    }
};