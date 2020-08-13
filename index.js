function loopUsers(reply) {
    $("#userTable tbody tr").remove();
    document.getElementById("userTable").style.display = "initial";
    document.getElementById("reposTable").style.display = "none";
    for(var i = 0; i < reply.length; i++) {
        var user = reply[i];
        var avatar = user.avatar_url.replace("https", "http");
        $("#userTable").find('tbody').append('<tr><td><img class="image" src="' + avatar + '" /></td><td>' + user.login + '</td><td><a target="_blank" href="' + user.html_url + '">' + user.html_url + '</a></td><td><button class="btn btn-success" onclick="getRepos(\'' + user.login + '\')">Repositórios</td></tr>');

    }
}

function loopRepos(reply) {
    $("#reposTable tbody tr").remove();
    document.getElementById("userTable").style.display = "none";
    document.getElementById("reposTable").style.display = "initial";
    for(var i = 0; i < reply.length; i++) {
        var repo = reply[i];
        $("#reposTable").find('tbody').append('<tr><td>' + repo.name + '</td><td><a target="_blank" href="' + repo.html_url + '">' + repo.html_url + '</a></td></tr>');
    }
}

function searchUser(user) {
    var request = new XMLHttpRequest();
    request.open('get', 'http://api.github.com/search/users?q=' + user, true);
    request.onload = function() {
        const reply = JSON.parse(this.responseText);
        loopUsers(reply.items);
    };
    request.send();
}

function getRepos(user) {
    var request = new XMLHttpRequest();
    request.open('get', 'http://api.github.com/users/' + user + '/repos', true);
    request.onload = function() {
        const reply = JSON.parse(this.responseText);
        loopRepos(reply)
    };
    request.send();
}

document.getElementById("userTable").style.display = "none";
document.getElementById("reposTable").style.display = "none";

$('#searchUser').submit(function() {
    user = $('#user').val();
    searchUser(user);
});
