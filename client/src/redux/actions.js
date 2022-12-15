import axios from "axios";
import Swal from "sweetalert2";

export function getServices() {
  return async function (distpach) {
    const services = await axios("/posts");
    return distpach({ type: "GET_SERVICES", payload: services.data });
  };
}

export function login(data) {
  data.phoneNumber = data.phoneNumber * 1;
  return async function (distpach) {
    const dataUser = await axios.post("/login", data);
    if (Array.isArray(dataUser.data)) {
      Swal.fire({
        icon: "success",
        title: "Iniciaste sesión correctamente",
        showConfirmButton: false,
        width: "600",
      });
      distpach({ type: "LOGIN", payload: dataUser.data });
      return setTimeout(function () {
        window.location.href = "/";
      }, 2000);
    } else {
      return Swal.fire({
        icon: "error",
        title: "La contraseña o el numero de telefono no coinciden",
        width: "600",
      });
    }
  };
}

export function logOut() {
  return async function (distpach) {
    return distpach({ type: "LOG_OUT" });
  };
}

export function createAccount(data) {
  data.phoneNumber = data.phoneNumber * 1;
  return async function (distpach) {
    const dataUser = await axios.post("/newUser", data);
    console.log(dataUser.data);
    if (!Array.isArray(dataUser.data)) {
      return Swal.fire({
        icon: "error",
        title: "Este numero ya se encuentra registrado",
        width: "600",
      });
    }
    Swal.fire({
      icon: "success",
      title: "Cuenta creada correctamente",
      showConfirmButton: false,
      width: "600",
    });
    setTimeout(function () {
      window.location.href = "/";
    }, 1500);
    return distpach({ type: "CREATEA_ACCOUNT", payload: dataUser.data });
  };
}

export function createPost(data) {
  data.phoneNumber = data.codePhoneNumber + data.phoneNumber;
  return async function (distpach) {
    const post = await axios.post("/newPosts", data);
    return distpach({ type: "CREATEA_POST" });
  };
}
export function delatePost(data) {
  return async function (distpach) {
    const post = await axios.put("/newPosts", data);
    Swal.fire({
      icon: "success",
      title: "Publicacion eliminada correactamente",
      showConfirmButton: false,

      width: "600",
    });
  };
}

export function searchName(data) {
  return async function (distpach) {
    return distpach({ type: "SEARCH_NAME", payload: data });
  };
}
