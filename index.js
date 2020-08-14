function loopUsers(reply) {
    $("#userTable tbody tr").remove();
    for(var i = 0; i < reply.length; i++) {
        var user = reply[i];
        var avatar = user.avatar_url.replace("https", "http");
        $("#userTable").find('tbody').append('<tr><td><img class="image" src="' + avatar + '" /></td><td>' + user.login + '</td><td><a target="_blank" href="' + user.html_url + '">' + user.html_url + '</a></td><td><button class="btn btn-success" onclick="getRepos(\'' + user.login + '\')">Repositórios</td></tr>');
    }
}

function loopRepos(reply) {
    $("#reposTable tbody tr").remove();
    for(var i = 0; i < reply.length; i++) {
        var repo = reply[i];
        $("#reposTable").find('tbody').append('<tr><td>' + repo.name + '</td><td><a target="_blank" href="' + repo.html_url + '">' + repo.html_url + '</a></td></tr>');
    }
}

function listAllUsers(button) {
    
    var request = new XMLHttpRequest();
    if(document.getElementById('usersPageMore').dataset.page) {
        page = document.getElementById('usersPageMore').dataset.page;
    } else {
        page = 0;
    }
    request.open('get', 'http://api.github.com/users?since=' + page, true);
    request.onload = function() {
        const reply = JSON.parse(this.responseText);
        lastId = reply[reply.length-1].id;
        document.getElementById('usersPageMore').dataset.page = lastId+1;
        document.getElementById("reposTable").style.display = "none";
        document.getElementById("divAllRepos").style.display = "none";
        document.getElementById("userTable").style.display = "initial";
        document.getElementById("divAllUsers").style.display = "initial";
        loopUsers(reply);
    }
    request.send();
}

function searchUser(user) {
    var request = new XMLHttpRequest();
    request.open('get', 'http://api.github.com/search/users?q=' + user, true);
    request.onload = function() {
        const reply = JSON.parse(this.responseText);
        document.getElementById("userTable").style.display = "initial";
        document.getElementById("divAllUsers").style.display = "none";
        document.getElementById("reposTable").style.display = "none";
        document.getElementById("divAllRepos").style.display = "none";
        loopUsers(reply.items);
    };
    request.send();
}

function listAllRepos() {
    
    var request = new XMLHttpRequest();
    if(document.getElementById('reposPageMore').dataset.page) {
        page = document.getElementById('reposPageMore').dataset.page;
    } else {
        page = 0;
    }
    request.open('get', 'http://api.github.com/repositories?since=' + page, true);
    request.onload = function() {
        const reply = JSON.parse(this.responseText);
        lastId = reply[reply.length-1].id;
        document.getElementById('reposPageMore').dataset.page = lastId+1;
        document.getElementById("reposTable").style.display = "initial";
        document.getElementById("divAllRepos").style.display = "initial";
        document.getElementById("userTable").style.display = "none";
        document.getElementById("divAllUsers").style.display = "none";
        loopRepos(reply);
    }
    request.send();
}

function searchRepo(repo) {
    var request = new XMLHttpRequest();
    request.open('get', 'http://api.github.com/search/repositories?q=' + repo, true);
    request.onload = function() {
        const reply = JSON.parse(this.responseText);
        document.getElementById("userTable").style.display = "none";
        document.getElementById("divAllUsers").style.display = "none";
        document.getElementById("reposTable").style.display = "initial";
        document.getElementById("divAllRepos").style.display = "none";
        loopRepos(reply.items);
    };
    request.send();
}

function getRepos(user) {
    var request = new XMLHttpRequest();
    request.open('get', 'http://api.github.com/users/' + user + '/repos', true);
    request.onload = function() {
        const reply = JSON.parse(this.responseText);
        loopRepos(reply);
    };
    request.send();
}

document.getElementById("userTable").style.display = "none";
document.getElementById("reposTable").style.display = "none";
document.getElementById("divAllUsers").style.display = "none";
document.getElementById("divAllRepos").style.display = "none";

$('#searchUser').submit(function() {
    user = $('#user').val();
    searchUser(user);
});

$('#searchRepo').submit(function() {
    repo = $('#repo').val();
    searchRepo(repo);
});