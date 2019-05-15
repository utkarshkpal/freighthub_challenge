import axios from "axios";
axios.defaults.headers.put["Content-Type"] = "application/json";

export function updateNameAction(newData) {
  return new Promise((resolve, reject) => {
    const url = `http://localhost:3004/shipments/${newData.id}`;
    axios
      .put(url, newData)
      .then(resp => {
        resolve(resp.data, newData.id);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function getShipmentDataById(id) {
  return new Promise((resolve, reject) => {
    const url = `http://localhost:3004/shipments/${id}`;
    axios
      .get(url)
      .then(resp => {
        console.log(resp.data);
        resolve(resp.data);
      })
      .catch(error => {
        reject(error);
      });
  });
}
