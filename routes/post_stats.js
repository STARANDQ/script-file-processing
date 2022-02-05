module.exports = async function(req, res) {

    const dataUser = await User.find({role: 'employee', supervisor: req.body.idProfile});

    const dataHistory = await Promise.all(dataUser.map(async elemUser => {
        let result = await History.find({userID: elemUser.unique_id,
            createdAt: {
                $gte: new Date(req.body.dateFirst),
                $lte: new Date(req.body.dateSecond)
            }});
        return {
            ...elemUser._doc,
            "history": result
        }
    }));

    let resultArr = [];

    const colorsArr = ["red", "green", "blue", "black", "yellow"];
    let indexColorsArr = 0;

    let tempData = [];

    dataHistory.forEach(elem => {
        tempData = [];
        elem.history.forEach(h => {
            tempData.push(h.scriptInfo[0].valueScript);
        })

        resultArr.push({
            label: (elem.name + " " + elem.surname),
            data: tempData,
            backgroundColor: colorsArr[indexColorsArr],
            borderColor: colorsArr[indexColorsArr],
            borderWidth: 1
        });

        if(indexColorsArr === colorsArr.length - 1){
            indexColorsArr = 0;
        }else{
            indexColorsArr++;
        }
    });

    res.send({
        "data": resultArr
    });

};