const base_url = "https://api.football-data.org/v2/competitions/CL/";
const token = 'eac06389b5dc4146880dc925c6ca2859';

const status = (response) => {
    if (response.status !== 200) {
        console.log("Error : " + response.status);
        return Promise.reject(new Error(response.statusText));
    } else {
        return Promise.resolve(response);
    }
}

const json = (response) => {
    return response.json();
}

const error = (error) => {
    console.log("Error : " + error);
}

const fetchFootballData = (url) => {
    return fetch(base_url + url, {
        method: 'GET',
        headers: {
            'X-Auth-Token': token
        }
    })
        .then(status)
        .then(json)
}

const renderStandings = data => {
    let std = data.standings;
    let tableHTML = ``;
    for (let i = 0; i < std.length; i += 3) {
        tableHTML += `
            <h5>${std[i].group.replace("_", " ")}</h5>
            <table class="highlight">
                <thead>
                    <tr>
                        <th class="xsmall">Club</th>
                        <th></th>
                        <th class="small">W</th>
                        <th class="small">D</th>
                        <th class="small">L</th>
                        <th class="small">MP</th>
                        <th class="small">GF</th>
                        <th class="small">GA</th>
                        <th class="small">GD</th>
                        <th class="small">Pts</th>
                    </tr>
                </thead>
                <tbody>
        `;
        std[i].table.forEach(info => {
            tableHTML += `
                <tr>
                    <td>
                        <img src="${info.team.crestUrl}" alt="${info.team.name}-logo" height="30px">
                    </td>
                    <td>${info.team.name}</td>
                    <td>${info.won}</td>
                    <td>${info.draw}</td>
                    <td>${info.lost}</td>
                    <td>${info.playedGames}</td>
                    <td>${info.goalsFor}</td>
                    <td>${info.goalsAgainst}</td>
                    <td>${info.goalDifference}</td>
                    <td>${info.points}</td>
                </tr>
            `;
        });
        tableHTML += `
                </tbody>
            </table>
        `;
    }

    if (document.getElementById("standings-loader")) {
        document.getElementById("standings-loader").style.display = 'none';
    }
    // Sisipkan komponen card ke dalam elemen dengan id #standings
    document.getElementById("standings").innerHTML = tableHTML;
}

const renderTeams = teams => {
    let cardHtml = ``;
    teams.forEach(team => {
        cardHtml += `
        <div class="col s12 m6">
            <div class="card medium" id="team-${team.id}">
                <div class="card-image">
                    <img src="${team.crestUrl}" alt="${team.name}-image" height="200px">
                </div>
                <div class="card-stacked">
                    <div class="card-content">
                        <h5>${team.shortName}</h5>
                        <p><pre>Name        : ${team.name}</pre></p>
                        <p><pre>E-mail      : ${team.email}</pre></p>
                    </div>
                    <div class="card-action">
                        <a href="#teams" id="fab-${team.id}" onclick="btnSave(${team.id})">Add to Favorite</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    })
    if (document.getElementById("teams-loader")) {
        document.getElementById("teams-loader").style.display = 'none';
    }
    // Sisipkan komponen card ke dalam elemen dengan id #team-list
    document.getElementById("teams-list").innerHTML = cardHtml;
}

const getStandings = () => {
    if ('caches' in window) {
        caches.match(base_url + 'standings').then(response => {
            if (response) {
                response.json().then(data => {
                    renderStandings(data);
                    console.log('using cache standings');
                    return;
                })
            }
        })
    }

    fetchFootballData('standings')
        .then((data) => {
            renderStandings(data);
            console.log('using fetch standings');
        })
        .catch(error);
}

const getTeams = () => {
    return new Promise((resolve, reject) => {
        if ("caches" in window) {
            caches.match(base_url + 'teams').then(response => {
                if (response) {
                    response.json().then(data => {
                        renderTeams(data.teams)
                        resolve(data.teams)
                        console.log('using cache teams');
                        return;
                    });
                }
            });
        }

        fetchFootballData('teams')
            .then(data => {
                renderTeams(data.teams);
                // kirim daa hasil parsing
                resolve(data.teams);
                console.log('using fetch teams');
                return;
            }).catch(error);
    })
}

const getFavorite = () => {
    getAllTeams().then(teams => {
        let cardHtml = ``;
        if (teams.length === 0) {
            cardHtml += `<h3>Tidak ada team yang disimpan</h3>`
        } else {
            teams.forEach(team => {
                cardHtml += `
                    <div class="col s12 m6">
                        <div class="card medium" id="team-${team.id}">
                            <div class="card-image">
                                <img src="${team.crestUrl}" alt="${team.name}-image" height="200px">
                            </div>
                            <div class="card-stacked">
                                <div class="card-content">
                                    <h5>${team.shortName}</h5>
                                    <p><pre>Name        : ${team.name}</pre></p>
                                    <p><pre>E-mail      : ${team.email}</pre></p>
                                </div>
                                <div class="card-action">
                                    <a href="#teams" id="fab-${team.id}" onclick="btnDel(${team.id})">Remove from Favorite</a>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            });
        }
        document.getElementById("favorite-list").innerHTML = cardHtml;
    });
}