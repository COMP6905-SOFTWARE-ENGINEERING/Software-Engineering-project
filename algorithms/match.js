var matchModel = require('../models/match_db.js');

function match(projects, students, threshold){
    // disable all the previous match result
    // matchModel.changeStatus(function (status) {
    //     if (status == 'ok'){
    //         console.log('set status disabled successful')
    //     }else {
    //         console.log('set status disabled failed')
    //     }
    // })
    for(var i = 0; i < projects.length; i++){
        for(var j = 0; j < students.length; j++){
            score = 0;
            if(students[j].area_of_study == projects[i].area_of_study){
                score += 50;
            }
            if(students[j].level_of_study == projects[i].level_of_study){
                score += 30;
            }
            var a = students[j].skills;
            var b = projects[i].required_skills;
            var intersection = a.filter(function(v){ return b.indexOf(v) > -1 });
            score += intersection.length * 20;
            if(!(students[j].need_financial_aid && projects[i].available_funding == 0)){
                score += 30;
            }
            var total = 50 + 30 + b.length*20 + 30;
            var similarity = score / total;
            if(similarity >= threshold) {
                matchData = {
                    project_id: projects[i]._id,
                    student_id: students[j]._id,
                    created_at: Date.now(),
                    status: 'enabled'
                }
                matchModel.createMatch(matchData, function(status){
                    if (status == 'ok'){
                        console.log('insert match data successful')
                    }else {
                        console.log('insert match data failed')
                    }
                });
            }
        }
    }
}

module.exports = match;