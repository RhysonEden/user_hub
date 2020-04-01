const BASE_URL = "https://jsonplace-univclone.herokuapp.com";

function fetchUsers() {
  return fetch(`${BASE_URL}/users`)
    .then(function(response) {
      return response.json();
    })
    .catch(function(error) {
      console.error(error);
    });
}

function renderUser(user) {
  $("#user-list")
    .append(
      `<div class="user-card">
    <header>
      <h2>${user.name}</h2>
    </header>
    <section class="company-info">
      <p>
        <b>Contact:</b> ${user.phone}
      </p>
      <p>
        <b>Email:</b> ${user.email}
      </p>
      <p>
        <b>Company creed:</b>"${user.company.catchPhrase}, which will ${user.company.bs}!"
      </p>
    </section>
    <footer>
      <button class="load-posts">POSTS BY ${user.username}</button>
      <button class="load-albums">ALBUMS BY ${user.username}</button>
    </footer>
  </div>`
    )
    .data("user", user);
}

function renderUserList(userList) {
  $("#user-list").empty();
  userList.forEach(function(user) {
    $("#user-list").append(renderUser(user));
  });
}
function bootstrap() {
  fetchUsers().then(renderUserList);
}

/* get an album list, or an array of albums */
// function fetchUserAlbumList(userId) {
//   fetch(`${BASE_URL}/users/${userId}/albums`)
//     .then(function(response) {
//       console.log(response);
//       return json.parse(response);
//     })
//     .catch(function(error) {
//       console.error(error);
//     });
// }

function fetchUserAlbumList(userId) {
  return fetchData(
    `${BASE_URL}/users/${userId}/albums?_expand=user&_embed=photos`
  );
}

fetchUserAlbumList(1).then(function(albumList) {
  console.log(albumList);
});

/* render a single album */
function renderAlbum(album) {}

/* render a single photo */
function renderPhoto(photo) {
  return $(`<div class='photo-card'>
  <a href="${photo.url}" target='_blank'
<img src="${photo.thumbnailUrl}">
<figure>${photo.title}</fiugre>
</a>
</div>`);
}

/* render an array of albums */
function renderAlbumList(albumList) {
  $("#app section.active").removeClass("active");
  $("#album-list")
    .empty()
    .addClass("active");

  albumList.forEach(function(album) {
    $("#album-list").append(renderAlbumList(album));
  });
}

function fetchData(url) {
  return fetch(url)
    .then(function(response) {
      return response.json();
    })
    .catch(function(error) {
      console.error(error);
    });
}

function fetchUsers() {
  return fetchData(`${BASE_URL}/users`);
}

function fetchUserAlbumList(userId) {
  return fetchData(
    `${BASE_URL}/users/${userId}/albums?_expand=user&_embed=photos`
  );
}
$("#user-list").on("click", ".user-card .load-posts", function(user) {
  $(this).closest(user);
  console.log(user);
  // load posts for this user
  // render posts for this user
});

$("#user-list").on("click", ".user-card .load-albums", function(user) {
  $(this).closest(user);
  console.log(user);
  // load albums for this user
  // render albums for this user
});

bootstrap();
fetchUserAlbumList(1).then(renderAlbumList);
