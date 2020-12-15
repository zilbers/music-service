import { get, create, deleteById } from "./axios-module";

export function favorite(id, data, setter) {
  const currentDataId = data.slice();
  let index = currentDataId.findIndex((item) => item.id === id);
  currentDataId[index] &&
    (currentDataId[index].favorite
      ? delete currentDataId[index].favorite
      : (currentDataId[index].favorite = true));
  setter(currentDataId);
}

export function like(songId, userId) {
  create(`songs/like`, { songId, userId })
    .then(() => {
      return;
    })
    .catch((err) => console.log(err));
}

export function getAll(url, setter) {
  get(url)
    .then((data) => {
      setter(data.data);
    })
    .catch((err) => console.log(err));
}

export async function deletItem(type, id) {
  if (window.confirm(`Delete the ${type.slice(0, -1)}?`)) {
    await deleteById(`${type}/${id}`)
      .then((res) => {
        getAll();
        alert(res.data);
      })
      .catch((err) => console.log(err));
  }
}
