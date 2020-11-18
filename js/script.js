function btnSave(id) {
    const teams = getTeams();
    teams.then(teams=> {
        teams.forEach(team => {
            if(team.id === id){
                saveFavoriteTeam(team)
            }
        })
    })
}

function btnDel(id){
    deleteFavoriteTeams(id);
    getFavorite();
}