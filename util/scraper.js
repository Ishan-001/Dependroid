import request from "request";

export default function getDependenciesFromJson(dataUrl, version, callback) {
  request(
    {
      url: dataUrl,
      json: true,
    },
    (error, response, body) => {
      callback(
        body.dependencies[version.slice(0, version.indexOf("@"))].slice(1)
      );
    }
  );
}
