/* CODIGO SYNC */

function algo() {
  console.log("La funcion");
}

console.log("1");

algo();

console.log("2");

/* CODIGO ASYNC */

console.log("1");

setTimeout(() => {
  console.log("timer");
}, 2000);

console.log("2");

/*EJEMPLO DE FALLA EN ASINCRONISMO: CONECTANDO UN USER ASYNC */

console.log("1");

function logIn(email, password) {
  setTimeout(() => {
    return { userEmail: email };
  }, 2000);
}

const user = logIn("joaco@joaco.com", 123);

console.log(user);

console.log("2");

/* SOLUCION CON CALLBACKS */

console.log("1");

function logIn(email, password, callback) {
  setTimeout(() => {
    callback({ userEmail: email });
  }, 5000);
}

const user = logIn("joaco@joaco.com", 123, (user) => {
  console.log(user);
});

console.log("2");

/* SOLUCION CON PROMESAS */

console.log("1");

const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve({ user: "joaco" });
  }, 2000);
});

promise.then((user) => {
  console.log(user);
});

console.log("2");

/*SOLUCION CON VARIOS CALLBACKS */

console.log("1");

function logIn(email, password, callback) {
  setTimeout(() => {
    callback({ userEmail: email });
  }, 3000);
}

function getUserVideos(email, callback) {
  setTimeout(() => {
    callback(["video1", "video2", "video3"]);
  }, 2000);
}

function videoDetails(video, callback) {
  setTimeout(() => {
    callback(["Titulo del video"]);
  }, 2000);
}

const user = logIn("joaco@joaco.com", 123, (user) => {
  console.log(user);
  getUserVideos(user.userEmail, (video) => {
    console.log(video);
    videoDetails(video[0], (title) => {
      console.log(title);
    });
  });
});

console.log("2");

/*SOLUCION CON VARIAS PROMESAS */

console.log("1");

function logIn(email, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("tengo el user");
      resolve({ userEmail: email });
    }, 3000);
  });
}

function getUserVideos(email) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("tengo los videos");
      resolve(["video1", "video2", "video3"]);
    }, 2000);
  });
}

function videoDetails(video) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(["Titulo del video"]);
    }, 2000);
  });
}

logIn("joaco@joaco.com", 123)
  .then((user) => getUserVideos(user.email))
  .then((videos) => videoDetails(videos[0]))
  .then((detail) => console.log(detail));

console.log("2");

/* PROMISE ALL (no importa el orden)*/

const youTube = new Promise((resolve) => {
  setTimeout(() => {
    console.log("cosas de youtube");
    resolve({ videos: [1, 2, 3, 4, 5] });
  }, 2000);
});

const faceBook = new Promise((resolve) => {
  setTimeout(() => {
    console.log("cosas de facebook");
    resolve({ user: "Nombre" });
  }, 2000);
});

Promise.all([youTube, faceBook]).then((result) => console.log(result));

/* ASYNC AWAIT (try catch)*/

console.log("1");

function logIn(email, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("tengo el user");
      resolve({ userEmail: email });
    }, 3000);
  });
}

function getUserVideos(email) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("tengo los videos");
      resolve(["video1", "video2", "video3"]);
    }, 2000);
  });
}

function videoDetails(video) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(["Titulo del video"]);
    }, 2000);
  });
}

async function mostrarUsers() {
  try {
    const loggedUser = await logIn("nombre", 123);
    const videos = await getUserVideos(loggedUser.userEmail);
    const detail = await videoDetails(videos[0]);
    console.log(detail);
  } catch (err) {
    console.log(err);
  }
}

mostrarUsers();

console.log("2");
